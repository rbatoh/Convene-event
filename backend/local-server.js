const http = require('http');
const url = require('url');

// In-memory mock database mimicking DynamoDB
let registrations = [];
const events = [
    {
        id: 'tech-summit-2026',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        title: 'Africa Tech Summit 2026',
        date: 'Oct 15-17',
        time: '9:00 AM - 5:00 PM GMT',
        location: 'AICC, Accra',
        description: 'Join industry leaders for three days of keynotes, workshops, and networking.',
        isFeatured: true
    },
    {
        id: 'sunset-music-festival',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
        title: 'Afrochella Music Festival',
        date: 'Dec 28',
        time: '4:00 PM - 11:00 PM GMT',
        location: 'Independence Square, Accra',
        description: 'An unforgettable evening of live Afrobeats, highlife, and acoustic performances.',
        isFeatured: true
    }
];

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);

    // 1. GET /events
    if (parsedUrl.pathname === '/events' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(events));
        return;
    }

    // 2. POST /register
    if (parsedUrl.pathname === '/register' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const data = JSON.parse(body);
            const newReg = {
                registrationId: 'CNV-' + Math.floor(Math.random() * 10000),
                eventId: data.eventId,
                name: data.name,
                email: data.email,
                timestamp: new Date().toISOString()
            };
            registrations.push(newReg);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, registrationId: newReg.registrationId }));
        });
        return;
    }

    // 3. GET /registrations?email=...
    if (parsedUrl.pathname === '/registrations' && req.method === 'GET') {
        const email = parsedUrl.query.email;
        const userRegs = registrations.filter(r => r.email === email);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userRegs));
        return;
    }

    // 4. DELETE /cancel
    if (parsedUrl.pathname === '/cancel' && req.method === 'DELETE') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const data = JSON.parse(body);
            registrations = registrations.filter(r => r.registrationId !== data.registrationId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        });
        return;
    }

    res.writeHead(404);
    res.end();
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Local mock server running on http://localhost:${PORT}`);
});
