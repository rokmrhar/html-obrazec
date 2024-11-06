let currentStep = 0;
const tabs = document.querySelectorAll(".tab");
const circles = document.querySelectorAll(".circle");
const progress = document.getElementById("progress");

function showStep(step) {
    tabs.forEach((tab, index) => {
        tab.classList.toggle("active", index === step);
    });
    circles.forEach((circle, index) => {
        circle.classList.toggle("active", index <= step);
    });

    progress.style.width = `${(step / (circles.length - 1)) * 100}%`;
}
function nextStep() {
    if (currentStep < tabs.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}
function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    showStep(currentStep);
});

document.getElementById("submit").addEventListener("click", () => {
    Swal.fire({
        title: "Oddali ste prijavo!",
        text: "Najlepša hvala!",
        icon: "success",
        confirmButtonText: "V redu"
    });
});