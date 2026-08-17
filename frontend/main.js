import './src/styles/base.css'
import './src/styles/atoms.css'
import './src/styles/molecules.css'
import './src/styles/organisms.css'

import { renderHome } from './src/pages/Home.js';
import { renderFindTickets } from './src/pages/FindTickets.js';
import { renderMyTickets } from './src/pages/MyTickets.js';
import { renderRegister } from './src/pages/Register.js';
import { renderSuccess } from './src/pages/Success.js';
import { renderCancel } from './src/pages/Cancel.js';
import { renderCancelSuccess } from './src/pages/CancelSuccess.js';
import { renderEventDetails } from './src/pages/EventDetails.js';
import { renderFindMyRegistration } from './src/pages/FindMyRegistration.js';

let slideshowInterval;

const routes = {
    '#/': renderHome,
    '#/browse': renderFindTickets,
    '#/my-tickets': renderMyTickets,
    '#/register': renderEventDetails,
    '#/event': renderEventDetails,
    '#/success': renderSuccess,
    '#/cancel': renderCancel,
    '#/cancel-success': renderCancelSuccess,
    '#/find-my-registration': renderFindMyRegistration,
    '404': () => '<h1>404 - Page Not Found</h1><a href="#/">Go Home</a>'
};

const router = async () => {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }

    let path = window.location.hash || '#/';
    
    // Strip query strings for routing
    if (path.includes('?')) {
        path = path.split('?')[0];
    }
    
    let render = routes[path];
    if (!render) {
        if (path.startsWith('#/event/')) {
            render = renderEventDetails;
        } else {
            render = routes['404'];
        }
    }
    
    // Show a global loading state while the page component fetches data
    document.getElementById('app').innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh;"><div class="spinner" style="width: 40px; height: 40px; border: 4px solid var(--color-outline); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 1s linear infinite;"></div></div><style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>';
    
    try {
        document.getElementById('app').innerHTML = await render();
    } catch (e) {
        console.error(e);
        document.getElementById('app').innerHTML = '<div style="padding: 40px; text-align: center;"><h1>Error loading page</h1></div>';
    }
    
    // Initialize Featured Events Slideshow removed per user request
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
