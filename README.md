# Patient Registration App

A simple, frontend-only patient registration application that uses **PGlite** for data storage. This app allows users to register new patients, query patient records using SQL, and persist data across page refreshes with support for multiple browser tabs.

## Features

- Register new patients.
- Query patient records using SQL.
- Data persists across page refreshes.
- Real-time multi-tab support using **IndexedDB** and `BroadcastChannel`.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Database**: **PGlite** (in-memory or IndexedDB for persistence)

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/patient-registration-app.git
   ```

2. **Install Dependencies** (optional):

   PGlite is loaded via CDN in `app.js`, so no installation is necessary. However, if you want to use additional tools or bundlers:

   ```bash
   npm install
   ```

3. **Open `index.html`**:

   Simply open the `index.html` file in your browser.

## File Structure

```
patient-registration-app/
├── index.html   # Main HTML file
├── style.css    # Styling for the app
├── app.js       # JavaScript logic for the app (handles PGlite database and form interactions)
```

## Code Explanation

### `index.html`
This file contains the structure of the patient registration form and the table where patient records are displayed. It links to the `app.js` script and `style.css` for styling.

### `style.css`
Contains basic styles for the app, including form layout and table appearance.

### `app.js`
This script handles the main functionality of the app:
- **Database Initialization**: Initializes the **PGlite** database and creates the `patients` table if it doesn't exist.
- **Patient Registration**: Handles form submission, stores new patient data in the database, and updates the records table.
- **Loading Patients**: Retrieves all stored patient records and displays them in the table.
- **Multi-Tab Sync**: Uses `BroadcastChannel` to sync updates across multiple open tabs.

## Usage Instructions

1. **Register a Patient**:
   - Fill in the form with the patient's name, age, gender, contact details, and medical history.
   - Click "Register" to save the patient in the database.
   - The new patient will appear in the patient records table below the form.

2. **View Patient Records**:
   - The table displays all the registered patients with their details (name, age, gender, contact, and medical history).

3. **Data Persistence**:
   - Data is saved in **IndexedDB** using **PGlite**. This ensures data is preserved across browser refreshes and sessions.
   - Data is accessible from multiple browser tabs.

---

## 🔄 Multi-Tab Data Sync

As of the latest update, the app supports **real-time updates across multiple open browser tabs**.

### How It Works:
- The app uses the **BroadcastChannel API** to send a `"reload"` message to all other tabs when a new patient is registered.
- On receiving this message, each tab:
  - Establishes a fresh `PGlite` connection to ensure it pulls the latest data from IndexedDB.
  - Calls `loadPatients()` to refresh the patient table.
  - Optionally displays a toast notification like “Patient records updated in another tab.”

### Why This Matters:
- It prevents stale data across tabs.
- Offers a smoother, real-time user experience without manual refresh.

---

## Challenges Faced

- **IndexedDB Integration**: Initially, ensuring persistent storage with PGlite required using the correct connection string: `idb://patient-db`.

- **Handling Multi-Tab Persistence**: PGlite caches connections, so we updated the logic to create a **new PGlite instance each time data is loaded**. This ensures data consistency across tabs.

- **Real-Time Sync Across Tabs**: Implemented the `BroadcastChannel` API to notify and refresh all tabs when data changes. This was key to making the app responsive in multi-tab environments.

---
