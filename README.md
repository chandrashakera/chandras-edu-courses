# CHANDRAS EDU — Course Platform
## courses.chandrashaker.in

Pure HTML + Firebase + Cloudflare Pages. No build step needed.

---

## Folder Structure

```
chandras-edu-courses/
├── index.html                          ← Homepage
├── login.html                          ← Auth page
├── certificate.html                    ← Certificate verification page
├── _redirects                          ← Cloudflare routing
├── css/style.css                       ← All styles
├── js/
│   ├── firebase-config.js              ← Firebase (auth + progress)
│   ├── nav.js                          ← Shared nav bar
│   ├── quiz.js                         ← Quiz component (gate, 5 questions, pass mark)
│   ├── certificate.js                  ← Certificate claim, verification, QR and PDF
│   └── certificates/
│       └── config.js                   ← Which courses issue certificates, required ids
├── academic/
│   └── coa/
│       ├── index.html                  ← COA course landing
│       └── unit1/
│           ├── index.html              ← Unit 1 topic list
│           ├── complements.html        ← Topic page (use as template)
│           ├── data-types-number-systems.html
│           ├── fixed-point-representation.html
│           └── floating-point-representation.html
└── professional/
    └── genai/
        ├── index.html                  ← GenAI course landing
        └── module-*.html               ← Module pages
```

---

## Adding a New Academic Topic (3 steps)

1. Copy `academic/coa/unit1/complements.html`
2. Rename to your topic slug e.g. `fixed-point-representation.html`
3. Edit all `✏️ EDIT` marked sections:
   - `<title>` and `<meta name="description">`
   - Breadcrumb topic name
   - `<h1>` title
   - Free content section (1-2 intro sections)
   - Full content section (remaining sections)
   - `COURSE_ID`, `TOPIC_ID`, `QUIZ` array
   - Prev/Next links

Push to GitHub → Cloudflare deploys in ~60 seconds. Done.

---

## Adding a New Professional Module

Same process — copy any `module-*.html` file, edit content and the quiz questions (`QUIZ` array); see an existing module page.

---

## AdSense Integration

Monetized via **Auto ads** (matching chandrashaker.com), not manual ad-slot placeholders. When approved, add the Auto ads script tag once to the `<head>` of each page (or a shared include if one gets added later):
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX" crossorigin="anonymous"></script>
```
Google's script scans the page and inserts ads automatically — no per-page placeholder markup needed.

---

## Firebase Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/progress/{doc} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## Deploy

```bash
git add .
git commit -m "your message"
git push
# Cloudflare auto-deploys in ~60 seconds
```
