import { CaseStudyLayout, CsBlock, SolutionScreens, CaseSteps, CsStep, Figure, StepImage, Pair, Pull } from '../../components/CaseStudyTemplate.jsx';

/* ==========================================================================
   CASE STUDY 04 — PLACEHOLDER ("Coming soon")      address: /work/project-name
   🥚 Right now this is the Easter-egg row: on Home/Projects it links to /contact
      (meta.href). The page below is a blank template.

   ✏️ TO TURN THIS INTO A REAL PROJECT:
     1. Fill in `meta` (title, description, role, year, slug…)
     2. Delete the `href: '/contact'` line so the row opens this page
     3. Replace the placeholder text and images below
   ✏️ TO START ANOTHER PROJECT: copy this file, rename it, and add it to
      src/data/projects.js (see the instructions there).
   ========================================================================== */

const PH = 'Placeholder copy. Replace with this project’s content.';
const T = 'Two or three sentences. Specific and unflattering; this is the section interviewers quote back to you.';

export const meta = {
  slug: 'project-name', // URL: /work/project-name
  href: '/contact', // 🥚 Easter egg: Home/Projects rows link here instead of the case study. Delete when ready.
  number: '04',
  title: 'Coming soon',
  description: 'Your project could be here...',
  role: 'Role · Year',
  year: 'Year',
  cover: '',
  coverAlt: '',
  video: '',
  preview: ['It is well known that, for many years, Easter eggs have been rare to find. If you got here, congrats! Message me and we’ll talk about your reward.'],
  details: [
    { label: 'Role', value: 'Role · Year' },
    { label: 'Timeline', value: 'Year' },
    { label: 'Team', value: 'Placeholder' },
    { label: 'Tools', value: 'Placeholder' },
  ],
};

/** A generic step: intro, wide image, two paragraphs, two half images. */
function TemplateStep({ num }) {
  return (
    <CsStep num={num} head={<p className="pdl-t-body">{T}</p>}>
      <Figure n={num} />
      <Pair>
        <p className="pdl-t-body">{T}</p>
        <p className="pdl-t-body">{T}</p>
        <StepImage size="half" n={num} />
        <StepImage size="half" n={num} />
      </Pair>
    </CsStep>
  );
}

export default function Placeholder() {
  return (
    <CaseStudyLayout meta={meta}>
      <CsBlock n="01" label="THE CHALLENGE" title="Placeholder Problem Title">
        <p className="pdl-t-lead">{PH}</p>
      </CsBlock>

      <CsBlock cls="cs-solution" n="02" label="Solution" title="Placeholder Solution Title">
        <p className="pdl-t-lead">{PH}</p>
      </CsBlock>
      <SolutionScreens />

      <CsBlock n="03" label="Outcomes" title="Placeholder Outcomes Title">
        <div className="cs-outcome-row">
          <div className="cs-outcome-text">
            <p className="pdl-t-lead">{PH}</p>
            <p className="pdl-t-lead">{PH}</p>
          </div>
          {/* ⚠️ This quote is Flow State's text (carried over from the design) — replace it. */}
          <Pull>Designed in partnership with Immersive International, the program focuses on upskilling and reskilling equity-seeking creators through a hands-on, mentorship-driven model.</Pull>
        </div>
      </CsBlock>

      <CsBlock cls="cs-reflection" n="04" label="Reflection" title="What would I do differently?">
        <p className="pdl-t-lead">{PH}</p>
      </CsBlock>

      <CsBlock cls="cs-indepth" eyebrow="[In Depth]" title="Placeholder Process Title">
        <p className="pdl-t-lead"></p>
      </CsBlock>

      {/* No labels → the progress bar shows "Title #1…5" and steps show "[Step 1]…" */}
      <CaseSteps>
        <TemplateStep num={1} />
        <TemplateStep num={2} />
        <TemplateStep num={3} />
        <TemplateStep num={4} />
        <TemplateStep num={5} />
      </CaseSteps>
    </CaseStudyLayout>
  );
}
