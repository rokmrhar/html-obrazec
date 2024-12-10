let currentStep = 0;
const tabs = document.querySelectorAll(".tab");
const circles = document.querySelectorAll(".circle");
const progress = document.getElementById("progress");

function showStep(step) {
    tabs.forEach((tab, index) => {
        tab.style.display = index === step ? "block" : "none"; // Uporaba style.display za prikazovanje trenutnega koraka
    });
    circles.forEach((circle, index) => {
        circle.classList.toggle("active", index <= step);
    });

    progress.style.width = `${(step / (circles.length - 1)) * 100}%`;

    const submitButton = document.querySelector("#multiStepForm button[type='submit']");
    if (currentStep === tabs.length - 1) {
        submitButton.textContent = "Pošlji"; // Na zadnjem koraku gumb postane "Pošlji"
    } else {
        submitButton.textContent = "Naprej"; // Na ostalih korakih ostane "Naprej"
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showStep(currentStep); // Prikažemo prvi korak
});

document.getElementById("multiStepForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Preprečimo privzeto obnašanje obrazca

    if (validateStep(currentStep)) {
        if (currentStep < tabs.length - 1) {
            currentStep++;
            showStep(currentStep); // Premik na naslednji korak
        } else {
            Swal.fire({
                title: "Oddali ste prijavnico!",
                text: "Najlepša hvala!",
                icon: "success",
                confirmButtonText: "Zapri obvestilo"
            });
            this.reset(); // Ponastavitev obrazca
            currentStep = 0; // Vrni na prvi korak
            showStep(currentStep);
        }
    }
});

function validateStep(step) {
    let isValid = true;
    const stepFields = tabs[step].querySelectorAll("[required]"); // Preverimo samo polja trenutnega koraka

    stepFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add("invalid");
            Swal.fire({
                title: "Napaka!",
                text: `Prosimo, izpolnite polje: ${getLabelText(field)}`,
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
                text: `Neveljaven e-poštni naslov: ${field.value}`,
                icon: "error",
                confirmButtonText: "V redu"
            });
        }
    });

    return isValid;
}

function getLabelText(field) {
    const label = field.closest("div").querySelector("label");
    return label ? label.textContent.trim() : "neznano polje";
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
