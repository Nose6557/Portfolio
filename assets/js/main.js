(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Adaptive header colours

     The header is transparent and always visible, so its text has to
     survive whatever scrolls beneath it. Each item is tested against the
     sections marked [data-nav-theme="dark"] and flipped to the light
     palette only while one of them is actually behind that item — the
     check is per item, so a dark block covering half the width leaves
     the other half alone.
  --------------------------------------------------------------------- */
  const nav = document.querySelector("[data-site-nav]");
  const darkZones = document.querySelectorAll('[data-nav-theme="dark"]');

  if (nav && darkZones.length) {
    const items = nav.querySelectorAll(
      ".site-nav__name, .site-nav__links a, .nav-toggle, .lang-switch__part"
    );
    let ticking = false;

    const syncColours = () => {
      ticking = false;
      const zones = [];
      for (const zone of darkZones) {
        const r = zone.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) zones.push(r);
      }
      for (const item of items) {
        let dark = false;
        if (zones.length) {
          const r = item.getBoundingClientRect();
          const x = r.left + r.width / 2;
          const y = r.top + r.height / 2;
          dark = zones.some((z) => z.top <= y && z.bottom >= y && z.left <= x && z.right >= x);
        }
        item.classList.toggle("is-over-dark", dark);
      }
    };

    const requestSync = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(syncColours);
      }
    };

    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    syncColours();
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
