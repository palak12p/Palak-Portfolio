import { StrictMode, Component } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './readability.css';

class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main style={{ padding: '10vh 8vw', color: '#f0f0e7', fontFamily: 'system-ui' }}><h1>Let’s reconnect.</h1><p>The interactive portfolio could not load. You can still <a style={{ color: '#d9fa77' }} href="./Palak-Pandit-Resume.pdf">read Palak’s resume</a> or <a style={{ color: '#d9fa77' }} href="mailto:palakpandit998@gmail.com">send an email</a>.</p><button onClick={() => window.location.reload()}>Reload portfolio</button></main>;
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(<StrictMode><ErrorBoundary><App /></ErrorBoundary></StrictMode>);
