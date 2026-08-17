# Component Specifications (Atomic Design)

This document serves as the specification for building the Vanilla JS/CSS components for the Convene frontend. All components must strictly adhere to this spec to ensure consistency.

## 1. Atoms

### `Button`
- **Purpose:** Primary interactive element for actions.
- **Variants:**
  - `primary`: Background `--color-primary`, Text `--color-on-primary`, Hover opacity 90%. Height 48px, Radius 12px (md).
  - `secondary`: Background `--color-royal-blue`, Text White.
  - `outline`: Background transparent, Border `--color-royal-blue` or `--color-outline-variant`, Text `--color-royal-blue` or `--color-on-surface`.
- **Props:** `text` (string), `variant` (string), `icon` (string, optional), `onClick` (function).
- **CSS Classes:** `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`

### `Badge`
- **Purpose:** Highlights status or properties (e.g., "Featured", "Success").
- **Design:** Pill-shaped (radius-full), text-ui-label.
- **Variants:**
  - `featured`: Background white/90 (backdrop blur), Text `--color-primary`.
- **CSS Classes:** `.badge`, `.badge-featured`

### `Icon`
- **Purpose:** Wraps Google Material Symbols Outlined.
- **Props:** `name` (string), `size` (string, default 24px), `color` (string).
- **CSS Classes:** `.material-symbols-outlined`

### `Input`
- **Purpose:** Base text input field.
- **Design:** Height 48px, Radius 8px (default), Border `--color-outline-variant`, Focus border `--color-royal-blue`.
- **Props:** `type`, `placeholder`, `value`, `onChange`.
- **CSS Classes:** `.input-base`

---

## 2. Molecules

### `SearchBar`
- **Purpose:** Allows searching for events.
- **Composition:** Icon (search) + Input (text).
- **Design:** Background `--color-surface-container-low`, Radius-full, Input transparent with no border.
- **CSS Classes:** `.search-bar`

### `EventCard`
- **Purpose:** Displays summary of an event.
- **Composition:** Image, Badge (optional), Typography (Date, Title, Description), Button.
- **Design:** Background `--color-soft-lavender` or White, Border radius 16px (lg), Border `--color-primary` (if featured) or `#E5E7EB`. Hover state uses `--shadow-hover`.
- **Props:** `event` (object with image, title, date, location, isFeatured).
- **CSS Classes:** `.event-card`, `.event-card-featured`

### `FormField`
- **Purpose:** Complete input group with label.
- **Composition:** Typography (Label) + Input + Typography (Error/Help).
- **CSS Classes:** `.form-field`, `.form-label`

---

## 3. Organisms

### `TopNavBar`
- **Purpose:** Main global navigation.
- **Composition:** Logo (Typography), Links (Molecules), SearchBar, Auth/Action Buttons.
- **Design:** Height 80px (20rem roughly), Sticky top, Background `--color-surface`, Shadow-sm. Max width 1280px.
- **CSS Classes:** `.top-navbar`

### `Footer`
- **Purpose:** Global footer.
- **Composition:** Logo, Links, Copyright text.
- **Design:** Background `--color-surface-container-low`, Border-top `--color-outline-variant`.
- **CSS Classes:** `.footer`

### `EventGrid`
- **Purpose:** Container for listing EventCards.
- **Composition:** Grid layout of EventCards.
- **Design:** Grid-cols-1 (mobile) to Grid-cols-3 (desktop), Gap `--spacing-lg`.
- **CSS Classes:** `.event-grid`

---

## 4. Templates

### `PublicLayout`
- **Purpose:** Layout for unauthenticated users.
- **Composition:** `TopNavBar` + Main Content Area + `Footer`.

### `OrganiserLayout`
- **Purpose:** Layout for event organizers (Dashboard).
- **Composition:** Sidebar/TopNavBar + Main Content Area.
