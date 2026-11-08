import { Button } from '../../components/GlobalComponents.jsx';
import { CaseStudyLayout, CsBlock, SolutionScreens, Metrics, CaseSteps, CsStep, Figure, StepImage, Pair, Pull } from '../../components/CaseStudyTemplate.jsx';

/* ==========================================================================
   CASE STUDY 03 — FAMIGO      address: /work/famigo
   Images: public/images/famigo/  →  write "/images/famigo/<file>"
   ========================================================================== */

// ✏️ EDIT: project details — also used on Home (Featured Work), Projects and "Next project".
export const meta = {
  slug: 'famigo', // URL: /work/famigo
  number: '03',
  title: 'FamiGO',
  description: 'A central hub for families to find, plan, and record their favourite activities and memories.',
  short: 'A hub for families to plan activities and keep memories.', // shown instead of `description` on phones (Home rows)
  role: 'Researcher &\nUX/UI Designer', // "\n" = line break
  year: '2025',
  cover: '', // e.g. '/images/famigo/cover.jpg' (16:7)
  coverAlt: '',
  video: '', // e.g. '/videos/famigo.mp4' — plays when hovering the row on Home
  preview: ['Teens in Ontario and Alberta spend more than 7.5 hours a day on screens, leaving families with fewer shared moments. This case study covers the research and planning behind FamiGO, from surveys and interviews to prototypes and a first MVP.'],
  details: [
    { label: 'Role', value: 'Researcher &\nUX/UI Designer' },
    { label: 'Timeline', value: '2025' },
    { label: 'Team', value: 'Red Thread Innovations, Mussavir, Adriana Baric, Denise Amelia, Euna Lim, Florence Lee, Gavin Elzinga' },
    { label: 'Tools', value: 'Illustrator, Figma, FigJam, Figma presentations' },
  ],
};

// ✏️ EDIT: button links ('#' = not set yet)
const LINKS = { prototype: '#', presentation: '#' };

// ✏️ EDIT: numbers. source/sourceUrl = the small citation under each number.
const SCREEN_TIME_STATS = [
  { value: '7.5 hrs', head: 'of screen time per day', text: 'It’s estimated teens in Ontario and Alberta spend more than 7.5 hours per day on various screens.', source: '(Vogel)', sourceUrl: 'https://www.cmaj.ca/content/191/25/E721#:~:text=It%E2%80%99s%20estimated%20teens%20in%20Ontario%20and%20Alberta%20spend%20more%20than%207.5%20hours%20per%20day%20on%20various%20screens.' },
  { value: '+5 hrs', head: 'On social media alone', text: 'One in five spend more than five hours per day on social media alone.', source: '(Bradshaw)', sourceUrl: 'https://cls.ucl.ac.uk/heavy-social-media-users-tend-to-be-poor-sleepers-new-research-shows/#:~:text=More%20than%20a%20fifth%20of%20adolescents%20spent%20at%20least%20five%20hours%20a%20day%20on%20social%20media%20apps%20and%20sites' },
  { value: '$1.71bn', head: 'Parenting Apps valuation', text: 'Is the estimated market size of parenting apps in 2025.', source: '(The Business Research Company)', sourceUrl: 'https://www.thebusinessresearchcompany.com/report/parenting-apps-global-market-report#:~:text=%E2%80%A2%20Parenting%20Apps%20market%20size%20has%20reached%20to%20%241.71%20billion%20in%202025' },
  { value: '+12.6%', head: 'Annual growth rate', text: 'Its market share is expected to grow at 12.6% annually, up to an estimated $3.11bn', source: '(The Business Research Company)', sourceUrl: 'https://www.thebusinessresearchcompany.com/report/parenting-apps-global-market-report#:~:text=to%20grow%20to-,%243.11%20billion%20in%202030%20at%20a%20compound%20annual%20growth%20rate%20(CAGR)%20of%2012.6%25,-%E2%80%A2%20Growth%20Driver%3A%20Rising' },
];
const SURVEY_RESULTS = [
  { value: '67%', head: 'Of survey responses', text: '67% of surveyed users said they were interested in using FamiGO for family-friendly games.' },
  { value: '4/5', head: 'Of surveyed families', text: '4 out of 5 surveyed families expressed their interest towards knowing more about the app. 1 of the interviewed families wanted to be part of a future version.' },
];

const HMW = 'How might we repurpose digital tools to foster family quality time and meaningful connections?';

function FinalButtons() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button href={LINKS.prototype}>Final Prototype</Button>
      <Button href={LINKS.presentation} variant="outline">Final Presentation</Button>
    </div>
  );
}

export default function FamiGO() {
  return (
    <CaseStudyLayout meta={meta}>
      {/* ---------- 01 · The Challenge ---------- */}
      <CsBlock n="01" label="THE CHALLENGE" title="Families are spending less time together... How could we help foster these connections?">
        <p className="pdl-t-lead">Families in modern times are distancing themselves from each other.</p>
        <Metrics items={SCREEN_TIME_STATS} />
        <div className="cs-outcome-text" style={{ marginBottom: 20 }}>
          <p className="pdl-t-lead">After researching market exposure and the viability of this issue, we found that these stats left us with a question to solve:</p>
        </div>
        <Pull style={{ padding: 30 }}>{HMW}</Pull>
      </CsBlock>

      {/* ---------- 02 · Solution ---------- */}
      <CsBlock cls="cs-solution" n="02" label="Solution" title="Introducing FamiGO">
        <p className="pdl-t-lead">A central hub to browse, discover, plan, and record family activities. Made to help families or friends strengthen their relationships.</p>
        <FinalButtons />
      </CsBlock>
      {/* ✏️ IMAGES: wide="/images/famigo/solution-wide.jpg" left="…" right="…" */}
      <SolutionScreens />

      {/* ---------- 03 · Outcomes ---------- */}
      <CsBlock n="03" label="Outcomes" title="Getting families together... One activity at a time.">
        <div className="cs-outcome-row">
          <div className="cs-outcome-text">
            <p className="pdl-t-lead">FamiGO showed us that family time is more valuable than what you think. And our survey responses showed that there’s a space for an app like FamiGO. Where families not only share time, but also vault memories and experiences together.</p>
          </div>
          <Pull>FamiGO helps families spark new memories by suggesting group activities.</Pull>
        </div>
        <Metrics items={SURVEY_RESULTS} />
      </CsBlock>

      {/* ---------- 04 · Reflection ---------- */}
      <CsBlock cls="cs-reflection" n="04" label="Reflection" title="What would I do differently?">
        <p className="pdl-t-lead">I’d love to proceed with our planned MVP for the app, and offer the app to some families to get feedback on the app.</p>
        <p className="pdl-t-lead">The team, and personally myself, would love to continue with the MVP and all the next advancements we have planned.</p>
      </CsBlock>

      {/* ---------- In Depth (blue band) ---------- */}
      <CsBlock cls="cs-indepth" eyebrow="[In Depth]" title="How did we bring FamiGO together?">
        <p className="pdl-t-lead"></p>
      </CsBlock>

      {/* ---------- Process steps ---------- */}
      <CaseSteps labels={['RESEARCH\nAND DISCOVERY', 'PLANNING', 'PROTOTYPING', 'ITERATING', 'FINAL DESIGN']}>
        {/* Step 1 */}
        <CsStep num={1} label="RESEARCH & DISCOVERY" title="About the Problem"
          head={<>
            <div className="cs-body">
              <p className="pdl-t-body" style={{ maxWidth: 'none' }}>We needed context to understand this challenge imposed by RTI. Especially, how familial relationships were being affected nowadays with tech.</p>
              <Metrics items={SCREEN_TIME_STATS} />
              <div className="cs-outcome-text" style={{ marginBottom: 20, display: 'flex', gap: 45.64 }}>
                <p className="pdl-t-body" style={{ maxWidth: 'none', marginTop: 20 }}>Researching more about this issue showed us that although families were trying to limit the usage of screens, they were turning unsuccessful, and many times just aggravating the issue at hand. So instead of going against this, we decided to turn it around. What if in this case we can make tech suggest, plan and immortalize great moments and activities?</p>
                <p className="pdl-t-body" style={{ maxWidth: 'none', marginTop: 20 }}>After researching market exposure and the viability of this issue, we found that these stats left us with a question to solve:</p>
              </div>
              <Pull style={{ padding: 30 }}>{HMW}</Pull>
            </div>
            <p className="pdl-t-body">At the beginning, we brainstormed different solutions in a shared document of how we could fix the HMW. We then decided to create tasks and responsibilities and assign them to each of the team members.</p>
          </>}>
          <Figure n={1} />
          <Pair>
            <p className="pdl-t-body">After some back and forth, and with help from our RTI Supervisor, Mussavir Sheik, we settled on a plan for what our digital solution should have.</p>
            <p className="pdl-t-body">We needed to understand our target audience, their motivations, and how to essentially create a product that is not extremely gamified, but also not completely boring for younger demographics.</p>
            <StepImage size="half" n={1} />
            <StepImage size="half" n={1} />
          </Pair>
          <p className="pdl-t-body" style={{ maxWidth: 'none' }}>Based on our investigation results from scholarly research, we also decided to test with target groups, so we made a survey that would give us more clarity on what they want or not in the app.</p>
        </CsStep>

        {/* Step 2 */}
        <CsStep num={2} label="PLANNING" title="Laying out the plan."
          head={<p className="pdl-t-body">While we waited for the survey results, we went ahead and secured interviews with 2 families, where I was in charge of interviewing and transcribing the interviews.</p>}>
          <Figure n={2} />
          <Pair>
            <p className="pdl-t-body">These interviews proved useful, as they allowed us to put ourselves in the situation of the primary users, and find different ‘rituals’ or ‘usual’ activities that families do together.</p>
            <p className="pdl-t-body">These interviews also helped inform the team of possible user goals we could use for our app.</p>
            <StepImage size="half" n={2} />
            <StepImage size="half" n={2} />
          </Pair>
          <p className="pdl-t-body" style={{ maxWidth: 'none' }}>With our research, we also did a thematic analysis. Grouping the different interview responses, as well as the survey, and our takeaways from both into different topics to take into account.</p>
          <StepImage size="wide" n={2} />
          <p className="pdl-t-body" style={{ maxWidth: 'none' }}>Besides investigating, the team also looked into making a mood board of what our app will look like. We decided to pick colours, fonts and overall aesthetic.</p>
          <StepImage size="wide" n={2} />
        </CsStep>

        {/* Step 3 */}
        <CsStep num={3} label="PROTOTYPING" title="Designing a Solution"
          head={<p className="pdl-t-body">With this previous information, and multiple ideas in mind, we decided to do a Crazy 8’s and generate our most original, interesting, silly, and/or fitting ideas for this app.</p>}>
          <Figure n={3} />
          <Pair>
            <p className="pdl-t-body">After that, we organized and voted on the best ideas we had, to later organize them if they could fit in the screens we had planned, ‘Home’, ‘Calendar’, ‘Explore’, ‘Profile’.</p>
            <p className="pdl-t-body">We then discussed the user flow and any friction points, also asked for feedback from other classmates, all to ensure we have an understandable user flow.</p>
            <StepImage size="half" n={3} />
            <StepImage size="half" n={3} />
            <p className="pdl-t-body cs-step-full">This feedback proved key, as it steered our project into a more human solution, and it gave an added bonus to our app idea. It made us rethink if the focus of our app was it, the activities or really the people using it.</p>
            <div className="cs-step-full cs-step-aside">
              <Pull>Shifting from ‘making users find a scheduled time for an activity’ to ‘Offering activities that will spark memories’.</Pull>
              <StepImage size="portrait" />
            </div>
          </Pair>
        </CsStep>

        {/* Step 4 */}
        <CsStep num={4} label="ITERATING" title="FamiGO V1?"
          head={<p className="pdl-t-body">Taking into account the feedback from our RTI coach Mussavir and our classmates, we continued to create the first version of the app, where we each created a low-fi prototype of the screens we previously were set on (Home, Activities, Calendar, Profile) to see what we liked or didn’t and where we overlapped. Based on our app interactions, we refined a prototype, where users could browse, create and change the settings for other members in their family group.</p>}>
          <Figure n={5} />
          <Pair>
            <p className="pdl-t-body" style={{ maxWidth: 'none', gridColumn: '1 / -1' }}>We decided to start building based on our overlaps. Making it easier to agree on features and where the stuff should be located. We tested the different user flows of our collective prototype.</p>
          </Pair>
        </CsStep>

        {/* Step 5 */}
        <CsStep num={5} label="FINAL DESIGN" title="FamiGO"
          head={<>
            <p className="pdl-t-body">From finding ‘shared time’ to making a ‘schedule for activities’ to really focus on what’s essential, providing activities to users, and a way to remember special moments. This project taught me about the value of constant iteration and feedback.</p>
            <p className="pdl-t-body">You can check our last prototype and presentation below.</p>
            <FinalButtons />
          </>}>
          <Figure n={6} />
          <Pull style={{ marginTop: 15, marginBottom: 15 }}>Thankful to the FamiGO team. Big shoutout to everyone who participated and gave us a hand.</Pull>
          <Figure image="/images/famigo/famigo-team.jpeg" ratio="4 / 3" alt="The FamiGO team smiling and posing behind a glass wall" caption="Caption: the FamiGO Team" />
        </CsStep>
      </CaseSteps>
    </CaseStudyLayout>
  );
}
