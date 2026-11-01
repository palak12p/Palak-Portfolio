import { useMemo, useState } from 'react';
import { Icon } from './Icon';

const modes = [
  { word: 'Learn', title: 'Find the pattern.', detail: 'CNNs, retrieval and the questions that start a project.', href: '#work', code: 'input → understanding' },
  { word: 'Build', title: 'Make it work.', detail: 'Four projects. From neural networks to a playable chess engine.', href: '#work', code: 'idea → implementation' },
  { word: 'Connect', title: 'Bring people in.', detail: 'Technical events, campus workshops and a developer community.', href: '#people', code: 'people → possibility' },
];

function threadPath(thread: number, mode: number) {
  const points: string[] = [];
  for (let n = 0; n <= 160; n++) {
    const t = n / 160 * Math.PI * 2;
    const v = thread / 28 * Math.PI * 2;
    const r = 124 + 42 * Math.cos(3 * t + v);
    const x = r * Math.cos(2 * t);
    const y = r * Math.sin(2 * t);
    const z = 42 * Math.sin(3 * t + v);
    const a = 0.5 + mode * 0.38;
    const xx = x * Math.cos(a) + z * Math.sin(a);
    const zz = -x * Math.sin(a) + z * Math.cos(a);
    const yy = y * Math.cos(0.6) - zz * Math.sin(0.6);
    points.push(`${n === 0 ? 'M' : 'L'}${(240 + xx * 1.12).toFixed(1)},${(224 + yy * 1.12).toFixed(1)}`);
  }
  return points.join(' ');
}

export function SignalLab() {
  const [active, setActive] = useState(0);
  const paths = useMemo(() => Array.from({ length: 28 }, (_, i) => threadPath(i, active)), [active]);
  return <div className={`signal-lab mode-${active}`}>
    <div className="lab-top mono"><span><span className="status-dot" /> THE SIGNAL LAB</span><span>LIVE EXPLORATION</span></div>
    <div className="signal-canvas">
      <svg viewBox="0 0 480 448" role="img" aria-label="Interwoven signal paths change shape as you select Learn, Build, or Connect.">
        <defs><pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill="#6b7364" opacity=".35" /></pattern></defs>
        <rect width="480" height="448" fill="url(#dot-grid)" />
        <circle cx="240" cy="224" r="194" fill="none" stroke="#373d32" strokeDasharray="3 8" />
        <path d="M30 224h20m380 0h20M240 14v20m0 380v20" stroke="#727b67" />
        <g className="signal-threads">{paths.map((d, i) => <path key={`${active}-${i}`} d={d} fill="none" stroke={i % 7 === 0 ? '#e3ff9b' : '#9caf77'} strokeWidth={i % 7 === 0 ? 1.3 : 0.65} opacity={i % 7 === 0 ? 0.95 : 0.48} />)}</g>
        <circle cx="240" cy="224" r="4" fill="#e3ff9b" /><circle cx="240" cy="224" r="11" fill="none" stroke="#e3ff9b" opacity=".4" />
      </svg>
      <div className="lab-coordinate mono">{modes[active].code}</div>
      <span className="lab-marker mono">0{active + 1} / 03</span>
    </div>
    <div className="lab-tabs" role="group" aria-label="Explore Palak's approach">{modes.map((mode, i) => <button key={mode.word} aria-pressed={active === i} onClick={() => setActive(i)}><span className="mono">0{i + 1}</span>{mode.word}<span className="tab-dot" /></button>)}</div>
    <a className="lab-caption" href={modes[active].href}><div><strong>{modes[active].title}</strong><p>{modes[active].detail}</p></div><Icon /></a>
  </div>;
}
