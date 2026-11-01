import { useState } from 'react';
import { projects } from '../content';
import { Icon } from './Icon';
import { ProjectDiagram } from './ProjectDiagram';

export function Explorer() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  return <div className="explorer">
    <div className="project-tabs" role="tablist" aria-label="Selected projects">{projects.map((p, i) => <button id={`tab-${p.id}`} key={p.id} role="tab" aria-selected={selected === i} aria-controls="project-panel" tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={e => {
      if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? projects.length - 1 : (selected + (e.key === 'ArrowRight' ? 1 : -1) + projects.length) % projects.length;
        setSelected(next); document.getElementById(`tab-${projects[next].id}`)?.focus();
      }
    }}><span className="mono">{p.number}</span>{['Context', 'Vision', 'Strategy', 'Systems'][i]}<span className="tab-indicator" /></button>)}</div>
    <div className="project-panel" id="project-panel" role="tabpanel" aria-labelledby={`tab-${project.id}`}>
      <div className="project-copy" key={project.id}>
        <div className="eyebrow"><span className={`tiny-square ${project.accent}`} />{project.category}</div>
        <h3>{project.name}</h3>
        <p className="project-label mono">{project.label} <span>↗</span></p>
        <p className="project-description">{project.description}</p>
        <div className="tag-list">{project.stack.slice(0, 4).map(s => <span key={s}>{s}</span>)}</div>
        <div className="project-actions">
          <a className="text-link" href={`#project/${project.id}`}>Explore the build <Icon /></a>
          {project.repository && <a className="text-link" href={project.repository} target="_blank" rel="noopener noreferrer">View source code <Icon name="external" /></a>}
        </div>
      </div>
      <ProjectDiagram project={project} />
    </div>
    <div className="project-meta mono"><span>{project.period}</span><span>ONE OF FOUR SELECTED BUILDS</span><span>{project.number} / 04</span></div>
  </div>;
}
