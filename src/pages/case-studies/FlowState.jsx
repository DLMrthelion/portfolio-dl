import { Button } from '../../components/GlobalComponents.jsx';
import { CaseStudyLayout, CsBlock, SolutionScreens, Metrics, CaseSteps, CsStep, Figure, StepImage, Pair, Pull } from '../../components/CaseStudyTemplate.jsx';

/* ==========================================================================
   CASE STUDY 02 — FLOW STATE      address: /work/flow-state
   Images: public/images/flow-state/  →  write "/images/flow-state/<file>"
   ========================================================================== */

// ✏️ EDIT: button / team links ('#' = not set yet)
const LINKS = {
  video: '#',
  study: '#',
  povFilm: '#',
  immersive: '#',
  gavin: '#',
};

// ✏️ EDIT: project details — also used on Home (Featured Work), Projects and "Next project".
export const meta = {
  slug: 'flow-state', // URL: /work/flow-state
  number: '02',
  title: 'Flow State',
  description: 'An immersive exhibit pilot led by POV Film with Immersive and TMU, bringing professionals from film, design, architecture and interior design together for one night.',
  role: 'Co-Brand Designer &\nJr. Project Coordinator', // "\n" = line break on Home/Projects rows
  year: '2026',
  cover: '', // e.g. '/images/flow-state/cover.jpg' (16:7)
  coverAlt: '',
  video: '', // e.g. '/videos/flow-state.mp4' — plays when hovering the row on Home
  preview: ['Flow State is an immersive exhibit pilot led by POV Film with Immersive and TMU. A team of young professionals and seasoned veterans from film, design, architecture and interior design transformed an existing space into a one-night experience in 10 weeks.'],
  details: [
    { label: 'Role', value: 'Co-Brand Designer & Jr. Project Coordinator' },
    { label: 'Timeline', value: '10 Weeks,\nFebruary to March 26, 2026' },
    {
      label: 'Team',
      wide: true,
      value: <><a href={LINKS.povFilm}>POV Film</a>, <a href={LINKS.immersive}>Immersive International</a>,{'\n'}Jessy Hong, Natalie Cheung{'\n'}& <a href={LINKS.gavin}>Gavin Elzinga</a></>,
    },
    { label: 'Tools', value: 'Illustrator, Photoshop, Figma, Google Sheets, Google Slides & Slack' },
  ],
};

// ✏️ EDIT: outcome numbers
const OUTCOMES = [
  { value: '+300', head: 'Event Invitees', text: 'The event had a total of 300+ invitations, between the Flow State Eventbrite invite, personal invitations, sponsors and other attendees.' },
  { value: '6', head: 'Event Sponsors', text: 'The event got 6 sponsors who helped not only on the development of the exhibit, but also providing donations on the exhibit day.' },
];

export default function FlowState() {
  return (
    <CaseStudyLayout meta={meta}>
      {/* ---------- 01 · The Challenge ---------- */}
      <CsBlock n="01" label="THE CHALLENGE" title="Can you transform a space into an immersive exhibit, in 10 weeks?">
        <p className="pdl-t-lead">How could a team made up of young professionals and seasoned veterans transform an existing space into a compelling immersive exhibit in 10 weeks? The team included professionals from disciplines like film and television, design, architecture, and interior design. The challenge was not only to create an engaging one-night experience, but also to test how cross-industry collaboration could bring diverse expertise together under tight production constraints.</p>
      </CsBlock>

      {/* ---------- 02 · Solution ---------- */}
      <CsBlock cls="cs-solution" n="02" label="Solution" title="Introducing... Flow State, an immersive exhibit initiative">
        <p className="pdl-t-lead">Led by POV Film with help from Immersive and TMU, young professionals and seasoned veterans came together to pilot cross-industry collaboration. The team brought creatives from film and television, design, architecture and interior design together to build an immersive exhibit for one night. The project also aimed to raise awareness for underrepresented communities.</p>
        <div><Button href={LINKS.video}>Watch Video</Button></div>
      </CsBlock>
      {/* ✏️ IMAGES: wide="/images/flow-state/solution-wide.jpg" left="…" right="…" */}
      <SolutionScreens />

      {/* ---------- 03 · Outcomes ---------- */}
      <CsBlock n="03" label="Outcomes" title="Flow State Impact">
        <div className="cs-outcome-row">
          <div className="cs-outcome-text">
            <p className="pdl-t-lead">Flow State gathered 300+ invitations, 9 cohorts of students, created an Indigenous youth advisory committee with 11+ members, and was the first stepping stone to the beginning of POV Film’s Immersive media program.</p>
          </div>
          <Pull>Designed in partnership with Immersive International, the program focuses on upskilling and reskilling equity-seeking creators through a hands-on, mentorship-driven model.</Pull>
          <Metrics items={OUTCOMES} />
        </div>
      </CsBlock>

      {/* ---------- 04 · Reflection ---------- */}
      <CsBlock cls="cs-reflection" n="04" label="Reflection" title="What would I do differently?">
        <p className="pdl-t-lead">If I worked with this team again, I would take the initiative further. Knowing everyone’s working styles and strengths, we could build a more refined and ambitious experience, and improve not only the venue and audience experience but also the processes and resources that support the people making the work.</p>
      </CsBlock>

      {/* ---------- In Depth (blue band) ---------- */}
      <CsBlock cls="cs-indepth" eyebrow="[In Depth]" title="How was Flow State created?">
        <p className="pdl-t-lead"></p>
      </CsBlock>

      {/* ---------- Process steps ---------- */}
      <CaseSteps labels={['BRAINSTORMING\n& PLANNING', 'GRAPHICS TEAM', 'PROJECT COORDINATION', 'THE EXHIBIT', 'LEARNING OUTCOMES']}>
        {/* Step 1 */}
        <CsStep num={1} label="BRAINSTORMING & PLANNING" title="How it all started"
          head={<p className="pdl-t-body">The first week was spent learning about the project’s scope and the responsibilities of each team member. This helped get everyone on the same page and helped the team assess different work and tasks.</p>}>
          <Figure n={1} />
          <Pair>
            <p className="pdl-t-body">During this period, we used Google Slides to structure our thoughts, include what we found relevant, and shape the aesthetic.</p>
            <p className="pdl-t-body">Here the team divided themselves based on the different required tasks. I was initially assigned with Natalie in the graphics team.</p>
            <StepImage size="half" n={1} />
            <StepImage size="half" n={1} />
          </Pair>
        </CsStep>

        {/* Step 2 */}
        <CsStep num={2} label="GRAPHICS TEAM" title="Graphics & Branding team"
          head={<p className="pdl-t-body">With Natalie, and under the supervision of the Immersive international team, we thought of ideas for our first task, the Eventbrite invite.</p>}>
          <Figure n={2} />
          <Pair>
            <p className="pdl-t-body">With help from Immersive’s graphic lead, we settled on using imagery from their team as the head invitation for now.</p>
            <p className="pdl-t-body">We also chose a couple of fonts that paired well with the theme and ambiance that we wanted to create for the event.</p>
            <StepImage size="half" n={2} />
            <StepImage size="half" n={2} />
          </Pair>
          <p className="pdl-t-body" style={{ maxWidth: 'none' }}>We then moved into creating physical posters called ‘Artist Statements’ which tied the introductions of the Indigenous artist and their art with a poem.</p>
          <Figure n={2} />
          <div style={{ display: 'flex', flexDirection: 'row', gap: 45.64 }}>
            <p className="pdl-t-body">Another task we were assigned was to compile and share the assets with the rest of the team as a guide for their designs. From colours to fonts, sponsor logos, and best practices.</p>
            <p className="pdl-t-body">My last task was making a poster of our event from the assets we had without unveiling what the exhibit was about. To keep the mystery, I adapted the Eventbrite invitation into a movie-poster-like aesthetic, which we shared later.</p>
          </div>
          <Pair>
            <StepImage size="half" n={2} />
            <StepImage size="half" n={2} />
          </Pair>
          <p className="pdl-t-body" style={{ maxWidth: 'none' }}>Working with the graphics team led me to be more inspired by what could be made, even though the time wasn’t on our side. I believe we gave our best. While working on the graphics team, I was also assigned to the project coordination team with more and different responsibilities.</p>
        </CsStep>

        {/* Step 3 */}
        <CsStep num={3} label="PROJECT COORDINATION" title="Coordinating Event details"
          head={<p className="pdl-t-body">I joined the project coordination team alone from the mentees part. And under direct supervision from the immersive team, I helped their project coordinator in different tasks. From budgeting to scheduling and quoting vendors.</p>}>
          <Figure n={3} />
          <Pair>
            <p className="pdl-t-body" style={{ maxWidth: 'none', gridColumn: '1 / -1' }}>Although not precisely visible, my efforts got the team a more budget-friendly quote, secured quality printing, and searched for alternative solutions that saved budget.</p>
          </Pair>
        </CsStep>

        {/* Step 4 */}
        <CsStep num={4} label="THE EXHIBIT" title="The Exhibit"
          head={<p className="pdl-t-body">The exhibit took place after less than 10 weeks of planning, prepping and preparation. Before the big day, I went in three days and two days prior to finalize details and offer my help on anything that was left to complete.</p>}>
          <Figure n={4} />
          <Pair>
            <p className="pdl-t-body">The exhibit was special, and it gave us the opportunity to get closer to the people enjoying it.</p>
            <p className="pdl-t-body">We also got the opportunity to network with industry professionals, and hear about so many interesting projects.</p>
            <StepImage size="half" n={4} />
            <StepImage size="half" n={4} />
          </Pair>
        </CsStep>

        {/* Step 5 */}
        <CsStep num={5} label="LEARNING OUTCOMES" title="Learning Outcomes"
          head={<p className="pdl-t-body">The event was a success, with multiple sponsors involved. I believe it personally helped me understand the industry and improve my skills.</p>}>
          <Figure n={5} />
          <Pair>
            <p className="pdl-t-body">Living the experience of working on a large-scale project like this made me and my TMU colleagues realize how impactful it is to have the opportunity to work on a project like this. So we decided to answer the question:</p>
            <Pull>How does experiential learning support emerging creatives working in the immersive media{' '}industry?</Pull>
            <div className="cs-step-full" style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
              <p className="pdl-t-body" style={{ maxWidth: 'none' }}>
                So, we decided to compile our four different perspectives from the exhibit, as well as our previous expertise, to compare and contrast them with other similar practice-first projects in multimedia from around the world. All to determine the impacts, benefits, and best practices. <br />
                <span style={{ lineHeight: '50px' }}>You can access the full study here:</span>
              </p>
              <Button href={LINKS.study}>View Study</Button>
            </div>
          </Pair>
        </CsStep>
      </CaseSteps>
    </CaseStudyLayout>
  );
}
