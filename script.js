document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  let isMenuOpen = false;

  mobileMenuBtn.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "100%";
      navLinks.style.left = "0";
      navLinks.style.right = "0";
      navLinks.style.backgroundColor = "var(--color-white)";
      navLinks.style.padding = "1rem";
      navLinks.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    } else {
      navLinks.style.display = "";
      navLinks.style.flexDirection = "";
      navLinks.style.position = "";
      navLinks.style.top = "";
      navLinks.style.left = "";
      navLinks.style.right = "";
      navLinks.style.backgroundColor = "";
      navLinks.style.padding = "";
      navLinks.style.boxShadow = "";
    }
  });

  // Close mobile menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      isMenuOpen = false;
      navLinks.style.display = "";
      navLinks.style.flexDirection = "";
      navLinks.style.position = "";
      navLinks.style.top = "";
      navLinks.style.left = "";
      navLinks.style.right = "";
      navLinks.style.backgroundColor = "";
      navLinks.style.padding = "";
      navLinks.style.boxShadow = "";
    }
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  const navLogo = document.getElementById("nav-logo");
  const horizontalLogo = "src/LOGO-HORIZONTAL-PNG-A-COLOR.png";
  const soloLogo = "src/LOGO-SOLO-A-COLOR.png";

  const handleScroll = () => {
    const isScrolled = window.scrollY > 50;
    const currentLogo = navLogo.getAttribute("src");

    if (isScrolled) {
      navbar.classList.add("scrolled");
      if (currentLogo !== soloLogo) {
        navLogo.classList.add("hidden");
        setTimeout(() => {
          navLogo.setAttribute("src", soloLogo);
          navLogo.classList.remove("hidden");
        }, 400);
      }
    } else {
      navbar.classList.remove("scrolled");
      if (currentLogo !== horizontalLogo) {
        navLogo.classList.add("hidden");
        setTimeout(() => {
          navLogo.setAttribute("src", horizontalLogo);
          navLogo.classList.remove("hidden");
        }, 400);
      }
    }
  };

  window.addEventListener("scroll", handleScroll);

  // Scrolling cards functionality
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  document.querySelectorAll(".card[data-scroll]").forEach((card) => {
    observer.observe(card);
  });

  const handleSmoothScroll = () => {
    const scrollPosition = window.scrollY;
    document.querySelectorAll(".card[data-scroll]").forEach((card) => {
      const cardTop = card.offsetTop;
      const cardHeight = card.offsetHeight;
      const windowHeight = window.innerHeight;

      if (scrollPosition + windowHeight > cardTop) {
        const distance = (scrollPosition + windowHeight - cardTop) * 0.1;
        card.style.transform = `translateY(-${Math.min(
          distance,
          cardHeight * 0.2
        )}px)`;
      }
    });
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleSmoothScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");

  // Espera a que se cargue todo el contenido
  window.addEventListener("load", function () {
    // Muestra el loader por 3 segundos
    setTimeout(() => {
      // Agrega la clase para desvanecer el loader
      loader.classList.add("fade-out");
      // Muestra el contenido principal
      mainContent.style.display = "block";

      // Después de que termine la animación, elimina el loader
      setTimeout(() => {
        loader.style.display = "none";
      }, 500); // Este tiempo debe coincidir con la duración de la transición en CSS
    }, 200); // Ajusta este tiempo según lo que desees mostrar la animación
  });

  const heroImage = document.querySelector(".hero-image img");

  if (heroImage) {
    heroImage.classList.add("loaded");
  }

  // Selecciona las secciones que quieres animar
  const sections = [
    document.querySelector(".about-section"),
    document.querySelector(".creative-cards"),
    document.querySelector("#nosotros"),
    document.querySelector(".mission-container"),
  ];

  // Función para detectar cuando una sección está en el viewport
  function checkVisibility() {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        section.classList.add("visible"); // Añade la clase para activar el fade-in
      }
    });
  }

  // Llama la función al hacer scroll
  window.addEventListener("scroll", checkVisibility);

  // Llama la función al cargar la página por si alguna sección ya está visible
  document.addEventListener("DOMContentLoaded", checkVisibility);
});
