# Wix Classic Editor Migration Map

Global settings (set once in Wix Site Design → Site Fonts / Colors):

- **Font**: Montserrat (available in Wix). Headings 700, body 400/500. Button text 700.
- **Colors**: Slate `#36454F` · Yellow `#F1BC06` · Black `#000000` · White `#FFFFFF`. Add two quiet neutrals: Tint `#F4F6F7` (alternate strip background) and Line `#DCE1E4` (card borders).
- **Type sizes (desktop / mobile)**: H1 56 / 34 · H2 40 / 28 · H3 22 / 20 · Body 17 / 16 (line-height 1.7) · Eyebrow 12 caps, letter-spacing 2px.
- **Page width**: strips full-width; content in a 980–1180 px centred column (Wix grid). Vertical padding 100 px desktop / 56 px mobile.
- **Buttons**: Primary = yellow fill, slate text, fully rounded, hover = slate fill + yellow text. Dark = slate fill, white text. Ghost = 2 px slate border, no fill, hover slate fill.
- **Fade-in**: Wix "Entrance" animation → *Fade in* or *Float in* (short, 0.6–0.8 s) on text/images. Nothing else animated.
- **Header/Footer**: build once on the Wix Header/Footer (shared across pages).
- **Page URLs** (keep identical): `/`, `/workshops`, `/traumainformedcoaching`, `/join-the-club`, `/insights`, `/blog`, `/about`, `/contact`, `/register-interest`, `/newsletter-sign-up`, `/privacy-notice`, `/post/<slug>` (blog posts stay in the Wix Blog app).
- **HTML file → Wix page**: `index.html` → Home, `traumainformedcoaching.html` → /traumainformedcoaching, etc. (file name = Wix URL slug).

Menu (Wix Menu with sub-menus): Home · Solutions ▸ (Coaching, Workshops, Community) · Insights ▸ (The Adversity & Work report, Blog) · About · Contact. The live site's menu is flat; the dropdowns are the only IA change and can be flattened by listing Workshops, Coaching, Community, Insights directly.

---

## HEADER (all pages)
- **Wix**: Header strip → logo image + Horizontal Menu + Button.
- **Desktop**: logo left (height ≈ 62 px), menu centre-right, yellow button far right ("Book a discovery call").
- **Mobile**: logo left, Wix hamburger menu right. The CTA lives inside the mobile menu (add as last menu item linking to the booking URL, or use the Wix mobile-only button).
- **Background**: `#FFFFFF`, 1 px bottom border `#DCE1E4`. Sticky/“show on all pages” header.
- **Typography**: Montserrat 600, 15 px, `#36454F`. Current item: 3 px yellow underline. Hover: same underline.
- **Image**: `assets/logo.png` (uploaded unmodified).
- **Link**: button → `https://calendar.app.google/JfC6pZQxHVuuSHKNA`.
- **Behaviour**: sticky header; submenus open on hover.

## 1. HOME — HERO
- **Wix**: Strip → 2 columns (Wix Columns or a Container + Image). Left: eyebrow text, H1, paragraph, 2 buttons. Right: image with a yellow rectangle behind it (a Wix Box, `#F1BC06`, radius 14, offset 25 px right/down, sent behind the image) and a small slate Box overlay with a number text.
- **Desktop**: 55 / 45 split, image 470 × 590 px, rounded 14 px.
- **Mobile**: image first (centred, 340 px wide), then text; buttons full width and stacked.
- **Background**: `#FFFFFF`.
- **Typography**: Eyebrow 12 caps `#36454F`, short yellow line (Wix Line, 26 × 3 px) to its left. H1 56 px/700 `#36454F`. Underline on "How we lead through them is not." = yellow Box (height 10 px) behind the text, or text highlight. Lead 20 px.
- **Image**: Adina portrait (`adina-portrait.jpg`, orig. `IMG_3855.JPG`).
- **Buttons**: Primary "Book a discovery call" → `https://calendar.app.google/JfC6pZQxHVuuSHKNA`; Ghost "Here as an individual?" → `/traumainformedcoaching`.
- **Behaviour**: fade-in on load.

## 2. CREDENTIAL BAND
- **Wix**: Strip (slate) with 4 text boxes, each with a 3 px yellow vertical Line on its left.
- **Desktop**: 4 across. **Mobile**: stacked (1 column).
- **Background**: `#36454F`. **Text**: white, bold line 16 px + regular line 15 px. Links (CIPD, NeuroMindfulness Institute) white, underlined.
- **Links**: https://www.cipd.org · https://neuromindfulnessinstitute.com/

## 3. HOME — INTRODUCTION (editorial)
- **Wix**: Strip → image left, text right. Yellow L-shaped corner = two thin yellow Boxes/Lines behind the image's bottom-left.
- **Desktop**: 40 / 60. **Mobile**: image on top, text below.
- **Background**: white. **Typography**: eyebrow, H2 40 px, body 17 px max width ≈ 640 px.
- **Image**: `about-adina-2.jpg` (orig. `562f27_d3dde093…jpg`, from /about).
- **Button**: Dark "My credentials" → `/about`.

## 4. SOLUTIONS (3 cards)
- **Wix**: Strip (tint) → section heading (centred) → **Repeater** (3 items) or three Boxes. Each card: Box (white, 1 px `#DCE1E4`, radius 14) containing image (16:11), eyebrow, H3, paragraph, text-link button. A 64 × 5 px yellow Box sits on the card's top-left edge.
- **Desktop**: 3 across, gap 32. **Mobile**: stacked.
- **Background**: `#F4F6F7`. **Hover**: card lifts 6 px (Wix hover box effect) / image zoom is optional.
- **Images**: Coaching `coaching-notes.jpg`; Workshops `workshops-together.jpg`; Community `bg-generic-2.jpg` (word cloud).
- **Links**: `/traumainformedcoaching`, `/workshops`, `/join-the-club` ("Read more →").

## 5. TRAUMA-INFORMED WORKPLACE (scan-friendly)
- **Wix**: Strip → left column: eyebrow, H2, 2 paragraphs, "pills" (4 small Boxes with 1.5 px slate border, radius 999), ghost button; right column: 3 white cards (number pill in yellow, H3, short text).
- **Desktop**: 55 / 45. **Mobile**: stacked, cards full width.
- **Background**: white. **Link**: ghost "More about me" → `/about`.
- **Image**: none (type-led). Copy comes from /about ("Steady leadership for work's hardest moments") and the "Working with me" principles on /traumainformedcoaching.

## 6. RESEARCH / REPORT BAND
- **Wix**: Strip (slate) → left: eyebrow, H2, lead, button; right: image with white border + shadow; below: 3 stat blocks (yellow top Line, big number 52 px yellow, white 15 px caption).
- **Desktop**: 55 / 45, then 3 columns of stats. **Mobile**: stacked, stats in one column.
- **Background**: `#36454F`. **Text**: white; numbers `#F1BC06`.
- **Image**: `report-snapshot-1.jpg` (orig. `562f27_9126a247…png`, from /insights).
- **Button**: Primary "Read the full report" → `/insights`.
- **Note**: the live site says the *survey* ran Oct 2025–Jun 2026 and the report is now available, so there is no "Take the Survey" CTA/URL to link to.

## 7. BLOG / INSIGHTS (editorial)
- **Wix**: Strip → heading; **featured post** (Blog "Post list" element or custom: image 4:3 left, meta + H3 + excerpt + text link right); below a **list** of 3 rows (thumb 180 px, meta, title, "Read →"). Use the Wix Blog "Post list – Editorial/List layout" if you want it connected live.
- **Desktop**: feature 55 / 45; rows = thumb | text | link. **Mobile**: stacked, row thumbs 16:9 above title.
- **Background**: white. Meta 14 px `#566570` (use `#36454F` at 80 % opacity). Titles 22 px/700.
- **Images**: see Asset Inventory (blog thumbs). **Links**: each → the live `/post/<slug>` page; "All posts" → `/blog`.

## 8. FINAL CTA BAND
- **Wix**: Strip (slate) → eyebrow, H2, lead, two buttons. Decorative yellow corner brackets = two Lines/Boxes at 50 % opacity (optional).
- **Background**: `#36454F`. **Text**: white. Buttons: Primary yellow → booking URL; Ghost white outline → `/contact`.
- **Copy** reused from the Coaching page ("Want to have a free and confidential exploratory chat?").

## 9. NEWSLETTER STRIP
- **Wix**: Strip (tint) → text left; right: Wix **Subscribe form** or Input + Button.
- **Desktop**: 2 columns. **Mobile**: stacked, button full width.
- **Behaviour**: use the existing Wix newsletter form/automation. The live site's "Register HERE" goes to `/newsletter-sign-up`; keep that, or embed the same Wix Form here. (The HTML prototype submits to `newsletter-sign-up.html`, which mimics that.)
- Keep "No events at the moment" text from the live home page (turn off when events exist).

## FOOTER (all pages)
- **Wix**: Footer strip → logo in a white rounded Box, short description, 3 link columns (Solutions / Insights / About & contact), bottom bar with copyright and privacy link.
- **Desktop**: 4 columns (1.5 : 1 : 1 : 1). **Mobile**: stacked.
- **Background**: `#36454F`, 6 px yellow top border. **Text**: white 15 px; column titles yellow 12 px caps; link hover yellow.
- **Links**: all live pages + `mailto:traumaatwork@outlook.com`. No social links exist on the live site, so none are shown.
- Include the "Cookie Settings" link if your cookie banner provides one (the privacy notice mentions it).

---

## INNER PAGES

### Common "Page hero"
Strip `#36454F` · eyebrow + H1 (white, 52 px) + lead (white) + optional image right (4:3, rounded 14, 4 px translucent white border). Mobile: stacked, text first. Yellow corner bracket decoration optional.

### /traumainformedcoaching
1. Page hero (H1 "Trauma informed coaching services", lead "Want to have a free and confidential exploratory chat?", Primary button → **https://calendly.com/adina-traumaatwork/discovery**, image `coaching-notes.jpg`).
2. White strip: left H2, right lead + tick list (7 items; yellow tick icons = Wix bullets/shape).
3. Tint strip: heading + paragraph (link "trauma-informed care principles" → gov.uk page) + 2 × 2 principle cards (number pill, H3, text); mobile 1 column.
4. CTA band + newsletter + footer.

### /workshops
1. Page hero: quote as H1 + "(Ken Blanchard)" in yellow; image `workshops-together.jpg`.
2. White strip: H2 left, intro text right.
3. Tint strip: 3 workshop rows (image | H2, paragraph, "Suitable for" tint box with bullet list, yellow "Register interest" button → `/register-interest`). Alternate image side on desktop; mobile image on top. Images: Trauma in the Workplace `workshops-working.jpg`; Trauma Informed Leadership `workshops-together.jpg`; Working with Traumatised Clients `workshops-jason-goodman.jpg`.

### /join-the-club (Community)
1. Page hero (H1 "Seen and supported, while building the life you choose.", "Join today" button scrolls to plans, price line "£12/month | £125/year", image `bg-generic-2.jpg`).
2. "Why this exists" strip (heading left, 3 paragraphs right).
3. Tint strip: "What you get" 3 numbered cards. (The August theme and call date, "Thu 27 Aug, 3pm BST (10am ET)", are copied from the live page and are now out of date — update.)
4. "Is this for you?" two lists (ticks vs. crosses) + bordered notice box with NHS link `https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/`.
5. Slate strip "Pick your plan": 2 white plan cards. **Use the existing Wix Pricing Plans elements** (Monthly £12 / Annual £125, "Save £19 against monthly"). In the HTML prototype the buttons link to the live page.

### /insights (The Adversity & Work report)
1. Page hero + `report-snapshot-2.jpg`.
2. Intro text + `report-snapshot-1.jpg`.
3. Slate strip: key findings (3 stats).
4. White strip: left heading, right **Wix Form** card (First name*, Last name*, Company name, Position, Email* with hint, checkbox "stay in touch", button "Email me the report"). Reuse the live Wix Form and its automation (it emails the report).

### /blog
Page hero + 2-column card grid (image, meta, title, excerpt, link). In Wix use the Blog app's feed (Grid layout, 2 columns). Posts stay at `/post/<slug>`.

### /about
Page hero with `about-adina-1.jpg` (square crop, top-aligned) → statement + 2 paragraphs → tint strip: qualifications tick list (links to cipd.org, neuromindfulnessinstitute.com, traumaresearchfoundation.org, ukpts.org, estss.org) + `adina-portrait.jpg`.

### /contact
White strip: left eyebrow, H1 "HOW CAN I HELP?", text, email link, ghost booking button; right: form card (First name*, Last name*, Email*, Company name, Position, Your query*, Submit). Reuse the live Wix contact form.

### /register-interest and /newsletter-sign-up
Same two-column layout (text left, form card right). Fields exactly as on the live site (workshop dropdown includes the 4th option "Managing Interview Mindset and Emotions"; newsletter form includes the interest radio group and the consent checkbox). Reuse the existing Wix Forms.

### /privacy-notice
Page hero + single narrow text column (max 46 em). Paste the existing text; headings H2 (22 px), bullets standard.

---

## Things that cannot be exactly reproduced in Classic Editor (use these workarounds)
| Prototype feature | Wix Classic workaround |
|---|---|
| Image with offset yellow block | Image over a yellow Box placed behind, offset by ~25 px |
| Overlapping badge on hero image | Slate Box + text, layered above the image |
| Card hover lift | Box hover effect (Wix "Hover Box" / button hover); or skip |
| Active-page underline in menu | Menu "Selected" state styling |
| Gradient / dotted decorations | Not used. Corner brackets are optional lines |
| Scroll fade-ins | Wix Entrance animations |
| Prototype form "success note" | Wix Form success message |
