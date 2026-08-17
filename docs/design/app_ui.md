# Event Registration & Ticketing System
## UI/UX Design Specification for Google Stitch
### (Brand & Marketing Copy Edition)

### Project Overview
Design a modern, responsive Event Registration & Ticketing System for event attendees to browse events, register, view registrations, and manage cancellations. This edition layers in brand positioning, on-screen marketing copy, and UX microcopy so the interface reads as a polished, trustworthy product — the kind that wins over prospective clients and keeps attendees coming back.

### Design Style
- Style: Modern SaaS Dashboard
- Design Direction: Professional AWS-inspired Event Platform
- Primary Colour: #663399 (Deep Purple) — signals premium, creative energy
- Secondary Colour: #123F91 (Royal Blue) — signals trust, stability, action
- Surface/Card Colour: #EAE0F5 (Soft Lavender)
- Success Colour: #22C55E
- Warning Colour: #F59E0B
- Error Colour: #EF4444
- Background Colour: #F8FAFC
- Text Primary: #111827
- Text Secondary: #6B7280
- Border Colour: #E5E7EB

---

# Brand Positioning & Marketing Copy

## Suggested Brand Name
**Convene** *(alternates: Gatherly, EventFlow)* — short, credible, and evocative of bringing people together. Swap in the client's actual brand name wherever it appears in the copy below.

## Elevator Pitch
"Convene turns event registration from a chore into a two-minute confirmation — for attendees and organizers alike."

## Brand Pillars
These three ideas should show up consistently across hero copy, trust bars, and footer messaging:

1. **Effortless** — "Register in under a minute. No account required."
2. **Trustworthy** — "Instant confirmation, transparent cancellations, zero surprises."
3. **Organized** — "Every registration, one place, always up to date."

## Brand Voice & Tone
- Confident, not corporate
- Warm, not casual
- Efficient — copy respects the user's time; no filler
- Avoid manufactured urgency (e.g., fake countdown timers or "Only 2 left!" unless genuinely accurate)
- Avoid jargon and exclamation-point overload

## Why This Design Converts (Client Value Summary)
Use this as a one-slide pitch when presenting the system to prospective clients or stakeholders:
- **Fewer drop-offs** — a two-field registration form and a distraction-free modal reduce abandonment versus multi-page checkouts.
- **Confidence at every step** — success states, registration IDs, and clear cancellation policies build trust and reduce support tickets.
- **Consistent brand recall** — a single, disciplined colour and type system (Deep Purple + Royal Blue + Inter) makes the product instantly recognizable across every screen.
- **Mobile-first capture** — responsive layouts mean registrations aren't lost to a clunky phone experience, which is where most attendees will land from social/email links.

## SEO & Meta Copy (Public Landing Page)
- **Meta Title:** "Convene — Simple, Fast Event Registration"
- **Meta Description (≤155 characters):** "Browse events, register in seconds, and manage your tickets in one place with Convene."
- **Open Graph Tagline:** "Every event, one seamless experience."

> Note: Any statistics, ratings, or testimonials referenced below (e.g., "500+ organizers") are **sample placeholder copy** for layout purposes only and should be replaced with real, verified figures before launch.

---

# Typography System

## Font Family

### Primary Font
- Inter
- Fallback: Arial, sans-serif

### Font Scale

| Element | Font | Weight | Size |
|----------|--------|----------|--------|
| Page Heading | Inter | Bold | 36px |
| Section Heading | Inter | SemiBold | 28px |
| Card Title | Inter | SemiBold | 22px |
| Modal Title | Inter | Bold | 24px |
| Body Text | Inter | Regular | 16px |
| Secondary Text | Inter | Regular | 14px |
| Form Labels | Inter | Medium | 14px |
| Input Text | Inter | Regular | 16px |
| Button Text | Inter | SemiBold | 16px |
| Success Message | Inter | SemiBold | 18px |
| Registration ID | Inter | Mono SemiBold | 16px |
| Marketing Headline | Inter | Bold | 40px |
| Marketing Subheadline | Inter | Regular | 18px |

---

# Screen 1: Landing Page / Home

## Purpose
Allow users to discover available events and access registration functionality — and, on first impression, communicate that this is a platform worth trusting with their time and details.

## Layout

### Header Section
- Logo/Icon: Event Ticket Icon
- Title: "Event Registration & Ticketing System"
- Subtitle: "Register for events quickly and easily"

### Marketing Copy — Hero
- **Hero Headline:** "Find Your Next Event. Register in Seconds."
- **Hero Subheadline:** "Browse, reserve, and manage every ticket from one clean dashboard — no printing, no waiting in line."
- **Trust Bar (sample copy):** "Trusted for meetups, conferences, and community events" / "★★★★★ rated by event organizers"
- **Primary CTA:** "Browse Events" | **Secondary CTA:** "Find My Registration"

### Typography
- Title: Inter Bold, 36px
- Subtitle: Inter Regular, 18px
- Hero Headline: Inter Bold, 40px
- Hero Subheadline: Inter Regular, 18px

### Available Events Section
- Section Heading: "Available Events"
- Section Intro Line: "Hand-picked events, updated in real time."
- Background: White
- Card Grid Layout: 2 columns desktop

#### Event Card Elements
- Event Name
- Event Year
- Event Date
- Event Location
- Availability Badge
- Register Button

#### Marketing Copy — Availability Badges
Use accurate, real-time labels only (never fabricated urgency):
- "Just Added"
- "Filling Fast"
- "Few Spots Left"
- "Open Registration"

#### Marketing Copy — Register Button Variants
- "Reserve My Spot"
- "Get Tickets"
- "Register Now"

#### Empty State (no events currently listed)
- Headline: "New Events Coming Soon"
- Body: "We're lining up our next events — check back shortly or leave your email to be the first to know."

### Event Card Typography
- Event Name: Inter SemiBold, 22px
- Date/Location: Inter Regular, 16px
- Status Badge: Inter Medium, 14px
- Register Button: Inter SemiBold, 16px

### Components
- Event Cards
- Status Badges
- Primary Action Buttons

---

# Screen 2: Event Registration Modal

## Purpose
Capture attendee registration details with minimal friction, while reassuring the user their information is safe and the process is fast.

## Modal Specifications

### Modal Size
- Width: 600px
- Border Radius: 16px
- Shadow: Large

### Header
Display:
- Event Name
- Event Date
- Event Location

### Marketing Copy — Modal
- **Supporting Line (under header):** "You're one step away — this takes less than a minute."
- **Privacy Microcopy (below email field):** "We'll only use this to send your confirmation. No spam, ever."

### Typography
- Modal Title: Inter Bold, 24px
- Event Details: Inter Regular, 16px

### Form Fields

#### Full Name
- Label: Inter Medium, 14px
- Input Text: Inter Regular, 16px
- Placeholder Copy: "e.g. Jordan Lee"

#### Email Address
- Label: Inter Medium, 14px
- Input Text: Inter Regular, 16px
- Placeholder Copy: "you@example.com"

### Buttons
#### Cancel
- Secondary Style
- Grey border
- Copy: "Cancel"

#### Confirm Registration
- Primary Purple Button
- Copy: "Confirm My Registration"

### Button Typography
- Inter SemiBold, 16px

---

# Screen 3: Registration Success Screen

## Purpose
Provide feedback after successful registration — and turn a transactional moment into a memorable, on-brand one that encourages the attendee to engage further.

## Layout

### Success Icon
Large green checkmark

### Main Message
"Registration Successful"

### Marketing Copy — Success Screen
- **Headline (alt, warmer tone):** "You're All Set!"
- **Supporting Text:** "A confirmation email is on its way. Save your Registration ID — you'll need it for check-in."
- **Secondary Engagement Links:** "Add to Calendar" · "Share with a Friend"

### Typography
- Heading: Inter Bold, 32px
- Supporting Text: Inter Regular, 18px

### Registration Summary Card

Display:
- Event Name
- Date
- Location
- Registration ID

### Registration ID Container
- Highlighted Lavender Background
- Monospace Display

### Typography
- Event Name: Inter SemiBold, 20px
- Registration ID Label: Inter Medium, 14px
- Registration ID Value: Inter Mono SemiBold, 16px

### Primary CTA
"View My Registrations"

---

# Screen 4: Registration Lookup Screen

## Purpose
Allow users to retrieve registrations using email, with copy that reassures them the lookup is quick and their information stays private.

## Layout

### Section Header
"My Registrations"

### Marketing Copy — Lookup Screen
- **Heading (alt):** "Find Your Registrations"
- **Supporting Line:** "Enter the email you used to register and we'll pull up everything in seconds."

### Typography
- Heading: Inter Bold, 30px

### Form Components

#### Email Field
- Large single input
- Width: 500px
- Placeholder Copy: "you@example.com"

#### CTA Button
"View Registrations"

### Typography
- Label: Inter Medium, 14px
- Input Text: Inter Regular, 16px
- Button Text: Inter SemiBold, 16px

### Empty State
Display if no registration exists.

#### Empty State Message (warm, non-technical)
- Headline: "No registrations found."
- Body: "Double-check the email address, or browse upcoming events to register for your first one."
- Secondary CTA: "Browse Events"

### Typography
- Inter Regular, 18px

---

# Screen 5: My Registrations Listing Screen

## Purpose
Display all registration records associated with an email in a way that feels organized, current, and easy to act on.

## Layout

### Marketing Copy — Listing Screen
- **Heading (alt):** "Your Events, All in One Place"
- **Supporting Line:** "Manage upcoming registrations or review past ones — anytime."

### Registration Card

Each card contains:

#### Event Information
- Event Name
- Date
- Location

#### Registration Information
- Registration ID
- Registration Status

#### Action Area
- Cancel Registration Button — Copy: "Cancel Registration"

### Typography

#### Event Name
- Inter SemiBold, 22px

#### Metadata
- Inter Regular, 16px

#### Registration ID
- Inter Mono SemiBold, 16px

#### Status Label
- Inter Medium, 14px

#### Button
- Inter SemiBold, 16px

### Status Visuals

#### Confirmed
- Green Badge — Copy: "Confirmed"

#### Cancelled
- Red Badge — Copy: "Cancelled"

---

# Screen 6: Cancel Registration Confirmation Modal

## Purpose
Prevent accidental cancellations while keeping the tone empathetic rather than punitive — a good cancellation experience protects the brand relationship even when the answer is "no."

## Modal Layout

### Warning Icon
Amber warning badge

### Heading
"Cancel Registration?"

### Marketing Copy — Confirmation Message
- **Empathetic Body Copy:** "We're sorry to see you go. Cancelling releases your spot for another attendee, and we'll send a confirmation to your email."

### Event Details Card
Display:
- Event Name
- Date
- Location

### Buttons

#### Keep Registration
- Secondary Button
- Copy: "Keep My Spot"

#### Yes, Cancel
- Destructive Red Button
- Copy: "Yes, Cancel Registration"

### Typography

#### Heading
- Inter Bold, 24px

#### Confirmation Text
- Inter Regular, 16px

#### Event Name
- Inter SemiBold, 18px

#### Button Text
- Inter SemiBold, 16px

---

# Screen 7: Cancellation Success Screen

## Purpose
Confirm the cancellation request was completed, close the loop reassuringly, and leave the door open for future engagement rather than ending on a flat note.

## Layout

### Success Icon
Large success state icon

### Success Message
"Registration Cancelled Successfully"

### Marketing Copy — Cancellation Success
- **Headline (alt):** "Registration Cancelled"
- **Supporting Text:** "You're all set — a confirmation has been sent to your email. We'd love to see you at a future event."

### Details Panel

Display:
- Event Name
- Registration ID
- Status = Cancelled

### Typography

#### Heading
- Inter Bold, 30px

#### Body Text
- Inter Regular, 18px

#### Registration ID
- Inter Mono SemiBold, 16px

#### Status
- Inter Medium, 14px

### Secondary Action

Button:
"Back to My Registrations" · Tertiary link: "Browse Upcoming Events"

### Button Typography
- Inter SemiBold, 16px

---

# UX Microcopy & Messaging Guidelines

Consistent microcopy is what makes a product feel professionally built rather than assembled from defaults. Use this table across all screens.

| State | Guideline | Sample Copy |
|---|---|---|
| Field validation error | Say what's wrong and how to fix it, no blame | "That doesn't look like a valid email — try again?" |
| Required field left blank | Plain, non-alarming | "Full name is required to complete registration." |
| Loading / submitting | Reassure, don't just spin | "Confirming your spot…" |
| Network / server error | Apologetic, actionable | "Something went wrong on our end. Please try again in a moment." |
| Duplicate registration | Helpful, not accusatory | "Looks like you're already registered for this event — view it in My Registrations." |
| Success toast | Short, celebratory | "You're registered! 🎉" |
| Cancellation toast | Calm, confirming | "Registration cancelled." |

---

# Footer & Global Copy Elements

- **Footer Tagline:** "Convene — Every event, one seamless experience."
- **Footer Nav Labels:** "Browse Events" · "My Registrations" · "Help Center" · "Contact"
- **Trust Line (sample):** "Secure registration. No spam. Cancel anytime."
- **Contact Prompt:** "Questions about an event? We're here to help."

---

# Responsive Design Requirements

## Mobile (320px-767px)
- Single column layout
- Event cards stack vertically
- Full-width buttons
- Modal uses 95% screen width
- Hero headline scales down to Inter Bold, 28px; keep the subheadline to one line

## Tablet (768px-1023px)
- Two-column event grid
- Responsive modals
- Larger touch targets

## Desktop (1024px+)
- Two-column card layouts
- Maximum content width: 1280px
- Spacious card spacing

---

# Component Design Rules

## Buttons

### Primary
- Background: #663399
- Text: White
- Height: 48px
- Radius: 12px

### Secondary
- Border: 1px solid #D1D5DB
- Background: White

### Destructive
- Background: #EF4444
- Text: White

---

# Accessibility Requirements

- Minimum contrast ratio: 4.5:1
- Keyboard navigable forms
- Focus states on all interactive components
- Form validation messages written in plain language (see Microcopy table above)
- Screen reader labels
- Minimum touch target size: 44px

---

# Design Prompt for Google Stitch

Create a modern SaaS-style Event Registration & Ticketing System for the brand **Convene**, using Deep Purple (#663399) as the primary brand colour, Royal Blue (#123F91) for actions and navigation, and Soft Lavender (#EAE0F5) for cards and success-state containers. Use Inter typography throughout, including a bold 40px marketing headline on the landing page hero ("Find Your Next Event. Register in Seconds.") with an 18px supporting subheadline. Design seven responsive screens: Home/Events Listing, Event Registration Modal, Registration Success Screen, Registration Lookup Screen, My Registrations Listing Screen, Cancellation Confirmation Modal, and Cancellation Success Screen. Every screen should carry real, warm, on-brand copy (not lorem ipsum or generic labels) — reassuring microcopy near form fields, empathetic language in the cancellation flow, and celebratory tone on success states. Follow modern enterprise UX patterns while keeping the voice confident, warm, and efficient throughout.