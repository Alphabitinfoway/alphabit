const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  clearMessage();

  const submitBtn = form.querySelector("button");
  submitBtn.disabled = true;
  submitBtn.innerText = "Sending...";

  const data = {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    phoneNumber: form.phone.value.trim(),
    email: form.email.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim()
  };

  try {
    const response = await fetch("https://alphabit-web-1.onrender.com/users/contactUS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    showMessage("Message sent successfully!", "success");
    form.reset();

  } catch (error) {
    showMessage("Failed to send message. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "Contact Us";
  }
});

function showMessage(message, type) {
  clearMessage();

  const div = document.createElement("div");
  div.className = `form-message ${type}`;
  div.innerText = message;

  form.appendChild(div);

  setTimeout(() => div.remove(), 4000);
}

function clearMessage() {
  document.querySelectorAll(".form-message").forEach(el => el.remove());
}
