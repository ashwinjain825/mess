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
    return isWeekend(dayKey) ? mealSchedule.weekend : mealSchedule.weekday;
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
        // For other days, all meals are available. Default all expanded for complete viewing.
        const schedule = getScheduleForDay(dayKey);
        expandedMealsPerDay[dayKey] = new Set(schedule.map(m => m.id));
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

      const stateBadge = document.createElement("span");
      stateBadge.className = "meal-state-text";
      stateBadge.textContent = isExpanded ? "Hide" : "Show";

      headerBtn.appendChild(titleGroup);
      headerBtn.appendChild(stateBadge);

      // Accordion click handler
      headerBtn.addEventListener("click", () => {
        if (isToday) {
          userInteractedWithToday = true;
        }

        if (expandedSet.has(meal.id)) {
          expandedSet.delete(meal.id);
        } else {
          expandedSet.add(meal.id);
        }
        render();
      });

      card.appendChild(headerBtn);

      // Meal body with items
      const body = document.createElement("div");
      body.className = "meal-body";

      const items = dayData ? (dayData[meal.id] || []) : [];

      if (items.length === 0) {
        const noItem = document.createElement("div");
        noItem.className = "no-data-msg";
        noItem.textContent = "No items listed for this meal.";
        body.appendChild(noItem);
      } else {
        const list = document.createElement("ul");
        list.className = "meal-items-list";

        items.forEach((item) => {
          const li = document.createElement("li");
          li.className = "meal-item";
          li.textContent = item;
          list.appendChild(li);
        });

        body.appendChild(list);
      }

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
});
