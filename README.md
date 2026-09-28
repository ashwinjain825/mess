# IIITDM Kurnool - Mess Menu

A fast, lightweight, mobile-first web app to check the daily mess menu for IIITDM Kurnool (Mess A & Mess B). Built using pure semantic HTML, vanilla CSS, and JavaScript with zero external libraries or frameworks.

---

## Features

- **Mobile-First & Practical Design**: Clean, readable interface optimized for handheld devices with a light aesthetic and zero unnecessary clutter.
- **Smart Time-Based Expansion**:
  - Automatically highlights and expands the ongoing or next upcoming meal for today based on local browser time.
  - Automatically collapses previous meals while keeping all menu data accessible in the DOM.
  - Between meals, automatically anticipates and expands the next upcoming meal (e.g., at 10:00 AM, Lunch is expanded).
- **Collapsible Meal Accordions**:
  - Every meal card can be manually expanded or collapsed with a single tap.
  - Selecting other weekdays lets students view all meals for that day without current-time filtering.
- **Mess Switcher**:
  - Mess B displayed by default.
  - Instant toggle between Mess A and Mess B without page reloads.
- **Horizontal Weekday Selector**:
  - Horizontally scrollable weekday bar (`Mon` to `Sun`).
  - Automatically selects today's weekday on initial load.
- **Automated In-Place Updates**:
  - Checks the time periodically every 30 seconds to transition meal states dynamically without requiring a page refresh.
- **Clean Architecture & Data Separation**:
  - Menu data and meal schedules reside strictly in `database.js`, keeping markup clean and maintenance simple.

---

## Meal Schedules

### Monday – Friday
- **Breakfast**: 7:30 AM – 9:00 AM
- **Lunch**: 12:30 PM – 2:00 PM
- **Snacks**: 5:00 PM – 6:00 PM
- **Dinner**: 7:30 PM – 9:00 PM

### Saturday – Sunday
- **Breakfast**: 7:30 AM – 9:30 AM
- **Lunch**: 12:30 PM – 2:30 PM
- **Snacks**: 5:00 PM – 6:00 PM
- **Dinner**: 7:30 PM – 9:30 PM

---

## Project Structure

```text
├── index.html     # Semantic HTML page structure
├── style.css      # Mobile-first stylesheet (clean layout, no icons, no gradients)
├── database.js    # Source of truth for menu items and timing configurations
├── script.js      # Dynamic day/mess switcher, time detection, and accordion logic
└── README.md      # Project documentation
```

---

## Getting Started

Because this project uses vanilla web standards with no dependencies or build steps, you can run it immediately with any browser or static server.

### Option 1: Direct File Opening
Simply double-click `index.html` or open it in your browser.

### Option 2: Local HTTP Server (e.g., XAMPP, VS Code Live Server, or Python)
If running inside a local web server (such as Apache in XAMPP):
1. Place this directory inside `htdocs/mess`.
2. Start Apache via the XAMPP Control Panel.
3. Visit:
   ```text
   http://localhost/mess/
   ```

Or via Python:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.

---

## Modifying Menu Data

To update meals or schedule timings, open `database.js`:
- Edit `messMenu[day][A | B]` arrays to update dishes for any meal.
- Adjust `mealSchedule.weekday` or `mealSchedule.weekend` objects if mess administration alters timings.

---

## License

Created for students and residents of IIITDM Kurnool. Open for campus contributions and enhancements.