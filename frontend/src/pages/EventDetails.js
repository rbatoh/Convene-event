import { PublicLayout } from '../components/templates/public-layout/public-layout.js';
import { Button } from '../components/atoms/button/button.js';
import { Input } from '../components/atoms/input/input.js';
import { Icon } from '../components/atoms/icon/icon.js';
import { Badge } from '../components/atoms/badge/badge.js';
import { fetchEvents } from '../api/client.js';

window.showErrorModal = function(title, message) {
    const modalHtml = `
        <div id="error-modal" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px;">
            <div style="background-color: var(--color-surface); border-radius: var(--radius-2xl); padding: var(--spacing-2xl); max-width: 500px; width: 100%; text-align: center; box-shadow: var(--shadow-hover);">
                <div style="background-color: var(--color-surface-container-high); border-radius: 50%; padding: var(--spacing-lg); display: flex; align-items: center; justify-content: center; height: 80px; width: 80px; margin: 0 auto var(--spacing-lg);">
                    <span class="material-symbols-outlined" style="font-size: 40px; color: var(--color-primary-container);">info</span>
                </div>
                <h2 class="marketing-hero" style="font-size: 28px; margin-bottom: var(--spacing-sm);">${title}</h2>
                <p style="color: var(--color-on-surface-variant); margin-bottom: var(--spacing-xl); font-size: 16px;">${message}</p>
                <div style="display: flex; justify-content: center;">
                    <button class="btn btn-primary" onclick="document.getElementById('error-modal').remove()">Got it</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

// Expose a global handler for the form submission
window.submitRegistration = async function(e, eventId) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    
    if (!nameInput.value || !emailInput.value) {
        window.showErrorModal('Missing Information', 'Please enter both your name and email address to continue.');
        return;
    }

    const originalText = btn.innerHTML;
    btn.innerHTML = 'Registering...';
    btn.disabled = true;
    
    try {
        const { registerEvent } = await import('../api/client.js');
        const result = await registerEvent(eventId, nameInput.value, emailInput.value);
        window.location.hash = `#/success?registrationId=${encodeURIComponent(result.registrationId || '')}&eventId=${encodeURIComponent(eventId)}`;
    } catch (err) {
        if (err.message && err.message.toLowerCase().includes('already registered')) {
            window.showErrorModal('Already Registered!', 'You have already secured a spot for this event using that email address.');
        } else {
            window.showErrorModal('Registration Failed', err.message || 'An unexpected error occurred.');
        }
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
};

export const renderEventDetails = async () => {
    const path = window.location.hash;
    const eventId = path.split('/')[2];
    
    const allEvents = await fetchEvents();
    const event = allEvents.find(e => e.id === eventId);

    if (!event) {
        return PublicLayout({ children: `
            <div style="max-width: 1280px; margin: 0 auto; padding: var(--spacing-xl) var(--spacing-md); text-align: center; padding-top: 100px;">
                <h1 class="page-heading">Event Not Found</h1>
                <p style="color: var(--color-on-surface-variant); margin-top: var(--spacing-sm);">Sorry, we couldn't find the event you were looking for.</p>
                <div style="margin-top: var(--spacing-lg);">
                    ${Button({ text: 'Browse Events', variant: 'primary', onClick: "window.location.hash='#/browse'" })}
                </div>
            </div>
        `});
    }

    const badgeHtml = event.isFeatured ? Badge({ text: 'Featured', type: 'featured' }) : '';
    const formattedDescription = event.description.replace(/\n/g, '<br>');

    const content = `
        <div style="max-width: 1280px; margin: 0 auto; padding: var(--spacing-xl) var(--spacing-md); display: flex; flex-direction: column; gap: var(--spacing-2xl);">
            
            <!-- Event Hero Banner -->
            <div style="width: 100%; height: 400px; border-radius: var(--radius-xl); overflow: hidden; position: relative; background-color: var(--color-surface-container);">
                <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; top: var(--spacing-lg); left: var(--spacing-lg);">
                    ${badgeHtml}
                </div>
            </div>

            <!-- Content Split -->
            <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-2xl);">
                
                <!-- Left Column: Details -->
                <div style="flex: 1 1 600px; display: flex; flex-direction: column; gap: var(--spacing-lg);">
                    <h1 class="page-heading">${event.title}</h1>
                    
                    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-xl); color: var(--color-on-surface-variant); font-size: 16px;">
                        <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
                            ${Icon({ name: 'calendar_today' })}
                            <span>${event.date}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
                            ${Icon({ name: 'schedule' })}
                            <span>${event.time}</span>
                        </div>
                        ${event.location ? `
                        <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
                            ${Icon({ name: 'location_on' })}
                            <span>${event.location}</span>
                        </div>
                        ` : ''}
                    </div>

                    <div style="height: 1px; width: 100%; background-color: var(--color-outline-variant); opacity: 0.5;"></div>

                    <div>
                        <h3 class="card-title" style="margin-bottom: var(--spacing-md);">About This Event</h3>
                        <p class="body-text" style="color: var(--color-on-surface-variant); line-height: 1.8;">
                            ${formattedDescription}
                        </p>
                    </div>
                </div>

                <!-- Right Column: Registration Form -->
                <div style="flex: 1 1 320px;">
                    <div style="background-color: var(--color-surface-container-low); border: 1px solid var(--color-outline-variant); border-radius: var(--radius-xl); padding: var(--spacing-xl); position: sticky; top: 100px;">
                        <h3 class="card-title" style="margin-bottom: var(--spacing-sm);">Register Now</h3>
                        <p style="color: var(--color-on-surface-variant); margin-bottom: var(--spacing-lg); font-size: 14px;">Secure your spot instantly.</p>
                        
                        <form onsubmit="window.submitRegistration(event, '${event.id}')" style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                            <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
                                <label class="ui-label">Full Name</label>
                                ${Input({ type: 'text', placeholder: 'Jane Doe' })}
                            </div>
                            <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
                                <label class="ui-label">Email Address</label>
                                ${Input({ type: 'email', placeholder: 'jane@example.com' })}
                            </div>
                            
                            <div style="margin-top: var(--spacing-sm);">
                                <button class="btn btn-primary" type="submit" style="width: 100%;">Confirm Registration</button>
                            </div>
                            
                            <div style="display: flex; align-items: flex-start; gap: var(--spacing-xs); color: var(--color-on-surface-variant); margin-top: var(--spacing-xs);">
                                ${Icon({ name: 'lock', className: 'text-[16px] mt-[2px]' })}
                                <p class="ui-label" style="font-size: 12px; opacity: 0.8;">Your information is secure. No spam, ever.</p>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    `;

    return PublicLayout({ children: content });
};
