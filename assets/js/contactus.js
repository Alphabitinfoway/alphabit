let autoCloseTimeout;

// Handle Form Submission with event delegation
document.addEventListener("submit", function (e) {
  if (e.target && e.target.id === "contactForm") {
    handleFormSubmit(e);
  }
});

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;

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
    const response = await fetch(`${BASE_URL}/users/contactUS`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    // Reset Form & Show Premium Modal
    form.reset();
    openThankYouModal();

  } catch (error) {
    showMessage(form, "Failed to send message. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "Contact Us";
  }
}

function openThankYouModal() {
  const modal = document.getElementById("thankYouModal");
  if (!modal) return;
  modal.classList.add("active");
  
  // Auto close after 5 seconds (matching progress bar animation)
  clearTimeout(autoCloseTimeout);
  autoCloseTimeout = setTimeout(closeThankYouModal, 5000);
}

function closeThankYouModal() {
  const modal = document.getElementById("thankYouModal");
  if (!modal) return;
  modal.classList.remove("active");
  clearTimeout(autoCloseTimeout);
}

// Global Event Listeners for closing the modal
document.addEventListener("click", function (e) {
  const modal = document.getElementById("thankYouModal");
  if (!modal) return;

  // Click close button or "Awesome" button
  if (e.target.closest("#closeModal") || e.target.closest("#modalPrimaryBtn")) {
    closeThankYouModal();
  }
  
  // Click outside on the dark overlay background
  if (e.target === modal) {
    closeThankYouModal();
  }
});

function showMessage(form, message, type) {
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
