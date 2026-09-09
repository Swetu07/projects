/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   1. CERTIFICATE LIGHTBOX
========================================================= */

// Get all certificate images
const certificateImages = document.querySelectorAll(".certificate-image");


// Create the lightbox dynamically
const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
    <div class="lightbox-content">

        <button class="lightbox-close" aria-label="Close certificate">
            &times;
        </button>

        <img class="lightbox-image" src="" alt="Certificate">

    </div>
`;

document.body.appendChild(lightbox);


// Get elements inside lightbox
const lightboxImage = lightbox.querySelector(".lightbox-image");
const closeButton = lightbox.querySelector(".lightbox-close");


// Open certificate
certificateImages.forEach((certificate) => {

    certificate.addEventListener("click", function (event) {

        event.preventDefault();

        const image = certificate.querySelector("img");

        if (!image) {
            return;
        }

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");

        // Prevent page scrolling
        document.body.style.overflow = "hidden";
    });

});


// Close lightbox using button
closeButton.addEventListener("click", closeLightbox);


// Close when clicking outside certificate
lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// Close using Escape key
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeLightbox();
    }

});


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   2. ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("main section");
const navigationLinks = document.querySelectorAll("nav ul a");


// Detect which section is currently visible
window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    // Update navigation
    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


/* =========================================================
   3. CURRENT YEAR IN FOOTER
========================================================= */

const footerText = document.querySelector("footer p");

if (footerText) {

    const currentYear = new Date().getFullYear();

    footerText.innerHTML =
        `© ${currentYear} Swetank Kumar. Built with HTML, CSS & JavaScript.`;

}


/* =========================================================
   4. SCROLL REVEAL ANIMATION
========================================================= */

// Elements that will appear while scrolling
const revealElements = document.querySelectorAll(
    "section, .certificate-card, #skills article, #projects article, #education article"
);


// Add initial class
revealElements.forEach((element) => {
    element.classList.add("reveal");
});


// Intersection Observer
const observer = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


// Start observing
revealElements.forEach((element) => {
    observer.observe(element);
});