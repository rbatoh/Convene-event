import './event-card.css';
import { Badge } from '../../atoms/badge/badge.js';
import { Icon } from '../../atoms/icon/icon.js';
import { Button } from '../../atoms/button/button.js';

export const EventCard = ({ event }) => {
    const { id, image, title, date, location, description, isFeatured } = event;
    const featuredClass = isFeatured ? 'event-card-featured' : '';
    const badgeHtml = isFeatured ? `<div class="card-badge-container">${Badge({ text: 'Featured', type: 'featured' })}</div>` : '';

    return `
        <div class="event-card ${featuredClass}">
            <div class="card-image-wrapper">
                <img src="${image}" alt="${title}" class="card-image">
                ${badgeHtml}
            </div>
            <div class="card-content">
                <div class="flex justify-between items-start" style="margin-bottom: var(--spacing-xs)">
                    <div class="card-meta">
                        ${Icon({ name: 'schedule' })}
                        <span>${date}</span>
                    </div>
                    ${location ? `
                    <div class="card-meta">
                        ${Icon({ name: 'location_on' })}
                        <span>${location}</span>
                    </div>
                    ` : ''}
                </div>
                <h3 class="card-title">${title}</h3>
                <p class="card-description">${description}</p>
                <div class="card-footer">
                    ${Button({ text: 'View Details', variant: 'outline', className: 'w-full', onClick: `window.location.hash='#/event/${id}'` })}
                </div>
            </div>
        </div>
    `;
};
