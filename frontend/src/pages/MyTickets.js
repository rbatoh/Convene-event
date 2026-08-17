import { PublicLayout } from '../components/templates/public-layout/public-layout.js';
import { Button } from '../components/atoms/button/button.js';
import { Icon } from '../components/atoms/icon/icon.js';
import { Badge } from '../components/atoms/badge/badge.js';
import { lookupRegistrations, fetchEvents } from '../api/client.js';

export const renderMyTickets = async () => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
    const email = urlParams.get('email');

    if (!email) {
        window.location.hash = '#/find-my-registration';
        return '';
    }

    let ticketsHtml = '';
    try {
        const registrations = await lookupRegistrations(email);
        const activeRegistrations = registrations.filter(r => r.status === 'CONFIRMED');
        
        if (activeRegistrations.length === 0) {
            ticketsHtml = `
                <div style="text-align: center; padding: 40px; background-color: var(--color-surface-container-low); border-radius: var(--radius-lg);">
                    <p style="color: var(--color-on-surface-variant); margin-bottom: 20px;">We couldn't find any registrations for <strong>${email}</strong>.</p>
                    ${Button({ text: 'Browse Events', variant: 'primary', onClick: "window.location.hash='#/browse'" })}
                </div>
            `;
        } else {
            const events = await fetchEvents();
            
            ticketsHtml = activeRegistrations.map(reg => {
                const event = events.find(e => e.id === reg.eventId);
                if (!event) return '';
                
                const cancelUrl = `#/cancel?registrationId=${encodeURIComponent(reg.registrationId)}&email=${encodeURIComponent(email)}&eventId=${encodeURIComponent(reg.eventId)}&title=${encodeURIComponent(event.title)}`;
                
                return `
                <div style="background-color: var(--color-surface-container-low); border: 1px solid var(--color-outline-variant); border-radius: var(--radius-lg); padding: var(--spacing-xl); display: flex; flex-direction: column; gap: var(--spacing-md); transition: box-shadow 0.2s;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--spacing-sm);">
                        <div>
                            <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-xs);">
                                <h2 class="card-title">${event.title}</h2>
                                ${Badge({ text: 'Confirmed', type: 'success' })}
                            </div>
                            <div style="display: flex; gap: var(--spacing-lg); color: var(--color-on-surface-variant); font-size: var(--font-size-ui-label);">
                                <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
                                    ${Icon({ name: 'calendar_today', className: 'text-[16px]' })} ${event.date}
                                </div>
                                <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
                                    ${Icon({ name: 'location_on', className: 'text-[16px]' })} ${event.location || 'Virtual'}
                                </div>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <p class="ui-label" style="color: var(--color-on-surface-variant);">Registration ID</p>
                            <p style="font-family: monospace; font-size: 16px; font-weight: 600; color: var(--color-primary);">${reg.registrationId}</p>
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid var(--color-outline-variant); padding-top: var(--spacing-md); display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
                        ${Button({ text: 'Cancel Registration', variant: 'outline', onClick: `window.location.hash='${cancelUrl}'` })}
                    </div>
                </div>
                `;
            }).join('');
        }
    } catch (e) {
        ticketsHtml = `<p style="color: #ba1a1a;">Failed to load registrations. Please try again later.</p>`;
    }

    const content = `
        <div style="padding: var(--spacing-3xl) var(--spacing-xl); max-width: 1000px; margin: 0 auto; min-height: 70vh;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xl);">
                <h1 class="page-heading">My Registrations</h1>
                <p style="color: var(--color-on-surface-variant);">Showing tickets for: <strong>${email}</strong></p>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: var(--spacing-lg);">
                ${ticketsHtml}
            </div>
        </div>
    `;
    return PublicLayout({ children: content });
};
