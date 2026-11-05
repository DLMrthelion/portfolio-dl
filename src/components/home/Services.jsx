import SectionHeader from '../ui/SectionHeader.jsx';
import ServiceRow from '../ui/ServiceRow.jsx';
import { services } from '../../data/site.js';

/**
 * "My Services" blue band — shown on BOTH Home and About, so its text lives here.
 * The list itself: src/data/site.js → services. Each row opens Contact with that service pre-selected.
 */
export default function Services() {
  return (
    <section className="pdl-band">
      <div className="pdl-wrap svc">
        {/* ✏️ EDIT: heading */}
        <SectionHeader eyebrow="[MY SERVICES]" title="Design Solutions, Tailored for you." tone="blue" />
        {/* ✏️ EDIT: note under the heading */}
        <p className="pdl-t-lead svc-note">
          All services are offered in Spanish, English, and Portuguese. Not finding what you are looking for?<br />
          I’m sure we can work something out. <a href="/contact">Contact me</a>
        </p>
        <div className="svc-list">
          {services.map((s) => <ServiceRow key={s.number} {...s} href={'/contact?s=' + encodeURIComponent(s.title)} />)}
        </div>
      </div>
    </section>
  );
}
