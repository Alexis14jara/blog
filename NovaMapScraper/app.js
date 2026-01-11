document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-links a");

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburgerBtn.classList.toggle("active");

            // Toggle body scroll to prevent background scrolling when menu is open
            if (navLinks.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });

        // Close menu when clicking a link
        navLinksItems.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                hamburgerBtn.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
    }

    // Lightbox Logic
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");

    // Select all images intended for lightbox
    const images = document.querySelectorAll(
        ".gallery-item img, .detail-image img"
    );

    images.forEach((img) => {
        img.addEventListener("click", () => {
            if (window.innerWidth > 768) {
                // Optional: Check if we want this on mobile? Yes, usually.
                lightbox.style.display = "flex";
                lightbox.style.alignItems = "center";
                lightbox.style.justifyContent = "center";
                lightboxImg.src = img.src;
                document.body.style.overflow = "hidden"; // Prevent scrolling
            } else {
                // Mobile behavior: Also open lightbox
                lightbox.style.display = "flex";
                lightbox.style.alignItems = "center";
                lightbox.style.justifyContent = "center";
                lightboxImg.src = img.src;
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Close logic
    const closeLightbox = () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "";
    };

    if (closeBtn) {
        closeBtn.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
