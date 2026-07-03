# Chandras EDU — Course Platform
## courses.chandrashaker.in

Pure HTML + Firebase + Cloudflare Pages. No build step needed.

---

## Folder Structure

```
chandras-edu-courses/
├── index.html                          ← Homepage
├── login.html                          ← Auth page
├── _redirects                          ← Cloudflare routing
├── css/style.css                       ← All styles
├── js/
│   ├── firebase-config.js              ← Firebase (auth + progress)
│   ├── nav.js                          ← Shared nav bar
│   └── certificate.js                  ← PDF certificate generator
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

Same process — copy any `module-*.html` file, edit content and mark-complete button.

---

## AdSense Integration

When approved, in each HTML file replace:
```html
<div class="ad-slot">Advertisement</div>
```
with:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXX"
     data-ad-slot="XXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

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
