/* ==========================================================================
   SITE-WIDE CONTENT
   Text that appears on more than one page, or in lists. Edit here and it
   updates everywhere. Page-specific text lives in that page's file (src/pages).
   Project details live at the top of each case-study file (src/pages/case-studies).
   ========================================================================== */

// ✏️ EDIT: your email (not shown on the site yet; handy for the contact form later).
export const email = 'thelion1915@gmail.com';

// ✏️ EDIT: put your PDF in /public/files/ and set this to '/files/<name>.pdf'.
// While it's empty, every "Resume" link stays a dead link, like in the design.
export const resumeUrl = '';

// ✏️ EDIT: header greeting (two lines, top-left of every page).
export const navIntro = ['Hey there!', 'I’m David Leon'];

// ✏️ EDIT: pages in the menu + footer. href must match a route in src/App.jsx.
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// ✏️ EDIT: footer call-to-action. The second part is shown in the blue italic serif.
export const footerCta = {
  plain: 'Do you have a project in mind? ',
  accent: 'Let’s build it together.',
  navLabel: 'Pages',
  socialsLabel: 'Follow',
};

// ✏️ EDIT: social links — shown in the footer and on the Contact page.
export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/mrthelion/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/davidleon19' },
  { label: 'Letterboxd', href: 'https://letterboxd.com/Mrthelion1915/' },
  { label: 'GitHub', href: 'https://github.com/Mrthelion1915-maker' },
];

// ✏️ EDIT: services — Home + About ("My Services") and the Contact form chips.
export const services = [
  { number: '01', title: 'UX/UI Design', description: 'Review or craft visually astonishing interfaces that enhance your user experience.' },
  { number: '02', title: 'Product Design & Development', description: 'Review or craft visually astonishing interfaces that enhance your user experience.' },
  { number: '03', title: 'Brand Identity', description: 'Review or craft visually astonishing interfaces that enhance your user experience.' },
  { number: '04', title: 'Interactive Design & Development', description: 'Review or craft visually astonishing interfaces that enhance your user experience.' },
];

// ✏️ EDIT: Home → "My Work Approach" columns.
export const approach = [
  { title: 'Design Philosophy', body: 'For me, great design isn’t just about aesthetics. It’s about creating seamless, intuitive experiences that resonate and are human-centered. I blend beauty with usability to craft digital and physical spaces that engage and inspire.' },
  { title: 'What drives me?', body: 'I believe simplicity holds perfection, and sometimes less is better. My goal is to strip away the unnecessary, highlight what truly matters, and build designs that feel effortless yet powerful. Simplicity is not just an aesthetic, it’s an experience.' },
  { title: 'What makes my work different?', body: 'I think what makes my work special is my obsession with making every design the best it can be, my cultural background, and the relationships I build with my clients.' },
];

// ✏️ EDIT: Home → Testimonials carousel.
//   quote:    one string, or a list of strings for several paragraphs
//   position: "\n" starts a new line; the text after it becomes a link to `url`
//   avatar:   optional photo, e.g. '/images/testimonials/amir.jpg' (grey circle if empty)
export const testimonials = [
  { quote: 'David’s passion for design and storytelling shines through in everything he does. His creativity, dedication, and ability to quickly adapt and learn new tools are truly impressive. Beyond his skills, David’s positive attitude and genuine approach make him a joy to work with.', name: 'Amir Afshari', position: 'Software Engineer at\nGeotab', url: 'https://www.geotab.com', avatar: '' },
  { quote: 'I met David at Hackville, a Sheridan hackathon. He has a strong eye for UX/UI and is skilled with tools like Figma and Adobe Creative Suite. Beyond his technical ability, David brings a thoughtful, user-focused approach and works very well in a team setting.', name: 'Luis Santos', position: 'Email Marketing Specialist at\nOmnicorp', url: 'https://www.omnicorp.com', avatar: '' },
  { quote: ['David consistently displayed an innate talent for engaging with customers, understanding their needs, and providing tailored advice that ensured an exceptional shopping experience.', 'His ability to listen attentively and communicate effectively made him a favourite among our clientele.'], name: 'Julie Corbett', position: 'Operations Manager at\nOakville Divers', url: 'https://www.oakvilledivers.com', avatar: '' },
  { quote: 'David did an outstanding job designing the business cards for my company. His work is a perfect blend of quality and creativity, and I wholeheartedly recommend his professional services.', name: 'Nayibe Gutierrez', position: 'Independent Distributor for\nNu Skin', url: 'https://www.nuskin.com', avatar: '' },
  { quote: ['David seamlessly collaborates with others to create designs that serve the end user effectively. This is supported by how he makes people feel heard and uplifted, which allows him to uncover their needs. I find that the reason he manages to do these is his underlying passion to forge connections. It is evident not only in the valuable relationships he’s fostered, but also in the dedication he has to honing his strategic thinking and design craft, which are both high quality.', 'So, if you’re looking for a well-rounded designer who delivers well-thought-out and polished designs while bringing that irreplaceable human touch, David is your guy.'], name: 'Denise Amelia', position: 'Content Designer at\nPointClickCare', url: 'https://www.pointclickcare.com', avatar: '' },
];
