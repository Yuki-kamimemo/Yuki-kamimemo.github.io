(function () {
  const menus = document.querySelectorAll("[data-floating-menu]");
  if (!menus.length) return;

  menus.forEach((menu) => {
    const button = menu.querySelector("[data-floating-menu-button]");
    const panel = menu.querySelector("[data-floating-menu-panel]");
    const closeButton = menu.querySelector("[data-floating-menu-close]");
    const topLink = menu.querySelector("[data-floating-top]");
    const sectionGroup = menu.querySelector("[data-floating-sections]");
    const sectionLinks = menu.querySelector("[data-floating-section-links]");

    if (!button || !panel) return;

    if (!document.getElementById("top") && topLink) {
      topLink.setAttribute("href", "#main");
    }

    const sectionItems = collectSectionItems();
    if (sectionItems.length && sectionGroup && sectionLinks) {
      sectionItems.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.label;
        sectionLinks.appendChild(link);
      });
      sectionGroup.hidden = false;
    }

    const setOpen = (isOpen) => {
      panel.hidden = !isOpen;
      button.setAttribute("aria-expanded", String(isOpen));
      menu.classList.toggle("is-open", isOpen);
    };

    button.addEventListener("click", () => {
      setOpen(panel.hidden);
    });

    closeButton?.addEventListener("click", () => {
      setOpen(false);
      button.focus();
    });

    panel.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", (event) => {
      if (!panel.hidden && !menu.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        setOpen(false);
        button.focus();
      }
    });
  });

  function collectSectionItems() {
    const seen = new Set();
    const items = [];
    const navLinks = document.querySelectorAll(".blog-nav a[href^='#']");

    navLinks.forEach((link) => {
      addItem(link.getAttribute("href"), link.textContent);
    });

    if (!items.length) {
      document.querySelectorAll(".section[id]").forEach((section) => {
        const heading = section.querySelector(".section-title, h2, h3");
        addItem(`#${section.id}`, heading?.textContent || section.id);
      });
    }

    return items.slice(0, 10);

    function addItem(href, label) {
      if (!href || href === "#" || seen.has(href)) return;
      if (!document.querySelector(href)) return;
      const cleanLabel = String(label || "").replace(/\s+/g, " ").trim();
      if (!cleanLabel) return;
      seen.add(href);
      items.push({ href, label: cleanLabel });
    }
  }
})();
