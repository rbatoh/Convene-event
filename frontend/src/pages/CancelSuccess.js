import { PublicLayout } from '../components/templates/public-layout/public-layout.js';
import { Button } from '../components/atoms/button/button.js';
import { Icon } from '../components/atoms/icon/icon.js';

export const renderCancelSuccess = () => {
    const content = `
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: var(--spacing-3xl) var(--spacing-xl); max-width: 600px; margin: 0 auto; min-height: 70vh; justify-content: center;">
            
            <!-- Success Icon -->
            <div style="background-color: var(--color-surface-container); border-radius: 50%; padding: var(--spacing-lg); display: flex; align-items: center; justify-content: center; height: 96px; width: 96px; margin-bottom: var(--spacing-lg); border: 1px solid var(--color-surface-container-high);">
                <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-secondary);">task_alt</span>
            </div>
            
            <h1 class="section-heading" style="margin-bottom: var(--spacing-sm);">Registration Cancelled</h1>
            <p style="color: var(--color-on-surface-variant); margin-bottom: var(--spacing-xl); max-width: 320px;">You're all set — a confirmation has been sent to your email. We'd love to see you at a future event.</p>
            
            <!-- Summary Card -->
            <div style="width: 100%; background-color: var(--color-surface-container-low); border: 1px solid rgba(206, 195, 211, 0.3); border-radius: var(--radius-xl); padding: var(--spacing-lg); text-align: left; margin-bottom: var(--spacing-xl); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                    <div>
                        <p class="ui-label" style="color: var(--color-on-surface-variant); margin-bottom: var(--spacing-base); text-transform: uppercase; letter-spacing: 0.05em; font-size: 11px;">Event Details</p>
                        <h2 class="card-title">Global Tech Summit 2024</h2>
                        <p style="color: var(--color-on-surface-variant); font-size: 14px; margin-top: var(--spacing-base); display: flex; align-items: center; gap: var(--spacing-xs);">
                            ${Icon({ name: 'calendar_today', className: 'text-[16px]' })} Oct 15 - 17, 2024
                        </p>
                    </div>
                    <div style="height: 1px; width: 100%; background-color: rgba(206, 195, 211, 0.3);"></div>
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--spacing-sm);">
                        <div>
                            <p class="ui-label" style="color: var(--color-on-surface-variant); margin-bottom: var(--spacing-base); text-transform: uppercase; letter-spacing: 0.05em; font-size: 11px;">Registration ID</p>
                            <p style="font-family: monospace; font-size: 14px;">#CNV-9824-A</p>
                        </div>
                        <div>
                            <span style="display: inline-flex; align-items: center; gap: var(--spacing-xs); padding: var(--spacing-base) var(--spacing-sm); border-radius: var(--radius-full); background-color: var(--color-error-container); color: var(--color-on-error-container); font-size: 14px; font-weight: 500;">
                                <span class="material-symbols-outlined" style="font-size: 14px;">cancel</span> Cancelled
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Call to Actions -->
            <div style="width: 100%; display: flex; flex-direction: column; gap: var(--spacing-sm);">
                ${Button({ text: 'Back to My Registrations', variant: 'primary', onClick: "window.location.hash='#/my-tickets'", className: 'w-full' })}
                ${Button({ text: 'Browse Upcoming Events', variant: 'outline', onClick: "window.location.hash='#/browse'", className: 'w-full' })}
            </div>
        </div>
    `;

    return PublicLayout({ children: content });
};
