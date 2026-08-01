# December landing page

This repository is the static landing page for December, a long-term Wega Labs
dream being built in the open. It deploys to `december.dev` through the Vercel project
`computer-use-website`.

## Product language

- Explain the project in ordinary language before technical language.
- Lead with the felt experience: leave for two days and return to lives that continued without you.
- Present December as a dream and invitation before presenting it as an experiment.
- Describe consciousness as an open question.
- Describe immortality as a distant hope, never a present capability or promise.
- State clearly that the world is still in its design and audit phase.
- Do not claim that artificial residents are conscious.
- Keep Wega Labs clearly identified as the company and AI lab; present December as the lab's living-world dream.
- Do not solicit human participants, nominations, biographies, or private life data.

## Implementation

The site is intentionally static and dependency-light:

- `index.html` contains page structure and copy.
- `styles.css` contains the complete responsive visual system.
- `script.js` contains progressive enhancement only.
- `hero-valley.png` is the generated hero artwork.
- `vercel.json` preserves the existing static Vercel deployment.

Run `npm run dev` for local preview and `npm run build` for the deployment check.
Respect `prefers-reduced-motion`, maintain semantic HTML, and keep the main story
fully understandable without JavaScript.
