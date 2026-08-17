import { renderHome } from './Home.js';
import { Button } from '../components/atoms/button/button.js';
import { Input } from '../components/atoms/input/input.js';
import { Icon } from '../components/atoms/icon/icon.js';

export const renderRegister = () => {
    // We render the Home page as the background for the modal
    const homeHtml = renderHome();

    const modalHtml = `
        <div class="modal-overlay">
            <div class="modal-container">
                <button class="modal-close" onclick="window.location.hash='#/'" aria-label="Close modal">
                    ${Icon({ name: 'close' })}
                </button>
                <div class="modal-header">
                    <div style="width: 64px; height: 64px; background-color: var(--color-surface-container-high); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto var(--spacing-md);">
                        <span class="material-symbols-outlined" style="font-size: 32px; color: var(--color-primary-container);">event_available</span>
                    </div>
                    <h2 class="section-heading" style="margin-bottom: var(--spacing-xs);">Global Tech Summit 2024</h2>
                    <p style="color: var(--color-on-surface-variant);">You're one step away — this takes less than a minute.</p>
                </div>
                <form class="modal-body" onsubmit="event.preventDefault(); window.location.hash='#/success';">
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
                        <label class="ui-label" for="fullName">Full Name</label>
                        ${Input({ type: 'text', placeholder: 'Jane Doe' })}
                    </div>
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
                        <label class="ui-label" for="emailAddress">Email Address</label>
                        ${Input({ type: 'email', placeholder: 'jane@example.com' })}
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: var(--spacing-xs); color: var(--color-on-surface-variant); margin-top: var(--spacing-xs);">
                        ${Icon({ name: 'lock', className: 'text-[18px] mt-[2px]' })}
                        <p class="ui-label" style="font-size: 12px; opacity: 0.8;">We'll only use this to send your confirmation. No spam, ever.</p>
                    </div>
                    <div class="modal-footer" style="padding: var(--spacing-md) 0 0 0; display: flex; justify-content: flex-end;">
                        ${Button({ text: 'Cancel', variant: 'outline', onClick: "window.location.hash='#/'" })}
                        <button class="btn btn-primary" type="submit" style="background-color: var(--color-primary-container);">Confirm My Registration</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    return homeHtml + modalHtml;
};
