import { useId, useState } from 'react';
import { answers } from '../content';
import { Icon } from './Icon';

/** The homepage and dialog share one resume-grounded question index. */
export function IndexQuestions({ embedded = false, onNavigate }: { embedded?: boolean; onNavigate?: () => void }) {
  const id = useId();
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<typeof answers[number] | null | undefined>(undefined);
  const find = (q: string) => {
    setQuestion(q);
    const lower = q.toLowerCase();
    const explicit = answers.find(a => a.title === q);
    const professional = /experience|internship|employment|professional|job/.test(lower) ? answers[5] : undefined;
    const scored = answers.map(a => ({ a, score: a.keywords.reduce((s, k) => s + (lower.includes(k) ? 1 : 0), 0) })).sort((a, b) => b.score - a.score);
    setResult(explicit ?? professional ?? (scored[0]?.score ? scored[0].a : null));
  };
  return <div className={embedded ? 'index-questions embedded-index' : 'index-questions'}>
    <form className="question-form" onSubmit={e => { e.preventDefault(); if (question.trim()) find(question.trim()); }}>
      <label className="sr-only" htmlFor={id}>{embedded ? 'Ask the portfolio index' : 'Ask about Palak'}</label>
      <input id={id} autoFocus={!embedded} maxLength={240} value={question} onChange={e => setQuestion(e.target.value)} placeholder="What does Palak build?" required />
      <button className="icon-button" aria-label={embedded ? 'Submit question to the index' : 'Find an answer'} type="submit"><Icon /></button>
    </form>
    <div className="question-suggestions">{answers.slice(0, 4).map(a => <button key={a.title} onClick={() => find(a.title)}>{a.title}<span aria-hidden="true">↗</span></button>)}</div>
    <div className="answer-region" aria-live="polite">{result !== undefined && <div className="index-answer">
      <span className="eyebrow">{result ? 'FROM THE RESUME' : 'OUTSIDE THE INDEX'}</span>
      <p>{result?.answer ?? 'I don’t have verified information for that question. Try asking about projects, skills, community, education, achievements or contact details.'}</p>
      {result && <a className="text-link" href={result.target} onClick={onNavigate}>{result.action}<Icon /></a>}
    </div>}</div>
    <p className="index-note mono">ANSWERS FROM MY RESUME · YOUR QUESTIONS STAY IN THIS BROWSER</p>
  </div>;
}
