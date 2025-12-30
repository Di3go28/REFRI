/* =========================================
   app.js — FUNCIONALIDAD (menú, animaciones, form -> WhatsApp)
   ========================================= */

/* ====== DATOS DEL NEGOCIO (EDITABLES) ====== */
const BUSINESS_NAME = "LINEA BLANCA- REFRIGERACION W-V";
const BUSINESS_PHONE = "5491162751982"; // Formato WhatsApp: 54911xxxxxxxx
const BUSINESS_PHONE_DISPLAY = "+54 9 11 6275-1982";
const BUSINESS_EMAIL = "wilsonvillalobos85@gmail.com";

/* ====== HELPERS ====== */
const $ = (sel) => document.querySelector(sel);

/* ====== YEAR FOOTER ====== */
$('#year').textContent = new Date().getFullYear();

/* ====== NAV: MENÚ MÓVIL ====== */
const menuBtn = $('#menuBtn');
const mobileMenu = $('#mobileMenu');

function toggleMenu(force) {
  const show = force ?? mobileMenu.style.display === 'none';
  mobileMenu.style.display = show ? 'block' : 'none';
  menuBtn.textContent = show ? '✕' : '☰';
}

menuBtn.addEventListener('click', () => toggleMenu());

/* ====== ANIMACIONES (IntersectionObserver) ====== */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.animate(
        [
          { opacity: 0, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 450, easing: 'cubic-bezier(.2,.6,.2,1)', fill: 'both' }
      );
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach((el) => io.observe(el));

/* ====== SCROLL SUAVE (compat extra) ====== */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ====== ACTUALIZAR ENLACES DE CONTACTO (si cambiás constantes) ====== */
function setHref(id, href) {
  const el = document.getElementById(id);
  if (el) el.setAttribute('href', href);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function waLink(text) {
  return `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(text)}`;
}

// CTA
setHref('ctaTop', waLink('Hola, quiero consultar un presupuesto'));
setHref('ctaHero', waLink('Hola, quiero consultar un presupuesto'));
setHref('ctaBottom', waLink('Hola, quiero consultar un presupuesto'));
setHref('ctaFloat', waLink('Hola, quiero consultar un presupuesto'));

// Contact links
setHref('telLink', `https://wa.me/${BUSINESS_PHONE}`);
setText('telLink', BUSINESS_PHONE_DISPLAY);
setHref('mailLink', `mailto:${BUSINESS_EMAIL}`);
setText('mailLink', BUSINESS_EMAIL);
setText('brandName', BUSINESS_NAME);
setText('footerName', BUSINESS_NAME);

/* ====== FORMULARIO -> WHATSAPP ====== */
const form = $('#visitForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = $('#fNombre')?.value?.trim() || '';
    const telefono = $('#fTelefono')?.value?.trim() || '';
    const servicio = $('#fServicio')?.value || '';
    const barrio = $('#fBarrio')?.value?.trim() || '';
    const mensaje = $('#fMensaje')?.value?.trim() || '';

    const texto =
      `Hola! Quiero solicitar una visita.\n\n` +
      `• Nombre: ${nombre}\n` +
      `• Teléfono: ${telefono}\n` +
      `• Servicio: ${servicio}\n` +
      `• Barrio/Localidad: ${barrio}\n` +
      (mensaje ? `• Detalle: ${mensaje}\n` : '') +
      `\nEnviado desde la web ($LINEA BLANCA- REFRIGERACION W-V).`;

    const url = waLink(texto);
    const win = window.open(url, '_blank');

    // Si el navegador bloquea ventanas emergentes
    if (!win) {
      const msg = $('#formMsg');
      if (msg) msg.style.display = 'block';
    }
  });
}
