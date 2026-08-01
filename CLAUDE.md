# December landing page

This repository is the static landing page for December, a Wega Labs open
research project. It deploys to `december.dev` through the Vercel project
`computer-use-website`.

## Product language

- Explain the project in ordinary language before technical language.
- Lead with the question of personal continuity: "What makes you, you?"
- Describe consciousness as an open question.
- Describe immortality as a distant hope, never a present capability or promise.
- State clearly that the world is still in its design and audit phase.
- Do not claim that artificial residents are conscious.
- Keep Wega Labs as the institution and December as the research program.
- Participant requests must require consent, avoid private data, and explain
  that a research persona is a model rather than a conscious copy.

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
