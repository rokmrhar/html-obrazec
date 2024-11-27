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
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
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

document.getElementById("multiStepForm").onsubmit = function(event) {
    event.preventDefault();  

    alert("Oddali ste prijavnico! Najlepša hvala!");
};

function validateForm() {
    let isValid = true;
    const requiredFields = document.querySelectorAll("#multiStepForm [required]");

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add("invalid");
            alert(`Napaka: Prosimo, izpolnite polje: ${field.previousElementSibling.textContent.trim()}`);
            return false;
        } else {
            field.classList.remove("invalid");
        }

        if (field.type === "email" && !validateEmail(field.value)) {
            isValid = false;
            field.classList.add("invalid");
            alert(`Napaka: Neveljaven e-poštni naslov: ${field.value}. Preverite, da vsebuje @ in veljavno strukturo.`);
            return false;
        }
    });

    return isValid;
}

function validateStep(step) {
    let isValid = true;
    const stepFields = tabs[step].querySelectorAll("[required]");

    stepFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add("invalid");
            alert("Napaka: Prosimo, izpolnite vsa polja označena z *.");
            return false;
        } else {
            field.classList.remove("invalid");
        }
    });

    return isValid;
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
