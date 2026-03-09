
document.addEventListener('DOMContentLoaded', function () {
  const applyBtn = document.getElementById('applyBtn');
  const modal = document.getElementById('applicationModal');
  const closeBtn = document.querySelector('.ab-modal-close');
  const form = document.getElementById('applicationForm');

  if (applyBtn && modal) {
    applyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', function (e) {
    if (e.target == modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Here you would typically collect form data and send it to a server
      // For now, we'll just show a success message
      alert('Application submitted successfully!');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      form.reset();
    });
  }
});

document.getElementById("applicationForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("jobId", document.getElementById("jobId").value);
  formData.append("fullName", document.getElementById("fullName").value);
  formData.append("email", document.getElementById("email").value);

  const fileInput = document.getElementById("resume");
  formData.append("CV", fileInput.files[0]);

  try {
    const response = await fetch(
      `${BASE_URL}/apply/698ed15f9f09fdcdce95477d`,
      {
        method: "POST",
        body: formData
      }
    );

    if (response.ok) {
      document.getElementById("applicationForm").style.display = "none";
      document.getElementById("successUI").style.display = "block";
    } else {
      alert("Submission Failed");
    }

  } catch (error) {
    alert("Server Error");
  }
});

function closeSuccess() {
  document.getElementById("successUI").style.display = "none";
  document.getElementById("applicationForm").style.display = "block";
  document.getElementById("applicationForm").reset();
  document.getElementById("applicationModal").style.display = "none";
  document.body.style.overflow = "auto";
}