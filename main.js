// ---------- Dark mode ----------
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", theme);

  function syncIcon() {
    var icon = document.querySelector("#theme-toggle i");
    if (!icon) return;
    var dark = root.getAttribute("data-theme") === "dark";
    icon.className = dark ? "fa fa-sun-o" : "fa fa-moon-o";
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncIcon();
    var toggle = document.querySelector("#theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
        syncIcon();
      });
    }
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  // ---------- Mobile menu ----------
  var mobileMenuBtn = document.querySelector("#mobile-menu-btn");
  var mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      var open = mobileMenu.style.display === "flex";
      mobileMenu.style.display = open ? "none" : "flex";
      mobileMenuBtn.innerHTML = open ? "Menu" : "Close";
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.style.display = "none";
        mobileMenuBtn.innerHTML = "Menu";
      });
    });
  }

  // ---------- Scroll reveal ----------
  var revealEls = document.querySelectorAll("section, .pub-item");
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
});
