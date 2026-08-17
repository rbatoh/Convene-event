import './top-nav-bar.css';
import { Button } from '../../atoms/button/button.js';
import { Icon } from '../../atoms/icon/icon.js';

export const TopNavBar = () => {
    let email = null;
    try {
        const hash = window.location.hash;
        if (hash.includes('?')) {
            const urlParams = new URLSearchParams(hash.split('?')[1]);
            email = urlParams.get('email');
        }
    } catch(e) {}
    
    let avatarHtml = `<button class="nav-icon-btn">${Icon({ name: 'account_circle' })}</button>`;
    if (email) {
        const namePart = email.split('@')[0];
        const parts = namePart.split('.');
        let initials = '';
        if (parts.length > 1) {
            initials = (parts[0][0] + parts[1][0]).toUpperCase();
        } else {
            initials = parts[0].substring(0, 2).toUpperCase();
        }
        
        avatarHtml = `
            <div style="background-color: var(--color-primary); color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-left: 8px;">
                ${initials}
            </div>
        `;
    }

    return `
        <header class="top-navbar">
            <div class="nav-container">
                <div class="nav-left">
                    <a href="#/" class="nav-logo" style="text-decoration: none; cursor: pointer;">Convene</a>
                    <nav class="nav-links">
                        <a href="#/browse" class="nav-link active">Browse</a>
                        <a href="#/find-my-registration" class="nav-link">Find My Registration</a>
                        <a href="#" class="nav-link">Help</a>
                        <a href="#" class="nav-link">Contact</a>
                    </nav>
                </div>
                <div class="nav-right">
                    <button class="nav-icon-btn hamburger-menu-btn" onclick="document.getElementById('mobile-menu').classList.toggle('open')">
                        ${Icon({ name: 'menu' })}
                    </button>
                    ${avatarHtml}
                </div>
            </div>
            
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="mobile-menu">
                <div class="mobile-menu-content">
                    <a href="#/browse" class="mobile-nav-link" onclick="document.getElementById('mobile-menu').classList.remove('open')">Browse</a>
                    <a href="#/find-my-registration" class="mobile-nav-link" onclick="document.getElementById('mobile-menu').classList.remove('open')">Find My Registration</a>
                    <a href="#" class="mobile-nav-link" onclick="document.getElementById('mobile-menu').classList.remove('open')">Help</a>
                    <a href="#" class="mobile-nav-link" onclick="document.getElementById('mobile-menu').classList.remove('open')">Contact</a>
                </div>
            </div>
        </header>
    `;
};
