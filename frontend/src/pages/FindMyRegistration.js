import { PublicLayout } from '../components/templates/public-layout/public-layout.js';
import { Button } from '../components/atoms/button/button.js';
import { Input } from '../components/atoms/input/input.js';

window.submitLookup = function(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    if (email) {
        window.location.hash = '#/my-tickets?email=' + encodeURIComponent(email);
    }
};

export const renderFindMyRegistration = async () => {
    const content = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--spacing-3xl) var(--spacing-xl); max-width: 600px; margin: 0 auto; min-height: 70vh;">
            
            <div style="text-align: center; margin-bottom: var(--spacing-xl);">
                <div style="background-color: var(--color-surface-container); border-radius: 50%; padding: var(--spacing-lg); display: inline-flex; align-items: center; justify-content: center; height: 80px; width: 80px; margin-bottom: var(--spacing-lg); border: 1px solid var(--color-surface-container-high);">
                    <span class="material-symbols-outlined" style="font-size: 36px; color: var(--color-primary);">search</span>
                </div>
                <h1 class="section-heading" style="margin-bottom: var(--spacing-sm);">Find My Registration</h1>
                <p style="color: var(--color-on-surface-variant); max-width: 400px; margin: 0 auto;">Enter the email you used to register to retrieve your tickets.</p>
            </div>
            
            <div style="width: 100%; background-color: var(--color-surface-container-low); border: 1px solid rgba(206, 195, 211, 0.3); border-radius: var(--radius-xl); padding: var(--spacing-xl); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <form onsubmit="window.submitLookup(event)" style="display: flex; flex-direction: column; gap: var(--spacing-lg);">
                    
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
                        <label class="ui-label">Email Address</label>
                        ${Input({ type: 'email', placeholder: 'jane@example.com', required: true })}
                    </div>
                    
                    <div style="margin-top: var(--spacing-sm);">
                        ${Button({ text: 'Retrieve Tickets', variant: 'primary', className: 'w-full', type: 'submit' })}
                    </div>
                    
                    <div style="display: flex; justify-content: center; margin-top: var(--spacing-sm);">
                        <a href="#/" style="color: var(--color-secondary); text-decoration: none; font-size: 14px; font-weight: 500;">Back to Home</a>
                    </div>
                </form>
            </div>
            
        </div>
    `;

    return PublicLayout({ children: content });
};
