# Portfolio — scroll narrative

## Reference and capture

- Reference: https://toss.im/en-us, inspected on 2026-10-21.
- Firecrawl live capture: `01a15f08-5bd7-71f4-9525-c1ed2bd1216c`, desktop 1440 × 1000, branding, page HTML, text and full-page screenshot requested.
- The reference was also inspected visually in a browser at its opening scene, phone scene and finance section. Browser scrolling confirmed prolonged pinned scenes, text reveals, a narrow section rail and staggered product compositions. A full-page capture alone cannot establish the animation timing.
- Inspected reference capture: [Toss section composition](/home/levi/.codex/visualizations/2026/10/21/01a15f02-87b5-7962-bf1b-cbd3ec69de6f/toss-reference.png).

## Observed system

Firecrawl reports a white background (`#FFFFFF`), dark primary text (`#333840`), a saturated blue accent (`#0047FC`) and Toss Product Sans OTF. A sampled desktop h2 is 92px; this is one observed style, not a universal heading size. The opening scene has a nearly full-viewport video, generously rounded corners and a large centered two-line heading. Later sections use white space, large headings, floating device imagery and image-led compositions. The section rail uses small horizontal ticks. Navigation is restrained. The reference uses both media scenes and DOM text/UI animations.

Spacing and scene durations below are portfolio implementation choices, rather than extracted Toss CSS. Mobile behavior is adapted independently; the desktop reference does not establish it.

## Portfolio implementation

Keep the existing Next.js, next-intl, HeroUI and Framer Motion stack. Use Inter instead of the reference's proprietary font. Use white, neutral gray, `#2563EB` blue and a charcoal technology interlude; preserve an optional dark theme. Main content is capped at 1120px. Headings scale from roughly 35px on small screens to 78px on desktop. Body text stays at readable sizes; labels are secondary.

1. Opening: original portfolio project screenshots arranged as floating browser windows. Scrolling moves the title and screens at different speeds and changes perspective/scale.
2. About: a pinned statement with a continuous typewriter reveal driven directly by scroll position, an orange caret that transfers between browser-wrapped lines, and a gradual scale reduction, followed by the existing biography. A small code token follows the floating-object movement.
3. Projects: three scenes crossfade inside a pinned viewport. Text, stack, source/live links and real screenshots stay paired. Buttons offer direct scene navigation, and the complete archive remains available.
4. Stack: large technology names move in opposite directions during scrolling.
5. Experience and education: restrained chronological rows and readable details revealed as they enter the viewport.
6. Contact: full-width blue closing scene with email, GitHub, LinkedIn and the existing résumé files.

Use native page scrolling without wheel interception or mandatory scroll snapping. Pin only on viewports at least 1000px wide and 700px tall. Smaller screens and reduced-motion preferences receive fully expanded scenes. MotionConfig and reduced-motion styles disable movement where requested. Keep language support for all six existing locales.

## Image sources

All implementation imagery is already supplied by this repository:

- `src/assets/images/projects/reunioes.png`: opening secondary browser and project scene.
- `src/assets/images/projects/gestao-clinica.png`: opening main browser and project scene.
- `src/assets/images/projects/chrono-study.png`: third project scene.

Observed reference assets, retained as source evidence rather than reused:

- https://static.toss.im/assets/toss-im/asset/intro-main-poster.webp — opening media poster.
- https://static.toss.im/assets/toss-im/asset/hero-phone-navigation-en.png — phone interface composition.
- https://static.toss.im/assets/toss-im/asset/phone_screen02_en.png — asset-management screen.
- https://static.toss.im/assets/toss-im/asset/shopping/admin-en.png — shopping administration UI.

## Limits

This adaptation uses real portfolio screenshots and code-driven animation; no original portfolio video footage was supplied. It follows the reference's pacing and composition without reproducing Toss's financial content, branded assets or exact media timelines. All professional claims and project descriptions come from the existing portfolio data.

## Focused typewriter reference (2026-10-21)

The user supplied three captures of “From sale to payout, everything in one place”. The live shopping scene was also inspected in-browser. Its DOM layers a gray placeholder (`rgb(231, 227, 226)`) beneath a width-clipped dark reveal (`rgb(61, 56, 51)`), with one orange caret per line (`rgb(255, 107, 53)`). The inspected caret is 5px × 48px at a 48px base font; the title is scaled up during the typing sequence and shrinks as scrolling continues. Only the currently typing line shows a caret. The captured in-progress title had a scale of approximately 1.526; this is an observed state, not its full range.

[Inspected in-progress reference](/home/levi/.codex/visualizations/2026/10/21/01a15f02-87b5-7962-bf1b-cbd3ec69de6f/toss-typewriter-reference.png).

The portfolio reuses those three colors and the line-by-line clipping mechanism. It measures actual wrapped lines after fonts load and on resize so translated copy, proportional glyphs and line breaks stay aligned. No timers or wheel interception drive the typing. Reverse scrolling erases the text and moves the caret backward. Small screens and reduced-motion preferences display the complete statement without a caret. The portfolio's code token substitutes for the reference's product jar.
