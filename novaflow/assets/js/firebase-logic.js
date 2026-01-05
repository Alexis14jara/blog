// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKNNldmWRDej0_m2Lonup4SUPjOqKhsh8",
  authDomain: "novaflow-backend-a84e3.firebaseapp.com",
  projectId: "novaflow-backend-a84e3",
  storageBucket: "novaflow-backend-a84e3.firebasestorage.app",
  messagingSenderId: "531939082742",
  appId: "1:531939082742:web:8d30bedc41f58eca27c7d7",
};

// Initialize Firebase (Compat)
// Ensure firebase is available globally from the script tag in HTML
if (typeof firebase !== "undefined") {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // Export db if needed, or just use it locally
  window.db = db;

  console.log("Firebase Initialized");
} else {
  console.error("Firebase SDK not loaded");
}

// Function to increment download counter
function incrementarDescarga() {
  if (!window.db) {
    console.error("Database not initialized");
    return;
  }

  const ref = window.db.collection("stats").doc("novaflow");

  return ref
    .update({
      downloads: firebase.firestore.FieldValue.increment(1),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log("Download counter incremented");
    })
    .catch((error) => {
      console.error("Error incrementing download counter: ", error);
    });
}

// Attach to window so it can be called from onclick if needed,
// though we prefer event listeners.
window.incrementarDescarga = incrementarDescarga;

// Auto-attach to elements with class 'download-tracking' or specific IDs when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const downloadButtons = document.querySelectorAll(
    '.btn-download-tracking, [data-track-download="true"]'
  );

  downloadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      incrementarDescarga();
    });
  });
});
