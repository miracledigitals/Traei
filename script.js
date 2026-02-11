const qs = new URLSearchParams(location.search);
const accent = qs.get("accent");
if (accent) {
  document.documentElement.style.setProperty("--accent", accent);
}
const navToggle = document.querySelector(".nav-toggle");
const navList = document.getElementById("nav-list");
if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const open = navList.getAttribute("data-open") === "true";
    navList.setAttribute("data-open", (!open).toString());
    navToggle.setAttribute("aria-expanded", (!open).toString());
  });
}
const forgiveBtn = document.getElementById("forgiveBtn");
function heart(x, y) {
  const h = document.createElement("div");
  h.className = "heart";
  h.style.left = x + "px";
  h.style.top = y + "px";
  h.style.opacity = "0.9";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 2000);
}
function toast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.hidden = false;
  setTimeout(() => { t.hidden = true; }, 2200);
}
if (forgiveBtn) {
  forgiveBtn.addEventListener("click", (e) => {
    const rect = forgiveBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 6; i++) {
      const dx = (Math.random() - 0.5) * 80;
      const dy = (Math.random() - 0.5) * 30;
      heart(cx + dx, cy + dy);
    }
    toast("Thank you for considering forgiving me");
  });
}
