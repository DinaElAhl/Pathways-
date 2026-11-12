# Roots | جذور — Learning & Parent Voice (app release branch)

This branch holds the Roots LMS web app served at https://app.pathwayslearn.com
(Firebase Hosting, project `roots-parent-voice`). It is separate from the
website on `main` and is never deployed by Vercel.

- `public/` — the built app that Firebase Hosting serves
- `src/` — app source (`app.js` is bundled to `public/app.js` with esbuild)

Publish from Google Cloud Shell (builds the international school list from Wikidata, then deploys the app and its security rules):

    git clone --depth 1 -b roots-lms-app https://github.com/DinaElAhl/Pathways- rl && cd rl && python3 tools/build_intl_schools.py && firebase deploy --only hosting,firestore:rules --project roots-parent-voice

- `firestore.rules` — database security rules (the Roots owner is identified by account ID)
- `tools/build_intl_schools.py` — writes `public/schools/<ISO>.json` from Wikidata (CC0)
