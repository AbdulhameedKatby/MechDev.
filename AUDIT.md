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

## Audit reconciliation and execution backlog

Review date: 2026-10-03

The attached website strategy was checked against the local repository and the deployed site at `https://abdulhameedkatby.vercel.app/`. The deployed site was behind the local worktree during this review: production still showed the old delta-wing explanation, the 127 C wording, and the old Concorde image alt text, while local source already contained several corresponding fixes. Local changes must be deployed before production can be considered corrected.

### Verified as already implemented locally

- Aircraft detail metadata has route-specific titles, canonical paths, Open Graph images, Twitter cards, and article plus breadcrumb JSON-LD.
- `NEXT_PUBLIC_SITE_URL` is centralized in `lib/site.ts`; sitemap and robots routes exist.
- `/about`, `/sources`, `/methodology`, and `/manifest.webmanifest` exist.
- The shared aircraft renderer uses aircraft-owned images and comparison data rather than a Concorde image fallback.
- Source search and tier filters expose `aria-pressed`; modal keyboard handling includes Escape, focus restoration, scroll locking, and Tab wrapping.
- Labs 01, 03, 04, 05, and 06 expose model assumptions or limitations to varying levels of detail.
- TypeScript and production builds pass. The latest build generated 59 routes.

### Corrected during the 2026-10-03 review

- Reframed the delta-wing explanation around supersonic wave drag, Mach-cone geometry, low-speed vortex lift, and explicit trade-offs.
- Replaced the Concorde engine claim about turbofan blades being destroyed by 127 C inlet air with low-bypass, frontal-area, jet-velocity, and ram-compression reasoning.
- Removed the shared renderer's false PIV test caption and universal SBLI explanation.
- Corrected ideal Concorde stagnation temperature to approximately 397 K / 124 C and distinguished it from measured skin temperature.
- Labeled the fuel-transfer diagram as a reconstructed model.
- Corrected SR-71 aluminum wording, aligned its Mach value to 3.2, and separated skin temperature from total-temperature limits.
- Corrected the hoop-stress index wording from exponential to proportional and softened the Comet explanation to reflect fatigue cracking at stress-concentrating openings rather than the simplified square-window story.
- Corrected the homepage Concorde alt text and stale delta-wing index copy.
- Restored the missing level-2 source tier in the methodology ladder.

### Report claims that need verification, not automatic acceptance

- NASA TN D-4607 is now verified as NASA-TN-D-4607, "Critical-speed analysis of flexibly mounted rigid rotors" by R. H. Cavicchi, published in 1968. It is not a Concorde delta-wing source and was removed from the Concorde evidence trail. NASA TN D-6847, AIAA 74-32, BAC/KKL/WB.180, and all remaining manufacturer-document dates, titles, authors, and URLs still require checking against their original catalog records.
- The report's SR-71 estimate of ideal stagnation temperature near 660 K at Mach 3.2 and 85,000 ft should not be accepted without calculating the chosen standard-atmosphere temperature. Ideal stagnation temperature depends on ambient temperature and Mach; it is not the same as skin temperature or an engine total-temperature limit.
- `85% titanium` must state its basis, such as structural weight, before being presented as a general aircraft percentage.
- Concorde fuel flow, L/D comparisons, active-load-alleviation language, B-2 radar cross-section values, and Comet failure wording require claim-level sources before being retained.
- The report's recommendation to use KaTeX, Zod, Pagefind, Vitest, Playwright, axe, Pyodide, and 3D tooling is strategic rather than mandatory. Add each dependency only when a measured requirement justifies it.

## Ordered roadmap

1. **Deploy and re-crawl the credibility fixes.** Publish the current local changes, then fetch the homepage, flagship question, Concorde, SR-71, sitemap, and robots routes. Confirm production text, canonical URLs, metadata, and route counts.
2. **Create source records that can be verified.** Add stable IDs, deep URLs, authors, institution, access status, locator, archive URL, last-verified date, and confidence. Reject bare homepages for claims presented as inspectable evidence.
3. **Add an automated content guard.** Build a script that renders or scans every aircraft record and fails on forbidden template phrases, unsupported universal headings, missing image attribution, missing source IDs, and non-aircraft-specific copy.
4. **Migrate the legacy aircraft contract.** Replace `concordeConnection` with neutral fields such as `context`, `assumptions`, `claimIds`, and `sourceIds`. Validate every aircraft record before the page renderer can consume it.
5. **Make the evidence model claim-level.** Introduce `Claim`, `Source`, locator, layer, confidence, and reviewer fields. Show evidence coverage and mark incomplete aircraft pages as drafts rather than implying complete authority.
6. **Finish metadata and route QA.** Add unique metadata to every question, concept, and lab page; make `/methodology` the canonical public route and redirect or clearly deprecate `/editorial`; verify JSON-LD with a structured-data validator.
7. **Repair source and navigation integrity.** Replace dead concept links, reconcile aircraft/question duplicate routes, remove or create promised branching investigations, derive footer lab links from one registry, and ensure every visible “open record” link is useful.
8. **Complete the flagship content audit.** Audit all 15 aircraft records and all question/concept pages for numerical contradictions, image type and credit, unsupported superlatives, units, assumptions, and aircraft-specific wording.
9. **Strengthen the labs in a measured sequence.** Start with shareable URL state and equation tests for Labs 01, 03, and 04; then add data-table fallbacks, reset behavior, model-vs-reality panels, exports, and version labels. Do not publish measured comparisons without a source and uncertainty boundary.
10. **Fix accessibility and mobile behavior.** Add explicit focus styling, dialog labelling, reduced-motion handling, keyboard and screen-reader chart fallbacks, slider text inputs, and scroll-container affordances. Validate key routes at phone and desktop widths.
11. **Build the trust surfaces.** Add corrections/errata, cite-this-page, licensing, accessibility statement, last-updated dates, reviewer status, and a contact/report-issue path. Do not invent reviewer names; use a visible Draft status until review exists.
12. **Add the first differentiator.** Implement a small compare tool using only normalized fields that are actually present and sourced. Make the output explain assumptions instead of presenting false precision.
13. **Add the Equation Atlas incrementally.** Start with lift, drag polar, Mach, stagnation temperature, hoop stress, and Breguet range. Each entry needs units, assumptions, a worked example, a test, references, and links to the labs that use it.
14. **Publish open data only after provenance is ready.** Export the validated aircraft registry as JSON/CSV, add a license and `CITATION.cff`, then consider an API and Zenodo DOI.
15. **Expand content one high-quality investigation at a time.** Prioritize one aircraft, one concept, one accident case study, or one myth hub entry per month. Defer 3D, AR, multilingual content, Pyodide, newsletters, and broad social distribution until the evidence and QA pipeline is reliable.

### Definition of done for the current foundation

- Production matches the validated local build.
- Every indexed route has unique title, description, canonical, and appropriate structured data.
- Every displayed source has a deep link or an explicit unavailable-access status.
- Every aircraft page passes the leakage scan and has attributed, typed imagery.
- Every lab exposes equations, units, assumptions, limitations, reset behavior, and a reproducible test for its core calculation.
- Key pages pass typecheck, production build, link checks, keyboard checks, accessibility checks, and responsive browser checks.
