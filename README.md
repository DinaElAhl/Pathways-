# Roots | جذور — Learning & Parent Voice (app release branch)

This branch holds the Roots LMS web app served at https://app.pathwayslearn.com
(Firebase Hosting, project `roots-parent-voice`). It is separate from the
website on `main` and is never deployed by Vercel.

- `public/` — the built app that Firebase Hosting serves
- `src/` — app source (`app.js` is bundled to `public/app.js` with esbuild)

Publish from Google Cloud Shell:

    git clone --depth 1 -b roots-lms-app https://github.com/DinaElAhl/Pathways- rl && cd rl && firebase deploy --only hosting --project roots-parent-voice
