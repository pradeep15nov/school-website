// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  }
});

// Animated stats counters, started when the band scrolls into view
const counters = document.querySelectorAll("[data-count]");
const animate = (el) => {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || "";
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / 1200, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animate(entry.target);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach((c) => io.observe(c));

// News & events filter
const tabs = document.querySelectorAll(".tab");
const items = document.querySelectorAll(".news-list li");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", t === tab);
    });
    const filter = tab.dataset.filter;
    items.forEach((li) => {
      li.hidden = filter !== "all" && li.dataset.type !== filter;
    });
  });
});

// Enquiry form (demo only: validates and shows a confirmation, nothing is sent)
const form = document.getElementById("enquiry-form");
const status = form.querySelector(".form-status");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const ok = field.checkValidity();
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    status.textContent = "Please fill in the highlighted fields.";
    status.className = "form-status err";
    return;
  }
  const name = form.elements.name.value.trim().split(" ")[0];
  status.textContent = `Thank you, ${name}! We'll call you back soon.`;
  status.className = "form-status ok";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
