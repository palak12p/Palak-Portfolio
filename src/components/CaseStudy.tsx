import { person, projects } from '../content';
import type { Project } from '../content';
import { Icon } from './Icon';
import { ProjectDiagram } from './ProjectDiagram';

export function CaseStudy({ project }: { project: Project }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <main id="top" className="case-page">
    <div className="wrap">
      <a className="back-link mono" href="#work">← BACK TO SELECTED WORK</a>
      <div className="case-heading"><div><div className="eyebrow"><span className={`tiny-square ${project.accent}`} />BUILD {project.number} / {project.category}</div><h1>{project.name}</h1><p className="case-subtitle">{project.label}</p>{project.repository && <a className="text-link case-repository" href={project.repository} target="_blank" rel="noopener noreferrer">View source code on GitHub <Icon name="external" /></a>}</div><span className="case-date mono">{project.period}</span></div>
      <ProjectDiagram project={project} />
      <div className="case-intro"><span className="section-kicker mono">01 / THE QUESTION</span><h2>{project.question}</h2></div>
      <p className="case-overview">{project.description}</p>
      <section className="case-section"><div><span className="section-kicker mono">02 / THE SYSTEM</span><h2>An idea, connected.</h2></div><div className="pipeline">{project.pipeline.map((p, i) => <div key={p}><span className="mono">0{i + 1}</span><strong>{p}</strong>{i < 3 && <Icon />}</div>)}</div><p className="section-footnote">A high-level illustration of the documented workflow.</p></section>
      <section className="case-section case-split"><div><span className="section-kicker mono">03 / DOCUMENTED SCOPE</span><h2>What’s in the build.</h2></div><ul className="feature-list">{project.features.map((f, i) => <li key={f}><span className="mono">0{i + 1}</span><p>{f}</p></li>)}</ul></section>
      <section className="case-section case-split"><div><span className="section-kicker mono">04 / ENGINEERING LENS</span><h2>Beyond the interface.</h2></div><div className="case-prose"><p>{project.engineering}</p><h3>Reported outcome</h3><p>{project.outcome}</p><div className="tag-list">{project.stack.map(s => <span key={s}>{s}</span>)}</div><a className="text-link" href={project.repository ?? person.github} target="_blank" rel="noopener noreferrer">{project.repository ? 'View source code on GitHub' : 'Explore Palak’s GitHub'} <Icon name="external" /></a>{!project.repository && <small className="source-note">A project-specific repository link was not supplied.</small>}</div></section>
      <a className="next-project" href={`#project/${next.id}`}><div><span className="mono">NEXT BUILD / {next.number}</span><h2>{next.name}</h2></div><Icon /></a>
    </div>
  </main>;
}
