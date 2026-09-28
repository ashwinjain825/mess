// Script to handle mess selection, weekday auto-detection, and menu rendering

document.addEventListener("DOMContentLoaded", () => {
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const dayNamesCapitalized = {
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
  const todayIndex = new Date().getDay();
  let currentDay = days[todayIndex];

  // DOM Elements
  const dayButtons = document.querySelectorAll(".day-btn");
  const messABtn = document.getElementById("messABtn");
  const messBBtn = document.getElementById("messBBtn");
  const menuTitle = document.getElementById("menuTitle");
  const menuSectionsContainer = document.getElementById("menuSections");
  const daysContainer = document.getElementById("daysContainer");

  // Format meal title matching PDF structure
  const mealTitles = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    snacks: "Snacks",
    dinner: "Dinner"
  };

  function updateMenu() {
    // Update menu title
    menuTitle.textContent = `${dayNamesCapitalized[currentDay]} - Mess ${currentMess}`;

    // Update active states on buttons
    dayButtons.forEach((btn) => {
      if (btn.getAttribute("data-day") === currentDay) {
        btn.classList.add("active");
        // Scroll button into view smoothly on mobile if needed
        btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      } else {
        btn.classList.remove("active");
      }
    });

    if (currentMess === "B") {
      messBBtn.classList.add("active");
      messABtn.classList.remove("active");
    } else {
      messABtn.classList.add("active");
      messBBtn.classList.remove("active");
    }

    // Render Meals
    menuSectionsContainer.innerHTML = "";

    const dayData = (typeof messMenu !== "undefined" && messMenu[currentDay]) ? messMenu[currentDay][currentMess] : null;

    if (!dayData) {
      const emptyDiv = document.createElement("div");
      emptyDiv.className = "no-data-msg";
      emptyDiv.textContent = "No menu data available for this day.";
      menuSectionsContainer.appendChild(emptyDiv);
      return;
    }

    const mealKeys = ["breakfast", "lunch", "snacks", "dinner"];

    mealKeys.forEach((mealKey) => {
      const items = dayData[mealKey] || [];
      const mealCard = document.createElement("section");
      mealCard.className = "meal-card";

      const header = document.createElement("div");
      header.className = "meal-header";
      header.textContent = mealTitles[mealKey] || mealKey;
      mealCard.appendChild(header);

      if (items.length === 0) {
        const noItem = document.createElement("div");
        noItem.className = "no-data-msg";
        noItem.textContent = "No items listed.";
        mealCard.appendChild(noItem);
      } else {
        const list = document.createElement("ul");
        list.className = "meal-items-list";

        items.forEach((item) => {
          const li = document.createElement("li");
          li.className = "meal-item";
          li.textContent = item;
          list.appendChild(li);
        });

        mealCard.appendChild(list);
      }

      menuSectionsContainer.appendChild(mealCard);
    });
  }

  // Event Listeners for Day buttons
  dayButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedDay = btn.getAttribute("data-day");
      if (selectedDay && selectedDay !== currentDay) {
        currentDay = selectedDay;
        updateMenu();
      }
    });
  });

  // Event Listeners for Mess switch
  messABtn.addEventListener("click", () => {
    if (currentMess !== "A") {
      currentMess = "A";
      updateMenu();
    }
  });

  messBBtn.addEventListener("click", () => {
    if (currentMess !== "B") {
      currentMess = "B";
      updateMenu();
    }
  });

  // Initial render
  updateMenu();
});
