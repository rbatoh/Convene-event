import { PublicLayout } from '../components/templates/public-layout/public-layout.js';
import { EventGrid, FeaturedEventScroll } from '../components/organisms/event-grid/event-grid.js';
import { SearchBar } from '../components/molecules/search-bar/search-bar.js';
import { Button } from '../components/atoms/button/button.js';

import { fetchEvents } from '../api/client.js';

export const renderFindTickets = async () => {
    const allEvents = await fetchEvents();
    const featuredEvents = allEvents.filter(e => e.isFeatured);
    const regularEvents = allEvents.filter(e => !e.isFeatured);
    
    const content = `
        <div style="padding: var(--spacing-3xl) var(--spacing-xl) 0; max-width: 1280px; margin: 0 auto;">
            <div style="display: flex; justify-content: flex-end; align-items: center; flex-wrap: wrap; gap: var(--spacing-md);">
                <div style="display: flex; gap: var(--spacing-sm);">
                    ${SearchBar()}
                </div>
            </div>
        </div>
            
        ${featuredEvents.length > 0 ? FeaturedEventScroll({ events: featuredEvents, title: 'Featured Events' }) : ''}
            
        ${EventGrid({ events: regularEvents, title: 'All Events' })}
    `;
    return PublicLayout({ children: content });
};
