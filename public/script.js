
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        formStatus.textContent = result.message;

        if (response.ok) {
            contactForm.reset();
        }
    } catch (error) {
        formStatus.textContent =
            "Something went wrong. Please try again.";
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }
});
