/* ==========================================================================
   PROJECT LIST — the ORDER projects appear in on Home, Projects and
   "Next project". Each project's details (title, role, year, cover, video…)
   live at the top of its own file in src/pages/case-studies/.

   ✏️ To add a project:
     1. Copy src/pages/case-studies/Placeholder.jsx → e.g. NewProject.jsx
     2. Edit its `meta` (give it a unique slug — that's its URL: /work/<slug>)
     3. Import it below and add it to the list.
   ========================================================================== */
import Instructo, { meta as instructo } from '../pages/case-studies/Instructo.jsx';
import FlowState, { meta as flowState } from '../pages/case-studies/FlowState.jsx';
import FamiGO, { meta as famigo } from '../pages/case-studies/FamiGO.jsx';
import Placeholder, { meta as placeholder } from '../pages/case-studies/Placeholder.jsx';

export const projects = [
  { ...instructo, Page: Instructo },
  { ...flowState, Page: FlowState },
  { ...famigo, Page: FamiGO },
  { ...placeholder, Page: Placeholder },
];

export const findProject = (slug) => projects.find((p) => p.slug === slug);

/** The project after `slug` in the list (wraps back to the first). */
export const nextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

/** Where a project row/card links to: its case study, unless meta.href overrides it. */
export const projectLink = (p) => p.href || '/work/' + p.slug;
