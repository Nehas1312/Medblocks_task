import { PGlite } from 'https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js';

const db = new PGlite('idb://patient-db');

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

async function registerPatient(patientData) {
  const { name, age, gender, contact, medicalHistory } = patientData;

  await db.query(
    'INSERT INTO patients (name, age, gender, contact, medical_history) VALUES ($1, $2, $3, $4, $5)',
    [name, parseInt(age), gender, contact, medicalHistory]
  );
  loadPatients();
}

async function loadPatients() {
  const result = await db.query('SELECT * FROM patients ORDER BY id DESC');
  const tbody = document.querySelector("#patientTable tbody");
  tbody.innerHTML = '';
  result.rows.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.name}</td><td>${row.age}</td><td>${row.gender}</td><td>${row.contact}</td><td>${row.medical_history}</td>`;
    tbody.appendChild(tr);
  });
}

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

initDatabase().then(loadPatients);
