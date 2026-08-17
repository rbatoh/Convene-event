import { PublicLayout } from '../components/templates/public-layout/public-layout.js';
import { Button } from '../components/atoms/button/button.js';
import { EventGrid } from '../components/organisms/event-grid/event-grid.js';

import { fetchEvents } from '../api/client.js';

export const renderHome = async () => {
    const allEvents = await fetchEvents();
    
    const content = `
        <!-- Hero Section -->
        <section class="hero-section">
            <h1 class="marketing-hero">Discover experiences you'll love and get your tickets instantly.</h1>
            <p>We make it incredibly easy to find great events and book your spot. Everything you need is right here in one simple dashboard.</p>
            <div class="hero-actions">
                ${Button({ text: 'Browse Events', variant: 'primary', onClick: "window.location.hash='#/browse'" })}
                ${Button({ text: 'Find My Registration', variant: 'outline', onClick: "window.location.hash='#/find-my-registration'" })}
            </div>
        </section>

        <!-- Available Events -->
        ${EventGrid({ events: allEvents, title: 'Available Events' })}
    `;

    return PublicLayout({ children: content });
};
