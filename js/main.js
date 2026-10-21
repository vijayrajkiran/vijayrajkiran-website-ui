// Shared site behavior. Loaded after config.js on every page.
document.addEventListener("DOMContentLoaded", () => {
  const ready = GOOGLE_CALENDAR_BOOKING_URL &&
    !GOOGLE_CALENDAR_BOOKING_URL.startsWith("PASTE_");

  // Point every mailto/linkedin/resume placeholder at the real values
  // from config.js, so there's one place to update them.
  document.querySelectorAll('[data-email-link]').forEach(el => {
    el.href = `mailto:${CONTACT_EMAIL}`;
  });
  document.querySelectorAll('[data-linkedin-link]').forEach(el => {
    if (LINKEDIN_URL && !LINKEDIN_URL.startsWith("PASTE_")) {
      el.href = LINKEDIN_URL;
    }
  });
  document.querySelectorAll('[data-resume-link]').forEach(el => {
    el.href = RESUME_PATH;
  });

  // "Book a Call" buttons: if we're not already on book.html, send people
  // there; book.html itself loads the live Google Calendar embed.
  document.querySelectorAll('[data-book-link]').forEach(el => {
    const onBookPage = location.pathname.endsWith('book.html');
    if (!onBookPage) {
      const prefix = el.getAttribute('data-root') === 'work' ? '../book.html' : 'book.html';
      el.href = prefix;
    }
  });

  // On book.html: wire the iframe + fallback link once config is set.
  const frame = document.getElementById('booking-frame');
  const fallback = document.getElementById('booking-fallback');
  const notice = document.getElementById('booking-notice');
  if (frame) {
    if (ready) {
      frame.src = GOOGLE_CALENDAR_BOOKING_URL;
      if (fallback) fallback.href = GOOGLE_CALENDAR_BOOKING_URL;
      if (notice) notice.style.display = 'none';
    } else {
      if (notice) notice.style.display = 'block';
      if (fallback) fallback.href = `mailto:${CONTACT_EMAIL}`;
    }
  }
});
