document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  const header = document.getElementById("main-header");
  const logo = document.getElementById("main-logo");

  const defaultLogo = "src/LOGO-HORIZONTAL-PNG-A-COLOR.png";
  const scrolledLogo = "src/LOGO-SOLO-A-COLOR.png"; // Reemplaza con la ruta de tu logo sin palabras

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scroll");
      logo.src = scrolledLogo;
    } else {
      header.classList.remove("scroll");
      logo.src = defaultLogo;
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

  // TARJETAS

  const { ScrollObserver, valueAtPercentage } = aat;

  const cardsContainer = document.querySelector(".cards");
  const cards = document.querySelectorAll(".card");
  cardsContainer.style.setProperty("--cards-count", cards.length);
  cardsContainer.style.setProperty(
    "--card-height",
    `${cards[0].clientHeight}px`
  );
  Array.from(cards).forEach((card, index) => {
    const offsetTop = 20 + index * 20;
    card.style.paddingTop = `${offsetTop}px`;
    if (index === cards.length - 1) {
      return;
    }
    const toScale = 1 - (cards.length - 1 - index) * 0.1;
    const nextCard = cards[index + 1];
    const cardInner = card.querySelector(".card__inner");
    ScrollObserver.Element(nextCard, {
      offsetTop,
      offsetBottom: window.innerHeight - card.clientHeight,
    }).onScroll(({ percentageY }) => {
      cardInner.style.scale = valueAtPercentage({
        from: 1,
        to: toScale,
        percentage: percentageY,
      });
      cardInner.style.filter = `brightness(${valueAtPercentage({
        from: 1,
        to: 0.6,
        percentage: percentageY,
      })})`;
    });
  });

  const tarjetas = document.querySelectorAll(".che_tarjeta-flotante");

  const observador = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("che_mostrar");
          observador.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  tarjetas.forEach((tarjeta) => {
    observador.observe(tarjeta);
  });

  const track = document.querySelector(".che_carousel-track");

  // Función para reiniciar la animación cuando sea necesario
  const resetAnimation = () => {
    track.style.animation = "none";
    track.offsetHeight; // Trigger reflow
    track.style.animation = null;
  };

  // Reiniciar la animación cuando termine
  track.addEventListener("animationend", resetAnimation);

  gsap.registerPlugin(ScrollTrigger);

  // Seleccionar los elementos
  const horizontalElement = document.querySelector(".horizontal");
  const horizontalContainer = document.querySelector(".horizontal-container");

  // Configurar la animación para el scroll horizontal
  gsap.to(horizontalElement, {
    xPercent: -100, // Mueve el texto de derecha a izquierda (100% de su ancho)
    ease: "none",
    scrollTrigger: {
      trigger: horizontalContainer, // El contenedor de la animación
      start: "top top", // Cuando el contenedor toca la parte superior del viewport
      end: () => "+=" + horizontalElement.offsetWidth, // Hasta que todo el texto haya pasado
      scrub: true, // Sincroniza con el scroll del usuario
      pin: true, // Fija el contenedor mientras dura la animación
    },
  });
});
