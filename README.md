# Vijay Rajkiran — AI PM Website

Static site, no build step. Pages: `index.html`, `about.html`, `book.html`,
`work/*.html`. Shared styles in `css/style.css`, shared behavior in `js/main.js`.
One config file, `js/config.js`, holds the booking link, email, LinkedIn and
résumé path — edit that file and every page updates.

## 1. Connect Google Calendar booking (5 minutes, no backend/API keys)

Google Calendar has a built-in **Appointment schedule** feature that creates a
public booking page and puts events straight onto `vijayrajkiranramraj@gmail.com`'s
calendar — no OAuth app, no server, no secrets to manage.

1. Sign in to `vijayrajkiranramraj@gmail.com` and go to https://calendar.google.com
2. Click **Create** → **Appointment schedule** (not "Event").
3. Name it (e.g. "20-min intro call"), set duration, availability windows, and
   buffer time.
4. Save. Google generates a public booking page URL, e.g.
   `https://calendar.google.com/calendar/appointments/schedules/AcZssZ...`
5. Copy that URL and paste it into `js/config.js`:
   ```js
   const GOOGLE_CALENDAR_BOOKING_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ...";
   ```
6. Reload `book.html` — the live booking form now embeds on the page, and every
   "Book a Call" / "Book an Appointment" button across the site links there.

Until step 5 is done, `book.html` shows a plain notice and falls back to a
mailto link, so nothing is broken — it just isn't wired to the calendar yet.

## 2. Fill in the rest of `js/config.js`

```js
const LINKEDIN_URL = "https://www.linkedin.com/in/your-handle";
```

Email is already set to `vijayrajkiranramraj@gmail.com`.

## 3. Add your résumé

Drop a PDF at `assets/resume.pdf` (the "Résumé ↓" links already point there).

## 4. Fill in the placeholders

Every `[bracketed, italic]` line in the case studies, proof strip, testimonials
and about page is a deliberate placeholder — real metrics, quotes, and names
only, no invented numbers. Search the project for `placeholder` to find them
all quickly:

```bash
grep -rn "placeholder" --include="*.html" .
```

## 5. Preview locally

Any static file server works, e.g.:

```bash
cd site
python3 -m http.server 8000
```

Then open http://localhost:8000

## 6. Deploy

This is a plain static site — drag-and-drop or connect-repo deploy works on:

- **Netlify** — drag the `site/` folder onto netlify.com/drop, or connect a
  GitHub repo and set the publish directory to `site`.
- **Vercel** — `vercel --cwd site` or connect the repo with root directory `site`.
- **GitHub Pages** — push `site/` contents to a `gh-pages` branch, or a repo
  named `<username>.github.io`.

A custom domain can be pointed at any of the above afterward.
