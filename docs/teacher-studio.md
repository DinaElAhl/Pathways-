# E² Teacher Studio in Pathways

Adapted from DinaElAhl/desktop-tutorial (retrieved 13 October 2026). Original teaching content and author attribution are retained.

Hosted under `public/teacher-studio/`; linked through the data-driven EduHub listing in `src/data/eduHubTools.js`. The original GitHub Pages app is unchanged.

Enhancements:
- Dropdown starters beside editable planning fields, plus a teaching-focus dropdown in every tab, including reference and checklist views.
- Existing notes remain when adding a suggestion to a text area. Short fields are replaced with the selected value. Every suggestion remains editable.
- New blueprint rows receive suggestions automatically.
- Text, standalone HTML, HTML fragment, planning CSV and browser print/PDF exports. Exports target the active tab.
- Per-tool browser saves and JSON backup/restore. Imported backups do not alter licensing/tier preferences or other Pathways tools.
- Platform-specific handoff guidance: generic LMS, Google Classroom, Canvas, Moodle, Teams, Schoology, Blackboard, Brightspace.

Compatibility is portable content sharing, not authenticated LMS integration. No SCORM/LTI package, native course import or grade synchronization is advertised. Institution permissions and editor sanitization can differ. Teachers should preview content in their own LMS before releasing it.

No new fulfilment service or account integration. The hosted adaptation does not register the upstream service worker, preventing it from caching or controlling unrelated Pathways pages.

Suggestion content is in `suggestions.json`; interactions and exports are in `enhancements.js`. The suggestion bank reuses `src/data/e2TeachingHelpers.js` along with subject-independent planning starters.

Source documentation for platform guidance:
- https://support.google.com/edu/classroom/answer/6020265
- https://docs.moodle.org/en/Page_resource
- https://community.instructure.com/en/discussion/272543/converting-html-content-to-pages
