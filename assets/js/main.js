(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* The header adapts to whatever is behind it purely in CSS, via
     mix-blend-mode: difference — see .site-nav in style.css. */

  /* ---------------------------------------------------------------------
     Hide the transparent header on scroll down, show on scroll up

     Without a background the bar lets content bleed through it, so it's
     hidden while reading downward and brought back the moment you scroll
     up. Past its own height only, so it never flickers at the very top.
  --------------------------------------------------------------------- */
  const nav = document.querySelector("[data-site-nav]");
  if (nav) {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      const menuOpen = document.querySelector("[data-mobile-menu]")?.dataset.open === "true";
      nav.dataset.hidden = String(!menuOpen && y > lastY && y > nav.offsetHeight);
      lastY = y;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
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

     Two flavours share one observer: [data-reveal] fades a block up,
     [data-mask] wipes a project cover open. Each element is flipped by
     setting its own attribute, so the CSS for the two stays separate.
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal], [data-mask]");
  const flip = (el) => {
    el.dataset[el.hasAttribute("data-mask") ? "mask" : "reveal"] = "in";
  };

  if (revealEls.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          flip(entry.target);
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
        flip(el);
        io.unobserve(el);
      }
    });
  } else {
    revealEls.forEach(flip);
  }

  /* ---------------------------------------------------------------------
     Cover parallax

     Each cover image is taller than the frame clipping it. That surplus
     is the whole travel budget: the image sits at the top when the card
     enters the viewport and reaches the bottom as it leaves, so it can
     never expose an edge.
  --------------------------------------------------------------------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length && !prefersReducedMotion) {
    let ticking = false;

    const positionCovers = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const img of parallaxEls) {
        const frame = img.closest(".project__frame");
        if (!frame) continue;
        const rect = frame.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) continue;
        const travel = img.offsetHeight - frame.offsetHeight;
        if (travel <= 0) continue;
        // 0 when the frame's top edge first touches the bottom of the
        // viewport, 1 once its bottom edge has passed the top.
        const progress = (vh - rect.top) / (vh + rect.height);
        const clamped = Math.min(1, Math.max(0, progress));
        img.style.transform = `translate3d(0, ${-clamped * travel}px, 0)`;
      }
    };

    const requestPosition = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(positionCovers);
      }
    };

    window.addEventListener("scroll", requestPosition, { passive: true });
    window.addEventListener("resize", requestPosition);
    positionCovers();
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
