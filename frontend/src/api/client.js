import { config } from '../config.js';

// Fallback data so the UI doesn't break before AWS deployment
const fallbackEvents = [
    {
        id: 'design-thinking-workshop',
        image: '/images/kumasi_workshop.jpg',
        title: 'Design Thinking Workshop',
        date: 'Oct 20',
        time: '10:00 AM - 2:00 PM GMT',
        location: 'Kumasi, Ashanti Region',
        description: 'A hands-on session for UX professionals.\n\nLearn the core principles of design thinking and how to apply them to your product development cycle. We will cover user empathy, ideation, prototyping, and testing.',
        isFeatured: false
    },
    {
        id: 'weekend-makers-market',
        image: '/images/tamale_market.jpg',
        title: 'Weekend Artisans Market',
        date: 'Oct 25',
        time: '9:00 AM - 3:00 PM GMT',
        location: 'Tamale, Northern Region',
        description: 'Support local artisans and creators.\n\nBrowse unique handmade goods, from traditional woven kente and clothing to home decor and fresh produce. Live music and local roasters will be on site.',
        isFeatured: false
    },
    {
        id: 'ghanaian-cuisine-masterclass',
        image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800',
        title: 'Masterclass: Ghanaian Cuisine',
        date: 'Nov 5',
        time: '6:30 PM - 9:30 PM GMT',
        location: 'Cape Coast, Central Region',
        description: 'Learn authentic Ghanaian cooking from a pro.\n\nMaster the art of creating classic dishes from scratch. You will learn how to make perfect Jollof rice, Waakye, and craft traditional stews and soups paired with local spices.',
        isFeatured: false
    }
];

export const fetchEvents = async () => {
    if (!config.API_EVENTS) {
        console.warn('API_EVENTS not configured. Falling back to local data.');
        return new Promise(resolve => setTimeout(() => resolve(fallbackEvents), 500));
    }
    
    try {
        const response = await fetch(config.API_EVENTS);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const backendEvents = data.events || data || [];
        
        // Map backend schema to UI schema and merge missing data from fallbackEvents
        return backendEvents.map(be => {
            const fallback = fallbackEvents.find(f => f.id === be.eventId) || {};
            return {
                id: be.eventId,
                title: be.eventName,
                date: be.date,
                location: be.location,
                capacity: be.capacity,
                registeredCount: be.registeredCount,
                status: be.status,
                // UI specifics not returned by the backend:
                image: fallback.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
                time: fallback.time || 'TBD',
                description: fallback.description || 'Join us for this exciting event!',
                isFeatured: fallback.isFeatured || false
            };
        });
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw error;
    }
};

export const registerEvent = async (eventId, name, email) => {
    if (!config.API_REGISTER) {
        console.warn('API_REGISTER not configured. Simulating success.');
        return new Promise(resolve => setTimeout(() => resolve({ success: true, message: 'Registration successful' }), 800));
    }
    
    try {
        const response = await fetch(config.API_REGISTER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId, name, email })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData?.error?.message || errorData?.message || errorData?.error || 'Registration failed';
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to register:', error);
        throw error;
    }
};

export const lookupRegistrations = async (email) => {
    if (!config.API_REGISTRATIONS) {
        console.warn('API_REGISTRATIONS not configured. Returning empty list.');
        return new Promise(resolve => setTimeout(() => resolve([]), 500));
    }
    
    try {
        const response = await fetch(`${config.API_REGISTRATIONS}?email=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error('Failed to lookup registrations');
        const data = await response.json();
        return data.registrations || [];
    } catch (error) {
        console.error('Failed to lookup registrations:', error);
        throw error;
    }
};

export const cancelRegistration = async (registrationId, email, eventId) => {
    if (!config.API_CANCEL) {
        console.warn('API_CANCEL not configured. Simulating success.');
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 800));
    }
    
    try {
        const response = await fetch(config.API_CANCEL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registrationId, email, eventId })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData?.error?.message || errorData?.message || errorData?.error || 'Failed to cancel registration';
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to cancel registration:', error);
        throw error;
    }
};
