import { useEffect, useState } from 'react';
import { person, projects, skills } from './content';
import { Icon } from './components/Icon';
import { SignalLab } from './components/SignalLab';
import { Explorer } from './components/Explorer';
import { CaseStudy } from './components/CaseStudy';
import { IndexQuestions } from './components/IndexQuestions';
import { CommandPalette, PortfolioIndex } from './components/Dialogs';

function Home({ openIndex }: { openIndex: () => void }) {
  return <main id="top">
    <section className="hero identity-hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy"><div className="eyebrow"><span className="status-dot" />AI / ML · ENGINEERING · COMMUNITY</div><h1 id="hero-title">Palak<br /><em>Pandit.</em></h1><p className="hero-description">AI/ML builder.<br />Community organizer.</p><p className="hero-bio">I’m an Information Science &amp; Engineering student at NMIT, Bengaluru. I work on AI and web projects, from document retrieval to computer vision, and bring developers together through technical events and campus workshops.</p><div className="hero-actions"><a className="button button-lime" href="#work">Explore my work <Icon /></a><button className="button button-quiet" onClick={openIndex}>Ask the index <Icon name="spark" /></button></div><div className="hero-location mono"><span className="location-symbol">◎</span><span>BENGALURU, INDIA</span><span className="hero-divider" aria-hidden="true" /><span>INFORMATION SCIENCE / NMIT</span></div></div>
      <figure className="hero-portrait">
        <img src="./palak-portrait.jpg" alt="Portrait of Palak Pandit" width="960" height="1280" fetchPriority="high" decoding="async" />
        <figcaption className="mono"><span>PALAK PANDIT</span><span>BENGALURU, INDIA ↗</span></figcaption>
      </figure>
      <div className="hero-bottom mono"><span>CURIOUS BY NATURE. BUILDER BY PRACTICE.</span><a href="#work">SCROLL TO EXPLORE <span>↓</span></a></div>
    </section>

    <section className="homepage-index wrap" id="ask-index" aria-labelledby="homepage-index-title">
      <div className="homepage-index-panel">
        <div className="homepage-index-intro">
          <div className="section-kicker mono"><span className="status-dot" />THE PORTFOLIO INDEX</div>
          <h2 id="homepage-index-title">Ask the index.<br /><em>Get to know me.</em></h2>
          <p>Curious about my projects, skills or community work? Ask a question, or start with one below.</p>
          <span className="homepage-index-hint"><Icon name="spark" />A quick introduction, in your own order.</span>
        </div>
        <IndexQuestions embedded />
      </div>
    </section>

    <section className="approach-section wrap" aria-labelledby="approach-title">
      <div className="approach-copy"><div className="section-kicker mono">HOW I APPROACH A BUILD</div><h2 id="approach-title">From signal<br />to something <em>real.</em></h2><p>Learn the problem. Build a working answer. Bring people into the process. Explore the three threads behind my projects and community work.</p></div>
      <SignalLab />
    </section>

    <section className="work-section section wrap" id="work" aria-labelledby="work-title"><div className="section-header"><div><div className="section-kicker mono">01 / SELECTED WORK</div><h2 id="work-title">Different questions.<br /><em>Working answers.</em></h2></div><p>From finding the right context to planning the next move. Four explorations in turning a question into a system.</p></div><Explorer /></section>

    <section className="people-section" id="people" aria-labelledby="people-title"><div className="wrap"><div className="people-heading"><span className="section-kicker mono">02 / BEYOND THE CODE</span><span className="mono">COMMUNITY IS A PRACTICE.</span></div><div className="people-main"><h2 id="people-title">The best systems<br />have <em>people</em><br />in them.</h2><div className="people-story"><span className="asterisk" aria-hidden="true">✳</span><p>There’s another side to my work: bringing people into the room.</p><p>I’ve led marketing and execution for GDG technical events, built a campus developer community, and organized workshops. The work connects technology with the people who want to build with it.</p><a className="text-link" href={person.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <Icon name="external" /></a></div></div><div className="people-stats"><div><span className="stat-number">5<span>+</span></span><p>GDG technical events</p><span className="mono">MARKETING & EXECUTION</span></div><div><span className="stat-number">200<span>+</span></span><p>Workshop attendance</p><span className="mono">CAMPUS DEVELOPER COMMUNITY</span></div><div className="people-note"><span className="mono">THE COMMON THREAD</span><p>Build something useful.<br /> Bring someone along.</p><Icon name="external" /></div></div></div></section>

    <section className="toolkit-section section wrap" id="toolkit" aria-labelledby="toolkit-title"><div className="section-header"><div><div className="section-kicker mono">03 / THE TOOLKIT</div><h2 id="toolkit-title">A few ways<br />to <em>make it happen.</em></h2></div><p>Different tools for different questions. Grounded in machine learning, information retrieval and software engineering.</p></div><div className="skills-map">{skills.map((group, i) => <article key={group.title}><div className="skill-heading"><span className="mono">0{i + 1}</span><span className="skill-glyph" aria-hidden="true">{['◉', '⌘', '⊞'][i]}</span></div><h3>{group.title}</h3><p>{group.subtitle}</p><div className="skill-items">{group.items.map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></section>

    <section className="journey-section section wrap" id="journey" aria-labelledby="journey-title"><div className="section-header"><div><div className="section-kicker mono">04 / IN PROGRESS</div><h2 id="journey-title">Still learning.<br /><em>Already building.</em></h2></div><p>Education, experiments, and a few milestones along the way.</p></div><div className="journey-layout"><article className="education"><div className="mono">AUG 2023 — JUL 2027</div><h3>Information Science<br />& Engineering</h3><p>Bachelor of Engineering<br />Nitte Meenakshi Institute of Technology<br />Bengaluru</p><div className="cgpa"><strong>9.25</strong><span className="mono">CGPA</span></div><a className="text-link" href={person.resume} download>Read my resume <Icon name="download" /></a></article><div className="milestones"><a href="https://drive.google.com/file/d/1SUl-m6obMOrG5xsM859FevJf7c6GvWWZ/view" target="_blank" rel="noreferrer"><span className="milestone-number">Top 5%</span><div><h3>Code Cadets Hackathon</h3><p>IISc · among 500+ participants</p></div><Icon name="external" /></a><a href={person.leetcode} target="_blank" rel="noreferrer"><span className="milestone-number">300+</span><div><h3>Problems solved</h3><p>LeetCode · practice, one problem at a time</p></div><Icon name="external" /></a><div><span className="milestone-number">96<span>th</span></span><div><h3>JEE Mains percentile</h3><p>2023 · among one million candidates</p></div></div><a href="https://success.simplilearn.com/d0fad4b1-18cf-429c-9a8b-c8716eb12258" target="_blank" rel="noreferrer"><span className="mono milestone-date">APR 2026</span><div><h3>Data Scientist Masters Program</h3><p>Simplilearn</p></div><Icon name="external" /></a><a href="https://drive.google.com/file/d/1_XFxagrg-Ubx-2MYh15Tk2yrRML06O_p/view?usp=sharing" target="_blank" rel="noreferrer"><span className="mono milestone-date">JUL 2026</span><div><h3>Advisory Launchpad Program</h3><p>PwC</p></div><Icon name="external" /></a></div></div></section>

    <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="wrap"><div className="contact-top"><div className="section-kicker mono"><span className="status-dot" />05 / THE NEXT CONVERSATION</div><button className="text-link" onClick={openIndex}>Still curious? Ask the index <Icon name="spark" /></button></div><h2 id="contact-title">Good things start<br />with <em>a conversation.</em></h2><a className="contact-email" href={`mailto:${person.email}`}>{person.email}<Icon name="external" /></a><div className="contact-links"><a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="external" /></a><a href={person.github} target="_blank" rel="noreferrer">GitHub <Icon name="external" /></a><a href={person.codeforces} target="_blank" rel="noreferrer">Codeforces <Icon name="external" /></a><a href={person.telephone}>{person.phone} <Icon name="external" /></a><a href={person.resume} download>Resume <Icon name="download" /></a></div></div></section>
  </main>;
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  const [dialog, setDialog] = useState<'commands' | 'index' | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const projectId = hash.startsWith('#project/') ? hash.slice(9) : null;
  const project = projects.find(p => p.id === projectId);

  useEffect(() => {
    const change = () => { setHash(window.location.hash); setMenuOpen(false); };
    const keys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setDialog(d => d === 'commands' ? null : 'commands'); }
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('hashchange', change);
    window.addEventListener('keydown', keys);
    return () => { window.removeEventListener('hashchange', change); window.removeEventListener('keydown', keys); };
  }, []);

  useEffect(() => {
    document.title = project ? `${project.label} — Palak Pandit` : 'Palak Pandit — Signal to Something Real';
    const frame = requestAnimationFrame(() => {
      if (projectId) { window.scrollTo({ top: 0, behavior: 'instant' }); }
      else {
        const target = document.getElementById(hash.slice(1) || 'top');
        target?.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, project, projectId]);

  return <>
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); const main = document.getElementById('main-content'); main?.focus(); main?.scrollIntoView({ behavior: 'instant' }); }}>Skip to content</a>
    <header className="header"><div className="nav wrap"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">p<span>↗</span></span><span>Palak Pandit<span className="brand-sub">A WORK IN MOTION.</span></span></a><nav aria-label="Main navigation" className={menuOpen ? 'nav-links open' : 'nav-links'}><a href="#work" onClick={() => setMenuOpen(false)}>Work <span>04</span></a><a href="#people" onClick={() => setMenuOpen(false)}>People</a><a href="#journey" onClick={() => setMenuOpen(false)}>Journey</a><a href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <span>↗</span></a></nav><div className="nav-actions"><button className="command-trigger" aria-label="Open portfolio commands, Control or Command K" onClick={() => { setMenuOpen(false); setDialog('commands'); }}><Icon name="search" /><kbd aria-hidden="true">⌘ K</kbd></button><button className="mobile-menu icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(s => !s)}><Icon name={menuOpen ? 'close' : 'menu'} /></button></div></div></header>
    <div id="main-content" tabIndex={-1}>{projectId ? project ? <CaseStudy project={project} /> : <main className="not-found wrap"><span className="mono">BUILD NOT FOUND</span><h1>Let’s find the<br /><em>right signal.</em></h1><a className="button button-lime" href="#work">Back to selected work <Icon /></a></main> : <Home openIndex={() => setDialog('index')} />}</div>
    <footer className="footer wrap"><a href="#top" className="footer-wordmark">PALAK<span>↗</span></a><p className="mono">THOUGHTFULLY BUILT. ALWAYS EVOLVING.</p><a href="#top" className="mono">BACK TO TOP ↑</a></footer>
    {dialog === 'commands' && <CommandPalette onClose={() => setDialog(null)} openIndex={() => setDialog('index')} />}
    {dialog === 'index' && <PortfolioIndex onClose={() => setDialog(null)} />}
  </>;
}
