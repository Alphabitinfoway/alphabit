document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // ======== CAROUSEL ========
  let track = document.querySelector(".carousel");

  if (track) {
    function updatePositions() {
      let cards = document.querySelectorAll(".carousel .card");
      if (cards.length < 3) return;
      cards.forEach((c) => c.classList.remove("big"));
      cards[2].classList.add("big");
    }

    function slide() {
      track.appendChild(track.firstElementChild);
      updatePositions();
    }

    updatePositions();
    setInterval(slide, 2500);
  }

  // ======== PROCESS STEPS ========
  const steps = document.querySelectorAll(".step");

  if (steps.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            const step = entry.target;
            const card = step.querySelector(".process-card");
            const iconWrap = step.querySelector(".icon-wrapper");
            const icon = step.querySelector(".step-icon");

            setTimeout(() => {
              card.style.transition = "0.6s ease";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, idx * 600);

            setTimeout(() => {
              iconWrap.style.transition = "0.5s ease";
              iconWrap.style.opacity = "1";
            }, idx * 600 + 300);

            setTimeout(() => {
              icon.style.transition = "0.4s ease";
              icon.style.opacity = "1";
              icon.style.transform = "scale(1)";
            }, idx * 600 + 500);
          }
        });
      },
      { threshold: 0.2 }
    );

    steps.forEach((step) => observer.observe(step));
  }

  // ======== PRESENCE SLIDER ========
  if (window.innerWidth <= 768) {
    const container = document.querySelector(".Presence-container");
    const cards = Array.from(document.querySelectorAll(".Presence-card"));

    if (container && cards.length > 0) {
      cards.forEach((card) => {
        const clone = card.cloneNode(true);
        container.appendChild(clone);
      });

      let scrollPos = 0;
      let cardWidth = cards[0].offsetWidth - 50;

      function autoSlide() {
        scrollPos += cardWidth;

        if (scrollPos >= container.scrollWidth / 2) {
          scrollPos = 0;
          container.scrollTo({ left: 0 });
        }

        container.scrollTo({
          left: scrollPos,
          behavior: "smooth",
        });
      }

      setInterval(autoSlide, 2500);
    }
  }

  // ======== COUNTING ========
  const counters = document.querySelectorAll(".counting-number");
  const section = document.querySelector(".counting-section");
  let started = false;

  function startCounting() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const suffix = counter.getAttribute("data-suffix") || "";
      let current = 0;
      const speed = target / 200;

      const updateCount = () => {
        if (current < target) {
          current += speed;
          counter.innerText = Math.floor(current) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + suffix;
        }
      };

      updateCount();
    });
  }

  if (section) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            startCounting();
            started = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
  }

  // ======== EXPLORE BUTTON ========
  const button = document.querySelector(".explore-btn");
  const item = document.querySelector(".explore-btn .round");

  if (button && item) {
    button.addEventListener("mouseenter", function (event) {
      this.classList.add("animate");
      item.style.top = event.offsetY + "px";
      item.style.left = event.offsetX + "px";
      item.style.width = "1px";
      item.style.height = "1px";
    });

    button.addEventListener("mouseleave", function (event) {
      this.classList.remove("animate");
      item.style.top = event.offsetY + "px";
      item.style.left = event.offsetX + "px";
    });
  }

  // ======== SOLUTION SECTION ========
  const solCards = document.querySelectorAll(
    ".card1, .card2, .card3, .card4, .card5"
  );
  const solSection = document.querySelector(".solutions-section");

  if (solSection && solCards.length > 0) {
    const observerSolution = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            solCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("active");
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    observerSolution.observe(solSection);
  }

  // ======== FOOTER SECTION ========
  const footer = document.querySelector(".Footer");

  if (footer) {
    const observerFooter = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) footer.classList.add("active");
        });
      },
      { threshold: 0.3 }
    );

    observerFooter.observe(footer);
  }
});

// our history

const items = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

items.forEach((item) => observer.observe(item));

// counting numbers FOR ABOUT PAGE

const counters = document.querySelectorAll(".counting");
const section = document.querySelector(".aboutpage-container2");
let started = false;

function startCounting() {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const suffix = counter.getAttribute("data-suffix") || "";
    let current = 0;
    const speed = target / 200;

    const updateCount = () => {
      if (current < target) {
        current += speed;
        counter.innerText = Math.floor(current) + suffix;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + suffix;
      }
    };

    updateCount();
  });
}

if (section) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          startCounting();
          started = true;
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(section);
}



// service page  section -3

const timelineOptions = {
  root: null,
  threshold: 0.25,
  rootMargin: "0px 0px -80px 0px"
};

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${index * 0.15}s`;
      entry.target.classList.add("visible");
      timelineObserver.unobserve(entry.target);
    }
  });
}, timelineOptions);

document.querySelectorAll(".brand-timeline .timeline-step")
  .forEach(step => timelineObserver.observe(step));




// Tech page counter :

/* ===== COUNTER ANIMATION SCRIPT ===== */
const statNumbers = document.querySelectorAll('.stat-number');
const animationLimit = 200;

statNumbers.forEach(statEl => {
  const animateStat = () => {
    const finalValue = Number(statEl.dataset.target);
    const currentValue = Number(statEl.innerText);
    const stepValue = Math.ceil(finalValue / animationLimit);

    if (currentValue < finalValue) {
      statEl.innerText = currentValue + stepValue;
      setTimeout(animateStat, 20);
    } else {
      statEl.innerText = finalValue;
    }
  };

  animateStat();
});



const toggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

toggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

/* Dropdown click for mobile */
document.querySelectorAll(".dropdown-toggle").forEach(item => {
  item.addEventListener("click", function (e) {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      this.parentElement.classList.toggle("active");
    }
  });
});





document.addEventListener('DOMContentLoaded', () => {

  const API_URL = "https://alphabit-web-1.onrender.com/users/getBlogs";

  const blogContainer = document.getElementById('blog-feed-container');
  const primaryCard = document.querySelector('.primary-article');
  const auxCards = document.querySelectorAll('.aux-card');

  async function fetchBlogPosts() {
    try {

      const response = await fetch(API_URL);
      const posts = await response.json();

      if (!posts || posts.length === 0) return;

      // Latest first (assuming latest = last created)
      const sortedPosts = posts.reverse();

      renderTopCards(sortedPosts);
      renderFeedGrid(sortedPosts.slice(3));

    } catch (err) {
      console.error("Fetch error:", err);
    }
  }


  // ==========================
  // TOP 3 CARDS
  // ==========================
  function renderTopCards(posts) {

    const latest = posts[0];
    const second = posts[1];
    const third = posts[2];

    //  MAIN CARD
    if (latest && primaryCard) {

      primaryCard.style.backgroundImage =
        `url(${latest.image || 'https://picsum.photos/800/600'})`;

      primaryCard.style.backgroundSize = "cover";
      primaryCard.style.backgroundPosition = "center";

      primaryCard.innerHTML = `
        <div class="primary-info">
          <div>
            <h3 class="primary-title">${latest.title}</h3>
            <p class="primary-label">Featured Post</p>
            <span class="primary-date">${new Date(latest.createdAt).toDateString()}</span>
          </div>
          <a href="blogdetails.shtml?id=${latest._id}" class="primary-arrow">↗</a>
        </div>
      `;
    }

    //SIDE CARDS
    [second, third].forEach((post, index) => {

      if (post && auxCards[index]) {

        auxCards[index].style.backgroundImage =
          `url(${post.image || 'https://picsum.photos/400/300'})`;

        auxCards[index].style.backgroundSize = "cover";
        auxCards[index].style.backgroundPosition = "center";

        auxCards[index].innerHTML = `
          <a href="blogdetails.shtml?id=${post._id}" style="display:block;width:100%;height:100%;"></a>
        `;
      }

    });
  }


  // ==========================
  //  GRID BLOGS
  // ==========================
  function renderFeedGrid(posts) {

    posts.forEach(post => {

      const imageUrl = post.image
        ? post.image
        : `https://picsum.photos/seed/${post._id}/400/300`;

      const article = document.createElement("article");
      article.className = "feed-card";

      article.innerHTML = `
        <div class="feed-thumb">
          <img src="${imageUrl}" alt="${post.title}">
        </div>

        <div class="feed-card-footer">
          <p>${post.title}</p>
          <a href="blogdetails.shtml?id=${post._id}" class="feed-arrow">↗</a>
        </div>
      `;

      blogContainer.appendChild(article);
    });

  }

  fetchBlogPosts();

});


// const form = document.getElementById("contactForm");

// form.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   let isValid = true;

//   document.querySelectorAll(".error-text").forEach(el => el.remove());
//   document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

//   const inputs = form.querySelectorAll("input, textarea");

//   inputs.forEach(input => {
//     const value = input.value.trim();

//     if (!value) {
//       showError(input, "This field is required");
//       isValid = false;
//       return;
//     }

//     if (input.name === "email") {
//       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//       if (!emailPattern.test(value)) {
//         showError(input, "Enter valid email");
//         isValid = false;
//       }
//     }

//     if (input.name === "phone") {
//       const phonePattern = /^[+]?[\d\s]{10,15}$/;
//       if (!phonePattern.test(value)) {
//         showError(input, "Enter valid phone number");
//         isValid = false;
//       }
//     }

//     if (input.name === "message" && value.length < 10) {
//       showError(input, "Message must be at least 10 characters");
//       isValid = false;
//     }
//   });

//   if (!isValid) return;

//   const submitBtn = form.querySelector("button");
//   submitBtn.disabled = true;
//   submitBtn.innerText = "Sending...";

//   const data = {
//     firstName: form.firstName.value.trim(),
//     lastName: form.lastName.value.trim(),
//     phoneNumber: form.phone.value.trim(), 
//     email: form.email.value.trim(),
//     subject: form.subject.value.trim(),
//     message: form.message.value.trim(),
//   };

//  try {
//   const response = await fetch("https://alphabit-web-1.onrender.com/users/contactUS", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to send message");
//   }

//   // Always show fixed success message
//   alert("Message sent successfully!");
//   form.reset();

// } catch (error) {
//   alert("Something went wrong!");
// }

// });

// function showError(input, message) {
//   input.classList.add("input-error");

//   const error = document.createElement("div");
//   error.className = "error-text";
//   error.innerText = message;

//   input.parentNode.insertBefore(error, input.nextSibling);
// }

//************************************** */ homepage blog section*************************/


document.addEventListener("DOMContentLoaded", () => {

  const blogContainer = document.getElementById("blog-container");

  if (!blogContainer) {
    console.error("Blog container not found!");
    return;
  }

  const API_URL = "https://alphabit-web-1.onrender.com/users/getBlogs";
  async function fetchBlogs() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const posts = await response.json();

      // Pehle sort karo (latest first)
      const sortedPosts = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Fir sirf 3 latest lo
      renderBlogs(sortedPosts.slice(0, 3));


    } catch (error) {
      console.error("Error fetching blogs:", error);
      blogContainer.innerHTML =
        '<p class="error-message">Failed to load blog posts.</p>';
    }
  }


  function renderBlogs(posts) {

    blogContainer.innerHTML = "";

    posts.forEach(post => {

      const imageUrl = post.image
        ? post.image
        : `https://picsum.photos/seed/${post._id}/400/300`;

      const blogCard = document.createElement("div");
      blogCard.className = "blog-card";

      blogCard.innerHTML = `
        <h3 class="blog-title">
          ${post.title}
        </h3>

     <div class="blog-image" 
     style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;">
</div>
</div>


        <p class="blog-desc">
          ${post.description ? post.description.substring(0, 100) + "..." : ""}
        </p>

        <div class="blog-author">
          <h4>${post.author || "Admin"}</h4>
          <span>${new Date(post.createdAt).toDateString()} - STORY</span>
        </div>
      `;

      blogCard.addEventListener("click", () => {
        window.location.href = `blogdetails.shtml?id=${post._id}`;
      });

      blogContainer.appendChild(blogCard);
    });
  }

  fetchBlogs();
});


