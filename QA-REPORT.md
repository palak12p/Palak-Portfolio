# Verification report

## Readability update — 1 November 2026

Body copy is now 16px, secondary text is 14px, and small labels are at least 12px. Muted text contrast is stronger. Mobile project tabs, skill groups and community statistics reflow to accommodate larger text. The strict TypeScript check, production build and all 24 browser check groups passed again, including the nine viewport widths, axe scans, keyboard navigation and offline PDF download. Screenshots and qa-results.json have been refreshed. The Lighthouse report below is retained from the original release; Lighthouse was not rerun for this typography update.

## Consistent dark theme — 1 November 2026

Sections 01–04 now use the same #171916 background. Community text, accent color, focus outlines and dividers match the dark theme. Computed section surfaces were verified in Chrome; the production build and all 24 browser check groups passed. Desktop/mobile screenshots were refreshed.

## Homepage index — 1 November 2026

Added a visible question box and four suggested questions directly below the homepage introduction. The hero button now says “Ask the index”. The inline and dialog versions share one answer matcher. All 25 browser check groups passed, including typed questions, suggested questions, Enter submission, unsupported-question fallback and narrow-screen layouts. Screenshots were refreshed; the original Lighthouse audit remains historical.

## Dark command palette — 1 November 2026

The portfolio commands dialog now uses the same dark background, light text and lime accents as the site, including the search field, selected command, focus ring and footer. The production build and all 25 browser check groups passed, including the command-dialog contrast scan and keyboard navigation.

## Dark index popup — 1 November 2026

The Ask the index popup now matches the dark homepage and command palette: dark surfaces, light text, lime accents and matching focus states. All 25 browser check groups passed. An additional accessibility scan of a displayed answer found zero WCAG A/AA violations.

## Project source links — 1 November 2026

Added the user-provided RAG_CHATBOT, ecommerce and chatbot repository URLs to the matching project cards and case studies; chatbot is explicitly mapped to ChessBot. The production build and TypeScript check passed. Targeted browser checks verified all three card links and both case-study source links, desktop/mobile layouts, the offline RAG link and no JavaScript errors. Remote repository availability was not independently verified.

## Portrait landing and CIFAR link — 1 November 2026

The landing page now displays Palak Pandit as its large H1, the user-provided portrait and a clear introduction. The signal lab is preserved below the homepage index. All 25 browser check groups passed, including the loaded portrait and nine responsive widths. Additional checks verified the embedded offline portrait and the CIFAR card/case-study links to palak12p/cifar10. The original uploaded photo was preserved.

## Original release verification

Checked **31 October 2026** against the local production build in headless Chrome **156.0.8078.76** on macOS. The saved browser results are in `screenshots/qa-results.json`. Screenshots show the actual rendered portfolio.

## Build and dependencies

- TypeScript strict checking: passed.
- Vite 8.3.5 production build: passed.
- React / React DOM: 19.3.1. TypeScript: 5.9.3.
- `npm audit`: zero known vulnerabilities at the time of the check.
- Production JavaScript: 259,188 bytes, approximately 80.44 kB gzip.
- Production CSS: approximately 48.16 kB, 10.13 kB gzip.
- Runtime API keys, backend services, external fonts and paid API dependencies: none.

## Browser verification

**24 check groups passed.**

- Home title, a single H1, and the confirmed phone link.
- No horizontal overflow at 320, 360, 390, 600, 768, 1024, 1280, 1440 and 1920 pixels.
- All four project tabs, mouse selection, arrow keys, Home and End.
- All three signal-sculpture modes.
- All four case-study URLs, architecture steps and mobile layouts at 320, 390 and 768 pixels.
- An unknown-project fallback with recovery to selected work.
- Control-K, command filtering, Enter navigation, empty results and Escape.
- Native-dialog focus restoration to the initiating control.
- Resume-grounded Q&A, honest employment-scope answer and unsupported-question fallback.
- Mobile-menu opening, anchor navigation, automatic closure and Escape.
- Reduced-motion preference disables the signal animation.
- Resume, favicon, social image and robots assets return valid responses.
- The command-palette resume action downloads a valid PDF.
- The standalone HTML opens with a `file:` URL, supports project exploration and command navigation, and downloads its embedded PDF with zero HTTP requests.
- A usable no-JavaScript biography, project summary, resume link and email link.
- No JavaScript page errors or browser console errors during the suite.

The axe-core 4.14.0 scans found **zero violations** for WCAG 2 A/AA, WCAG 2.1 A/AA and best-practice rules on the desktop home, mobile home, all four case studies, the question-index dialog and command dialog. Automated results cover the tested states; they are not an accessibility certification.

## Lighthouse

Lighthouse **12.8.2**, mobile configuration, local production preview at `http://127.0.0.1:4173/`. Final report captured **31 October 2026 at 15:16 IST**.

| Category | Local score |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

| Metric | Local measurement |
| --- | ---: |
| First contentful paint | 1.4 s |
| Largest contentful paint | 1.5 s |
| Total blocking time | 0 ms |
| Cumulative layout shift | 0 |
| Speed index | 1.4 s |

No Lighthouse run warnings or failed accessibility audits were reported. The saved [interactive HTML report](screenshots/audits/lighthouse.html) and [raw JSON](screenshots/audits/lighthouse.json) contain the full results, including optional optimization opportunities. These are a single local lab run, not field data or a guarantee for a public deployment. Recheck after hosting and after substantial content changes.

## Resume verification

The copied PDF's single telephone annotation was changed to `tel:+918252836961`, matching the number confirmed by the user and visible in the resume. The written PDF was reopened to verify the link and page count, then rendered and visually inspected. The layout remains intact. The original Desktop PDF was not modified.

## Limits and remaining application work

No physical-device, Safari, Firefox or screen-reader session was performed. External certificate/profile links were taken from the resume or confirmed by the user; availability of every remote destination was not independently verified. Project screenshots and live demos were not supplied. All four repository URLs are now provided by the user. The other three repository URLs were provided by the user on 1 November 2026. No performance metrics were invented for the featured projects.

The portfolio is ready locally. The applicant must still complete genuine Wispr Flow building activity, resolve any Emergent tooling ambiguity with the organizer, publish a public portfolio URL, record and upload a personal explanatory video, personalize the setup request, and submit the application. Voice usage and public deployment were not fabricated.
