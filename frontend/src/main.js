import './style.css';
import { renderHome } from './pages/Home.js';
import { renderRegister } from './pages/Register.js';
import { renderSuccess } from './pages/Success.js';
import { renderFindMyRegistration } from './pages/FindMyRegistration.js';
import { renderMyTickets } from './pages/MyTickets.js';
import { renderCancel } from './pages/Cancel.js';
import { renderCancelSuccess } from './pages/CancelSuccess.js';

const routes = {
    '': renderHome,
    '#/': renderHome,
    '#/browse': renderHome,
    '#/register': renderRegister,
    '#/success': renderSuccess,
    '#/find-my-registration': renderFindMyRegistration,
    '#/my-tickets': renderMyTickets,
    '#/cancel': renderCancel,
    '#/cancel-success': renderCancelSuccess
};

const router = () => {
    const hash = window.location.hash || '#/';
    const renderFunction = routes[hash] || renderHome;
    
    const appContainer = document.querySelector('#app');
    if (appContainer) {
        appContainer.innerHTML = renderFunction();
    }
};

window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', router);

// Trigger initial route
router();
