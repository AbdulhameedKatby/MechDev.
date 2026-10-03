# MechDev. Repository Audit

Audit date: 2026-09-21

## Current architecture

- Framework: Next.js 14 App Router with React 18 and TypeScript.
- Rendering: route pages are server components by default; the aircraft archive, site header, and aircraft detail renderer use client components for interaction.
- Routing: static App Router routes plus `/aircraft/[slug]`; the registry currently contains 15 aircraft.
- Data: aircraft content is split between `content/concorde.ts` and 14 files under `content/aircraft/`, all typed as the same `AircraftData` interface. Labs are implemented as route-local components with shared calculation helpers in `lib/calculations/`.
- Styling: Tailwind CSS utilities plus `styles/globals.css`; fonts are loaded from Google Fonts with a dark navy/green visual system.
- Images: six files in `public/assets`; most aircraft have no aircraft-specific image asset.
- Deployment configuration: no deployment manifest was found; `next.config.js` only configures React strict mode, build output directories, and development webpack caching.

## Critical bugs

1. `components/ConcordeDetailClient.tsx` is named and implemented as a Concorde page but is mounted for every aircraft slug. It hard-codes Concorde imagery, Mach 2.04 at 60,000 ft, delta-wing copy, Concorde evidence, Olympus engine copy, and Concorde-specific chart narrative.
2. `app/aircraft/[slug]/page.tsx` generates a Concorde Open Graph image for every aircraft detail page.
3. `app/layout.tsx` uses a Concorde Open Graph image as the site-wide default. This is acceptable as a homepage fallback only if route metadata overrides it, but currently it also masks missing route-specific social assets.
4. `app/aircraft/page.tsx` maintains a second hard-coded metadata table instead of deriving archive fields from the aircraft model, making drift likely.
5. `components/DesignSpaceChart.tsx` assumes a Concorde point and uses Concorde-specific explanatory text for every aircraft comparison.
6. The generic aircraft type exposes `concordeConnection` and the renderer presents it as a universal data contract, which encourages cross-aircraft copy leakage.

## Data consistency and content risks

- Non-Concorde aircraft comparison arrays commonly include Concorde as the reference point. That can be valid when explicitly framed as comparison, but the current generic UI does not always distinguish reference context from aircraft facts.
- Several lab index descriptions are Concorde-specific even when the lab is a general model. The fuel-transfer lab explicitly claims a 13-tank Concorde architecture; this needs evidence-aware wording and a model/limitations panel.
- Lab 06 currently presents climb-rate implications from T/W and L/D without exposing the additional flight-path and excess-thrust assumptions required for a climb-rate result.
- Lab 03 uses language about heating that must consistently distinguish ideal stagnation temperature from measured skin temperature.
- Lab 04 and Lab 05 contain broad efficiency/fuel-transfer claims that need source boundaries and uncertainty labels.
- Search data includes dead or unimplemented concept URLs such as `/concepts/thermodynamics`, `/concepts/structural-engineering`, `/concepts/delta-wing-aerodynamics`, and `/concepts/propulsion`; the implemented routes use different slugs.

## SEO and indexing

- The canonical site URL is hard-coded in multiple files instead of being derived from `NEXT_PUBLIC_SITE_URL` with the requested default.
- Aircraft detail metadata has unique titles/descriptions but a shared Concorde image and no route-aware JSON-LD.
- `sitemap.ts` uses `new Date()` for every URL on every build, creating false freshness signals. It also omits `/about` and `/sources`, which do not currently exist.
- Root JSON-LD contains WebSite, Organization, and EducationalOrganization, but article, breadcrumb, collection, profile, and route-specific structured data are not implemented.
- No manifest was found. Favicon handling points at `/icon.svg`, but that file was not present in the listed public assets.

## Accessibility

- The mobile drawer and search dialog have `role="dialog"` but no focus trap, labelled dialog heading, or robust focus restoration.
- The mobile menu close control is icon-only without an explicit accessible label.
- Interactive archive filters are buttons but do not expose selected state with `aria-pressed`.
- Charts are rendered visually; textual/data fallbacks need to be checked route by route.
- Focus styling is mostly dependent on browser defaults and should be made explicit against the dark background.
- Several controls and cards use decorative emoji/symbols rather than consistent accessible icon labels.

## Performance

- Google Fonts are imported through CSS, which blocks on an external stylesheet and is less controllable than `next/font`.
- The root layout includes a large footer and global decorative effects on every route.
- Many lab pages are client components and render charts eagerly; route-level code splitting should be measured before introducing additional client code.
- Image dimensions are stable where `next/image` is used, but the existing asset set does not support unique aircraft hero imagery.

## Existing validation

- Package scripts provide `lint`, `build`, and `start`; there is no explicit typecheck or test script.
- Baseline validation was started on 2026-09-21. `next lint` prompted to initialize ESLint because no configuration existed; the command is awaiting completion of that setup before TypeScript and build results are available.

## Recommended implementation order

1. Make the aircraft data contract genuinely aircraft-neutral and move image, hero label, core narrative, and metadata fields into each aircraft record.
2. Refactor the shared detail renderer to render only data-driven sections and remove Concorde-only fallback copy.
3. Derive archive cards, search entries, route metadata, and sitemap aircraft URLs from the registry.
4. Add `NEXT_PUBLIC_SITE_URL`, route-aware canonical/Open Graph metadata, breadcrumbs, and appropriate JSON-LD.
5. Add `/sources`, `/about`, and `/methodology` as real indexable destinations, then repair dead internal links.
6. Introduce a reusable source record model and evidence-level vocabulary without implying unsupported certainty.
7. Audit Lab 03, Lab 04, Lab 05, and Lab 06; add assumptions, limitations, reset behavior, and calculation trails.
8. Improve navigation, dialog accessibility, focus states, chart fallbacks, and mobile overflow behavior.
9. Replace or attribute imagery carefully; do not use Concorde assets as universal aircraft imagery.
10. Run route, type, build, link, metadata, accessibility, and mobile checks and publish a separate QA report with only verified PASS results.

## Iteration 1 implementation status

Completed and validated:

- The shared aircraft detail renderer no longer asserts Concorde-specific cruise, delta-wing, propulsion, evidence, or chart narrative content.
- Aircraft hero imagery is now optional and owned by the aircraft record; Concorde declares its own image explicitly, while records without an asset do not receive a Concorde fallback.
- The comparison chart selects from the supplied aircraft comparison array and uses aircraft-neutral insight text.
- Aircraft route Open Graph images are sourced from the current record when available instead of using a global Concorde image.
- Site URL configuration now reads `NEXT_PUBLIC_SITE_URL` with the requested production URL as fallback.
- Sitemap aircraft routes are derived from `aircraftRegistry`, and false build-time `lastModified` dates were removed.
- `npx tsc --noEmit` passes.
- `npm run build` passes and generated 40 routes.

Still open:

- The underlying `AircraftData` contract is still legacy-shaped and needs a migration to the requested neutral fields and source-record vocabulary.
- Archive metadata remains a hard-coded table and should be moved into the aircraft records.
- Labs still need model assumptions, calculation trails, reset behavior, accessibility review, and the requested Lab 03/04/05/06 content audit.
- `/sources`, `/about`, and `/methodology` are not yet implemented.
- Dialog focus management, chart text fallbacks, image attribution, route-aware JSON-LD, and mobile/accessibility testing remain to be completed.
- No unit-test or automated link-check script exists in the repository.

## QA status after current implementation

| Area | Status | Evidence checked |
| --- | --- | --- |
| Functional routes | PASS | Next production build generated 43 routes, including `/sources`, `/about`, and `/methodology`. |
| Typecheck | PASS | `npx tsc --noEmit` completed without diagnostics. |
| Production build | PASS | `npm run build` completed successfully. |
| Aircraft content leakage | PASS for shared renderer | Concorde-only renderer assertions were removed; the remaining Concorde content is in Concorde-owned data/homepage content. |
| Source library | PASS | `/sources` is registry-derived and has search plus source-tier filters. |
| Methodology route | PASS | `/methodology` resolves to the existing editorial methodology page. |
| About route | PASS | `/about` exists with creator, research, and calculation-boundary content. |
| Sitemap/robots generation | PASS | Both routes were generated by the production build; sitemap now includes the new public routes. |
| Lab 01 model disclosure | PASS | Calculation trail, assumptions, and limitations are visible. |
| Lab 03 heating wording | PASS | Uses stagnation/recovery temperature language and distinguishes model output from measured skin temperature. |
| Lab 04 assumptions | PASS | Model disclosure added and absolute engine claims softened. |
| Lab 06 climb model | PASS | Reference airspeed is now visible input; output is labeled as a model and assumptions are disclosed. |
| Modal keyboard behavior | PASS by code inspection | Escape close, focus restoration, body-scroll lock, and Tab focus wrap are implemented. |
| Automated unit tests | NOT AVAILABLE | No test runner or test script exists in `package.json`. |
| Automated link/accessibility/mobile checks | NOT RUN | No configured link checker, browser test runner, or accessibility test suite exists. |

Remaining engineering debt: the legacy aircraft data interface still needs a full neutral-field migration; route-level JSON-LD and image attribution are not complete; and visual/mobile QA still requires a browser test pass. All current lab routes now expose model assumptions and limitations; calculation-trail detail is strongest in Labs 01 and 06 and remains a follow-up enhancement for the other models.
