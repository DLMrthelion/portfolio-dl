import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, SectionHeader } from '../components/GlobalComponents.jsx';
import { resumeUrl, services, socials } from '../data/site.js';
import { asset } from '../lib/asset.js';

/* ==========================================================================
   CONTACT PAGE  —  address: /contact   (/contact?s=Brand%20Identity pre-selects a service)
   ⚠️ The form does NOT send anything yet — it only shows the "Thanks" screen.
      See the README checklist ("Connect the contact form").
   ========================================================================== */

// ✏️ EDIT: extra chips shown after your services (src/data/site.js).
const EXTRA_CHIPS = ['Idk, HELP', 'Other'];

export default function Contact() {
  const { search } = useLocation();
  const initial = new URLSearchParams(search).get('s');
  const [f, setF] = useState({ name: '', email: '', services: initial ? [initial] : [], message: '' });
  const [errs, setErrs] = useState({});
  const [state, setState] = useState('idle');
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); if (errs[k]) setErrs({ ...errs, [k]: null }); };
  const toggle = (s) => setF({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = f.email ? 'Check this email' : 'Required';
    if (f.message.trim().length < 10) er.message = f.message ? 'A little more detail' : 'Required';
    setErrs(er);
    if (Object.keys(er).length) { const el = document.getElementById('f-' + Object.keys(er)[0]); el && el.focus(); return; }
    setState('sending');
    // TODO: send `f` somewhere real (e.g. Formspree). For now this just pretends.
    setTimeout(() => setState('sent'), 900);
  };

  // Called as a function (not <Field/>) so inputs keep focus while typing.
  const Field = ({ id, label, children }) => (
    <div className={'field' + (errs[id] ? ' invalid' : '')}>
      <label htmlFor={'f-' + id} className="pdl-mono pdl-t-eyebrow"><span>{label}</span>{errs[id] && <span className="field-err">{errs[id]}</span>}</label>
      {children}
    </div>
  );

  return (
    <section className="pdl-wrap contact">
      <div className="contact-side">
        {/* ✏️ EDIT: heading + intro */}
        <SectionHeader eyebrow="[say hello]" title="Let’s build it together." />
        <p className="pdl-t-lead">Whether you’re on the hunt for talent🎯, seeking a collaborator for a project 🫂, or simply in the mood for a friendly chat 🗣️, I’d love to hear from you!</p>
        <a className="contact-mail pdl-t-row" href={asset(resumeUrl) || '#'} target="_blank" rel="noopener">Resume</a>
        <div>
          <p className="pdl-footer-label">Socials</p>
          <ul className="contact-links">
            {socials.map((s) => <li key={s.label}><a className="pdl-t-lead" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
          </ul>
        </div>
      </div>

      {state === 'sent' ? (
        <div className="sent" role="status">
          <p className="eyebrow pdl-mono pdl-t-eyebrow">[message sent]</p>
          <h2 className="pdl-serif pdl-t-section" style={{ margin: 0, color: 'var(--blue)' }}>Thanks, {f.name.split(' ')[0]}.</h2>
          <p className="pdl-t-lead">I’ll get back to you at {f.email}.</p>
          <div><Button variant="outline" onClick={() => { setF({ name: '', email: '', services: [], message: '' }); setState('idle'); }}>Send Another</Button></div>
        </div>
      ) : (
        <form className="form" onSubmit={submit} noValidate>
          {Field({ id: 'name', label: 'Name', children: <input id="f-name" value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" /> })}
          {Field({ id: 'email', label: 'Email', children: <input id="f-email" type="email" value={f.email} onChange={set('email')} placeholder="you@company.com" autoComplete="email" /> })}
          <div className="field">
            <fieldset>
              <legend className="pdl-mono pdl-t-eyebrow">What do you need?</legend>
              <div className="chips">
                {[...services.map((s) => s.title), ...EXTRA_CHIPS].map((t) => (
                  <Button key={t} variant={f.services.includes(t) ? 'solid' : 'outline'} aria-pressed={f.services.includes(t)} onClick={() => toggle(t)}>{t}</Button>
                ))}
              </div>
            </fieldset>
          </div>
          {Field({ id: 'message', label: 'Message', children: <textarea id="f-message" value={f.message} onChange={set('message')} placeholder="A few lines about the project, timeline and goals" /> })}
          <div className="form-foot">
            <Button type="submit" size="md" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send Message'}</Button>
          </div>
        </form>
      )}
    </section>
  );
}
