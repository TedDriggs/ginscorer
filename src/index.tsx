import { createRoot } from 'react-dom/client';
import App from './App';
import { register } from './serviceWorkerRegistration';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
register();
