import { Button } from '../../components/GlobalComponents.jsx';
import { CaseStudyLayout, CsBlock, SolutionScreens, Metrics, CaseSteps, CsStep, Figure, StepImage, Pair, Quote } from '../../components/CaseStudyTemplate.jsx';

/* ==========================================================================
   CASE STUDY 01 — INSTRUCTO      address: /work/instructo
   Images: public/images/instructo/  →  write "/images/instructo/<file>"
   ========================================================================== */

// ✏️ EDIT: project details — also used on Home (Featured Work), Projects and "Next project".
export const meta = {
  slug: 'instructo', // URL: /work/instructo
  number: '01',
  title: 'Instructo',
  description: 'A learning app built for entrepreneurs to share their business knowledge. And help them grow, improve and take their business to the next level.',
  short: 'A learning app that helps entrepreneurs grow their business.', // shown instead of `description` on phones (Home rows)
  role: 'Lead Designer &\nLead UX Researcher', // "\n" = line break on Home/Projects rows
  year: '2025', // shown instead of `description` on phones (Home rows)
  cover: '', // e.g. '/images/instructo/cover.jpg' (16:7) — Projects card + top of this page
  coverAlt: '',
  video: '', // e.g. '/videos/instructo.mp4' — plays when hovering the row on Home
  preview: ['Start-ups are failing faster than they can turn a profit. How can we turn the experiences of those who succeeded into lessons for the ventures still finding their way? Instructo turns that hard-won experience into something any entrepreneur can learn from.'],
  details: [
    { label: 'Role', value: 'Lead Designer & Lead UX Researcher' },
    { label: 'Timeline', value: '2025 (6 Months)' },
    { label: 'Team', value: 'Solo Project\nMatthew Sharpe (Professor)\nRahul Kapoor (Professor)' },
    { label: 'Tools', value: 'Figma, FigJam, Jitter, Premiere, After Effects' },
  ],
};

// ✏️ EDIT: button links ('#' = not set yet)
const LINKS = { prototype: '#', video: 'https://youtu.be/H3hG2ACb8OQ' };

// ✏️ EDIT: numbers (used twice each below)
const STARTUP_STATS = [
  { value: '90%', head: 'of start-ups fail', text: 'Depending on the landscape and market, around 90% of start-ups fail at surviving.', source: '(Founders Forum group)', sourceUrl: 'https://ff.co/startup-statistics-guide/#:~:text=90%25%20of%20startups%20fail%20overall' },
  { value: '50%', head: 'of start-ups won\'t last 5 years', text: 'According to U.S Bureau of Labour Statistics, in 2024, around 50% of small businesses will not last 5 years.', source: '(U.S. Chamber of Commerce)', sourceUrl: 'https://www.uschamber.com/co/start/strategy/why-small-businesses-fail#:~:text=The%20real%20small,first%20five%20years' },
  { value: '$78bn', head: 'in start-up valuation', text: 'Is the start-up valuation in the Toronto-Waterloo area alone from 2023-2025.', source: '(Startup Genome)', sourceUrl: 'https://startupgenome.com/ecosystems/toronto-waterloo' },
];
const SURVEY_RESULTS = [
  { value: '85%', head: 'Of surveyed users', text: 'agreed on using the app to share their success story, and/or facilitate a course.' },
  { value: '4/5', head: 'Of surveyed users', text: 'Agreed that they would use the app.' },
  { value: '5/5', head: 'Of surveyed users', text: 'Found the app interesting, and/or useful for their personal growth or business.' },
];

const BLUE = 'var(--blue)'; // step labels are blue on this project

export default function Instructo() {
  return (
    <CaseStudyLayout meta={meta}>
      {/* ---------- 01 · The Challenge ---------- */}
      <CsBlock n="01" label="THE CHALLENGE" title="Start-ups are dying... What can we do to help them survive?">
        <p className="pdl-t-lead">Entrepreneurs, small companies, and freelancers in North America are growing in number, but their chances of survival are not. How can we empower them with the right tools and information to make their ideas last?</p>
        <Metrics items={STARTUP_STATS} />
      </CsBlock>

      {/* ---------- 02 · The Question ---------- */}
      <CsBlock cls="cs-question" n="02" label="THE QUESTION" title="How might we...">
        <Quote>Empower individuals to start, expand, and diversify their businesses by giving them easier access to the right support and information?</Quote>
      </CsBlock>

      {/* ---------- 03 · Solution ---------- */}
      <CsBlock cls="cs-solution" n="03" label="Solution" title="Introducing Instructo">
        <p className="pdl-t-lead">Seeing how accelerators and other business resources helped entrepreneurs, I asked myself, how could these benefits be applied to a digital learning tool for entrepreneurs? <br /><br /> Here's how it turned out, from onboarding to promotion. This MVP reflects an initial version of instructo</p>
        <div style={{ display: 'flex', gap: 15 }}><Button href={LINKS.prototype}>Final Prototype</Button>
        <Button href={LINKS.video} variant="outline" target="_blank" rel="noopener noreferrer">Final Video</Button></div>
      </CsBlock>
      {/* ✏️ IMAGES: wide="/images/instructo/solution-wide.jpg" left="…" right="…" */}
      <SolutionScreens />

      {/* ---------- 04 · Outcomes ---------- */}
      <CsBlock n="04" label="Outcomes" title="Instructo’s V1 Impact">
        <p className="pdl-t-lead">Instructo is a learning app where entrepreneurs, freelancers and small business owners share their business knowledge and experiences, to help each other gather knowledge to improve and succeed. This is the feedback from surveyed users suggests the idea works.</p>
        <Metrics items={SURVEY_RESULTS} />
      </CsBlock>

      {/* ---------- 05 · Reflection ---------- */}
      <CsBlock cls="cs-reflection" n="05" label="Reflection" title="What would I do differently?">
        <p className="pdl-t-lead">Looking forward, there are a few design details I would improve. I would also move the app into a beta phase and invite real business owners to share their stories, so the app gets populated with actual content.</p>
      </CsBlock>

      {/* ---------- In Depth (blue band) ---------- */}
      <CsBlock cls="cs-indepth" eyebrow="[In Depth]" title="How Instructo was created...">
        <p className="pdl-t-lead"></p>
      </CsBlock>

      {/* ---------- Process steps ---------- */}
      <CaseSteps>
        {/* Step 1 */}
        <CsStep accent={BLUE} label="RESEARCH" title="Where it all Started?"
          head={<>
            <p className="pdl-t-body">While I was choosing a thesis topic, A business owner close to me had run his company for over ten years, and during a talk, I ask him about the most difficult thing he ever did in his life. His answer? Starting his own company. Hearing about his story of how he worked through different obstacles to keep his company alive made me feel inspired. But it also made me wonder: what if the lessons of experienced business makers could be shared as advice for others?</p>
            <Metrics items={STARTUP_STATS} />
            <p className="pdl-t-body" style={{ maxWidth: 'none', marginTop: 32 }}>These numbers made me curious about what separates start-ups that last from those that don’t, so I went to the source and asked business owners directly.</p>
          </>}>
          <Figure n={1} />
          <Pair>
            <p className="pdl-t-body">To test that idea, I ran interviews, surveys and field studies with around 25 business owners in Canada, the United States, Mexico and Colombia, from start-ups (1–3 years) to established companies (10+ years) across a range of industries.</p>
            <p className="pdl-t-body">I supplemented this with published research and survey data on the start-up landscape in the same markets from 2020 to 2025.</p>
            <StepImage size="half" n={1} />
            <StepImage size="half" n={1} />
            <p className="pdl-t-body cs-step-full">I synthesized the results using the ELITO Method, comparing raw data from interviews and field visits against the broader survey findings. Their business problems were as complex and diverse as the businesses themselves, but one topic kept coming up: learning resources. Entrepreneurs either wanted better access to them or credited their success to guidance from mentors, friends, courses and the business podcasts they listened to every day. This led to a clear research question:</p>
            <Quote>How might we empower individuals to start, expand, and diversify their businesses by giving them easier access to the right support and information?</Quote>
          </Pair>
        </CsStep>

        {/* Step 2 */}
        <CsStep accent={BLUE} label="PLANNING" title="Setting up Instructo"
          head={<p className="pdl-t-body">With the research question defined, I began shaping how the solution would stand out from competitors.</p>}>
          <Figure n={2} />
          <Pair>
            <p className="pdl-t-body">I started with a competitor analysis of existing learning platforms, looking at how they structure lessons and courses, lesson length, business models, onboarding and overall design, and how lessons are sold, presented and watched. This surfaced several pain points, especially in how lessons are framed.</p>
            <div className="pdl-t-body cs-step-points">
              <p>Another gap was that learners rarely get to engage beyond the lesson itself. Instructo would let them:</p>
              <ul className="cs-points">
                <li>Discuss what they’ve learned</li>
                <li>Connect with other students</li>
                <li>Save key moments from a lesson</li>
              </ul>
            </div>
            <StepImage size="half" n={2} />
            <StepImage size="half" n={2} />
            <p className="pdl-t-body cs-step-full">From there, I mapped which flows to tackle first: onboarding and the home screen, with a special focus on how lesson content is displayed.</p>
          </Pair>
        </CsStep>

        {/* Step 3 */}
        <CsStep accent={BLUE} label="PROTOTYPING" title="Building Instructo"
          head={<p className="pdl-t-body">With the flows prioritized, I turned the blueprint into reality by defining key aspects and prototyping the initial mock-ups. Keeping in mind the three key features discussed during planning.</p>}>
          <Figure n={3} />
          <Pair>
            <StepImage size="half" n={3} />
            <StepImage size="half" n={3} />
          </Pair>
        </CsStep>

        {/* Step 4 */}
        <CsStep accent={BLUE} label="TESTING" title="Testing First Iterations..."
          head={
            <div style={{ display: 'flex', gap: 12 }}>
              <p className="pdl-t-body">Once the initial designs were done, I turned back to some of my peer designers for evaluation before taking them back to my interviewees. This proved effective as it improved the overall user-flow, and revealed mistakes. The designers’ feedback was then integrated.</p>
              <p className="pdl-t-body">I also went ahead and showed my design to my interviewees, in hope of feedback on how this platform could be beneficial for them and their business, and if there was something they thought could be included or needed improvement.</p>
            </div>
          }>
          <Figure n={4} />
          <Pair style={{ display: 'flex' }}>
            <p className="pdl-t-body">I put their responses into practice in newer versions of the design. They also showed me what mattered most to my audience: follow-along material, exercises and quizzes that let them test what they learned, rather than long hours of watching courses. That does not mean excluding long material, but making it more interactive. Their feedback was taken into account for future versions, and it still shapes how the app works today.</p>
          </Pair>
        </CsStep>

        {/* Step 5 */}
        <CsStep accent={BLUE} label="FINAL DESIGN" title="Instructo V1"
          head={<>
            <p className="pdl-t-body">In the end, I used Adobe After Effects, Illustrator and Figma to create a 1:30-minute promotional video that demonstrates the app’s features and encourages business owners and start-ups to share their knowledge. You can also try the latest prototype with the button below.</p>
            <div style={{ display: 'flex', gap: 15 }}>
              <Button href={LINKS.prototype}>Final Prototype</Button>
              <a href={LINKS.video} className="pdl-btn pdl-btn-solid pdl-btn-sm cs-btn-inv">Final Video</a>
            </div>
          </>}>
          <Figure n={5} />
          <p className="pdl-t-body">This first test of Instructo as an app left the following conclusions. From a pool of 30+ individuals and companies, surveyed users said:</p>
          <Metrics items={SURVEY_RESULTS} />
        </CsStep>
      </CaseSteps>
    </CaseStudyLayout>
  );
}
