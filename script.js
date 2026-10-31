// MH | Mohammed Hanish — site interactions
async function initializeSite() {
let siteData;
try {
  if (window.MH_PREVIEW_DATA) siteData = window.MH_PREVIEW_DATA;
  else {
    const response = await fetch('content/site.json', {cache: 'no-cache'});
    if (!response.ok) throw new Error('Content HTTP ' + response.status);
    siteData = await response.json();
  }
  window.MHContent.render(siteData);
} catch (error) { console.warn('تعذر تحميل المحتوى؛ تم الاحتفاظ بالموقع الأصلي.', error); }
const WHATSAPP_NUMBER = siteData?.whatsapp || "9647709639557";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const validNumber = /^[1-9]\d{7,14}$/.test(WHATSAPP_NUMBER);
const defaultMessage = "مرحباً MH، أود الاستفسار عن خدمات التصوير ومونتاج الفيديو وطلب عرض سعر.";
document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.href = validNumber ? `${WHATSAPP_URL}?text=${encodeURIComponent(defaultMessage)}` : "#contact";
  if (validNumber) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
});
document.getElementById("year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".header nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
  }));
}
document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".work").forEach(item => {
    item.classList.toggle("hidden", btn.dataset.filter !== "all" && item.dataset.type !== btn.dataset.filter);
  });
}));
const bookingForm = document.getElementById("booking-form");
if (bookingForm) bookingForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!validNumber) { alert("تحقق من رقم واتساب في ملف script.js"); return; }
  const data = new FormData(bookingForm);
  const value = key => (data.get(key) || "غير محدد").toString().trim() || "غير محدد";
  const message = [
    "مرحباً MH | Mohammed Hanish، أود طلب عرض سعر لمشروع.",
    "الاسم: " + value("customerName"),
    "رقم الهاتف: " + value("customerPhone"),
    "نوع الخدمة: " + value("service"),
    "التاريخ المتوقع: " + value("eventDate"),
    "تفاصيل المشروع: " + value("details"),
    "أرجو التواصل معي لمناقشة التفاصيل."
  ].join("\n");
  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

// Rotate the two latest cinematic clips in the hero. Keep original aspect ratios.
(() => {
  const clips = Array.from(document.querySelectorAll('.hero-video-rotator .hero-reel'));
  if (clips.length < 2) return;
  let active = 0;
  clips.forEach((video, index) => {
    video.muted = true;
    video.playsInline = true;
    if (index === 0) { video.classList.add('is-visible'); video.play().catch(() => {}); }
    else { video.classList.remove('is-visible'); video.pause(); }
  });
  window.setInterval(() => {
    const next = (active + 1) % clips.length;
    const incoming = clips[next];
    const outgoing = clips[active];
    incoming.currentTime = 0;
    incoming.play().catch(() => {});
    incoming.classList.add('is-visible');
    outgoing.classList.remove('is-visible');
    window.setTimeout(() => outgoing.pause(), 1300);
    active = next;
  }, 9000);
})();

}
initializeSite();
