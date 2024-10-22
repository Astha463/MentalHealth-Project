document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const trackingForm = document.getElementById("tracking-form");
    const journalingForm = document.getElementById("journaling-form");
    const notesContainer = document.getElementById("notes-container");
    const tipsContainer = document.getElementById("tips-container");
    const entriesContainer = document.getElementById("saved-entries");
    const navbar = document.querySelector('.navbar');
    const logoutBtn = document.getElementById("logout-btn"); // Add reference to logout button

    // Check login status on page load
    updateNavbarVisibility();

    // Login form submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

         const isValidLogin = username === "moodmentor" && password === "moodmentor";
         if (isValidLogin) {
             localStorage.setItem('authToken', 'yourAuthToken'); // Store token
             window.location.href = "home.html"; // Redirect after login
        } else {
          alert("Invalid credentials. Please try again.");
       }
     });
   ;

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem('authToken'); // Remove token
            updateNavbarVisibility(); // Update navbar visibility
            window.location.href = "index.html"; // Redirect to login page
        });
    }

    function updateNavbarVisibility() {
        const isLoggedIn = localStorage.getItem('authToken') !== null;
        const isLoginPage = window.location.pathname.endsWith("index.html"); // Check if on login page

        if (navbar) {
            // Show or hide navbar based on login status and if on login page
            navbar.style.display = isLoggedIn && !isLoginPage ? 'block' : 'none';
        }
    }

    // Tracking form submission
    if (trackingForm && notesContainer && tipsContainer) {
        trackingForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const date = document.getElementById("date").value;
            const mood = document.getElementById("mood").value;
            displayNotesandTips(mood);
        });
    }

    // Journaling form submission
    if (journalingForm) {
        journalingForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const journalDate = document.getElementById("journal-date").value;
            const journalEntry = document.getElementById("journal-entry").value;
            saveJournalEntry(journalDate, journalEntry);
            displaySavedEntries(); // Update display of saved entries
        });
    }

    function displayNotesandTips(selectedMood) {
        const moodNotes = "Your custom notes for this mood...";
        const moodTips = {
            happy: "Tips for a happy mood...",
            sad: "Tips for a sad mood...",
            relaxed: "Tips for a relaxed mood...",
        };
        notesContainer.textContent = "Notes: " + moodNotes;
        tipsContainer.textContent = "Tips: " + (moodTips[selectedMood] || "No tips available for this mood.");
    }

    function saveJournalEntry(date, entry) {
        const existingEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        existingEntries.push({ date, entry });
        localStorage.setItem("journalEntries", JSON.stringify(existingEntries));
    }

    function displaySavedEntries() {
        const existingEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        if (entriesContainer) {
            entriesContainer.innerHTML = "<h2>Saved Journal Entries</h2>";
            existingEntries.forEach((entry, index) => {
                entriesContainer.innerHTML += `<p>${index + 1}. Date: ${entry.date}, Entry: ${entry.entry}</p>`;
            });
        }
    }
    
    });

