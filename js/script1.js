let currentStep = 0;
const tabs = document.querySelectorAll(".tab");
const circles = document.querySelectorAll(".circle");
const progress = document.getElementById("progress");

function showStep(step) {
    tabs.forEach((tab, index) => {
        tab.style.display = index === step ? "block" : "none";
    });
    circles.forEach((circle, index) => {
        circle.classList.toggle("active", index <= step);
    });
    progress.style.width = `${(step / (circles.length - 1)) * 100}%`;
}

function nextStep() {
    if (validateStep(currentStep)) {
        currentStep++;
        if (currentStep >= tabs.length) {
            submitForm();
        } else {
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
    if (validateForm()) {
        submitForm();
    }
};

function validateStep(step) {
    let isValid = true;
    const stepFields = tabs[step].querySelectorAll("[required]");

    stepFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add("invalid");
            Swal.fire({
                title: "Napaka!",
                text: `Prosimo, izpolnite polje: ${field.previousElementSibling.textContent.trim()}`,
                icon: "error",
                confirmButtonText: "V redu"
            });
        } else {
            field.classList.remove("invalid");
        }

        if (field.type === "email" && !validateEmail(field.value)) {
            isValid = false;
            field.classList.add("invalid");
            Swal.fire({
                title: "Napaka!",
                text: `Neveljaven e-poštni naslov: ${field.value}. Preverite, da vsebuje @ in veljavno strukturo.`,
                icon: "error",
                confirmButtonText: "V redu"
            });
        }
    });

    return isValid;
}

function validateForm() {
    let isValid = true;
    const allFields = document.querySelectorAll("#multiStepForm [required]");

    allFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add("invalid");
            Swal.fire({
                title: "Napaka!",
                text: `Prosimo, izpolnite polje: ${field.previousElementSibling.textContent.trim()}`,
                icon: "error",
                confirmButtonText: "V redu"
            });
        } else {
            field.classList.remove("invalid");
        }

        if (field.type === "email" && !validateEmail(field.value)) {
            isValid = false;
            field.classList.add("invalid");
            Swal.fire({
                title: "Napaka!",
                text: `Neveljaven e-poštni naslov: ${field.value}. Preverite, da vsebuje @ in veljavno strukturo.`,
                icon: "error",
                confirmButtonText: "V redu"
            });
        }
    });

    return isValid;
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function submitForm() {
    Swal.fire({
        title: "Uspešno!",
        text: "Obrazec je bil uspešno poslan. Hvala za prijavo!",
        icon: "success",
        confirmButtonText: "Zapri"
    });
}
