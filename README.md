
# Patient Registration App

A simple, frontend-only patient registration application that uses **PGlite** for data storage. This app allows users to register new patients, query patient records using SQL, and persist data across page refreshes with support for multiple browser tabs.

## Features

- Register new patients.
- Query patient records using SQL.
- Data persists across page refreshes.
- Multi-tab support using **IndexedDB** for persistence.
  
## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Database**: **PGlite** (in-memory or IndexedDB for persistence)

## Setup Instructions

1. **Clone the repository** (or download the files):
   
   ```bash
   git clone https://github.com/your-username/patient-registration-app.git
   ```

2. **Install Dependencies** (if required, but PGlite is already loaded from the CDN in `app.js`):
   
   If you need to install any other dependencies (e.g., bundler like Webpack), you can do so by running:
   
   ```bash
   npm install
   ```

3. **Open `index.html`**:
   
   Open the `index.html` file in your browser. This will load the app and allow you to register new patients and view existing records.

4. **Features**:
   - Register new patients by filling out the form.
   - Patient records are displayed in a table.
   - Data persists even after page refresh, and you can access it from multiple tabs in the browser.

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

## Usage Instructions

1. **Register a Patient**: 
   - Fill in the form with the patient's name, age, gender, contact details, and medical history.
   - Click "Register" to save the patient in the database.
   - The new patient will appear in the patient records table below the form.

2. **View Patient Records**:
   - The table displays all the registered patients with their details (name, age, gender, contact, and medical history).

3. **Data Persistence**:
   - Data is saved in **IndexedDB** (persistent storage) using **PGlite**. This means the data is available even after page refreshes.
   - Data can also be accessed across multiple browser tabs.

## Challenges Faced

- **IndexedDB Integration**: Getting PGlite to work with IndexedDB for persistence across page refreshes was tricky at first. However, by using the correct connection string `idb://patient-db`, the app successfully persists data even after a browser restart or page refresh.
  
- **Handling Multi-tab Persistence**: Ensuring the app worked across multiple tabs required understanding how PGlite uses IndexedDB and making sure all tabs read and write from the same storage. Using the same database connection string (`idb://patient-db`) across tabs solved this.


