import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { person, projects } from '../content';
import { IndexQuestions } from './IndexQuestions';
import { Icon } from './Icon';

function Dialog({ label, onClose, children, className = '' }: { label: string; onClose: () => void; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previous;
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={ref} className={`dialog ${className}`} aria-label={label} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === ref.current) onClose(); }}>
    <div className="dialog-top"><span className="mono">{label}</span><button className="icon-button" aria-label={`Close ${label}`} onClick={onClose}><Icon name="close" /></button></div>
    {children}
  </dialog>;
}

export function CommandPalette({ onClose, openIndex }: { onClose: () => void; openIndex: () => void }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const list = [
    { label: 'Selected work', hint: 'Four builds, four approaches', href: '#work' },
    ...projects.map(p => ({ label: p.label, hint: p.category.toLowerCase(), href: `#project/${p.id}` })),
    { label: 'Community & ownership', hint: 'Events, workshops, people', href: '#people' },
    { label: 'Education & milestones', hint: 'The journey so far', href: '#journey' },
    { label: 'Contact Palak', hint: person.email, href: '#contact' },
    { label: 'Download resume', hint: 'PDF · verified source', href: person.resume },
    { label: 'GitHub', hint: 'github.com/palak12p', href: person.github },
    { label: 'LinkedIn', hint: 'Connect with Palak', href: person.linkedin },
  ].filter(c => `${c.label} ${c.hint}`.toLowerCase().includes(query.toLowerCase()));
  const select = (index: number) => {
    const item = list[index];
    if (!item) return;
    if (item.label === 'Download resume') {
      const link = document.createElement('a');
      link.href = item.href; link.download = 'Palak-Pandit-Resume.pdf';
      document.body.append(link); link.click(); link.remove(); onClose();
    }
    else if (item.href.startsWith('#')) { window.location.hash = item.href; onClose(); }
    else { window.open(item.href, '_blank', 'noopener,noreferrer'); onClose(); }
  };
  useEffect(() => { document.getElementById(`command-${selected}`)?.scrollIntoView({ block: 'nearest' }); }, [selected]);
  return <Dialog label="PORTFOLIO COMMANDS" onClose={onClose} className="command-dialog">
    <label className="command-search"><Icon name="search" /><input autoFocus aria-label="Search portfolio commands" role="combobox" aria-expanded="true" aria-controls="command-options" aria-activedescendant={list.length ? `command-${selected}` : undefined} aria-autocomplete="list" placeholder="Where would you like to go?" value={query} onChange={e => { setQuery(e.target.value); setSelected(0); }} onKeyDown={e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => list.length ? (s + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length : 0); }
      if (e.key === 'Enter') { e.preventDefault(); select(selected); }
    }} /></label>
    <div className="command-results" id="command-options" role="listbox" aria-label="Matching commands">{list.length ? list.map((c, i) => <button id={`command-${i}`} role="option" aria-selected={i === selected} tabIndex={-1} key={c.label} className={i === selected ? 'selected' : ''} onMouseEnter={() => setSelected(i)} onClick={() => select(i)}><span><strong>{c.label}</strong><small>{c.hint}</small></span><Icon /></button>) : <p className="empty-state">No matching command. Try “projects”, “contact”, or “resume”.</p>}</div>
    <div className="command-bottom"><span className="mono">↑ ↓ TO MOVE · ENTER TO OPEN · ESC TO CLOSE</span><button onClick={() => { onClose(); openIndex(); }}>Ask a question <Icon name="spark" /></button></div>
  </Dialog>;
}

export function PortfolioIndex({ onClose }: { onClose: () => void }) {
  return <Dialog label="THE PORTFOLIO INDEX" onClose={onClose} className="index-dialog">
    <div className="index-intro"><span className="index-symbol"><Icon name="spark" /></span><h2>A little less scrolling.<br /><em>A little more asking.</em></h2><p>Explore the facts behind the portfolio. Answers come from Palak’s resume, with no generated claims.</p></div>
    <IndexQuestions onNavigate={onClose} />
  </Dialog>;
}
