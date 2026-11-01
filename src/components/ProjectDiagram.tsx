import type { Project } from '../content';

// Bespoke architecture illustrations. These are deliberately not product screenshots.
export function ProjectDiagram({ project }: { project: Project }) {
  return <div className={`project-diagram ${project.accent}`} aria-label={`Architecture illustration for ${project.label}`} role="img">
    <div className="diagram-header mono"><span>FIG. 0{Number(project.number)}</span><span>SYSTEM STUDY</span><span className="diagram-cross">+</span></div>
    {project.id === 'gitlab-rag' && <div className="rag-visual">
      <div className="doc-stack"><div /><div /><div><span /><span /><span /><span /></div><small className="mono">HANDBOOK</small></div>
      <div className="diagram-connector"><span /><span /><span /></div>
      <div className="vector-index">{Array.from({ length: 36 }, (_, i) => <i key={i} style={{ opacity: [4, 9, 14, 20, 27, 32].includes(i) ? 1 : 0.2 }} />)}<small className="mono">CONTEXT</small></div>
      <div className="diagram-connector"><span /><span /><span /></div>
      <div className="answer-symbol"><span>“</span><div /><div /><small className="mono">ANSWER + SOURCE</small></div>
    </div>}
    {project.id === 'cifar-cnn' && <div className="cnn-visual"><div className="pixel-image">{Array.from({ length: 64 }, (_, i) => <i key={i} style={{ opacity: ((i * 7 + 13) % 11 + 1) / 12 }} />)}</div><span className="visual-arrow">→</span><div className="cnn-layers"><i /><i /><i /></div><span className="visual-arrow">→</span><div className="class-output"><b>10</b><small className="mono">CLASSES</small></div></div>}
    {project.id === 'chessbot' && <div className="chess-visual"><div className="chess-board">{Array.from({ length: 64 }, (_, i) => <i className={(i + Math.floor(i / 8)) % 2 ? 'dark-square' : ''} key={i}>{i === 27 ? '♞' : i === 10 ? '♙' : i === 52 ? '♚' : ''}</i>)}</div><svg viewBox="0 0 150 160" aria-hidden="true"><path d="M75 16 30 65m45-49 45 49M30 65 12 125m18-60 18 60m72-60-18 60m18-60 18 60" fill="none" stroke="currentColor" opacity=".5" /><circle cx="75" cy="16" r="8" fill="currentColor" /><circle cx="30" cy="65" r="7" fill="currentColor" /><circle cx="120" cy="65" r="7" fill="currentColor" /><path d="m94 100 40 35m0-35-40 35" stroke="currentColor" strokeWidth="2" /></svg></div>}
    {project.id === 'e-store' && <div className="store-visual"><div className="store-module"><span className="module-mark">◎</span><span>ACCOUNT</span></div><i>→</i><div className="store-module"><span className="module-mark">▦</span><span>CATALOG</span></div><i>→</i><div className="store-module"><span className="module-mark">⊞</span><span>CART</span></div></div>}
    {project.id === 'gitlab-rag' && <div className="diagram-node-labels"><span>HANDBOOK</span><span>CONTEXT</span><span>ANSWER + SOURCE</span></div>}
    <div className="diagram-footer mono"><span>{project.pipeline[0]}</span><span>→</span><span>{project.pipeline[project.pipeline.length - 1]}</span></div>
    <p className="diagram-disclaimer">Architecture illustration · not a product screenshot</p>
  </div>;
}
