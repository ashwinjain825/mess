// Script to handle mess selection, weekday switching, accordion meals, and time-based auto-expansion for today

document.addEventListener("DOMContentLoaded", () => {
  const dayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const dayDisplayNames = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday"
  };

  // State
  let currentMess = "B"; // Mess B by default
  const todayDayKey = dayKeys[new Date().getDay()];
  let selectedDay = todayDayKey;

  // Track expanded meal ids per day: { [dayKey]: Set of expanded meal ids }
  // When switching days or when initializing, we set the active meal(s).
  const expandedMealsPerDay = {};
  // Track if user has manually interacted with today's accordion to prevent sudden re-collapsing
  let userInteractedWithToday = false;
  let lastAutoExpandedTodayMeal = null;

  // DOM Elements
  const dayButtons = document.querySelectorAll(".day-btn");
  const messABtn = document.getElementById("messABtn");
  const messBBtn = document.getElementById("messBBtn");
  const statusSummary = document.getElementById("statusSummary");
  const menuContent = document.getElementById("menuContent");

  function timeStringToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function isWeekend(dayKey) {
    return dayKey === "saturday" || dayKey === "sunday";
  }

  function getScheduleForDay(dayKey) {
    const activeSchedule = window.mealSchedule || mealSchedule;
    return isWeekend(dayKey) ? activeSchedule.weekend : activeSchedule.weekday;
  }

  /**
   * Calculates which meal should be expanded for today based on current time:
   * 1. If currently inside a meal window -> that meal.
   * 2. Else find the first upcoming meal whose end time is in the future.
   * 3. If all meals for today have ended -> dinner (the last meal).
   */
  function getRelevantMealIdForToday(now) {
    const schedule = getScheduleForDay(todayDayKey);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // 1. Check if a meal is currently running
    for (let meal of schedule) {
      const startMin = timeStringToMinutes(meal.start);
      const endMin = timeStringToMinutes(meal.end);
      if (currentMinutes >= startMin && currentMinutes < endMin) {
        return meal.id;
      }
    }

    // 2. Check for upcoming meal today
    for (let meal of schedule) {
      const startMin = timeStringToMinutes(meal.start);
      if (currentMinutes < startMin) {
        return meal.id;
      }
    }

    // 3. All meals for today are over -> expand the last meal of the day (dinner)
    return schedule[schedule.length - 1].id;
  }

  /**
   * Initializes or updates expanded set for a day
   */
  function ensureDayExpandedState(dayKey, forceRecalculateToday = false) {
    const isToday = (dayKey === todayDayKey);

    if (isToday) {
      const relevantMeal = getRelevantMealIdForToday(new Date());
      if (!expandedMealsPerDay[dayKey] || forceRecalculateToday) {
        expandedMealsPerDay[dayKey] = new Set([relevantMeal]);
        lastAutoExpandedTodayMeal = relevantMeal;
      }
    } else {
      if (!expandedMealsPerDay[dayKey]) {
        // Default to the first meal for other days, keeping only one open
        const schedule = getScheduleForDay(dayKey);
        expandedMealsPerDay[dayKey] = new Set(schedule.length > 0 ? [schedule[0].id] : []);
      }
    }
  }

  /**
   * Renders the meal sections
   */
  function render() {
    const isToday = (selectedDay === todayDayKey);

    // Update Day button active states
    dayButtons.forEach((btn) => {
      if (btn.getAttribute("data-day") === selectedDay) {
        btn.classList.add("active");
        btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      } else {
        btn.classList.remove("active");
      }
    });

    // Update Mess toggle buttons
    if (currentMess === "B") {
      messBBtn.classList.add("active");
      messABtn.classList.remove("active");
    } else {
      messABtn.classList.add("active");
      messBBtn.classList.remove("active");
    }

    // Header title
    statusSummary.innerHTML = "";
    const dayTitle = document.createElement("div");
    dayTitle.className = "status-day";
    dayTitle.textContent = `${dayDisplayNames[selectedDay]} - Mess ${currentMess}`;
    statusSummary.appendChild(dayTitle);

    // Ensure state exists for selected day
    ensureDayExpandedState(selectedDay);
    const expandedSet = expandedMealsPerDay[selectedDay];

    const schedule = getScheduleForDay(selectedDay);
    const dayData = messMenu[selectedDay] && messMenu[selectedDay][currentMess];

    menuContent.innerHTML = "";

    schedule.forEach((meal) => {
      const isExpanded = expandedSet.has(meal.id);

      const card = document.createElement("section");
      card.className = isExpanded ? "meal-card" : "meal-card collapsed";
      card.setAttribute("data-meal-id", meal.id);

      // Header button
      const headerBtn = document.createElement("button");
      headerBtn.type = "button";
      headerBtn.className = "meal-header-btn";
      headerBtn.setAttribute("aria-expanded", isExpanded ? "true" : "false");

      const titleGroup = document.createElement("div");
      titleGroup.className = "meal-title-group";

      const nameEl = document.createElement("div");
      nameEl.className = "meal-name";
      nameEl.textContent = meal.name;

      const timeEl = document.createElement("div");
      timeEl.className = "meal-timing";
      timeEl.textContent = meal.displayTime;

      titleGroup.appendChild(nameEl);
      titleGroup.appendChild(timeEl);

      const iconWrapper = document.createElement("span");
      iconWrapper.className = "meal-toggle-icon";
      iconWrapper.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;

      headerBtn.appendChild(titleGroup);
      headerBtn.appendChild(iconWrapper);

      // Accordion click handler: only one meal card is open at a time
      headerBtn.addEventListener("click", () => {
        if (isToday) {
          userInteractedWithToday = true;
        }

        const currentlyExpanded = expandedSet.has(meal.id);

        if (currentlyExpanded) {
          // If clicked the currently open one, collapse it
          expandedSet.delete(meal.id);
          card.classList.add("collapsed");
          headerBtn.setAttribute("aria-expanded", "false");
        } else {
          // Close any other open meal cards smoothly
          menuContent.querySelectorAll(".meal-card:not(.collapsed)").forEach((openCard) => {
            if (openCard !== card) {
              openCard.classList.add("collapsed");
              const btn = openCard.querySelector(".meal-header-btn");
              if (btn) btn.setAttribute("aria-expanded", "false");
            }
          });

          // Open selected meal card
          expandedSet.clear();
          expandedSet.add(meal.id);
          card.classList.remove("collapsed");
          headerBtn.setAttribute("aria-expanded", "true");
        }
      });

      card.appendChild(headerBtn);

      // Meal body with items and animated grid inner wrapper
      const body = document.createElement("div");
      body.className = "meal-body";

      const bodyInner = document.createElement("div");
      bodyInner.className = "meal-body-inner";

      const items = dayData ? (dayData[meal.id] || []) : [];

      if (items.length === 0) {
        const noItem = document.createElement("div");
        noItem.className = "no-data-msg";
        noItem.textContent = "No items listed for this meal.";
        bodyInner.appendChild(noItem);
      } else {
        const list = document.createElement("ul");
        list.className = "meal-items-list";

        items.forEach((item) => {
          const li = document.createElement("li");
          li.className = "meal-item";
          li.textContent = item;
          list.appendChild(li);
        });

        bodyInner.appendChild(list);
      }

      body.appendChild(bodyInner);
      card.appendChild(body);
      menuContent.appendChild(card);
    });
  }

  // Event Listeners for Day buttons
  dayButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const day = btn.getAttribute("data-day");
      if (day && day !== selectedDay) {
        selectedDay = day;
        ensureDayExpandedState(selectedDay);
        render();
      }
    });
  });

  // Event Listeners for Mess switch
  messABtn.addEventListener("click", () => {
    if (currentMess !== "A") {
      currentMess = "A";
      render();
    }
  });

  messBBtn.addEventListener("click", () => {
    if (currentMess !== "B") {
      currentMess = "B";
      render();
    }
  });

  // Initial setup for today and initial render
  ensureDayExpandedState(todayDayKey, true);
  render();

  // Re-render automatically when data arrives from Firestore
  window.addEventListener("messMenuUpdated", () => {
    console.log("[App] Updating UI with newly fetched Firestore menu data...");
    render();
  });

  // Periodic check (every 30 seconds) for time transitions on TODAY only
  setInterval(() => {
    const currentAutoMeal = getRelevantMealIdForToday(new Date());

    // When time passes into a new meal window or upcoming meal changes for today
    if (currentAutoMeal !== lastAutoExpandedTodayMeal) {
      lastAutoExpandedTodayMeal = currentAutoMeal;
      // If user hasn't manually overridden or if viewing today, keep auto-expanded meal updated
      if (!userInteractedWithToday) {
        expandedMealsPerDay[todayDayKey] = new Set([currentAutoMeal]);
      } else {
        // Also ensure current active meal is at least included in expanded meals
        if (expandedMealsPerDay[todayDayKey]) {
          expandedMealsPerDay[todayDayKey].add(currentAutoMeal);
        }
      }

      if (selectedDay === todayDayKey) {
        render();
      }
    }
  }, 30000);

  // ===============================================================
  // Feedback Widget Modal & Form Logic
  // ===============================================================
  const feedbackModal = document.getElementById("feedbackModal");
  const openFeedbackBtn = document.getElementById("openFeedbackBtn");
  const closeFeedbackBtn = document.getElementById("closeFeedbackBtn");
  const cancelFeedbackBtn = document.getElementById("cancelFeedbackBtn");
  const feedbackHeader = document.querySelector(".feedback-header");
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackSuccessView = document.getElementById("feedbackSuccessView");
  const formStatusMsg = document.getElementById("formStatusMsg");
  const submitFeedbackBtn = document.getElementById("submitFeedbackBtn");
  const starBtns = document.querySelectorAll("#starRatingGroup .star-btn");
  const fbRatingInput = document.getElementById("fbRating");
  const ratingText = document.getElementById("ratingText");

  const ratingDescriptions = {
    1: "1 Star - Poor",
    2: "2 Stars - Fair",
    3: "3 Stars - Average",
    4: "4 Stars - Good",
    5: "5 Stars - Excellent"
  };

  let selectedRating = 0;

  function setRating(rating) {
    selectedRating = rating;
    fbRatingInput.value = rating > 0 ? String(rating) : "";
    
    starBtns.forEach((btn) => {
      const val = Number(btn.getAttribute("data-value"));
      if (val <= rating) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (rating > 0) {
      ratingText.textContent = ratingDescriptions[rating] || `${rating} Stars`;
      ratingText.style.fontStyle = "normal";
      ratingText.style.color = "var(--text-main)";
    } else {
      ratingText.textContent = "Select rating";
      ratingText.style.fontStyle = "italic";
      ratingText.style.color = "var(--text-muted)";
    }
  }

  // Star hover and click events
  starBtns.forEach((btn) => {
    const val = Number(btn.getAttribute("data-value"));

    btn.addEventListener("mouseenter", () => {
      starBtns.forEach((s) => {
        const sVal = Number(s.getAttribute("data-value"));
        if (sVal <= val) {
          s.classList.add("hover-active");
        } else {
          s.classList.remove("hover-active");
        }
      });
      ratingText.textContent = ratingDescriptions[val];
    });

    btn.addEventListener("mouseleave", () => {
      starBtns.forEach((s) => s.classList.remove("hover-active"));
      if (selectedRating > 0) {
        ratingText.textContent = ratingDescriptions[selectedRating];
      } else {
        ratingText.textContent = "Select rating";
      }
    });

    btn.addEventListener("click", () => {
      setRating(val);
    });
  });

  function showStatusMsg(text, type) {
    formStatusMsg.textContent = text;
    formStatusMsg.className = `form-feedback-msg ${type}`;
  }

  function clearStatusMsg() {
    formStatusMsg.textContent = "";
    formStatusMsg.className = "form-feedback-msg";
  }

  function openFeedback() {
    clearStatusMsg();

    // Ensure form is visible and success view is hidden
    if (feedbackForm) feedbackForm.style.display = "flex";
    if (feedbackHeader) feedbackHeader.style.display = "flex";
    if (feedbackSuccessView) feedbackSuccessView.style.display = "none";

    // Auto-prefill Mess from currently selected view
    const messRadio = feedbackForm.querySelector(`input[name="fbMess"][value="${currentMess}"]`);
    if (messRadio) messRadio.checked = true;

    // Auto-prefill Day from currently selected day
    if (selectedDay) {
      const dayRadio = feedbackForm.querySelector(`input[name="fbDay"][value="${selectedDay}"]`);
      if (dayRadio) dayRadio.checked = true;
    }

    // Auto-prefill Meal based on current relevant meal for today
    const activeMeal = getRelevantMealIdForToday(new Date());
    if (activeMeal) {
      const mealRadio = feedbackForm.querySelector(`input[name="fbMeal"][value="${activeMeal}"]`);
      if (mealRadio) mealRadio.checked = true;
    }

    if (typeof feedbackModal.showModal === "function") {
      feedbackModal.showModal();
    } else {
      feedbackModal.setAttribute("open", "");
    }

    // Focus roll number input
    setTimeout(() => {
      const rollInput = document.getElementById("fbRollNo");
      if (rollInput) rollInput.focus();
    }, 50);
  }

  function closeFeedback() {
    if (typeof feedbackModal.close === "function") {
      feedbackModal.close();
    } else {
      feedbackModal.removeAttribute("open");
    }

    // Reset views after dialog closes
    setTimeout(() => {
      if (feedbackForm) feedbackForm.style.display = "flex";
      if (feedbackHeader) feedbackHeader.style.display = "flex";
      if (feedbackSuccessView) feedbackSuccessView.style.display = "none";
      submitFeedbackBtn.disabled = false;
      submitFeedbackBtn.textContent = "Submit Feedback";
      clearStatusMsg();
    }, 200);
  }

  if (openFeedbackBtn) {
    openFeedbackBtn.addEventListener("click", openFeedback);
  }

  if (closeFeedbackBtn) {
    closeFeedbackBtn.addEventListener("click", closeFeedback);
  }

  if (cancelFeedbackBtn) {
    cancelFeedbackBtn.addEventListener("click", closeFeedback);
  }

  // Close when clicking modal backdrop
  feedbackModal.addEventListener("click", (e) => {
    const dialogBox = feedbackModal.querySelector(".feedback-dialog-content");
    if (dialogBox && !dialogBox.contains(e.target)) {
      closeFeedback();
    }
  });

  // Handle Form Submission
  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatusMsg();

    const rollNo = document.getElementById("fbRollNo").value.trim();
    const messRadio = feedbackForm.querySelector('input[name="fbMess"]:checked');
    const mess = messRadio ? messRadio.value : "B";
    const dayRadio = feedbackForm.querySelector('input[name="fbDay"]:checked');
    const day = dayRadio ? dayRadio.value : selectedDay;
    const mealRadio = feedbackForm.querySelector('input[name="fbMeal"]:checked');
    const meal = mealRadio ? mealRadio.value : "breakfast";
    const comment = document.getElementById("fbComment").value.trim();

    // Validation
    if (!rollNo) {
      showStatusMsg("Please enter your Roll Number.", "error");
      document.getElementById("fbRollNo").focus();
      return;
    }

    if (rollNo.length > 30) {
      showStatusMsg("Roll number cannot exceed 30 characters.", "error");
      return;
    }

    if (!selectedRating || selectedRating < 1 || selectedRating > 5) {
      showStatusMsg("Please select a star rating from 1 to 5.", "error");
      return;
    }

    const payload = {
      rollNo,
      mess,
      day,
      meal,
      rating: selectedRating,
      comment
    };

    submitFeedbackBtn.disabled = true;
    submitFeedbackBtn.textContent = "Submitting...";

    try {
      if (typeof window.submitFeedback === "function") {
        await window.submitFeedback(payload);
      } else {
        console.warn("[Feedback] submitFeedback not loaded yet, saving to localStorage");
        const existing = JSON.parse(localStorage.getItem("offline_feedbacks") || "[]");
        existing.push({ ...payload, createdAt: new Date().toISOString() });
        localStorage.setItem("offline_feedbacks", JSON.stringify(existing));
      }

      // Hide the form and header, display PhonePe-style success animation
      feedbackForm.style.display = "none";
      if (feedbackHeader) feedbackHeader.style.display = "none";

      // Reset and trigger animation cleanly
      feedbackSuccessView.style.display = "flex";
      const svg = feedbackSuccessView.querySelector(".success-checkmark");
      if (svg) {
        svg.style.animation = "none";
        svg.offsetHeight; // force reflow
        svg.style.animation = "";
      }

      // Reset form values for future openings
      feedbackForm.reset();
      setRating(0);

      // Auto close the widget after animation completes (approx. 2.2 seconds)
      setTimeout(() => {
        closeFeedback();
      }, 2200);

    } catch (err) {
      console.error("[Feedback] Submission error:", err);
      showStatusMsg("Failed to submit feedback. Please check your connection and try again.", "error");
      submitFeedbackBtn.disabled = false;
      submitFeedbackBtn.textContent = "Submit Feedback";
    }
  });
});
