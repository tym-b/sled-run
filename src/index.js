import 'babel-core/register';
import 'babel-polyfill';
import { render } from 'react-dom';

import './index.scss';
import routes from './routes';

render(routes, document.getElementById('app'));
