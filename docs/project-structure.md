# Project Folder Structure
### Event Registration & Ticketing System

This document defines the full repository layout: backend (per `ARCHITECTURE.md`), infrastructure, and a frontend organized around **Atomic Design** (atoms → molecules → organisms → templates → pages). It assumes the frontend described in `app_ui.md` — HTML/CSS/JS, no framework — is already shipping in production as a small number of files; §5 covers how to reconcile that with the structure below without a risky rewrite.

---

## 1. Full Repository Tree

```
event-registration-system/
│
├── README.md
│
├── docs/
│   ├── app_ui.md                      # UI/UX + brand copy spec (existing)
│   ├── ARCHITECTURE.md                # Backend/infra spec (existing)
│   └── PROJECT_STRUCTURE.md           # This document
│
├── backend/
│   ├── common/                        # Shared Lambda layer
│   │   └── python/
│   │       ├── db_client.py
│   │       ├── responses.py           # standard success/error JSON shape
│   │       ├── validation.py
│   │       ├── rate_limit.py          # DynamoDB-backed limiter (ARCHITECTURE.md §5)
│   │       └── logging_utils.py
│   ├── register/lambda_function.py
│   ├── events/lambda_function.py
│   ├── events_admin/lambda_function.py
│   ├── registrations/lambda_function.py
│   ├── cancel_registration/lambda_function.py
│   └── notifications/lambda_function.py
│
├── frontend/
│   ├── index.html                     # production entry point / app shell
│   ├── config.js                      # deployed Function URLs (ARCHITECTURE.md §3)
│   │
│   ├── assets/
│   │   ├── icons/
│   │   └── fonts/                     # Inter (app_ui.md typography)
│   │
│   ├── styles/
│   │   ├── tokens.css                 # colour/spacing/type scale — app_ui.md design tokens
│   │   ├── base.css                   # resets, global element styles
│   │   └── utilities.css
│   │
│   ├── components/                    # ── Atomic Design hierarchy ──
│   │   ├── atoms/
│   │   │   ├── button/        { button.html, button.css, button.js }
│   │   │   ├── input/         { ... }
│   │   │   ├── label/         { ... }
│   │   │   ├── badge/         { ... }         # status + availability badges
│   │   │   ├── icon/          { ... }
│   │   │   └── spinner/       { ... }
│   │   │
│   │   ├── molecules/
│   │   │   ├── form-field/            # label + input + validation message
│   │   │   ├── event-meta/            # date + location line
│   │   │   ├── registration-id-display/
│   │   │   ├── email-lookup-bar/
│   │   │   └── toast/
│   │   │
│   │   ├── organisms/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── event-card/
│   │   │   ├── registration-form/
│   │   │   ├── registration-summary-card/
│   │   │   ├── registration-list-item/
│   │   │   └── modal-shell/           # shared chrome for both modals
│   │   │
│   │   ├── templates/                 # layout skeletons, placeholder content only
│   │   │   ├── page-template/         # header slot + content slot + footer slot
│   │   │   └── modal-template/        # icon + heading + body + actions slots
│   │   │
│   │   └── pages/                     # real screens — 1:1 with app_ui.md's 7 screens
│   │       ├── home/
│   │       ├── registration-modal/
│   │       ├── registration-success/
│   │       ├── registration-lookup/
│   │       ├── my-registrations/
│   │       ├── cancel-confirmation-modal/
│   │       └── cancellation-success/
│   │
│   ├── services/                      # talks to the backend Function URLs
│   │   ├── api-client.js              # fetch wrapper + shared error handling
│   │   ├── events-service.js
│   │   ├── registrations-service.js
│   │   └── cancel-service.js
│   │
│   └── utils/
│       ├── validators.js              # mirrors backend validation rules
│       └── formatters.js
│
├── infrastructure/
│   ├── template.yaml                  # AWS SAM (ARCHITECTURE.md §10)
│   └── samconfig.toml
│
├── tests/
│   ├── backend/
│   │   ├── test_register.py
│   │   ├── test_events.py
│   │   ├── test_registrations.py
│   │   ├── test_cancel_registration.py
│   │   ├── test_events_admin.py
│   │   └── test_notifications.py
│   └── frontend/
│       └── components/                # mirrors components/ 1:1, one test file per component
│
└── .github/
    └── workflows/
        ├── ci.yml
        └── deploy.yml
```

---

## 2. The Atomic Design Rule

Atomic Design has one rule that matters more than the folder names: **composition only flows one direction, up the list below.** An atom never imports a molecule; a molecule never imports an organism; a template never contains real content. Breaking this (e.g., a "button" atom that reaches into page-specific state) is the thing that turns a component library into spaghetti — enforce it in code review, not just in the folder layout.

| Level | Definition | This project's examples |
|---|---|---|
| **Atoms** | The smallest functional pieces — can't be broken down further and still mean anything on their own. Not usable alone as a "screen." | `button`, `input`, `label`, `badge`, `icon`, `spinner` |
| **Molecules** | A small group of atoms working together as one reusable unit. | `form-field` (label + input + error), `event-meta` (date + location), `email-lookup-bar` |
| **Organisms** | Complex, distinct sections of an interface — built from molecules, atoms, and sometimes other organisms. | `event-card`, `registration-form`, `header`, `registration-list-item` |
| **Templates** | Page-level layout skeletons — real structure, placeholder content. Concerned with *where things go*, not *what they say*. | `page-template`, `modal-template` |
| **Pages** | A template filled with real content and real data — this is what actually ships as a screen. | `home`, `registration-success`, `my-registrations` |

**Component folder convention:** every atom/molecule/organism gets its own folder with a matching HTML/CSS/JS triad (`button.html`, `button.css`, `button.js`) rather than one shared stylesheet — keeps each component's styles co-located and removable without hunting through a global CSS file.

---

## 3. Screen → Component Mapping

Directly traceable to the seven screens in `app_ui.md`, so there's no ambiguity about which components a given page actually needs.

| Screen (`app_ui.md`) | Page folder | Template | Key organisms | Key molecules/atoms |
|---|---|---|---|---|
| 1. Landing / Home | `pages/home/` | `page-template` | `header`, `event-card` (×N), `footer` | `event-meta`, `badge`, `button` |
| 2. Registration Modal | `pages/registration-modal/` | `modal-template` | `modal-shell`, `registration-form` | `form-field` ×2 (name, email), `button` ×2 |
| 3. Registration Success | `pages/registration-success/` | `page-template` | `registration-summary-card` | `registration-id-display`, `icon`, `button` |
| 4. Registration Lookup | `pages/registration-lookup/` | `page-template` | `header`, lookup panel | `email-lookup-bar`, `button` |
| 5. My Registrations Listing | `pages/my-registrations/` | `page-template` | `header`, `registration-list-item` (×N), `footer` | `badge`, `event-meta`, `registration-id-display`, `button` |
| 6. Cancel Confirmation Modal | `pages/cancel-confirmation-modal/` | `modal-template` | `modal-shell` | `icon` (warning), `event-meta`, `button` ×2 |
| 7. Cancellation Success | `pages/cancellation-success/` | `page-template` | summary panel | `registration-id-display`, `icon`, `button` |

---

## 4. `services/` — the frontend's API layer

Maps directly to `ARCHITECTURE.md` §3's five Function URLs. `api-client.js` is the only file that knows about `fetch()`, headers, and the shared `{ error: { code, message } }` shape — every other service file calls it rather than calling `fetch()` directly, so a transport change (e.g., adding a retry policy) happens in one place:

```js
// services/api-client.js — shared by every service below
import { ENDPOINTS } from "../config.js";
export async function apiRequest(endpoint, options) { /* fetch + error-shape handling */ }

// services/events-service.js
export async function listEvents() { return apiRequest(ENDPOINTS.events); }

// services/registrations-service.js
export async function register(payload) { return apiRequest(ENDPOINTS.register, { method: "POST", body: payload }); }
export async function lookupRegistrations(email) { return apiRequest(`${ENDPOINTS.registrations}${email}`); }

// services/cancel-service.js
export async function cancelRegistration(id) { return apiRequest(`${ENDPOINTS.cancel}${id}`, { method: "DELETE" }); }
```

---

## 5. Reconciling With "Frontend Is Already in Production"

This structure is a **source layout**, not necessarily what gets deployed. Since the shipped frontend is currently a small, flat set of files (`index.html`, `style.css`, `script.js` per the original project tree), two honest paths forward:

- **No-build-tool path (lowest risk):** load components as native ES modules (`<script type="module">`) and small HTML partials fetched at runtime. No bundler required — `index.html` stays the single entry point, but its markup and script are decomposed into the `components/` tree above. This can be done incrementally, one screen at a time, without a redeploy-everything rewrite.
- **Build-step path:** keep authoring in the atomic `components/` tree, and add a minimal bundler (e.g. esbuild) as a `frontend/build` step that concatenates/minifies into the same `index.html` + `style.css` + `script.js` the production environment already expects. Nothing about the deployed artifact's shape has to change — only how it's authored.

Either way, **do this migration screen by screen**, starting with the screen least likely to break something a user depends on today (Registration Lookup or My Registrations are lower-traffic than Home/Register), not as a single big-bang rewrite of a production frontend.

---

## 6. Naming & Placement Rules (for whoever — human or agent — adds the next component)

1. A new UI piece starts as the *smallest* atomic level it can honestly be. If it's only ever used inside one page, it's still a component at the right level — reuse isn't required to justify the folder, premature reuse-guessing is what to avoid.
2. Never import "sideways or down" — an organism can use molecules and atoms; a molecule cannot import an organism, ever.
3. Backend Lambda folders (`backend/<name>/`) stay one function per folder, matching `ARCHITECTURE.md` §6 exactly — don't combine functions to "save a folder."
4. Anything shared across ≥2 Lambda functions goes in `backend/common/python/`, not copy-pasted per function.
5. Tests mirror source structure 1:1 (`tests/frontend/components/atoms/button/` tests `components/atoms/button/`) so a missing test file is obvious at a glance.