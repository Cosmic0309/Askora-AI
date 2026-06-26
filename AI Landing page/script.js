/* Askora landing — minimal interactions */
(function () {

  /* -------- Scroll reveal -------- */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

      const top = section.offsetTop - 120;

      if (scrollY >= top) {

        current = section.id;

      }

    });
    if (window.scrollY > 40) {

      nav.classList.add("scrolled");

    } else {

      nav.classList.remove("scrolled");

    }

    navLinks.forEach(link => {

      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {

        link.classList.add("active");

      }

    });

  });













  const revealTargets = document.querySelectorAll(
    ".hero-meta, .section-head, .bento-card, .steps li, .demo-card, .tcards figure, .plan, .cta h2, .cta p, .cta-form, .stat"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el) => io.observe(el));

  /* -------- Nav hide on scroll down, show on up -------- */
  const nav = document.querySelector(".nav");
  let lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y > 120 && y > lastY) {
        nav.style.transform = "translateY(-100%)";
      } else {
        nav.style.transform = "translateY(0)";
      }
      nav.style.transition = "transform 0.3s ease";
      lastY = y;
    },
    { passive: true }
  );

  /* -------- Mobile burger (simple toggle) -------- */
  const burger = document.querySelector(".nav-burger");
  const mobilenav = document.querySelector(".nav-links");
  if (burger && mobilenav) {
    burger.addEventListener("click", () => {
      const open = mobilenav.classList.toggle("open");
      Object.assign(mobilenav.style, {
        display: open ? "flex" : " ",
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        flexDirection: "column",
        padding: "20px",
        background: "var(--paper)",
        borderBottom: "1px solid var(--line)",
        gap: "16px",
      });
      if (!open) mobilenav.style.display = " ";
    });
  }

  /* -------- Smooth-scroll for hash links -------- */
  document.querySelectorAll('a[href^=\"#\"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  /* -------- CTA fake submit -------- */
  window.askoraSubmit = function (e) {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    const note = document.getElementById("cta-note");
    if (input && note) {
      note.textContent = `✦ You're in. We saved ${input.value} to the list.`;
      note.style.color = "var(--accent)";
      input.value = "";
    }
    return false;
  };

  /* -------- Chip active toggle -------- */
  document.querySelectorAll(".chip").forEach((c) => {
    c.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((x) => (x.style.borderColor = ""));
      c.style.borderColor = "var(--accent)";
      c.style.color = "var(--accent)";
    });
  });

  /* -------- Subtle parallax on hero orb -------- */
  const orb = document.querySelector(".hero-orb");
  if (orb) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ---------- Pricing ---------- */

  /* ==========================
     Pricing Matrix
  ========================== */

  const pricingMatrix = {
    basic: {
      monthly: 499,
      annual: 499 * 12 * 0.8
    },
    pro: {
      monthly: 999,
      annual: 999 * 12 * 0.8
    },
    enterprise: {
      monthly: 1999,
      annual: 1999 * 12 * 0.8
    }
  };

  /* ==========================
     Currency Configuration
  ========================== */

  const currencies = {
    INR: {
      symbol: "₹",
      rate: 1,
      tariff: 1
    },

    USD: {
      symbol: "$",
      rate: 0.012,
      tariff: 1.05
    },

    EUR: {
      symbol: "€",
      rate: 0.011,
      tariff: 1.08
    }
  };

  let billing = "monthly";
  let currentCurrency = "INR";

  /* ==========================
     Update Prices
  ========================== */

  function updatePrices() {

    // const selectedCurrency =
    //   document.getElementById("currency").value;
    const selectedCurrency = currentCurrency;

    const currency = currencies[selectedCurrency];

    Object.keys(pricingMatrix).forEach(plan => {

      let finalPrice =
        pricingMatrix[plan][billing] *
        currency.rate *
        currency.tariff;

      const priceElement =
        document.getElementById(`${plan}Price`);

      // Exit Animation
      priceElement.classList.add("price-changing");

      setTimeout(() => {

        priceElement.textContent =
          `${currency.symbol}${Math.round(finalPrice)}${billing === "monthly" ? "/mo" : "/yr"}`;

        priceElement.classList.remove("price-changing");
        priceElement.classList.add("price-show");

        setTimeout(() => {
          priceElement.classList.remove("price-show");
        }, 220);

      }, 180);

    });

  }

  /* ==========================
     Billing Buttons
  ========================== */

  const monthlyBtn =
    document.getElementById("monthlyBtn");

  const annualBtn =
    document.getElementById("annualBtn");

  monthlyBtn.addEventListener("click", () => {

    billing = "monthly";

    monthlyBtn.classList.add("active");
    annualBtn.classList.remove("active");

    updatePrices();
    /* ==========================================
   Premium Currency Dropdown
========================================== */

    const dropdown =
      document.querySelector(".currency-dropdown");

    const currencyBtn =
      document.getElementById("currencyBtn");

    const selectedCurrency =
      document.getElementById("selectedCurrency");

    const currencyOptions =
      document.querySelectorAll(".currency-option");

    currencyBtn.addEventListener("click", (e) => {

      e.stopPropagation();

      dropdown.classList.toggle("open");

    });

    currencyOptions.forEach(option => {

      option.addEventListener("click", () => {

        currentCurrency =
          option.dataset.value;

        selectedCurrency.textContent =
          option.textContent.replace("✓", "").trim();

        currencyOptions.forEach(o =>
          o.classList.remove("active")
        );

        option.classList.add("active");

        dropdown.classList.remove("open");

        updatePrices();

      });

    });

    document.addEventListener("click", () => {

      dropdown.classList.remove("open");

    });

  });

  annualBtn.addEventListener("click", () => {

    billing = "annual";

    annualBtn.classList.add("active");
    monthlyBtn.classList.remove("active");

    updatePrices();

  });



  /* ==========================
     Initial Load
  ========================== */

  updatePrices();


  /* ---------- FAQ Accordion ---------- */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

      faqItems.forEach(faq => {

        if (faq !== item) {

          faq.classList.remove("active");

        }

      });

      item.classList.toggle("active");

    });

  });



  /* ---------- Scroll Progress ---------- */

  const progressBar = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const docHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      (scrollTop / docHeight) * 100;

    progressBar.style.width =
      progress + "%";

  });


  /* ---------- Animated Counters ---------- */

  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = parseFloat(counter.dataset.target);

      const suffix = counter.dataset.suffix || "";

      let current = 0;

      const increment = target / 60;

      const updateCounter = () => {

        current += increment;

        if (current >= target) {

          counter.textContent = target + suffix;

        } else {

          if (target % 1 !== 0) {

            counter.textContent =
              current.toFixed(1) + suffix;

          } else {

            counter.textContent =
              Math.floor(current) + suffix;

          }

          requestAnimationFrame(updateCounter);

        }

      };

      updateCounter();

      counterObserver.unobserve(counter);

    });

  }, {

    threshold: 0.5

  });

  counters.forEach(counter => {

    counterObserver.observe(counter);

  });


  /* ---------- Chat Widget ---------- */

  const chatWidget = document.querySelector(".chat-widget");
  const chatToggle = document.querySelector(".chat-toggle");

  if (chatWidget && chatToggle) {

    chatToggle.addEventListener("click", () => {
      chatWidget.classList.toggle("open");
    });

  }

  const glow = document.querySelector(".cursor-glow");

  let mouseX = 0;
  let mouseY = 0;

  let glowX = 0;
  let glowY = 0;

  document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;

    mouseY = e.clientY;

  });

  function animateGlow() {

    glowX += (mouseX - glowX) * 0.08;

    glowY += (mouseY - glowY) * 0.08;

    glow.style.left = glowX + "px";

    glow.style.top = glowY + "px";

    requestAnimationFrame(animateGlow);

  }

  animateGlow();

  /* ---------- Magnetic Buttons ---------- */

  const magneticButtons = document.querySelectorAll(
    ".btn-primary, .btn-outline"
  );

  magneticButtons.forEach(button => {

    button.addEventListener("mousemove", (e) => {

      if (window.innerWidth < 900) return;

      const rect = button.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      const moveX = (x - rect.width / 2) * 0.18;

      const moveY = (y - rect.height / 2) * 0.18;

      button.style.transform =
        `translate(${moveX}px,${moveY}px)`;

    });

    button.addEventListener("mouseleave", () => {

      button.style.transform = "translate(0,0)";

    });

  });

  /* ---------- Pricing Spotlight ---------- */

  const plans = document.querySelectorAll(".plan");

  plans.forEach(plan => {

    plan.addEventListener("mousemove", (e) => {

      const rect = plan.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      plan.style.setProperty("--x", `${x}px`);

      plan.style.setProperty("--y", `${y}px`);

    });

  });

  /* ==========================================
   BENTO ↔ ACCORDION STATE PERSISTENCE
========================================== */

  const bentoCards = document.querySelectorAll(".bento-card");
  const accordionItems = document.querySelectorAll(".accordion-item");

  let activeFeature = 0;

  /* ---------- Desktop Bento ---------- */

  function setActiveBento(index) {

    bentoCards.forEach(card => card.classList.remove("active"));

    if (bentoCards[index]) {
      bentoCards[index].classList.add("active");
    }

  }

  /* ---------- Mobile Accordion ---------- */

  function openAccordion(index) {

    accordionItems.forEach((item, i) => {

      if (i === index) {

        item.classList.add("active");

      } else {

        item.classList.remove("active");

      }

    });

  }

  /* ---------- Bento Click ---------- */

  bentoCards.forEach((card, index) => {

    card.addEventListener("click", () => {

      activeFeature = index;

      setActiveBento(index);

    });

  });

  /* ---------- Accordion Click ---------- */

  accordionItems.forEach((item, index) => {

    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {

      activeFeature = index;

      openAccordion(index);

    });

  });

  /* ---------- Resize Sync ---------- */

  function syncLayout() {

    if (window.innerWidth <= 900) {

      openAccordion(activeFeature);

    } else {

      setActiveBento(activeFeature);

    }

  }

  window.addEventListener("resize", syncLayout);

  syncLayout();
}());