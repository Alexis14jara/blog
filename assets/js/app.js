document.addEventListener("DOMContentLoaded", () => {
  // --- 1. MENÚ MÓVIL (Lógica Robusta) ---
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const header = document.getElementById("main-header");

  function toggleMenu() {
    const isActive = hamburgerBtn.classList.contains("active");

    if (!isActive) {
      // Abrir menú
      hamburgerBtn.classList.add("active");
      mobileMenu.classList.add("active");
      document.body.style.overflow = "hidden"; // Bloquear scroll
    } else {
      // Cerrar menú
      hamburgerBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto"; // Reactivar scroll
    }
  }

  hamburgerBtn.addEventListener("click", toggleMenu);

  // Cerrar menú al hacer clic en un enlace
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburgerBtn.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // --- 2. EFECTO HEADER GLASS AL SCROLLEAR ---
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- 3. ANIMACIONES AL SCROLLEAR (Intersection Observer) ---
  // Selecciona todos los elementos con clases de animación
  const animatedElements = document.querySelectorAll(
    ".fade-in, .reveal-up, .reveal-left, .reveal-right"
  );

  const observerOptions = {
    root: null,
    threshold: 0.15, // Se activa cuando el 15% del elemento es visible
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active-reveal");
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));

  // --- 4. EFECTO PARALLAX SIMPLE PARA LA IMAGEN (Opcional) ---
  const aboutImg = document.querySelector(".image-frame");
  if (aboutImg) {
    window.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth - e.pageX * 2) / 100;
      const y = (window.innerHeight - e.pageY * 2) / 100;
      aboutImg.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  }

  // --- 5. LÓGICA DE FORMULARIO DE CONTACTO ---
  const contactForm = document.querySelector(".contact-form");
  const iframe = document.getElementById("hiddenFrame");
  const successMessage = document.getElementById("success-message");
  const newMessageBtn = document.getElementById("new-message-btn");
  let isSubmitting = false;

  if (contactForm && iframe && successMessage) {
    contactForm.addEventListener("submit", () => {
      isSubmitting = true;
      const submitBtn = contactForm.querySelector(".submit-btn");
      if (submitBtn) {
        submitBtn.textContent = "Enviando...";
        submitBtn.style.opacity = "0.7";
        submitBtn.style.pointerEvents = "none";
      }
    });

    iframe.addEventListener("load", () => {
      if (isSubmitting) {
        // Ocultar formulario y mostrar mensaje de éxito
        contactForm.style.display = "none";
        successMessage.style.display = "block";

        // Limpiar formulario
        contactForm.reset();

        // Resetear estado del botón submit
        const submitBtn = contactForm.querySelector(".submit-btn");
        if (submitBtn) {
          submitBtn.textContent = "Enviar Mensaje";
          submitBtn.style.opacity = "1";
          submitBtn.style.pointerEvents = "auto";
        }

        isSubmitting = false;
      }
    });

    // Botón para enviar otro mensaje
    if (newMessageBtn) {
      newMessageBtn.addEventListener("click", () => {
        successMessage.style.display = "none";
        contactForm.style.display = "block"; // O 'grid' si fuera grid, pero form es block por defecto
        // Animación de entrada suave para el form
        contactForm.style.animation = "fadeIn 0.5s ease-out";
      });
    }
  }
});
