# R. P. Memorial School, Rewa (MP) (demo website)

A static demo school website built with plain HTML, CSS and JavaScript. No build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 5173
```

## Structure

- `index.html` — single page: hero, stats, about, academics, news & events, campus gallery, contact form
- `css/styles.css` — styles and responsive layout
- `login.html` — demo login page (accounts: student / student123, parent / parent123, teacher / teacher123)
- `portal.html` — page shown after login, with logout
- `js/auth.js` — demo login logic; runs in the browser only, so it is not secure. Real accounts need a backend.
- `js/main.js` — mobile menu, animated counters, news filter, demo enquiry form (nothing is sent)
