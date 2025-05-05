import { PGlite } from 'https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js';

// Initialize the local PGlite database
const db = new PGlite('idb://patient-db');

// Setup BroadcastChannel for cross-tab communication
const channel = new BroadcastChannel('patient_channel');

// Initialize the patients table
async function initDatabase() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT,
      age INTEGER,
      gender TEXT,
      contact TEXT,
      medical_history TEXT
    );
  `);
}

// Function to register a new patient
async function registerPatient(patientData) {
  const { name, age, gender, contact, medicalHistory } = patientData;

  await db.query(
    'INSERT INTO patients (name, age, gender, contact, medical_history) VALUES ($1, $2, $3, $4, $5)',
    [name, parseInt(age), gender, contact, medicalHistory]
  );

  channel.postMessage('reload'); // Notify other tabs
  loadPatients(); // Load in this tab
}

// Function to load all patients into the table
async function loadPatients() {
  // Force a new connection to make sure data is re-read from IndexedDB
  const freshDb = new PGlite('idb://patient-db');
  const result = await freshDb.query('SELECT * FROM patients ORDER BY id DESC');

  const tbody = document.querySelector("#patientTable tbody");
  tbody.innerHTML = '';
  result.rows.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.age}</td>
      <td>${row.gender}</td>
      <td>${row.contact}</td>
      <td>${row.medical_history}</td>`;
    tbody.appendChild(tr);
  });
}


// Handle form submission
document.getElementById("registrationForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const patientData = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    contact: document.getElementById("contact").value,
    medicalHistory: document.getElementById("medicalHistory").value,
  };
  try {
    await registerPatient(patientData);
    e.target.reset();
    alert("Patient Registered!");
  } catch (err) {
    console.error("Error registering patient:", err);
    alert("Error occurred. See console for details.");
  }
});

// Listen for messages from other tabs
channel.onmessage = (event) => {
  if (event.data === 'reload') {
    loadPatients();

    // Optional: Toast message
    const msg = document.createElement('div');
    msg.innerText = "Patient records updated in another tab.";
    msg.className = "update-toast";
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }
};

// Initialize the database and load patients when page loads
initDatabase().then(loadPatients);
