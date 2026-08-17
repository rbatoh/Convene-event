import { PublicLayout } from '../components/templates/public-layout/public-layout.js';
import { Button } from '../components/atoms/button/button.js';

window.submitCancel = async function(btn, registrationId, email, eventId) {
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Cancelling...';
    btn.disabled = true;
    
    try {
        const { cancelRegistration } = await import('../api/client.js');
        await cancelRegistration(registrationId, email, eventId);
        window.location.hash = '#/cancel-success';
    } catch (err) {
        alert(err.message || 'Cancellation failed');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
};

export const renderCancel = async () => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
    
    const registrationId = urlParams.get('registrationId');
    const email = urlParams.get('email');
    const eventId = urlParams.get('eventId');
    const title = urlParams.get('title') || 'this event';

    if (!registrationId || !email || !eventId) {
        window.location.hash = '#/';
        return '';
    }

    const content = `
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: var(--spacing-3xl) var(--spacing-xl); max-width: 600px; margin: 0 auto; min-height: 60vh; justify-content: center;">
            <div style="background-color: var(--color-error-container); border-radius: 50%; padding: var(--spacing-lg); display: flex; align-items: center; justify-content: center; height: 96px; width: 96px; margin-bottom: var(--spacing-lg);">
                <span class="material-symbols-outlined" style="font-size: 48px; color: #93000a;">warning</span>
            </div>
            
            <h1 class="marketing-hero" style="margin-bottom: var(--spacing-sm);">Cancel Registration?</h1>
            <p style="color: var(--color-on-surface-variant); margin-bottom: var(--spacing-xl);">Are you sure you want to cancel your registration for <strong>${title}</strong>? This action cannot be undone.</p>
            
            <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap; justify-content: center; width: 100%;">
                ${Button({ text: 'No, Keep It', variant: 'primary', onClick: `window.location.hash='#/my-tickets?email=${encodeURIComponent(email)}'`, className: 'w-full sm:w-auto' })}
                <button class="btn btn-outline" onclick="window.submitCancel(this, '${registrationId}', '${email}', '${eventId}')" style="border-color: #ba1a1a; color: #ba1a1a; width: 100%; max-width: 200px;">Yes, Cancel It</button>
            </div>
        </div>
    `;
    return PublicLayout({ children: content });
};
