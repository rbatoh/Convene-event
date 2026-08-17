import { PublicLayout } from '../components/templates/public-layout/public-layout.js';
import { Button } from '../components/atoms/button/button.js';
import { Icon } from '../components/atoms/icon/icon.js';

export const renderSuccess = async () => {
    // Parse URL params
    const hashSplit = window.location.hash.split('?');
    const params = new URLSearchParams(hashSplit[1] || '');
    let registrationId = params.get('registrationId') || 'CNV-8492-X';
    if (registrationId.startsWith('REG#')) {
        registrationId = registrationId.substring(4);
    }
    const eventId = params.get('eventId');

    let eventName = 'Global Tech Summit 2024';
    let eventDate = 'Oct 15-17, 2024';
    let eventLocation = 'Moscone Center, SF';

    if (eventId) {
        try {
            const { fetchEvents } = await import('../api/client.js');
            const events = await fetchEvents();
            const event = events.find(e => e.id === eventId);
            if (event) {
                eventName = event.title;
                eventDate = `${event.date} • ${event.time}`;
                eventLocation = event.location || 'Online / TBD';
            }
        } catch (err) {
            console.error('Failed to fetch event details for success page:', err);
        }
    }

    const content = `
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: var(--spacing-3xl) var(--spacing-xl); max-width: 800px; margin: 0 auto;">
            <div style="background-color: var(--color-surface-container-high); border-radius: 50%; padding: var(--spacing-lg); display: flex; align-items: center; justify-content: center; height: 96px; width: 96px; margin-bottom: var(--spacing-lg);">
                <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-primary-container);">check_circle</span>
            </div>
            
            <h1 class="marketing-hero" style="margin-bottom: var(--spacing-sm);">You're All Set!</h1>
            <p style="color: var(--color-on-surface-variant); max-width: 500px; margin-bottom: var(--spacing-xl);">Your registration has been confirmed. We've sent a detailed confirmation email to your registered address.</p>
            
            <div style="background-color: var(--color-soft-lavender); width: 100%; border-radius: var(--radius-lg); padding: var(--spacing-xl); box-shadow: var(--shadow-hover); border: 1px solid var(--color-outline-variant); text-align: left; margin-bottom: var(--spacing-xl);">
                <h2 class="card-title" style="color: var(--color-primary); margin-bottom: var(--spacing-lg); padding-bottom: var(--spacing-md); border-bottom: 1px solid rgba(78, 23, 128, 0.2);">Registration Details</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg);">
                    <div>
                        <p class="ui-label" style="color: var(--color-on-surface-variant); margin-bottom: var(--spacing-base);">Event Name</p>
                        <p style="font-weight: 600;">${eventName}</p>
                    </div>
                    <div>
                        <p class="ui-label" style="color: var(--color-on-surface-variant); margin-bottom: var(--spacing-base);">Date & Time</p>
                        <p style="font-weight: 600; display: flex; align-items: center; gap: var(--spacing-xs);">
                            ${Icon({ name: 'calendar_today', className: 'text-[20px]' })} ${eventDate}
                        </p>
                    </div>
                    <div>
                        <p class="ui-label" style="color: var(--color-on-surface-variant); margin-bottom: var(--spacing-base);">Location</p>
                        <p style="font-weight: 600; display: flex; align-items: center; gap: var(--spacing-xs);">
                            ${Icon({ name: 'location_on', className: 'text-[20px]' })} ${eventLocation}
                        </p>
                    </div>
                    <div>
                        <p class="ui-label" style="color: var(--color-on-surface-variant); margin-bottom: var(--spacing-base);">Registration ID</p>
                        <p style="font-weight: 600; color: var(--color-primary); font-family: monospace; font-size: 16px; letter-spacing: 2px;">${registrationId}</p>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap; justify-content: center;">
                ${Button({ text: 'View My Registrations', variant: 'primary', onClick: "window.location.hash='#/my-tickets'" })}
                ${Button({ text: 'Back to Home', variant: 'outline', onClick: "window.location.hash='#/'" })}
            </div>
        </div>
    `;

    return PublicLayout({ children: content });
};
