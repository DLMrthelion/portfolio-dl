# Glossary

**Case study**: one project's detail page at `/work/<slug>`, built from the blocks in `src/components/CaseStudyTemplate.jsx`. Its `meta` also feeds Home, Projects and "Next project".

**Step**: one numbered section of a case study's process (`<CsStep>`). It declares its own `label`; its number comes from its position on the page.

**Step sequence**: the ordered steps inside `<CaseSteps>`, together with the progress bar that tracks them. The sequence is the only place step order and numbering are decided.

**Bar label**: the text a step shows in the progress bar. Defaults to the step's `label`; `barLabel` overrides it (for example to place a line break).
