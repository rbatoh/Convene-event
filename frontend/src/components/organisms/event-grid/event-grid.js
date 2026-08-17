import './event-grid.css';
import { EventCard } from '../../molecules/event-card/event-card.js';

export const EventGrid = ({ events, title = 'Available Events' }) => {
    return `
        <section class="event-section">
            <div class="event-section-header">
                <h2 class="section-heading">${title}</h2>
            </div>
            <div class="event-grid">
                ${events.map(event => EventCard({ event })).join('')}
            </div>
        </section>
    `;
};

export const FeaturedEventScroll = ({ events, title = 'Featured Events' }) => {
    return `
        <section class="event-section">
            <div class="event-section-header">
                <h2 class="section-heading">${title}</h2>
                <a href="#/browse">View all <span class="material-symbols-outlined icon" style="font-size: 16px;">arrow_forward</span></a>
            </div>
            <div class="featured-scroll">
                ${events.map(event => EventCard({ event })).join('')}
            </div>
        </section>
    `;
};
