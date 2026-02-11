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
// gate removed
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
const photoInput = document.getElementById("photoInput");
const galleryGrid = document.getElementById("galleryGrid");
if (photoInput && galleryGrid) {
  photoInput.addEventListener("change", () => {
    Array.from(photoInput.files || []).forEach((file) => {
      const url = URL.createObjectURL(file);
      const fig = document.createElement("figure");
      const img = document.createElement("img");
      img.src = url;
      img.loading = "lazy";
      img.alt = file.name || "Personal photo";
      fig.appendChild(img);
      galleryGrid.appendChild(fig);
    });
  });
}
function addImageBlob(blob, name = "Shared photo") {
  if (!galleryGrid) return;
  const url = URL.createObjectURL(blob);
  const fig = document.createElement("figure");
  const img = document.createElement("img");
  img.src = url;
  img.loading = "lazy";
  img.alt = name;
  fig.appendChild(img);
  galleryGrid.appendChild(fig);
}
if (galleryGrid) {
  galleryGrid.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  galleryGrid.addEventListener("drop", (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer?.files || []);
    files.filter(f => f.type.startsWith("image")).forEach(f => addImageBlob(f, f.name));
    toast(files.length ? "Photo added" : "No image found");
  });
  document.addEventListener("paste", (e) => {
    const items = Array.from(e.clipboardData?.items || []);
    let added = 0;
    items.forEach(it => {
      if (it.type.startsWith("image")) {
        const file = it.getAsFile();
        if (file) {
          addImageBlob(file, file.name);
          added++;
        }
      }
    });
    if (added) toast("Photo pasted");
  });
}
// private link controls removed
// private link logic removed
// contact section removed
