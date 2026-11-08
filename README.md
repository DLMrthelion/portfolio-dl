# David Leon — Portfolio

React + Vite rebuild of the "Editorial Blue" portfolio designed in Claude Design.
Every page and every case study has its own file. All styling lives in **one** CSS file.

> **Look for `✏️ EDIT` comments.** Press `Ctrl+Shift+F` in VS Code, search for `✏️`, and every place you can change text, links or images is listed.

---

## Contents

1. [Preview the site](#1-preview-the-site)
2. [Where everything lives](#2-where-everything-lives)
3. [Change text](#3-change-text)
4. [Add or change images](#4-add-or-change-images)
5. [Add or change videos](#5-add-or-change-videos)
6. [Case studies](#6-case-studies)
7. [Components](#7-components)
8. [Design system (colours, fonts, spacing)](#8-design-system-colours-fonts-spacing)
9. [Add a new page](#9-add-a-new-page)
10. [Publish the site](#10-publish-the-site)
11. [✅ Checklist: what's still needed](#11--checklist-whats-still-needed)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Preview the site

**One-time setup**

1. Install **Node.js** (the "LTS" version) from <https://nodejs.org>.
2. Unzip this folder and open it in VS Code: **File → Open Folder…** and pick the folder that contains `package.json`.
3. Open the terminal: **Terminal → New Terminal**, then run:

```bash
npm install
```

**Every time you work on the site**

```bash
npm run dev
```

Your browser opens at **http://localhost:5173**. Pages live at addresses like `localhost:5173/#/work/famigo`. Leave the terminal running: every time you save a file, the page updates instantly. Press `Ctrl+C` in the terminal to stop.

| Command | What it does |
|---|---|
| `npm run dev` | Live preview while you edit |
| `npm run build` | Makes the final website in the `dist/` folder (this is what gets published) |
| `npm run preview` | Shows that final `dist/` version locally, to double-check before publishing |

---

## 2. Where everything lives

20 code files in total: one per page, one per case study, and a handful of shared pieces.

```
portfolio/
├── index.html                    ← browser-tab title + Google description
├── public/                       ← files served as-is (images, videos, fonts, PDFs)
│   ├── images/
│   │   ├── logo.svg              ← the round logo in the header (also the browser-tab icon)
│   │   ├── about/                ← About page images
│   │   ├── instructo/            ← one folder per project
│   │   ├── flow-state/
│   │   └── famigo/
│   ├── videos/                   ← hover-preview videos
│   ├── files/                    ← your resume PDF goes here
│   └── fonts/                    ← font files
└── src/
    ├── styles/
    │   └── design-system.css     ← ALL styling: colours, fonts, spacing, every page
    ├── data/
    │   ├── site.js               ← shared text: socials, services, testimonials, footer, menu…
    │   └── projects.js           ← the ORDER of projects
    ├── pages/
    │   ├── Home.jsx              ← #/      Hero, Featured Work, Testimonials, Work Approach, Services
    │   ├── Projects.jsx          ← #/work
    │   ├── About.jsx             ← #/about  intro, "What does he like?", Iconic Lines (+ Services from Home)
    │   ├── Contact.jsx           ← #/contact
    │   └── case-studies/
    │       ├── Instructo.jsx     ← #/work/instructo
    │       ├── FlowState.jsx     ← #/work/flow-state
    │       ├── FamiGO.jsx        ← #/work/famigo
    │       └── Placeholder.jsx   ← #/work/project-name (template for new projects)
    ├── components/               ← shared building blocks (you rarely need to edit these)
    │   ├── GlobalComponents.jsx  ← Button, SectionHeader, ImageSlot (used on several pages)
    │   ├── CaseStudyTemplate.jsx ← every case-study block (layout, steps, images, metrics…)
    │   ├── Navbar.jsx            ← sticky header + full-screen menu + light/dark toggle
    │   ├── Footer.jsx
    │   ├── BackToTop.jsx
    │   ├── HeroGradient.jsx      ← live orange + blue gradient behind the Home page
    │   └── CustomCursor.jsx      ← the blue ball cursor (desktop only)
    ├── lib/
    │   └── asset.js              ← asset('/images/x.jpg') → works on GitHub Pages and Vercel
    ├── App.jsx                   ← which page shows at which address
    └── main.jsx                  ← starts the app (no need to touch)
```

---

## 3. Change text

| I want to change… | Open |
|---|---|
| Home hero headline (typewriter phrases `TYPE_A` / `TYPE_B`), intro, section headings | `src/pages/Home.jsx` |
| Testimonials, "My Work Approach" columns, services list | `src/data/site.js` |
| "My Services" heading + note (shown on Home **and** About) | `src/pages/Home.jsx` → `Services` |
| Social links, footer call-to-action, menu items, resume path | `src/data/site.js` |
| About bio, "What does he like?", Iconic Lines | `src/pages/About.jsx` |
| Contact heading, intro, extra chips | `src/pages/Contact.jsx` |
| Projects page heading | `src/pages/Projects.jsx` |
| A project's title, description, short phone description (`short`), role, year, team, tools | the top (`meta`) of its file in `src/pages/case-studies/` |
| A case study's sections | the same case-study file |
| Browser-tab titles | `src/App.jsx` (`TITLES`) and `index.html` |

**Tips**

- Words wrapped in `<span className="pdl-serif" …>` show in the **blue italic serif**.
- Inside `'single quotes'`, use curly apostrophes (`’`) or escape straight ones (`\'`).
- In text written between tags (JSX), a few characters need care: write `{'{'}` for `{`, and `&amp;` or `{'&'}` for `&` if VS Code complains.
- `"\n"` inside a string makes a line break where the design allows it (roles, team lists, progress-bar labels).
- `className="pdl-t-lead"` = large intro text · `className="pdl-t-body"` = normal paragraph text.

---

## 4. Add or change images

**The one rule:** put the file inside `public/`, then write its path **starting with `/` and without `public`**.

```
public/images/instructo/cover.jpg   →   "/images/instructo/cover.jpg"
```

Use lowercase file names with no spaces (`step-1-research.jpg`, not `Step 1 Research.JPG`). Keep images under ~500 KB: export at about 2400 px wide max, as JPG or WebP.

Every grey placeholder box on the site can take an image. When an image is set, it fills the box and is cropped to fit. When it's empty, the grey box and its label come back.

| Where | How |
|---|---|
| **Project cover** (Projects card + top of the case study, 16:7) | In the case study's `meta`: `cover: '/images/famigo/cover.jpg', coverAlt: 'FamiGO app screens'` |
| **Solution screens** (3 boxes under "Solution") | `<SolutionScreens wide="/images/famigo/sol-1.jpg" left="/images/famigo/sol-2.jpg" right="/images/famigo/sol-3.jpg" />` |
| **Big image in a step** (2400×920) | `<Figure n={1} image="/images/famigo/research.jpg" alt="…" caption="Caption: …" />` |
| **A photo at its own shape** | `<Figure image="/images/famigo/team.jpg" ratio="4 / 3" alt="…" caption="…" />` |
| **Half-width image in a step** (1200×920) | `<StepImage size="half" image="/images/famigo/flow.jpg" alt="…" />` |
| **Portrait image in a step** (3:4) | `<StepImage size="portrait" image="…" alt="…" />` |
| **About portrait** (4:5) | `src/pages/About.jsx` → `PORTRAIT.image` |
| **Movie / music covers** (2:3) | `src/pages/About.jsx` → `LIKES` → each item's `cover` |
| **Testimonial photos** (round, 50 px) | `src/data/site.js` → each testimonial's `avatar` |
| **Logo** | Replace `public/images/logo.svg` (same file name). In dark mode it's colour-inverted automatically. |

Always write an `alt` describing the image. Screen readers read it out, and Google uses it.

---

## 5. Add or change videos

Use **MP4 (H.264)** files, ideally under 10 MB, in `public/videos/`.

| Where | How |
|---|---|
| **Hover preview on Home** (plays when someone hovers a project row) | In the case study's `meta`: `video: '/videos/famigo.mp4'` |
| **Video instead of a cover** | `meta.coverVideo: '/videos/famigo-cover.mp4'` |
| **Video in any image box** | Use `video=` instead of `image=`: `<Figure n={2} video="/videos/famigo-demo.mp4" />`, `<StepImage size="half" video="…" />` |

Videos in boxes autoplay muted and loop, like a GIF. For a long video with sound (e.g. YouTube), link to it with a button instead (see `LINKS` at the top of each case study).

---

## 6. Case studies

### Anatomy of a case-study file

```
1. meta          ← title, description, role, year, cover, hover video, Role/Timeline/Team/Tools table
2. LINKS         ← URLs for the buttons (Final Prototype, Watch Video…); '#' = not set yet
3. numbers       ← the big statistics (Metrics)
4. the page:
   <CaseStudyLayout>          title · cover · details table · (your sections) · "next project"
     <CsBlock 01 Challenge>
     <CsBlock 02 Solution>   + <SolutionScreens>
     <CsBlock 03 Outcomes>
     <CsBlock 04 Reflection>
     <CsBlock In Depth>      (blue band)
     <CaseSteps labels=[…]>  sticky progress bar
       <CsStep num={1}> … </CsStep>   one per step
```

### Building blocks (from `src/components/CaseStudyTemplate.jsx`)

| Block | What it is |
|---|---|
| `<CsBlock n label title cls>` | Big section: label + title on the left, content on the right. `cls="cs-solution" / "cs-reflection" / "cs-indepth"` for the variants. |
| `<Metrics items=[…]>` | Row of big blue numbers: `{ value, head, text, source, sourceUrl }` |
| `<Pull>` | Big blue italic pull quote |
| `<Quote>` | Centred blue question spanning both columns (inside `<Pair>`) |
| `<CaseSteps labels=[…]>` | Wraps the steps and draws the progress bar. One label per step. |
| `<CsStep num label title head>` | One step. `head` = intro text/buttons under the title. `num` must go 1, 2, 3… in order. |
| `<Figure>` | Full-width image + caption |
| `<StepImage size>` | `wide` / `half` / `portrait` image |
| `<Pair>` | Two-column grid (stacks on phones). Give a child `className="… cs-step-full"` to span both columns. |
| `<SolutionScreens>` | The 3 screens under the Solution block |

### Add a new project

1. Copy `src/pages/case-studies/Placeholder.jsx` and rename it (e.g. `Lumen.jsx`). Rename `export default function Placeholder` to `Lumen` too.
2. In its `meta`: set a unique `slug` (this becomes the URL, `#/work/lumen`), the `number`, title and so on, and **delete the `href: '/contact'` line**.
3. Open `src/data/projects.js`, import it, and add it to the list:
   ```js
   import Lumen, { meta as lumen } from '../pages/case-studies/Lumen.jsx';
   // …
   { ...lumen, Page: Lumen },
   ```
4. Home, Projects, the page itself and "Next project" all update automatically.

### Reorder or remove projects

Change the order of the list in `src/data/projects.js`, or delete a line to hide that project. Also update the `number` in each `meta`, since numbers aren't calculated automatically.

### The "Coming soon" Easter egg

`Placeholder.jsx` has `href: '/contact'`, so its row on Home/Projects opens Contact instead of the case study. To make it a real project, follow its header comment.

---

## 7. Components

The rule: a piece used on **one** page lives inside that page's file. A piece used on **several** pages lives in `src/components/`.

| Component | File | Used for |
|---|---|---|
| `Button` | `components/GlobalComponents.jsx` | Pill buttons. `variant="solid" \| "outline"`, `size="sm" \| "md"`, `href` makes it a link |
| `SectionHeader` | `components/GlobalComponents.jsx` | `[eyebrow]` + italic serif section title. `tone="blue"` on blue bands |
| `ImageSlot` | `components/GlobalComponents.jsx` | Grey placeholder → image/video |
| Case-study blocks | `components/CaseStudyTemplate.jsx` | See section 6 |
| `Navbar` | `components/Navbar.jsx` | Sticky header, full-screen menu, light/dark toggle |
| `Footer` | `components/Footer.jsx` | Footer (text from `data/site.js`) |
| `BackToTop` | `components/BackToTop.jsx` | Round ↑ button |
| `HeroGradient` | `components/HeroGradient.jsx` | WebGL background on Home (CSS fallback in `design-system.css`) |
| `CustomCursor` | `components/CustomCursor.jsx` | Blue ball cursor, mounted once in `App.jsx` |
| `Hero`, `FeaturedWork`, `Testimonials` (+ `TestimonialCard`), `Approach`, `Services` (+ `ServiceRow`) | `pages/Home.jsx` | Home sections. `Services` is also imported by About. |
| `MeetCard`, `IconicLines` | `pages/About.jsx` | About sections |

To use a global component in a page: `import { Button, SectionHeader, ImageSlot } from '../components/GlobalComponents.jsx';`

**Links:** write normal `<a href="/about">` or `<Button href="/work">`. The site turns these into `#/about` addresses automatically, and Ctrl/Cmd-click and middle-click still open a new tab. A link set to `'#'` does nothing, which is how unfinished buttons behave. Links to other websites should have `target="_blank" rel="noopener"` so they open in a new tab.

---

## 8. Design system (colours, fonts, spacing)

Everything is in **`src/styles/design-system.css`**, split into labeled sections. Search for `§` plus a number to jump:

| § | Section | | § | Section |
|---|---|---|---|---|
| 1 | Fonts | | 9 | Footer |
| 2 | **Colours** (light + dark) | | 10 | Back-to-top button |
| 3 | **Typography** | | 11 | Page headers |
| 4 | Breakpoints | | 12 | Home page |
| 5 | **Spacing & layout** | | 13 | Projects page |
| 6 | Core components | | 14 | Case study pages |
| 7 | Global helpers | | 15 | About page |
| 8 | Header & menu | | 16 | Contact page |

**Common changes**

- **Accent colour:** §2 → `--blue` (and the dark-theme `--blue` just below it).
- **Background / text colour:** §2 → `--white` (page background) and `--ink` (text and lines).
- **Font:** put the font file in `public/fonts/`, add or edit an `@font-face` in §1, then change `--font-sans` (main font) or `--font-display` (italic accent) in §3.
- **Text sizes:** §3. Sizes are fluid `clamp(min, …, max)` values. Change the first and last px numbers.
- **More or less space between sections:** §5 → `--pace` (`0.6` tight · `1` standard · `1.5` airy).
- **Dark mode** is the "Dark theme" button inside the menu. Its colours are the `[data-theme="dark"]` block in §2.

Later rules override earlier ones with the same selector, so when a change doesn't apply, search the file for that class. Another rule further down may be overriding it.

**Fonts used:** Bricolage Grotesque (everything) and Newsreader light italic (accent words). DM Mono from the original export was retired by the design system and isn't included. Labels use Bricolage instead.

---

## 9. Add a new page

1. Create `src/pages/Press.jsx`:
   ```jsx
   import { SectionHeader } from '../components/GlobalComponents.jsx';

   export default function Press() {
     return (
       <section className="pdl-wrap page-head">
         <SectionHeader eyebrow="[in the news]" title="Press" />
         <p className="pdl-t-lead lead">Some intro text.</p>
       </section>
     );
   }
   ```
2. In `src/App.jsx`: `import Press from './pages/Press.jsx';` and add `<Route path="/press" element={<Press />} />`, plus a title in `TITLES`.
3. To show it in the menu and footer, add `{ label: 'Press', href: '/press' }` to `navLinks` in `src/data/site.js`.

---

## 10. Publish the site

Page addresses use `#` (`yoursite.com/#/work/famigo`), so the site works on **any** static host with no extra config. Shared links and page refreshes always land on the right page.

**Easiest: Vercel or Netlify (free)**
1. Put this folder on GitHub (VS Code: **Source Control → Publish to GitHub**).
2. On vercel.com or netlify.com: **Add new project → import the GitHub repo**. They detect Vite automatically. If asked, use build command `npm run build` and output folder `dist`.
3. Each time you push changes to GitHub, the live site updates.
4. Add your custom domain in the host's settings.

**No GitHub needed:** run `npm run build`, then drag the `dist/` folder onto <https://app.netlify.com/drop>.

**GitHub Pages:** `npm run deploy` builds and publishes to the `gh-pages` branch. The site lives under `/portfolio-dl/` there; `vite.config.js` switches the base automatically (`/` on Vercel), and every image/video/PDF path goes through `asset()` so it loads on both. When you add an `<img>` or `<video>` outside `ImageSlot`/`Figure`, wrap its path: `src={asset('/images/…')}`.

---

## 11. ✅ Checklist: what's still needed

Carried over from the design. Nothing below was changed, only flagged.

**Must-do before launch**
- [ ] **Connect the contact form.** It currently pretends to send: it shows "Thanks!", but no message goes anywhere. Easiest option: [Formspree](https://formspree.io) (free). Create a form, then in `src/pages/Contact.jsx` replace the `setTimeout(...)` line under `// TODO` with a `fetch('https://formspree.io/f/<your-id>', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(f) })`.
- [ ] **Resume PDF.** Save it as `public/files/resume.pdf` (path set in `resumeUrl`, `src/data/site.js`). Menu › 05 Resume, Home, About and Contact all open it in a new tab.
- [ ] **Project covers** (16:7), 4 projects: `meta.cover` + `meta.coverAlt`.
- [ ] **Button links still set to `'#'`:**
  - Instructo: Final Prototype, Final Video
  - Flow State: Watch Video, View Study, and team links (POV Film, Immersive International, Gavin Elzinga)
  - FamiGO: Final Prototype, Final Presentation
- [ ] **FamiGO citations:** two say "Citation here", and two have `sourceUrl: '#'`.

**Images & media**
- [ ] Solution screens (3 per project).
- [ ] Step images: Instructo 5 large + 6 half · Flow State 6 large + 8 half · FamiGO 5 large + 6 half + 2 extra wide + 1 portrait.
- [ ] Image captions still read "Caption: the one decision this screen is evidence of."
- [ ] Hover-preview videos on Home (`meta.video`).
- [ ] About: portrait, 5 movie + 5 music covers and titles (currently "Movie title 01"…).
- [ ] Testimonial photos (`avatar`), optional.

**Content to review**
- [ ] All 4 services share the same description.
- [ ] "In Depth" blocks have an empty paragraph (all case studies).
- [ ] About → "Check my Letterboxd" / "Check my Spotify" link to `'#'`. Your Letterboxd URL is already in `site.js`.
- [ ] Date ranges disagree: Home says "From: 2025—2026", Projects says "from 2024 to 2026".
- [ ] Placeholder project: decide whether to keep the Easter egg or make it a real project. Its Outcomes quote is Flow State's text.
- [ ] Iconic Lines likes reset on reload. They're decoration only and aren't saved anywhere.
- [ ] Contact page uses emoji, but the design-system guide says "No emoji". Your call.

**Launch**
- [ ] Choose a host (Vercel/Netlify) and deploy. See section 10.
- [ ] Optional: a custom domain, and a social-share preview image (`og:image` in `index.html`).

---

## 12. Troubleshooting

| Problem | Fix |
|---|---|
| `npm` is not recognized | Install Node.js, then close and reopen VS Code. |
| `npm install` warns about `esbuild` install scripts | Safe to ignore: the site still builds. Or run `npm install-scripts approve esbuild`. |
| Image doesn't show | Check the path starts with `/images/…` (no `public`), and that the file name matches exactly, including capitals and the extension. |
| Page is blank after an edit | Read the red error in the browser or terminal. It's usually a missing quote, bracket or `>` in the file you just saved. `Ctrl+Z` undoes it. |
| Style change has no effect | Another rule further down `design-system.css` may override it. Search for the class name. |

---

### Changes from the Claude Design prototype

- Same visual design. The CSS was merged into one file in the original cascade order.
- The **Tweaks panel** (accent / display type / pacing) was removed. The defaults (Blue, Italic serif, Standard) are locked in, and pacing is still available as `--pace`.
- Each case study is its own file instead of one shared file full of `if project is X` conditions.
- Page addresses keep the prototype's `#` style (`#/work/famigo`), so no host configuration is needed.
- Unused design-system pieces (DM Mono fonts, `ProjectRow`, `Tag` components) were left out. The `Tag` styles stay in the CSS (§6) in case you want them later.

### Landing page updates (Nov 2026)

Ported from the Portfolio artifact:

- **Home background:** live grainy WebGL gradient (orange `#E9915A` + your blue `#455F8A`) fixed behind the whole page. It bends away from the cursor and softens once you scroll past the hero (`components/HeroGradient.jsx`).
- **Cream bands on Home:** Featured Work and Services lose the blue fill so the gradient shows through (`.home .pdl-band`). About still uses the blue Services band.
- **Hero:** typewriter on the two blue italic phrases, line break after “storyteller.”, ink-coloured scroll hint.
- **Featured Work:** “From: 2025—2026” removed. Click opens the project; the hover video preview shows on desktop/tablet only (none on phones). Phones show `meta.short` instead of the full description.
- **Work Approach:** the bottom “Chat with Me” call to action was removed; “I think” dropped from the third column.
- **Header & menu:** greeting removed, logo on the left, new “05 Resume” item (opens the PDF), menu-icon lines 10% closer, and the icon resets to plain lines after closing.
- **Cursor:** blue ball (`components/CustomCursor.jsx`).
- **Footer:** “Have a project in mind? Let’s build it together.”
- **Testimonials:** Omnicorp → Omnicom.
- **About › Iconic Lines:** more space below, 30px top padding on tablet/desktop, full-screen box on phones.
- **Cleanup:** removed 13 unused duplicate files (`components/layout`, `home`, `ui`, `about`, `case-study`), plus the CSS for the removed greeting, date range and Approach call to action.

