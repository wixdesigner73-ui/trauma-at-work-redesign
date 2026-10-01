// Static page generator: shared header/footer + page bodies -> plain HTML files.
// Run: node build.js   (output files are standalone HTML; no runtime dependency)
const fs = require('fs');
const path = require('path');

const SITE = 'https://www.traumaatwork.com';
const BOOK = 'https://calendar.app.google/JfC6pZQxHVuuSHKNA';      // used on the live home page
const BOOK_COACHING = 'https://calendly.com/adina-traumaatwork/discovery'; // used on the live coaching page
const EMAIL = 'traumaatwork@outlook.com';                           // from the live privacy notice
const LOGO_ALT = 'Trauma At Work – Lead Through logo';

const posts = [
  { title: 'Managers are Not Therapists (And Shouldn’t Be)', date: 'Feb 13, 2026', author: 'Adina Dinu', read: '2 min read',
    url: SITE + '/post/managers-are-not-therapists', img: 'assets/images/bg-generic-2.jpg', alt: 'Topics related to mental health and wellbeing conversations',
    excerpt: 'Trauma informed leadership assumes at least one team member has PTSD or CPTSD, instead of trying to identify individual cases.' },
  { title: 'Beyond the Deficit Angle: Post-Traumatic Growth', date: 'Nov 24, 2025', author: 'Adina Dinu', read: '2 min read',
    url: SITE + '/post/beyond-the-deficit-angle-post-traumatic-growth', img: 'assets/images/blog-topics.jpg', alt: 'Marble statue with gold-filled cracks',
    excerpt: 'Explore how trauma shapes thoughts, feelings, and behaviours — and how post-traumatic growth can uncover resilience and strengths you may not yet see.' },
  { title: 'Trauma At Work: Why It’s Time to Talk', date: 'Oct 27, 2025', author: 'Adina Dinu', read: '2 min read',
    url: SITE + '/post/trauma-at-work-why-it-s-time-to-talk', img: 'assets/images/blog-alone.jpg', alt: 'A person alone, hardly visible, yearning for connection',
    excerpt: 'Why trauma belongs in workplace conversations. A warm, witty take on stigma, silence, and the cost of staying professionally composed.' },
  { title: 'Understanding Trauma: Neurobiology, Moving On, and Trauma-Informed Practice', date: 'Sep 22, 2025', author: 'Adina Dinu', read: '4 min read',
    url: SITE + '/post/understanding-trauma-neurobiology-moving-on-and-trauma-informed-practice', img: 'assets/images/blog-kintsugi.jpg', alt: 'Brain scan images',
    excerpt: 'Explore the impact of trauma on the brain and body and discover the importance of trauma-informed practice.' },
];
// NOTE: managers-are-not-therapists uses the site's shared "generic" artwork (562f27_dc5a...), shipped as bg-generic-2.jpg.
// NOTE: beyond-the-deficit post image on the live site is the 562f27_db7c... file (blog-topics.jpg) etc. See ASSET-INVENTORY.md.

const nav = [
  { label: 'Home', href: 'index.html' },
  { label: 'Solutions', sub: [
    { label: 'Coaching', href: 'traumainformedcoaching.html' },
    { label: 'Workshops', href: 'workshops.html' },
    { label: 'Community', href: 'join-the-club.html' } ] },
  { label: 'Insights', sub: [
    { label: 'The Adversity & Work report', href: 'insights.html' },
    { label: 'Blog', href: 'blog.html' } ] },
  { label: 'About', href: 'about.html' },
  { label: 'Contact', href: 'contact.html' },
];

function header(active) {
  const items = nav.map((n) => {
    if (n.sub) {
      const cur = n.sub.some((s) => s.href === active);
      const id = 'sub-' + n.label.toLowerCase();
      return `<li class="has-sub${cur ? ' is-current' : ''}">
            <button class="nav-btn" type="button" aria-expanded="false" aria-controls="${id}">${n.label}<span class="caret" aria-hidden="true"></span></button>
            <ul class="submenu" id="${id}">${n.sub.map((s) => `<li><a href="${s.href}"${s.href === active ? ' aria-current="page"' : ''}>${s.label}</a></li>`).join('')}</ul>
          </li>`;
    }
    return `<li><a href="${n.href}"${n.href === active ? ' aria-current="page"' : ''}>${n.label}</a></li>`;
  }).join('\n          ');
  return `<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html"><img src="assets/logo.png" alt="${LOGO_ALT}" width="1200" height="528"></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span></button>
    <nav class="nav" id="site-nav" aria-label="Main">
      <ul class="nav-list">
          ${items}
      </ul>
      <a class="btn btn--primary nav-cta" href="${BOOK}">Book a discovery call</a>
    </nav>
  </div>
</header>`;
}

function newsletter() {
  return `<section class="newsletter" aria-labelledby="news-h">
  <div class="container newsletter-inner">
    <div>
      <h2 id="news-h">Would you like to stay in touch?</h2>
      <p>Register for exclusive updates. <span class="muted">No events at the moment.</span></p>
    </div>
    <!-- WIX: replace with the existing newsletter link/form. Live site sends visitors to /newsletter-sign-up. -->
    <form class="inline-form" action="newsletter-sign-up.html" method="get">
      <div class="field"><label class="sr-only" for="nl-email" style="position:absolute;left:-9999px">Email</label>
        <input id="nl-email" name="email" type="email" placeholder="Email" autocomplete="email" required></div>
      <button class="btn btn--dark" type="submit">Join now</button>
    </form>
  </div>
</section>`;
}

function ctaBand() {
  return `<section class="cta-band" aria-labelledby="cta-h">
  <div class="container cta-inner reveal">
    <span class="eyebrow">Let’s talk</span>
    <h2 id="cta-h">Want to have a free and confidential exploratory chat?</h2>
    <p class="lead">Whether you are an HR or people leader, or here as an individual, the first step is a conversation.</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="${BOOK}">Book a discovery call</a>
      <a class="btn btn--ghost" href="contact.html">Get in touch</a>
    </div>
  </div>
</section>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html"><img src="assets/logo.png" alt="${LOGO_ALT}" width="1200" height="528"></a>
        <p>Trauma-informed HR consulting, training and speaking, helping HR and people leaders prevent and reduce psychological harm.</p>
      </div>
      <nav aria-label="Solutions"><h4>Solutions</h4><ul>
        <li><a href="traumainformedcoaching.html">Coaching</a></li>
        <li><a href="workshops.html">Workshops</a></li>
        <li><a href="join-the-club.html">Community</a></li>
        <li><a href="register-interest.html">Register interest</a></li></ul></nav>
      <nav aria-label="Insights"><h4>Insights</h4><ul>
        <li><a href="insights.html">The Adversity &amp; Work report</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="newsletter-sign-up.html">Newsletter</a></li></ul></nav>
      <nav aria-label="About and contact"><h4>About &amp; contact</h4><ul>
        <li><a href="about.html">About Adina</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="${BOOK}">Book a discovery call</a></li>
        <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
        <li><a href="privacy-notice.html">Privacy notice</a></li></ul></nav>
    </div>
    <div class="footer-bottom"><span>© 2025 by Trauma At Work Ltd.</span><a href="privacy-notice.html">Privacy notice</a></div>
  </div>
</footer>`;
}

function page({ file, title, desc, active, body, noFooterExtras }) {
  const url = file === 'index.html' ? SITE + '/' : SITE + '/' + file.replace('.html', '');
  const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<link rel="icon" type="image/png" href="assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
${header(active || file)}
<main id="main">
${body}
</main>
${noFooterExtras ? '' : ctaBand()}
${newsletter()}
${footer()}
<script src="assets/js/main.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(__dirname, file), html);
}

const arrow = '<span class="arr" aria-hidden="true">→</span>';

/* ======================= HOME ======================= */
const postFeature = posts[0];
const postRows = posts.slice(1).map((p) => `
      <article class="post-row reveal">
        <a class="thumb" href="${p.url}" tabindex="-1" aria-hidden="true"><img src="${p.img}" alt="" loading="lazy"></a>
        <div>
          <p class="post-meta"><span>${p.author}</span><span>${p.date}</span><span>${p.read}</span></p>
          <h3><a class="post-title-link" href="${p.url}" style="text-decoration:none">${p.title}</a></h3>
        </div>
        <a class="text-link go" href="${p.url}" aria-label="Read: ${p.title}">Read ${arrow}</a>
      </article>`).join('');

page({
  file: 'index.html',
  title: 'Post trauma support in the workplace for individuals and teams',
  desc: 'Trauma-informed HR support and leadership development for depleted, demoralised teams and professionals growing after adversity.',
  body: `
<section class="hero" aria-labelledby="hero-h">
  <div class="container hero-grid">
    <div class="reveal">
      <span class="eyebrow">Trauma-informed HR consulting &bull; Training &bull; Speaking</span>
      <h1 id="hero-h">Difficult moments are inevitable. <span class="accent" style="display:inline-block;margin-top:.08em">How we lead through them is not.</span></h1>
      <p class="lead">I help HR and people leaders prevent and reduce psychological harm, so employees can just get on with the job.</p>
      <div class="btn-row">
        <a class="btn btn--primary" href="${BOOK}">Book a discovery call</a>
        <a class="btn btn--ghost" href="traumainformedcoaching.html">Here as an individual? ${arrow}</a>
      </div>
    </div>
    <div class="hero-media reveal reveal-d1">
      <img src="assets/images/adina-portrait.jpg" alt="Adina Dinu, trauma-informed coach, speaker, trainer and HR consultant" width="1200" height="1600">
      <div class="hero-badge"><strong>20+ years</strong>in recruitment, talent and leadership development</div>
    </div>
  </div>
</section>

<section class="cred-band" aria-label="Credentials at a glance">
  <div class="container">
    <ul class="cred-list">
      <li><strong>20+ years</strong>of corporate HR experience</li>
      <li><strong>M.Sc. &amp; B.A.</strong>HR Management and Psychology</li>
      <li><strong>Chartered Member</strong>of the <a href="https://www.cipd.org">CIPD</a></li>
      <li><strong>NeuroMindfulness® Coach</strong>Practitioner, <a href="https://neuromindfulnessinstitute.com/">NeuroMindfulness Institute</a></li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="intro-h">
  <div class="container split split--wide-right">
    <div class="portrait reveal"><img src="assets/images/about-adina-2.jpg" alt="Portrait of Adina Dinu smiling" loading="lazy" width="855" height="1282"></div>
    <div class="reveal reveal-d1">
      <span class="eyebrow">Hello, I’m Adina</span>
      <h2 id="intro-h">A trauma-informed coach, speaker, trainer, and HR consultant.</h2>
      <div class="prose">
        <p>Before setting up my own business, I spent 20+ years in recruitment, talent, and leadership development with some of the biggest brands in the world.</p>
        <p>Through both my work and a personal experience of building a career while recovering from trauma, I’ve seen firsthand how unrecognised psychological harm can last for years and affect careers, relationships, wellbeing, team effectiveness, and business outcomes. I’ve also discovered that HR teams and team leaders rarely have the awareness and capabilities they need to spot psychosocial risks and injury, and take effective action.</p>
        <p>That’s what I do today. I help HR and team leaders lay healthy foundations, on which psychological safety, resilience and performance can be built to last.</p>
      </div>
      <div class="btn-row"><a class="btn btn--dark" href="about.html">My credentials</a></div>
    </div>
  </div>
</section>

<section class="section section--tint" aria-labelledby="sol-h">
  <div class="container">
    <div class="section-head section-head--center reveal">
      <span class="eyebrow">Solutions</span>
      <h2 id="sol-h">Support that meets you where you are</h2>
    </div>
    <div class="grid grid-3">
      <article class="card reveal">
        <div class="card-img"><img src="assets/images/coaching-notes.jpg" alt="A professional working with a phone and laptop beside a bright window" loading="lazy"></div>
        <div class="card-body"><span class="eyebrow">Coaching</span>
          <h3>Your time, your goals, at your pace.</h3>
          <p>Trauma-informed coaching for professionals and leaders who want to meet work and career challenges with more clarity, emotional safety, and resilience.</p>
          <a class="text-link" href="traumainformedcoaching.html" style="align-self:flex-start">Read more ${arrow}</a></div>
      </article>
      <article class="card reveal reveal-d1">
        <div class="card-img"><img src="assets/images/workshops-together.jpg" alt="A team working together around a desk" loading="lazy"></div>
        <div class="card-body"><span class="eyebrow">Workshops</span>
          <h3>Aha moments, peer support, collaborative problem solving. Your tribe awaits.</h3>
          <p>Immersive, interactive sessions with small groups of 6–8 participants who are seeking answers to similar questions.</p>
          <a class="text-link" href="workshops.html" style="align-self:flex-start">Read more ${arrow}</a></div>
      </article>
      <article class="card reveal reveal-d2">
        <div class="card-img"><img src="assets/images/bg-generic-2.jpg" alt="Words including mental health, resilience, compassion, trust and psychological safety" loading="lazy"></div>
        <div class="card-body"><span class="eyebrow">Community</span>
          <h3>A safe, supportive space for people navigating work after adversity.</h3>
          <p>A collective space for those of us still growing after life and work’s biggest challenges.</p>
          <a class="text-link" href="join-the-club.html" style="align-self:flex-start">Read more ${arrow}</a></div>
      </article>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="tiw-h">
  <div class="container">
    <div class="split split--wide-left">
      <div class="reveal">
        <span class="eyebrow">Steady leadership for work’s hardest moments</span>
        <h2 id="tiw-h">Turning traumatic stress from a blind spot into something leaders can prevent, recognise and respond to.</h2>
        <div class="prose">
          <p>Work comes with all sorts of challenges. Whether it’s redundancies, workplace investigations, a lack of psychological safety, or employees navigating grief, abuse or illness in their personal lives, leaders and HR teams are asked to deliver results with people who are having a hard time.</p>
          <p>My mission is to strengthen individual and collective resilience and capacity by turning traumatic stress from a blind spot into something leaders can prevent, recognise and respond to with confidence and compassion.</p>
        </div>
        <ul class="chips" aria-label="Challenges leaders and HR teams face">
          <li>Redundancies</li><li>Workplace investigations</li><li>Psychological safety</li><li>Grief, abuse or illness</li>
        </ul>
        <div class="btn-row"><a class="btn btn--ghost" href="about.html">More about me</a></div>
      </div>
      <div class="principles reveal reveal-d1" style="grid-template-columns:1fr">
        <div class="principle"><span class="num">01</span><h3>Your story comes first</h3><p>What I care most about is your unique experience and perspective. Together we honour everything you’ve been through up to this point, and build from there with kindness and compassion.</p></div>
        <div class="principle"><span class="num">02</span><h3>Trust is paramount</h3><p>Clear expectations, transparent communication, and following through on what we say, when we say it.</p></div>
        <div class="principle"><span class="num">03</span><h3>Safety and agency</h3><p>Psychological safety and personal agency are the bedrock of the strategies and solutions we explore together.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="section section--dark" aria-labelledby="rep-h">
  <div class="container split split--wide-left">
    <div class="reveal">
      <span class="eyebrow">Research</span>
      <h2 id="rep-h">How does our experience of adversity affect work, and vice versa?</h2>
      <p class="lead">The Adversity &amp; Work Survey ran from October 2025 to June 2026 and explored the unique perspectives of workers with lived experience of adversity.</p>
      <div class="btn-row"><a class="btn btn--primary" href="insights.html">Read the full report</a></div>
    </div>
    <div class="report-media reveal reveal-d1">
      <img src="assets/images/report-snapshot-1.jpg" alt="Adversity &amp; Work Survey report snapshot: 67% of respondents had more than 20 years of work experience; 47% were private sector employees" loading="lazy">
    </div>
  </div>
  <div class="container">
      <div class="stats" style="margin-top:clamp(40px,6vw,72px)">
        <div class="stat"><span class="big">2 in 5</span><p>respondents have recently taken time off to deal with the impact of adverse experiences.</p></div>
        <div class="stat"><span class="big">1 in 4</span><p>respondents do not feel safe or ready to talk to their line manager about the impact adversity has on their work.</p></div>
        <div class="stat"><span class="big">83%</span><p>of participants would feel safer and more engaged in a workplace that made an effort to become trauma-informed.</p></div>
      </div>
  </div>
</section>

<section class="section" aria-labelledby="ins-h">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Blog &amp; insights</span>
      <h2 id="ins-h">Writing on trauma, work and leadership</h2>
    </div>
    <article class="post-feature reveal">
      <a class="thumb" href="${postFeature.url}" tabindex="-1" aria-hidden="true"><img src="${postFeature.img}" alt="" loading="lazy"></a>
      <div>
        <p class="post-meta"><span>${postFeature.author}</span><span>${postFeature.date}</span><span>${postFeature.read}</span></p>
        <h3 class="post-title" style="font-size:clamp(1.5rem,2.6vw,2.1rem)"><a href="${postFeature.url}">${postFeature.title}</a></h3>
        <p>${postFeature.excerpt}</p>
        <a class="text-link" href="${postFeature.url}">Read the post ${arrow}</a>
      </div>
    </article>
    <div class="post-list">${postRows}
    </div>
    <div class="btn-row"><a class="btn btn--ghost" href="blog.html">All posts</a></div>
  </div>
</section>`,
});

/* ======================= COACHING ======================= */
page({
  file: 'traumainformedcoaching.html',
  title: 'Trauma-Informed coaching',
  desc: 'Trauma-informed coaching for professionals and leaders who want to meet work and career challenges with more clarity, emotional safety, and resilience.',
  active: 'traumainformedcoaching.html',
  body: `
<section class="page-hero">
  <div class="container split">
    <div class="reveal">
      <span class="eyebrow">Coaching</span>
      <h1>Trauma informed coaching services</h1>
      <p class="lead">Want to have a free and confidential exploratory chat?</p>
      <div class="btn-row"><a class="btn btn--primary" href="${BOOK_COACHING}">Book a discovery call</a></div>
    </div>
    <img class="page-hero-img reveal reveal-d1" src="assets/images/coaching-notes.jpg" alt="A professional working with a phone and laptop beside a bright window">
  </div>
</section>

<section class="section">
  <div class="container split split--wide-right">
    <div class="reveal">
      <h2>I coach professionals and leaders who want to meet work and career challenges with more clarity, emotional safety, and resilience.</h2>
    </div>
    <div class="reveal reveal-d1">
      <p class="lead">If you’ve been through something very difficult – at work or in your personal life – you’re not alone. This space is for you if:</p>
      <ul class="ticks">
        <li>You’re making sense of something painful or confusing that’s impacting your confidence, focus, or wellbeing at work</li>
        <li>You’ve experienced abuse or bullying and you don’t feel safe talking about it with anyone at work</li>
        <li>You feel overwhelmed, stuck, or constantly on edge, and traditional career advice or coaching just doesn’t seem to help</li>
        <li>You’re dealing with a difficult manager or team and need a way to protect your energy while staying true to your goals</li>
        <li>You want to build stronger boundaries, and resilience that’s more than just “pushing through”</li>
        <li>You’re curious about how your personal story shapes your leadership style, decisions, and relationships</li>
        <li>You’re leading someone who’s been through trauma and you want to support them, but you’re unsure what to do or say.</li>
      </ul>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Working with me</span>
      <h2>What sets this coaching apart</h2>
      <p>Like many coaches, I draw on a variety of frameworks to guide clients through self-discovery and change. What sets me apart is that I maintain a trauma-informed perspective on our work at all times, and build <a href="https://www.gov.uk/government/publications/working-definition-of-trauma-informed-practice/working-definition-of-trauma-informed-practice">trauma-informed care principles</a> in every observation, conversation and option we create together. My HR experience also helps me understand my clients’ professional goals and experiences in depth, and support them to come up with effective solutions.</p>
      <p><strong>What this means in practice:</strong></p>
    </div>
    <div class="principles">
      <div class="principle reveal"><span class="num">01</span><h3>Your story comes first</h3><p>Outside norms, rules, and expectations are fine, but what I care most about is your unique experience and perspective. Together we honour everything you’ve been through up to this point, recognise cultural and systemic factors that may be at play, and build from there with kindness and compassion.</p></div>
      <div class="principle reveal reveal-d1"><span class="num">02</span><h3>Trust is paramount</h3><p>We’re intentional in setting clear expectations and communicating with transparency. We’re careful not to overpromise, and we follow through on what we say, when we say it.</p></div>
      <div class="principle reveal"><span class="num">03</span><h3>We acknowledge the body-mind connection</h3><p>My work is informed by the science of our nervous system, e.g. the polyvagal theory. We’ll use the messages of your body as input for reflection and decision making.</p></div>
      <div class="principle reveal reveal-d1"><span class="num">04</span><h3>We prioritise your sense of agency and physical, psychological and relational safety</h3><p>I don’t believe in any outcomes that come at the expense of your core emotional needs. Psychological safety and personal agency are the bedrock of our relationship and the strategies and solutions we explore together.</p></div>
    </div>
  </div>
</section>`,
});

/* ======================= WORKSHOPS ======================= */
const ws = (img, alt, h, body, suit, last) => `
    <div class="workshop">
      <div class="workshop-media reveal"><img src="assets/images/${img}" alt="${alt}" loading="lazy"></div>
      <div class="reveal reveal-d1">
        <h2 style="font-size:clamp(1.5rem,2.6vw,2rem);letter-spacing:.02em">${h}</h2>
        ${body}
        <div class="suitable"><h4>Suitable for:</h4><ul>${suit.map((s) => `<li>${s}</li>`).join('')}</ul></div>
        <div class="btn-row"><a class="btn btn--primary" href="register-interest.html">Register interest</a></div>
      </div>
    </div>`;

page({
  file: 'workshops.html',
  title: 'Trauma-Informed Workshops for Individuals &amp; Teams | Trauma At Work',
  desc: 'Immersive, interactive trauma-informed workshops for small groups of 6–8 participants: Trauma in the Workplace, Trauma Informed Leadership, and Working with Traumatised Clients.',
  body: `
<section class="page-hero">
  <div class="container split">
    <div class="reveal">
      <span class="eyebrow">Workshops</span>
      <h1 class="quote" style="color:#fff">“None of us is as smart as all of us.”</h1>
      <p class="quote-cite" style="color:var(--yellow)">(Ken Blanchard)</p>
    </div>
    <img class="page-hero-img reveal reveal-d1" src="assets/images/workshops-together.jpg" alt="A team working together around a desk">
  </div>
</section>

<section class="section">
  <div class="container split split--wide-right">
    <div class="reveal">
      <h2>Something remarkable happens when people committed to a shared goal come together.</h2>
    </div>
    <div class="reveal reveal-d1 prose">
      <p class="lead">Something remarkable happens when people committed to a shared goal come together in a space that fosters connection, authenticity, and vulnerability.</p>
      <p><strong>Transformation becomes not only possible, but inevitable.</strong></p>
      <p>It’s not magic, it’s human nature. Given the right tools and environment, everyone moves closer to their goals. Resources are unearthed, new capabilities emerge, and previously unseen possibilities take shape.</p>
      <p>I facilitate immersive, interactive sessions with small groups of 6–8 participants who are seeking answers to similar questions. Before each session, I interview every participant to ensure the group is aligned in terms of need, intention, and approach.</p>
      <p>Together, we explore science, theory and the lived experience within the group. We gain new insights and perspectives, co-create solutions, and practice new skills, ensuring every participant feels seen, heard, and supported.</p>
    </div>
  </div>
</section>

<section class="section section--tint" style="padding-top:clamp(24px,4vw,48px)">
  <div class="container">
${ws('workshops-working.jpg', 'A person writing notes at a laptop beside a bright window', 'TRAUMA IN THE WORKPLACE',
  `<p>This introductory workshop explores the concept of trauma — not just as an individual experience, but as a lens for understanding employee wellbeing and performance, team dynamics, and leadership behaviours. Participants will gain foundational insight into trauma-informed principles and begin to see how relational safety, emotional regulation, and systemic awareness can transform the way we lead, collaborate, and support one another at work.</p>`,
  ['people affected by personal or workplace trauma who want to understand better the relationship between their story and their career', 'people working with someone impacted by trauma, e.g. line managers, mentors, coaches, HR', 'employee experience, future of work and mental health in the workplace specialists.'])}
${ws('workshops-together.jpg', 'A team working together around a desk', 'TRAUMA INFORMED LEADERSHIP',
  `<p>This workshop introduces the principles of trauma-informed leadership, offering a compassionate and practical approach to leading in a world where many employees have been exposed to inequity, violence, discrimination, loss, and overwhelming change. Through interactive exercises and reflective dialogue, we explore how personal and collective trauma shape workplace behaviours and team dynamics, we learn how to recognise signs of dysregulation, respond with attunement, and create environments where people feel seen, supported, and empowered.</p>`,
  ['Leaders concerned about the social, cultural and political events that affect the mental health of their teams', 'Line managers who have a trauma survivor in their team, and are unsure how to manage them', 'Learning and HR professionals who want to stay at the forefront of leadership theory and practice.'])}
${ws('workshops-jason-goodman.jpg', 'A team in a meeting room looking at a screen, with sticky notes on the wall', 'WORKING WITH TRAUMATISED CLIENTS',
  `<p>This workshop is designed for career, leadership and executive coaches who want to deepen their capacity to support clients with trauma histories. We explore how trauma—particularly relational and developmental trauma—can shape career decisions, leadership behaviours, and coaching dynamics. We discuss myths about trauma that can undermine your ability to facilitate positive change in your clients, and how to determine if your client requires additional help. Whether you’re working with high-achievers, career changers, or leaders in transition, this session equips you with trauma-informed tools to navigate complexity with care, responsibility and confidence.</p>`,
  ['All leadership, career and executive coaches', 'Coaching thought leaders, and coaches with supervision or teaching responsibilities', 'HR professionals who regularly coach others as part of their job.'])}
  </div>
</section>`,
});

/* ======================= COMMUNITY ======================= */
page({
  file: 'join-the-club.html',
  title: 'Community | Trauma At Work',
  desc: 'A collective space for those of us still growing after life and work’s biggest challenges.',
  body: `
<section class="page-hero">
  <div class="container split">
    <div class="reveal">
      <span class="eyebrow">Community</span>
      <h1>Seen and supported, while building the life you choose.</h1>
      <p class="lead">A collective space for those of us still growing after life and work’s biggest challenges.</p>
      <div class="btn-row"><a class="btn btn--primary" href="#plans">Join today</a></div>
      <p style="margin-top:1.2rem;font-weight:600">£12/month &nbsp;|&nbsp; £125/year</p>
    </div>
    <img class="page-hero-img reveal reveal-d1" src="assets/images/bg-generic-2.jpg" alt="Words including mental health, resilience, compassion, trust and psychological safety">
  </div>
</section>

<section class="section">
  <div class="container split split--wide-right">
    <div class="reveal"><span class="eyebrow">Why this exists</span><h2>It doesn’t have to be this hard</h2></div>
    <div class="reveal reveal-d1 prose">
      <p>Wherever you choose to go, you can get there by yourself. You probably have the smarts, the willpower, the tools and insights, and at least one safe person in your life you can talk to, otherwise you wouldn’t be here.</p>
      <p>But everything gets quicker in good company. No single book or therapist can know it all. The power of a group of people who know exactly what you mean because they’ve lived it too never ceases to amaze me. That collective, hard-won wisdom is worth more than any one voice.</p>
      <p>Also, the spaces where we can just be ourselves and grow — unsure, unpolished, asking for help, practising what we’re not good at yet — keep shrinking as we become the people others depend on. So we are building one - a place where we can drop the mask and get on with the work, together.</p>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">What you get</span><h2>Three things, each month</h2></div>
    <div class="grid grid-3">
      <div class="principle reveal"><span class="num">01</span><h3>One monthly theme</h3><p>Content and conversations each month are centred on one core topic.</p><p class="muted" style="margin-top:.8em"><!-- STALE on live site: August 2026 details; update in Wix -->In August our theme is: sources of stress at work.</p></div>
      <div class="principle reveal reveal-d1"><span class="num">02</span><h3>One live group call</h3><p>One insight, framework or case study from me, then a conversation about what it means for you.</p><p class="muted" style="margin-top:.8em">Our August call takes place on: Thu 27 Aug, 3pm BST (10am ET).</p></div>
      <div class="principle reveal reveal-d2"><span class="num">03</span><h3>One private chat</h3><p>Regular check-ins and nudges, in-the-moment questions and support.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Is this for you?</span><h2>What you should know before you join</h2></div>
    <div class="grid grid-2">
      <div class="reveal"><h3>This is for you if…</h3>
        <ul class="ticks"><li>You’re not in any danger or crisis</li><li>You’re rebuilding or growing after difficult experiences at work or in your personal life</li><li>You’ve been diagnosed with PTSD/cPTSD and you’re figuring out how it may affect your work</li><li>You feel well enough to function, e.g. at work, as a parent etc.</li></ul></div>
      <div class="reveal reveal-d1"><h3>This is NOT for you if…</h3>
        <ul class="ticks ticks--no"><li>You often feel very sad, agitated, overwhelmed, or numb</li><li>You get frequent flashbacks, or spend a lot of time thinking about the past</li><li>You feel cut off from your life and the people around you</li><li>Some days you’re unable to carry out simple, routine activities.</li></ul></div>
    </div>
    <div class="notice reveal" style="margin-top:36px" role="note"><strong>If this is you, please seek support from your GP or a mental health professional.</strong> For anyone living in the UK, here’s how to get support for a mental health emergency: <a href="https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/">Where to get urgent help for mental health – NHS</a>.</div>
  </div>
</section>

<section class="section section--dark" id="plans" aria-labelledby="plans-h">
  <div class="container">
    <div class="section-head section-head--center reveal"><span class="eyebrow">Join now</span><h2 id="plans-h">Pick your plan</h2></div>
    <div class="plans">
      <!-- WIX: connect to the existing Wix Pricing Plans (Monthly / Annual). Links below go to the live page. -->
      <div class="plan reveal"><h3>Monthly</h3><div class="price">£12<small>/month</small></div><p>Cancel anytime.</p><a class="btn btn--dark" href="${SITE}/join-the-club">Subscribe monthly</a></div>
      <div class="plan reveal reveal-d1"><h3>Annual</h3><div class="price">£125<small>/year</small></div><p>Save £19 against monthly.</p><a class="btn btn--dark" href="${SITE}/join-the-club">Subscribe yearly</a></div>
    </div>
  </div>
</section>`,
});

/* ======================= INSIGHTS (report) ======================= */
const formField = (id, label, req, type = 'text', extra = '') => `<div class="field"><label for="${id}">${label}${req ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label><input id="${id}" name="${id}" type="${type}"${req ? ' required' : ''}${extra}></div>`;

page({
  file: 'insights.html',
  title: 'The Adversity &amp; Work report',
  desc: 'How does our experience of adversity affect work, and vice versa? Request your free copy of The Adversity & Work report.',
  active: 'insights.html',
  body: `
<section class="page-hero">
  <div class="container split">
    <div class="reveal">
      <span class="eyebrow">Research</span>
      <h1>How does our experience of adversity affect work, and vice versa?</h1>
      <p class="lead">Whatever your job is, chances are that someone you work with has been through something very difficult.</p>
    </div>
    <img class="page-hero-img reveal reveal-d1" src="assets/images/report-snapshot-2.jpg" alt="Adversity &amp; Work Survey report media snapshot: a bar chart of adverse experiences reported by participants" style="aspect-ratio:auto;object-fit:contain;background:#fff">
  </div>
</section>

<section class="section">
  <div class="container split split--wide-right">
    <div class="reveal prose">
      <p class="lead">Most of us experience big challenges, at work or outside of it. Poor health, bullying, harassment, domestic violence or abuse can affect a person’s ability to bring their best to work - unless employers know how to support them effectively.</p>
      <p>Unfortunately, that’s not something we find easy to talk about. HR and Wellbeing professionals are at the forefront of this challenge. They’re expected to tackle engagement, productivity, sickness leave rates and design inclusive employee initiatives, often without the insights they need.</p>
    </div>
    <div class="reveal reveal-d1">
      <img src="assets/images/report-snapshot-1.jpg" alt="Adversity &amp; Work Survey report snapshot: 67% of respondents had more than 20 years of work experience; 47% were private sector employees" style="border-radius:14px;border:1px solid var(--line)" loading="lazy">
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Key findings</span><h2>The Adversity &amp; Work Survey ran from October 2025 to June 2026 and explored the unique perspectives of workers with lived experience of adversity.</h2></div>
    <div class="stats">
      <div class="stat reveal"><span class="big">2 in 5</span><p>Two in five respondents have recently taken time off to deal with the impact of adverse experiences.</p></div>
      <div class="stat reveal reveal-d1"><span class="big">1 in 4</span><p>One in four respondents do not feel safe or ready to talk to their line manager about the impact adversity has on their work.</p></div>
      <div class="stat reveal reveal-d2"><span class="big">83%</span><p>83% of participants would feel safer and more engaged in a workplace that made an effort to become trauma-informed.</p></div>
    </div>
  </div>
</section>

<section class="section" id="report" aria-labelledby="rep-form-h">
  <div class="container split split--wide-right" style="align-items:start">
    <div class="reveal">
      <span class="eyebrow">Read the full report</span>
      <h2 id="rep-form-h">The Adversity &amp; Work report is available now.</h2>
      <p class="lead">To request your free copy, fill in the form.</p>
    </div>
    <div class="form-card reveal reveal-d1">
      <!-- WIX: replace with a Wix Form (fields below) that emails the report. -->
      <form class="form" data-wix-form>
        <div class="form-row">${formField('first', 'First name', true, 'text', ' autocomplete="given-name"')}${formField('last', 'Last name', true, 'text', ' autocomplete="family-name"')}</div>
        <div class="form-row">${formField('company', 'Company name', false, 'text', ' autocomplete="organization"')}${formField('position', 'Position', false, 'text', ' autocomplete="organization-title"')}</div>
        <div class="field"><label for="email">Email <span class="req" aria-hidden="true">*</span></label><input id="email" name="email" type="email" required autocomplete="email" aria-describedby="email-hint"><span class="hint" id="email-hint">This is where your report will be sent</span></div>
        <label class="check"><input type="checkbox" name="stay-in-touch"> <span>I’d like to stay in touch and receive news and updates from Trauma At Work.</span></label>
        <button class="btn btn--primary" type="submit" style="justify-self:start">Email me the report</button>
        <p class="form-note" tabindex="-1" role="status">Prototype: in Wix this button submits the Wix Form. Nothing has been sent.</p>
      </form>
    </div>
  </div>
</section>`,
  noFooterExtras: false,
});

/* ======================= BLOG ======================= */
page({
  file: 'blog.html',
  title: 'Trauma-Informed Blog &amp; Insights | Trauma At Work',
  desc: 'Writing by Adina Dinu on trauma, adversity, post-traumatic growth and trauma-informed leadership at work.',
  active: 'blog.html',
  body: `
<section class="page-hero">
  <div class="container reveal">
    <span class="eyebrow">Insights</span>
    <h1>All posts</h1>
    <p class="lead">Writing on trauma, work and leadership by Adina Dinu.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="blog-grid">
${posts.map((p, i) => `
      <article class="card reveal${i % 2 ? ' reveal-d1' : ''}">
        <a class="card-img" href="${p.url}" tabindex="-1" aria-hidden="true"><img src="${p.img}" alt="" loading="lazy"></a>
        <div class="card-body">
          <p class="post-meta"><span>${p.author}</span><span>${p.date}</span><span>${p.read}</span></p>
          <h3 class="post-title"><a href="${p.url}">${p.title}</a></h3>
          <p>${p.excerpt}</p>
          <a class="text-link" href="${p.url}" style="align-self:flex-start">Read the post ${arrow}</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`,
});

/* ======================= ABOUT ======================= */
page({
  file: 'about.html',
  title: 'About Adina Dinu | Trauma-Informed HR and Leadership Development',
  desc: 'Adina Dinu is an HR consultant, trainer and coach specialised in psychosocial risks and trauma-informed leadership.',
  body: `
<section class="page-hero">
  <div class="container split">
    <div class="reveal">
      <span class="eyebrow">About</span>
      <h1>Steady leadership for work’s hardest moments</h1>
      <p class="lead">I’m Adina Dinu - an HR consultant, trainer and coach specialised in psychosocial risks and trauma-informed leadership.</p>
      <div class="btn-row"><a class="btn btn--primary" href="${BOOK}">Book a discovery call</a></div>
    </div>
    <img class="page-hero-img portrait-crop reveal reveal-d1" src="assets/images/about-adina-1.jpg" alt="Adina Dinu smiling, wearing a mustard cardigan">
  </div>
</section>

<section class="section">
  <div class="container split split--wide-right">
    <div class="reveal"><h2>I help HR professionals and leaders manage workplace conflict, burnout and crisis with more than just process and compliance.</h2></div>
    <div class="reveal reveal-d1 prose">
      <p>Work comes with all sorts of challenges. Whether it’s redundancies, workplace investigations, a lack of psychological safety, or employees navigating grief, abuse or illness in their personal lives, leaders and HR teams are asked to deliver results with people who are having a hard time.</p>
      <p>My mission is to strengthen individual and collective resilience and capacity by turning traumatic stress from a blind spot into something leaders can prevent, recognise and respond to with confidence and compassion.</p>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="container split split--wide-left" style="align-items:start">
    <div class="reveal">
      <span class="eyebrow">My qualifications</span>
      <h2>Experience, education and professional bodies</h2>
      <ul class="ticks" style="margin-top:1.6rem">
        <li>20+ years of corporate HR experience</li>
        <li>M.Sc. in HR Management, B.A. in Psychology</li>
        <li>Chartered Member of the <a href="https://www.cipd.org">CIPD</a>, the UK’s leading HR professional body</li>
        <li>Certified NeuroMindfulness® Coach Practitioner by <a href="https://neuromindfulnessinstitute.com/">The NeuroMindfulness Institute</a></li>
        <li>Certificate in the Traumatic Stress Studies Certificate Program from the <a href="https://traumaresearchfoundation.org/">Trauma Research Foundation</a></li>
        <li>Member of the <a href="https://ukpts.org/">UK Psychological Trauma Society</a> and the <a href="https://estss.org/">European Society for Traumatic Stress Studies</a></li>
      </ul>
    </div>
    <div class="portrait reveal reveal-d1"><img src="assets/images/adina-portrait.jpg" alt="Adina Dinu in a blue patterned blouse, smiling" loading="lazy"></div>
  </div>
</section>`,
});

/* ======================= CONTACT ======================= */
page({
  file: 'contact.html',
  title: 'Contact Adina Dinu | Trauma At Work',
  desc: 'Get in touch with Adina Dinu at Trauma At Work. Responses within 2 business days.',
  body: `
<section class="section">
  <div class="container split split--wide-right" style="align-items:start">
    <div class="reveal">
      <span class="eyebrow">Contact</span>
      <h1 style="font-size:clamp(2rem,4vw,3rem)">HOW CAN I HELP?</h1>
      <p class="lead">Use this form to get in touch - I aim to respond within max. 2 business days.</p>
      <p>Prefer email? <a href="mailto:${EMAIL}">${EMAIL}</a></p>
      <div class="btn-row"><a class="btn btn--ghost" href="${BOOK}">Book a discovery call</a></div>
    </div>
    <div class="form-card reveal reveal-d1">
      <!-- WIX: replace with a Wix Form: First name*, Last name*, Email*, Company name, Position, Your query* -->
      <form class="form" data-wix-form>
        <h2 style="font-size:1.4rem">How can I help?</h2>
        <div class="form-row">${formField('first', 'First name', true, 'text', ' autocomplete="given-name"')}${formField('last', 'Last name', true, 'text', ' autocomplete="family-name"')}</div>
        ${formField('email', 'Email', true, 'email', ' autocomplete="email"')}
        <div class="form-row">${formField('company', 'Company name', false, 'text', ' autocomplete="organization"')}${formField('position', 'Position', false, 'text', ' autocomplete="organization-title"')}</div>
        <div class="field"><label for="query">Your query <span class="req" aria-hidden="true">*</span></label><textarea id="query" name="query" required></textarea></div>
        <button class="btn btn--primary" type="submit" style="justify-self:start">Submit</button>
        <p class="form-note" tabindex="-1" role="status">Prototype: in Wix this button submits the Wix Form. Nothing has been sent.</p>
      </form>
    </div>
  </div>
</section>`,
  noFooterExtras: true,
});

/* ======================= REGISTER INTEREST ======================= */
page({
  file: 'register-interest.html',
  title: 'Sign up for updates on Trauma At Work workshops and events',
  desc: 'Register your interest in one or more Trauma At Work workshops.',
  active: 'workshops.html',
  body: `
<section class="section">
  <div class="container split split--wide-right" style="align-items:start">
    <div class="reveal">
      <span class="eyebrow">Workshops</span>
      <h1 style="font-size:clamp(2rem,4vw,3rem)">Register your interest</h1>
      <p class="lead">Use this form to register your interest for one or more Trauma At Work workshops, and I’ll be in touch shortly with more information.</p>
      <div class="btn-row"><a class="btn btn--ghost" href="workshops.html">Back to workshops</a></div>
    </div>
    <div class="form-card reveal reveal-d1">
      <!-- WIX: replace with a Wix Form: First name*, Last name, Email*, Company name, Position, Which workshop* -->
      <form class="form" data-wix-form>
        <div class="form-row">${formField('first', 'First name', true, 'text', ' autocomplete="given-name"')}${formField('last', 'Last name', false, 'text', ' autocomplete="family-name"')}</div>
        ${formField('email', 'Email', true, 'email', ' autocomplete="email"')}
        <div class="form-row">${formField('company', 'Company name', false, 'text', ' autocomplete="organization"')}${formField('position', 'Position', false, 'text', ' autocomplete="organization-title"')}</div>
        <div class="field"><label for="workshop">Which workshop are you interested in? <span class="req" aria-hidden="true">*</span></label>
          <select id="workshop" name="workshop" required><option value="">Select a workshop</option><option>Trauma in the Workplace</option><option>Trauma Informed Leadership</option><option>Managing Interview Mindset and Emotions</option><option>Working With Traumatized Clients</option></select></div>
        <button class="btn btn--primary" type="submit" style="justify-self:start">Submit</button>
        <p class="form-note" tabindex="-1" role="status">Prototype: in Wix this button submits the Wix Form. Nothing has been sent.</p>
      </form>
    </div>
  </div>
</section>`,
  noFooterExtras: true,
});

/* ======================= NEWSLETTER ======================= */
page({
  file: 'newsletter-sign-up.html',
  title: 'Newsletter registration | Trauma At Work',
  desc: 'Fill in this form to receive exclusive updates from Trauma At Work.',
  active: 'insights.html',
  body: `
<section class="section">
  <div class="container split split--wide-right" style="align-items:start">
    <div class="reveal">
      <span class="eyebrow">Newsletter</span>
      <h1 style="font-size:clamp(2rem,4vw,3rem)">Newsletter registration</h1>
      <p class="lead">Fill in this form to receive exclusive updates:</p>
    </div>
    <div class="form-card reveal reveal-d1">
      <!-- WIX: replace with the existing newsletter Wix Form: Email*, First name*, Last name, Company name, Position, interest, consent -->
      <form class="form" data-wix-form>
        ${formField('email', 'Email', true, 'email', ' autocomplete="email"')}
        <div class="form-row">${formField('first', 'First name', true, 'text', ' autocomplete="given-name"')}${formField('last', 'Last name', false, 'text', ' autocomplete="family-name"')}</div>
        <div class="form-row">${formField('company', 'Company name', false, 'text', ' autocomplete="organization"')}${formField('position', 'Position', false, 'text', ' autocomplete="organization-title"')}</div>
        <fieldset class="field radio-group"><legend>What are you interested in?</legend>
          <label class="check"><input type="radio" name="interest" value="hr"> <span>Updates for HR and people leaders</span></label>
          <label class="check"><input type="radio" name="interest" value="individuals"> <span>Updates for individuals</span></label>
          <label class="check"><input type="radio" name="interest" value="both"> <span>Both</span></label></fieldset>
        <label class="check"><input type="checkbox" name="consent" required> <span>I want to subscribe to your mailing list. <span class="req" aria-hidden="true">*</span></span></label>
        <button class="btn btn--primary" type="submit" style="justify-self:start">Sign me up</button>
        <p class="form-note" tabindex="-1" role="status">Prototype: in Wix this button submits the Wix Form. Nothing has been sent.</p>
      </form>
    </div>
  </div>
</section>`,
  noFooterExtras: true,
});

/* ======================= PRIVACY ======================= */
const privacy = fs.readFileSync(path.join(__dirname, 'privacy-body.html'), 'utf8');
page({
  file: 'privacy-notice.html',
  title: 'Privacy notice | Trauma At Work',
  desc: 'How Trauma At Work Ltd. collects, uses and protects your personal information.',
  active: 'privacy-notice.html',
  body: `
<section class="page-hero"><div class="container reveal"><span class="eyebrow">Legal</span><h1>Privacy Notice</h1><p class="lead">(Last updated: 1 September 2025)</p></div></section>
<section class="section"><div class="container"><div class="legal">${privacy}</div></div></section>`,
  noFooterExtras: true,
});

console.log('built');
