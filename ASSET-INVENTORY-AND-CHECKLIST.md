# Asset Inventory, Content Check & Open Items

Source site inspected: https://www.traumaatwork.com/ (all pages fetched 1 Oct 2026).

## 0. Discrepancies between the brief and the live site (please read)

| Brief said | Live site actually has | What I did |
|---|---|---|
| Logo = "Trauma At Work" logo | The supplied logo file reads **"LEAD THROUGH"** (mark: yellow "L" + slate "T" in a square). The old site logo is a different yellow-spotlight mark. | Used the supplied logo **unmodified** (cropped to its bounds only, `assets/logo.png`; mark-only crop for the favicon). Confirm that Lead Through is the intended brand mark. Alt text reads "Trauma At Work – Lead Through logo". |
| Hero "YOUR STORY MATTERS" / "I help people and teams improve their mental health at work" | Hero: "Difficult moments are inevitable. How we go lead through them is not." / "I help HR and people leaders prevent and reduce psychological harm, so employees can just get on with the job" | Used the **current** live copy (fixed the typo "go lead" → "lead"). |
| Pages: Coaching, Workshops, **E-Learning**, **Research**, About, Contact, Blog | Home, Workshops, Coaching (`/traumainformedcoaching`), **Community** (`/join-the-club`), Insights (`/insights` = the Adversity & Work report), Blog (`/blog`), About, Contact, plus `/register-interest`, `/newsletter-sign-up`, `/privacy-notice`. `/e-learning` returns 404. | Preserved the live structure; **no E-Learning page invented**. Community added to Solutions. |
| "Take the Survey" CTA + survey URL | The survey **closed** (ran Oct 2025–Jun 2026); the page now offers the free report via a form. No survey URL exists. | CTA is "Read the full report" → `/insights`. |
| Credentials, Calendly URL, social links | Two booking links exist (see §3). **No social links** exist on the live site. | Both booking links kept where the live site uses them. No social icons added. |
| Newsletter "Join Now" | Home has "Register HERE for exclusive updates" → `/newsletter-sign-up` (Wix form). | Home strip posts the email to the newsletter page; that page reproduces the form fields. |

Small copy fixes (typos only): "go lead" → "lead" (hero); "than made an effort" → "that made an effort" (83 % finding). Everything else is verbatim or lightly shortened (card blurbs, e.g. the Coaching card combines the live headline "Your time, your goals, at your pace." with the first sentence of the Coaching page).

## 1. Images reused from the live site

Original files are on `static.wixstatic.com/media/<id>`. Local copies are resized to ≤ 1600 px JPEG (`assets/images/`).

| Local file | Original Wix media ID | Found on | Purpose | Used in redesign |
|---|---|---|---|---|
| `adina-portrait.jpg` | `562f27_0a39079702184837875e1fae7954ab58~mv2.jpg` (alt "IMG_3855.JPG") | Home | Portrait of Adina (blue top) | Home hero; About page (qualifications) |
| `about-adina-1.jpg` | `562f27_a79dc51ef5a14bb2ae71f95af69530a8~mv2.jpg` | About | Landscape portrait (yellow cardigan) | About page hero |
| `about-adina-2.jpg` | `562f27_d3dde093e46e47b1a209e17e5c79abbb~mv2.jpg` (alt "WhatsApp Image 2025-08-06 …_edited") | About | Portrait | Home introduction |
| `coaching-notes.jpg` | `11062b_3d83824e24664a47b034460494fc90b2~mv2.jpg` (alt "Taking Notes") | Coaching | Page image | Coaching hero; Home Coaching card |
| `workshops-together.jpg` | `11062b_ca2a94e6c4e9401faf66c5645cf292db~mv2.jpg` | Workshops | Team at desk | Workshops hero; workshop 2; Home Workshops card |
| `workshops-working.jpg` | `11062b_82be2f256ec4479ebdbd5b9ac94b7f17~mv2.jpeg` | Workshops | Person writing | Workshop 1 |
| `workshops-jason-goodman.jpg` | `nsplsh_8ee61997809a4349bf1b93972c20714b~mv2.jpg` (Unsplash, "Image by Jason Goodman") | Workshops | Team meeting with sticky notes | Workshop 3 |
| `bg-generic-2.jpg` | `562f27_dc5a66813155491fabc7706c7b733e4c~mv2.png` | Home / Coaching / Blog ("Topics related to mental health and wellbeing conversations") | Word-cloud artwork; also the blog image for "Managers are Not Therapists" | Home Community card; Community hero; featured blog post |
| `report-snapshot-1.jpg` | `562f27_9126a247b9b34f28a7bf1563b40330a7~mv2.png` | Insights | Report snapshot (67 % / 47 %) | Home research band; Insights |
| `report-snapshot-2.jpg` | `562f27_db6f417c3acd4db58d2f5ad15d994aad~mv2.png` | Insights | Report snapshot (bar chart) | Insights hero |
| `blog-topics.jpg` | `562f27_db7c17a8b9aa4f568a9e6d091f5c18e0~mv2.jpg` | Blog | Post image: Beyond the Deficit Angle (gold-cracked marble bust) | Home list; Blog |
| `blog-alone.jpg` | `11062b_e6d3f7edd5ec4991a50fb7482ef0f9e7~mv2.jpg` | Blog | Post image: Why It's Time to Talk | Home list; Blog |
| `blog-kintsugi.jpg` | `11062b_fd6454b0e85b45efbca0d7fc17b9fd64~mv2.jpeg` | Blog | Post image: Understanding Trauma (brain scans) | Home list; Blog |

(Blog image file names are only my local labels; the mapping above is from each post's `og:image`.)

**Found but deliberately not used**
- `11062b_9e9cf4f71b9b48baba5f9f6b1aead86a~mv2.jpg` ("Typing on Laptop", Home): a Wix template stock shot with a "Payment received" screen, unsuitable for the hero.
- `562f27_362226d3…png` and `562f27_32309f02…png` ("Generic website background"): plain page backgrounds.
- `562f27_ce8a286a…png` (old 400 × 200 yellow-spotlight logo) and `562f27_f81ea49f…png` (256 px icon): replaced by the supplied logo.

**Community card image**: the live Community page has no photo, so the existing word-cloud artwork is used. Swap if a real photo is available.

## 2. Logo, icons, downloads
- Logo: supplied file → `assets/logo.png` (crop only) and `assets/favicon.png` (mark only crop). Originals unchanged.
- Icons: none used from the live site. Ticks, crosses, arrows and the hamburger are CSS-drawn.
- Downloadable assets: **the Adversity & Work report PDF** is delivered by email after the form submission, so it is not directly linkable. No other downloads found.
- Fonts: Montserrat (Google Fonts). The live site uses Raleway / DIN Next.

## 3. Links
- Discovery call (live Home page): `https://calendar.app.google/JfC6pZQxHVuuSHKNA` — used for header CTA, Home, About, footer, final CTA.
- Discovery call (live Coaching page): `https://calendly.com/adina-traumaatwork/discovery` — used on the Coaching page hero only. The live site is inconsistent; pick one if desired.
- Survey URL: none exists (survey closed).
- Social links: none exist on the live site.
- Email (from privacy notice): `traumaatwork@outlook.com`
- External: cipd.org · neuromindfulnessinstitute.com · traumaresearchfoundation.org · ukpts.org · estss.org · gov.uk trauma-informed practice definition · NHS urgent mental-health help page.
- Blog posts (live URLs, all verified 200):
  - `/post/managers-are-not-therapists` (13 Feb 2026, 2 min)
  - `/post/beyond-the-deficit-angle-post-traumatic-growth` (24 Nov 2025, 2 min)
  - `/post/trauma-at-work-why-it-s-time-to-talk` (27 Oct 2025, 2 min)
  - `/post/understanding-trauma-neurobiology-moving-on-and-trauma-informed-practice` (22 Sep 2025, 4 min)
- Community plan buttons link to the live `/join-the-club` (Wix Pricing Plans can't be reproduced in static HTML).

## 4. Content preservation checklist

| Item | Status |
|---|---|
| Pages: Home, Workshops, Coaching, Community, Insights/report, Blog, About, Contact, Register interest, Newsletter sign-up, Privacy notice | ✅ all rebuilt, same slugs |
| Home: hero copy, "Here as an individual?" link, Adina intro (3 paragraphs), credentials, Coaching/Workshops/Community cards, newsletter prompt, "No events at the moment" | ✅ |
| Coaching: 7 "this space is for you if" points, "Working with me" text + 4 principles, gov.uk link, discovery-call CTA | ✅ |
| Workshops: quote, intro, 3 workshops with "Suitable for" lists, Register interest buttons | ✅ |
| Community: hero, why, 3 monthly items, for/not-for lists, NHS link, pricing (£12 / £125, save £19) | ✅ (checkout needs Wix Pricing Plans) |
| Report page: findings, form fields, consent checkbox | ✅ form is a UI prototype |
| About: statement, mission, all 6 qualifications with their links | ✅ |
| Contact: form fields, 2-business-day promise | ✅ form is a UI prototype |
| Register interest form incl. 4 workshop options | ✅ |
| Newsletter form incl. interest options & consent | ✅ |
| Blog: 4 posts with title, date, author, read time, image, link | ✅ posts themselves stay on the live Wix blog |
| Privacy notice (14 sections, last updated 1 Sep 2025) | ✅ full text |
| Footer: privacy link, © 2025 Trauma At Work Ltd. | ✅ |
| SEO: homepage title/meta description, page titles, canonical, H1 per page, alt text | ✅ (page titles taken from the live site; pages without a custom title use the page name) |
| Cookie banner / "Cookie Settings" link | ⚠️ not included (Wix feature; add in Wix) |
| Blog post body text | ⚠️ not duplicated; links go to live posts |
| Blog "excerpts" on Home for posts 2–4 | shown as titles only (list layout) |

## 5. Open items for you
1. **Confirm the logo/brand name** (Lead Through vs Trauma At Work).
2. Forms are **non-functional prototypes** — rebuild them with Wix Forms (fields are listed in the migration map). The prototype only shows a "nothing has been sent" note.
3. Community page still shows **August** theme/call dates (copied from the live page): update.
4. Choose one booking link (Google Calendar vs Calendly).
5. The hero secondary CTA ("Take the Survey") is replaced because the survey has closed.
6. Copy typos left as on the live site (e.g. meta description "depleated").
