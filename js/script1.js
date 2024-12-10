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

    const submitButton = document.querySelector("#multiStepForm button[type='submit']");
    if (currentStep === tabs.length - 1) {
        submitButton.textContent = "Pošlji";
    } else {
        submitButton.textContent = "Naprej";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showStep(currentStep);
});

document.getElementById("multiStepForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (validateStep(currentStep)) {
        if (currentStep < tabs.length - 1) {
            currentStep++;
            showStep(currentStep);
        } else {
            Swal.fire({
                title: "Oddali ste prijavnico!",
                text: "Najlepša hvala!",
                icon: "success",
                confirmButtonText: "Zapri obvestilo"
            });
            this.reset(); // Po želji ponastavite obrazec
            currentStep = 0; // Vrne na prvi korak
            showStep(currentStep);
        }
    }
});

function validateStep(step) {
    let isValid = true;
    const stepFields = tabs[step].querySelectorAll("[required]");

    stepFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add("invalid");
            Swal.fire({
                title: "Napaka!",
                text: `Prosimo, izpolnite vsa obvezna polja.`,
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
                text: `Neveljaven e-poštni naslov: ${field.value}.`,
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
