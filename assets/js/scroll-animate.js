document.addEventListener("DOMContentLoaded", () => {
    // Select elements to animate
    // We target headings, paragraphs, images, buttons, and specific card classes
    const elementsToAnimate = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, .btn, img, .card, .blog-card, .service-item, .icon-box, .timeline-item, .process-card, .expertise-card, .target-industries-section .icon, .showcase-card, .bento-item, .offerings-header, .template-hero, .scroll-animate"
    );

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add the visible class when the element enters the viewport
                entry.target.classList.add("scroll-visible");

                // Optional: Stop observing once visualized to avoid re-triggering
                observer.unobserve(entry.target);
            }
        });
    };

    // Options for the observer (fire when 10% of item is visible)
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver(callback, options);

    elementsToAnimate.forEach((el) => {
        // Add the base class for initial state
        el.classList.add("scroll-animate");
        // Start observing
        observer.observe(el);
    });
});
