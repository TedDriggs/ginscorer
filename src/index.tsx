import * as ReactDOM from 'react-dom';
import App from './App';
import { register } from './serviceWorkerRegistration';

ReactDOM.render(<App />, document.getElementById('root'));
register();
