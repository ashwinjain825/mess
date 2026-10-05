# IIITDM Kurnool - Mess Menu & Feedback Portal

A fast, lightweight, mobile-first web application to check daily mess menus, submit meal ratings and feedback, and manage mess operations for **IIITDM Kurnool** (Mess A & Mess B). Built using pure semantic HTML5, modern vanilla CSS, and JavaScript (ESM) with Firebase Firestore for live cloud synchronization and zero external frontend build steps.

---

## Features

### 1. Student Mess Menu (`index.html`)
- **Mobile-First & Clean UI**: Minimalist, responsive design optimized for smartphones and handheld devices with no unnecessary clutter.
- **Smart Time-Based Auto-Expansion**:
  - Automatically detects the current time and expands the active ongoing meal or next upcoming meal for today.
  - Automatically collapses past meals while keeping them accessible via one-tap accordions.
  - Anticipates upcoming meals during intermediate intervals (e.g., expands Lunch at 10:00 AM).
  - Background interval check periodically keeps meal states synchronized without requiring page reloads.
- **Mess Switcher**: Instant toggle between **Mess A** and **Mess B** (defaults to Mess B).
- **Horizontal Weekday Bar**: Scrollable weekday selector (`Sun` to `Sat`) that auto-highlights and scrolls to today.
- **Live Visit Counter**: Displays total site visits tracked in real time via Firestore.
- **Offline Fallback Architecture**: Built-in fallback menus and local caching so the app remains fully functional even when disconnected from the cloud.

### 2. Meal Ratings & Feedback Widget
- **In-App Modal Dialog**: Built using standard HTML5 `<dialog>` for accessibility and smooth interactions.
- **Smart Form Pre-Filling**: Automatically pre-fills the currently viewed Mess, Day, and upcoming Meal.
- **Interactive 5-Star Rating**: Allows students to rate meals with visual star states and descriptions (Poor to Excellent).
- **Feedback & Complaints**: Option to submit remarks regarding food quality, hygiene, quantity, or taste.
- **PhonePe-Style Confirmation**: Animated green checkmark confirmation screen upon successful feedback submission.
- **Pre-Aggregated Ratings**: Ratings are calculated and stored atomically in Firestore (`mealRatings`), updating meal scores without expensive table scans.

### 3. Administrative Feedback Portal (`feedback.html`)
- **Executive Dashboard**: Dedicated desktop-friendly management portal for mess wardens, managers, and student representatives.
- **Role-Based Access Control (RBAC)**:
  - **Administrator (`admin`)**: Comprehensive view across both Mess A and Mess B.
  - **Mess A Manager (`mess_a`)**: Filtered access focused exclusively on Mess A feedback.
  - **Mess B Manager (`mess_b`)**: Filtered access focused exclusively on Mess B feedback.
- **Advanced Filtering**: Filter feedback cards by Mess, Status (*All*, *New*, *Read*, *Implemented*), Day of the week, and Meal.
- **Lifecycle Management**: One-click status toggles to mark issues as read or resolved/implemented with Firestore sync and local fallback persistence.
- **Live Snapshot Updates**: Listens to Firestore real-time snapshots to display incoming student feedback instantly.

---

## Meal Schedules

| Meal | Monday – Friday | Saturday – Sunday |
| :--- | :--- | :--- |
| **Breakfast** | 7:30 AM – 9:00 AM | 7:30 AM – 9:30 AM |
| **Lunch** | 12:30 PM – 2:00 PM | 12:30 PM – 2:30 PM |
| **Snacks** | 5:00 PM – 6:00 PM | 5:00 PM – 6:00 PM |
| **Dinner** | 7:30 PM – 9:00 PM | 7:30 PM – 9:30 PM |

---

## Project Structure

```text
├── index.html                  # Public student portal with meal accordion & feedback modal
├── feedback.html               # Admin/Manager feedback portal with RBAC & status tracking
├── style.css                   # Mobile-first stylesheet (layout, dialog, animations)
├── database.js                 # Source of truth for menu data, schedules, and Firestore client API
├── script.js                   # Client-side UI logic, time detection, accordions, and rating forms
├── firebase-config.js          # Active Firebase credentials (excluded from git)
├── firebase-config.example.js  # Template configuration for Firebase setup
├── firebase.json               # Firebase Hosting and Firestore deployment rules
├── firestore.rules             # Production security rules for Firestore collections
├── firestore.indexes.json      # Firestore query index configurations
├── favicon.png                 # App icon
└── README.md                   # Documentation
```

---

## Firebase Configuration

This project integrates with Firebase for Cloud Firestore and Firebase Hosting.

### 1. Setup Firebase Credentials
1. Copy the example configuration:
   ```bash
   cp firebase-config.example.js firebase-config.js
   ```
2. Open `firebase-config.js` and insert your Firebase project credentials from the [Firebase Console](https://console.firebase.google.com/):
   ```javascript
   export const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

### 2. Firestore Data Collections
- `messMenu`: Stores daily menu records by day (`monday`, `tuesday`, etc.) with `A` and `B` sub-objects.
- `feedbacks`: Stores submitted student feedbacks (roll number, mess, day, meal, rating, comment, timestamps).
- `mealRatings`: Pre-aggregated rating sums and counts per day/mess/meal for instantaneous average calculations.
- `stats/visits`: Maintains a global visitor counter incremented atomically.
- `credentials`: Optional Firestore credentials collection for portal accounts with role configurations.

### 3. Deploying Firestore Rules & Hosting
Deploy security rules and hosting to Firebase using the Firebase CLI:
```bash
# Login to Firebase
firebase login

# Deploy rules and indexes
firebase deploy --only firestore

# Deploy the entire site to Firebase Hosting
firebase deploy --only hosting
```

---

## Portal Access & Default Credentials

The Feedback Portal (`feedback.html`) supports both Firestore-backed authentication and fallback offline accounts:

| Role | Username | Default Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **System Administrator** | `admin` | `admin123` | Both Mess A & Mess B |
| **Mess A Manager** | `mess_a` | `messa123` | Mess A Only |
| **Mess B Manager** | `mess_b` | `messb123` | Mess B Only |

> [!NOTE]
> Change the default passwords in your Firestore `credentials` collection for production deployment.

---

## Getting Started Locally

Because the project relies on vanilla web standards and ES modules, you can serve it with any local static HTTP server.

### Option 1: Local HTTP Server (XAMPP / Apache)
1. Place this project inside your web root:
   ```text
   E:\xampp\htdocs\mess
   ```
2. Start Apache via the **XAMPP Control Panel**.
3. Open your browser and navigate to:
   - Menu: `http://localhost/mess/`
   - Feedback Portal: `http://localhost/mess/feedback.html`

### Option 2: Python HTTP Server
```bash
# Navigate to the repository root
python -m http.server 8000
```
Then visit `http://localhost:8000`.

### Option 3: VS Code Live Server
Right-click on `index.html` or `feedback.html` and click **"Open with Live Server"**.

---

## Modifying Menu Data Locally

If Firestore is unavailable or when updating the fallback menu:
1. Open `database.js`.
2. Edit `window.messMenu[day][A | B]` arrays to update dishes for any meal.
3. Adjust `window.mealSchedule.weekday` or `window.mealSchedule.weekend` if the mess administration changes timings.

---

## License & Credits

Developed by **Ashwin** for the students and residents of **IIITDM Kurnool**. Open for campus contributions and enhancements.