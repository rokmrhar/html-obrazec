let currentStep = 0;
const tabs = document.querySelectorAll(".tab");
const circles = document.querySelectorAll(".circle");
const progress = document.getElementById("progress");

// Function to show the current step and update the progress bar
function showStep(step) {
    // Show or hide tabs based on the current step
    tabs.forEach((tab, index) => {
        tab.classList.toggle("active", index === step);
    });

    // Update circle activation based on current step
    circles.forEach((circle, index) => {
        circle.classList.toggle("active", index <= step);
    });

    // Update the progress bar width (percentage based on step)
    progress.style.width = `${(step / (circles.length - 1)) * 100}%`;
}

// Function to go to the next step
function nextStep() {
    if (currentStep < tabs.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

// Function to go to the previous step
function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

// Initialize the first step on page load
document.addEventListener("DOMContentLoaded", () => {
    showStep(currentStep);
});
