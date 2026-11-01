// Portfolio facts come from the supplied one-page resume. Editorial copy is kept
// separate from claims about outcomes; no project URLs or scores are invented.
export const person = {
  name: 'Palak Pandit',
  email: 'palakpandit998@gmail.com',
  phone: '+91 82528 36961',
  telephone: 'tel:+918252836961',
  github: 'https://github.com/palak12p',
  linkedin: 'https://www.linkedin.com/in/palak-pandit-1b041b312',
  leetcode: 'https://leetcode.com/u/heypalak11/',
  codeforces: 'https://codeforces.com/profile/palakpandit43',
  resume: './Palak-Pandit-Resume.pdf',
};

export type Project = {
  id: string; number: string; name: string; label: string; category: string;
  period: string; description: string; question: string; accent: string;
  stack: string[]; pipeline: string[]; features: string[];
  engineering: string; outcome: string; repository?: string;
};

export const projects: Project[] = [
  {
    repository: 'https://github.com/palak12p/RAG_CHATBOT',
    id: 'gitlab-rag', number: '01', name: 'Answers, with a source.',
    label: 'GitLab documentation chatbot', category: 'RETRIEVAL / GENERATIVE AI',
    period: 'Jan — Feb 2026', accent: 'lime',
    description: 'A RAG chatbot that turns GitLab handbook documentation into contextual, multi-turn answers with source citations.',
    question: 'How do you make a handbook conversational without losing the source?',
    stack: ['Python', 'Streamlit', 'FAISS', 'SentenceTransformers', 'Gemini', 'BeautifulSoup'],
    pipeline: ['Crawl & chunk', 'Embed & index', 'Retrieve context', 'Generate & cite'],
    features: ['Web crawling, text preprocessing and document chunking', 'Embedding generation and a FAISS vector index', 'Semantic similarity search and Gemini response generation', 'Multi-turn conversations, source citations and session management'],
    engineering: 'Retrieval is the bridge between a question and its evidence. The pipeline makes that bridge visible: documents become searchable context, which informs the generated answer.',
    outcome: 'A Streamlit interface with conversational question answering, source citations and session management. The resume does not report retrieval benchmarks or user counts.',
  },
  {
    repository: 'https://github.com/palak12p/cifar10',
    id: 'cifar-cnn', number: '02', name: 'Teaching pixels meaning.',
    label: 'CIFAR-10 image classifier', category: 'COMPUTER VISION / DEEP LEARNING',
    period: 'Mar — Apr 2026', accent: 'blue',
    description: 'A PyTorch convolutional neural network for classifying images across ten object categories, with class-level evaluation.',
    question: 'How can a model learn visual features and be evaluated beyond a single score?',
    stack: ['Python', 'PyTorch', 'CNN', 'NumPy', 'Matplotlib', 'scikit-learn'],
    pipeline: ['Image input', 'Convolve & pool', 'Classify', 'Evaluate'],
    features: ['Convolutional layers with ReLU activations', 'Max pooling and fully connected classification layers', 'Cross-entropy loss, Adam optimization and dropout regularization', 'Accuracy, precision, recall, F1-score and confusion-matrix evaluation', 'Training and validation loss monitoring across epochs'],
    engineering: 'Model quality needs more than an overall accuracy number. Per-class metrics and loss curves help reveal uneven performance and overfitting.',
    outcome: 'A CNN training and evaluation workflow covering all ten CIFAR-10 classes. No numerical accuracy is supplied in the resume, so no score is claimed here.',
  },
  {
    repository: 'https://github.com/palak12p/chatbot',
    id: 'chessbot', number: '03', name: 'A few moves ahead.',
    label: 'ChessBot · interactive chess engine', category: 'SEARCH / GAME INTELLIGENCE',
    period: 'Nov — Dec 2025', accent: 'peach',
    description: 'An interactive chess application with an AI opponent, animated moves, legal move validation and full game-state handling.',
    question: 'What does it take to turn a search algorithm into a playable opponent?',
    stack: ['Python', 'Pygame', 'Minimax', 'Alpha-beta pruning', 'Heuristics', 'OOP'],
    pipeline: ['Legal moves', 'Search tree', 'Prune & score', 'Choose move'],
    features: ['Animated moves and legal move validation', 'Undo and redo controls', 'Checkmate, stalemate and repetition handling', 'Minimax search, alpha-beta pruning and heuristic evaluation'],
    engineering: 'The algorithm is only one part of the experience. Legal moves, reversible state and end-game rules make the search useful in an interactive application.',
    outcome: 'A playable chess application with an AI opponent and complete game-state handling. Search depth and playing-strength ratings are not supplied.',
  },
  {
    repository: 'https://github.com/palak12p/ecommerce',
    id: 'e-store', number: '04', name: 'From browse to bought.',
    label: 'E-Store · modular e-commerce', category: 'WEB ENGINEERING / DJANGO',
    period: 'May — Jul 2024', accent: 'lavender',
    description: 'A modular Django commerce application that connects account management, product discovery, cart operations and order placement.',
    question: 'How do you connect the whole shopping journey through reusable modules?',
    stack: ['Python', 'Django', 'SQLite', 'HTML5', 'CSS', 'JavaScript'],
    pipeline: ['Sign in', 'Browse & search', 'Manage cart', 'Place order'],
    features: ['Reusable authentication, catalog and cart apps', 'Registration, login, logout and profile updates', 'Category-based browsing and search', 'Add, remove and update cart items; checkout and order placement'],
    engineering: 'Modular apps create boundaries around accounts, products and cart state while keeping the customer journey connected.',
    outcome: 'A full-featured e-commerce application supporting order placement. Payment processing, revenue and production traffic are not claimed.',
  },
];

export const skills = [
  { title: 'Intelligence', subtitle: 'Learning from data', items: ['Python', 'PyTorch', 'scikit-learn', 'CNNs', 'Transformers', 'Supervised learning', 'Model evaluation', 'EDA'] },
  { title: 'Context', subtitle: 'Making information useful', items: ['RAG', 'FAISS', 'SentenceTransformers', 'Gemini API', 'Prompt engineering', 'Semantic search', 'Agentic AI', 'Information extraction'] },
  { title: 'Systems', subtitle: 'Making ideas work', items: ['Django', 'Streamlit', 'SQL', 'SQLite', 'MySQL', 'Git & GitHub', 'C++', 'Java', 'Pandas', 'NumPy'] },
];

export const answers = [
  { title: 'What does Palak build?', keywords: ['build', 'project', 'work', 'make', 'ai', 'special', 'technolog', 'skill'], answer: 'Palak builds across AI and web engineering: a GitLab documentation RAG chatbot, a PyTorch CIFAR-10 classifier, a chess engine with an AI opponent, and a modular Django e-commerce application. The toolkit includes Python, PyTorch, FAISS, SentenceTransformers, Gemini, Django and Streamlit.', target: '#work', action: 'Explore the projects' },
  { title: 'How does Palak bring people together?', keywords: ['community', 'people', 'growth', 'marketing', 'event', 'lead', 'gdg', 'ownership'], answer: 'The resume records marketing and execution for 5+ GDG technical events, a campus developer community, and workshops with 200+ attendance. These are the clearest documented examples of community ownership and execution.', target: '#people', action: 'See the community story' },
  { title: 'What is Palak’s academic background?', keywords: ['educat', 'college', 'study', 'academic', 'degree', 'cgpa', 'graduate', 'nmit'], answer: 'Palak is pursuing a Bachelor of Engineering in Information Science and Engineering at Nitte Meenakshi Institute of Technology, Bengaluru, from August 2023 to July 2027. The resume lists a CGPA of 9.25.', target: '#journey', action: 'View the journey' },
  { title: 'What has Palak achieved?', keywords: ['achiev', 'award', 'hackathon', 'leetcode', 'codeforces', 'coding', 'jee', 'certif'], answer: 'The resume lists a top-5% finish among 500+ participants at the IISc Code Cadets Hackathon, 300+ LeetCode problems solved, and 96 percentile in JEE Mains 2023. Certifications include the Simplilearn Data Scientist Masters Program and PwC Advisory Launchpad Program.', target: '#journey', action: 'View milestones' },
  { title: 'How can I contact Palak?', keywords: ['contact', 'email', 'hire', 'reach', 'connect', 'linkedin', 'github'], answer: 'Email palakpandit998@gmail.com, or use the LinkedIn and GitHub links in the contact section. Joining availability and willingness to travel are not specified in the resume and should be confirmed directly.', target: '#contact', action: 'Get in touch' },
  { title: 'Does Palak have professional experience?', keywords: ['experience', 'job', 'intern', 'company', 'profession', 'employment'], answer: 'The supplied resume documents projects, community leadership, education and certifications. It does not list formal employment or internships, so this portfolio does not claim any.', target: '#journey', action: 'Explore the documented journey' },
  ...projects.map((p, i) => ({
    title: `Tell me about ${p.label}`,
    keywords: [['gitlab', 'rag', 'retrieval', 'chatbot', 'handbook'], ['cifar', 'cnn', 'vision', 'image', 'classifier', 'pytorch', 'accuracy'], ['chess', 'minimax', 'pruning', 'game'], ['store', 'commerce', 'django', 'cart', 'checkout']][i],
    answer: `${p.description} ${p.outcome}`,
    target: `#project/${p.id}`,
    action: 'Explore this build',
  })),
];
