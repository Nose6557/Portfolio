(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Sticky nav: hide on scroll down, show on scroll up
  --------------------------------------------------------------------- */
  const nav = document.querySelector("[data-site-nav]");
  if (nav) {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      nav.dataset.hidden = String(goingDown && y > nav.offsetHeight);
      lastY = y;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Mobile fullscreen menu
  --------------------------------------------------------------------- */
  const menu = document.querySelector("[data-mobile-menu]");
  const openBtn = document.querySelector("[data-menu-open]");
  const closeBtn = document.querySelector("[data-menu-close]");

  const setMenu = (open) => {
    if (!menu) return;
    menu.dataset.open = String(open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      menu.querySelector("a, button")?.focus();
    } else {
      openBtn?.focus();
    }
  };

  openBtn?.addEventListener("click", () => setMenu(true));
  closeBtn?.addEventListener("click", () => setMenu(false));
  menu?.addEventListener("click", (e) => {
    if (e.target.tagName === "A") setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu?.dataset.open === "true") setMenu(false);
  });

  /* ---------------------------------------------------------------------
     Language switch
     NOTE: only Ukrainian copy exists today. The toggle is wired up
     structurally (state + persistence) but there is no English content
     to swap in yet — flipping it currently just updates the visual
     active state. Wire real translations here once copy exists.
  --------------------------------------------------------------------- */
  const LANG_KEY = "portfolio-lang";
  const storedLang = localStorage.getItem(LANG_KEY) || "ua";

  document.querySelectorAll("[data-lang-switch]").forEach((el) => {
    const parts = el.querySelectorAll("[data-lang]");
    const applyState = (lang) => {
      parts.forEach((p) => {
        p.dataset.active = String(p.dataset.lang === lang);
      });
    };
    applyState(storedLang);
    el.addEventListener("click", (e) => {
      const target = e.target.closest("[data-lang]");
      if (!target) return;
      const lang = target.dataset.lang;
      localStorage.setItem(LANG_KEY, lang);
      applyState(lang);
    });
  });

  /* ---------------------------------------------------------------------
     Reading progress bar (case pages)
  --------------------------------------------------------------------- */
  const progressFill = document.querySelector("[data-progress-fill]");
  if (progressFill) {
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressFill.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.reveal = "in";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => {
      io.observe(el);
      // Elements already on screen at load time should be visible
      // immediately rather than waiting on the observer's first tick.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.dataset.reveal = "in";
        io.unobserve(el);
      }
    });
  } else {
    revealEls.forEach((el) => { el.dataset.reveal = "in"; });
  }

  /* ---------------------------------------------------------------------
     Hero title: reveal line by line on first load
  --------------------------------------------------------------------- */
  const heroLines = document.querySelectorAll("[data-hero-line]");
  if (heroLines.length && !prefersReducedMotion) {
    heroLines.forEach((line, i) => {
      line.style.transitionDelay = `${i * 60}ms`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { line.dataset.reveal = "in"; });
      });
    });
  } else {
    heroLines.forEach((line) => { line.dataset.reveal = "in"; });
  }
})();
