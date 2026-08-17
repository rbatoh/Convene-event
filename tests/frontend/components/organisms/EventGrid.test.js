import { describe, it, expect, vi } from 'vitest';
import { EventGrid } from '../../../../frontend/src/components/organisms/event-grid/event-grid.js';

vi.mock('../../../../frontend/src/components/molecules/event-card/event-card.js', () => ({
    EventCard: ({ event }) => `<div class="mock-card">${event.eventName}</div>`
}));

describe('EventGrid component', () => {
    it('should render a grid of mock events', () => {
        const events = [
            { eventName: 'Tech Conference' },
            { eventName: 'Music Festival' }
        ];
        const html = EventGrid({ events, title: 'Upcoming Events' });
        
        expect(html).toContain('Upcoming Events');
        expect(html).toContain('Tech Conference');
        expect(html).toContain('Music Festival');
        expect(html).toContain('mock-card');
    });
});
