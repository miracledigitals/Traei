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
const gate = document.getElementById("gate");
const hasKey = qs.has("key");
if (gate) {
  gate.style.display = hasKey ? "none" : "flex";
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
const avInput = document.getElementById("avInput");
const avHolder = document.getElementById("avHolder");
if (avInput && avHolder) {
  avInput.addEventListener("change", () => {
    avHolder.innerHTML = "";
    const file = avInput.files && avInput.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("video")) {
      const v = document.createElement("video");
      v.src = url;
      v.controls = true;
      v.playsInline = true;
      avHolder.appendChild(v);
    } else {
      const a = document.createElement("audio");
      a.src = url;
      a.controls = true;
      avHolder.appendChild(a);
    }
  });
}
const linkPanel = document.getElementById("linkPanel");
const linkValue = document.getElementById("linkValue");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const closeLinkBtn = document.getElementById("closeLinkBtn");
const privateLinkBtn = document.getElementById("privateLinkBtn");
function makeToken() {
  const r = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(r).map(b => b.toString(16).padStart(2, "0")).join("");
}
function buildLink() {
  const token = makeToken();
  const params = new URLSearchParams();
  params.set("key", token);
  if (accent) params.set("accent", accent);
  return location.origin + location.pathname + "?" + params.toString();
}
if (privateLinkBtn && linkPanel && linkValue) {
  privateLinkBtn.addEventListener("click", () => {
    const link = buildLink();
    linkValue.textContent = link;
    linkPanel.hidden = false;
    copyLinkBtn && copyLinkBtn.focus();
  });
}
if (copyLinkBtn && linkValue) {
  copyLinkBtn.addEventListener("click", async () => {
    const link = linkValue.textContent || "";
    try {
      await navigator.clipboard.writeText(link);
      toast("Link copied");
    } catch {
      toast("Copy failed");
    }
  });
}
if (closeLinkBtn && linkPanel && privateLinkBtn) {
  closeLinkBtn.addEventListener("click", () => {
    linkPanel.hidden = true;
    privateLinkBtn.focus();
  });
}
const contactForm = document.getElementById("contactForm");
const copyBtn = document.getElementById("copyBtn");
const formFeedback = document.getElementById("formFeedback");
const contactEmail = "";
function buildMailto(name, message) {
  const subject = "From my heart";
  const body = (name ? name + ":\n\n" : "") + message;
  return "mailto:" + contactEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!message) {
      formFeedback.textContent = "Please write a message.";
      return;
    }
    if (contactEmail) {
      location.href = buildMailto(name, message);
      formFeedback.textContent = "Opening your mail app";
    } else {
      navigator.clipboard.writeText((name ? name + ":\n\n" : "") + message).then(() => {
        formFeedback.textContent = "Message copied";
        toast("Message copied");
      }, () => {
        formFeedback.textContent = "Copy failed";
      });
    }
  });
}
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!message) {
      formFeedback.textContent = "Please write a message.";
      return;
    }
    navigator.clipboard.writeText((name ? name + ":\n\n" : "") + message).then(() => {
      formFeedback.textContent = "Message copied";
      toast("Message copied");
    }, () => {
      formFeedback.textContent = "Copy failed";
    });
  });
}
