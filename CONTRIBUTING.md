# Contributing to Pathways

Thank you for your interest in contributing to Pathways! This document outlines our workflow for making changes to the codebase.

## Branch & Pull Request Workflow

All changes — no matter how small — should go through a Pull Request. Direct pushes to `main` are discouraged.

### Steps

1. **Create a branch** from `main` with a descriptive name:
   ```
      git checkout -b feature/your-feature-name
         ```
            or for fixes:
               ```
                  git checkout -b fix/short-description
                     ```

                     2. **Make your changes** and commit with a clear message:
                        ```
                           git commit -m "feat: add user dashboard pagination"
                              ```

                              3. **Push your branch** to GitHub:
                                 ```
                                    git push origin feature/your-feature-name
                                       ```

                                       4. **Open a Pull Request** on GitHub targeting `main`.
                                          - Write a short description of what changed and why.
                                             - Link any related issues.

                                             5. **Review** — the PR should be reviewed before merging, even for solo work (self-review is fine).

                                             6. **Merge** using "Squash and merge" to keep the commit history clean.

                                             ## Commit Message Convention

                                             Use the following prefixes:
                                             - `feat:` — new feature
                                             - `fix:` — bug fix
                                             - `docs:` — documentation only
                                             - `style:` — formatting, no logic change
                                             - `refactor:` — code restructure
                                             - `chore:` — maintenance tasks

                                             ## Questions?

                                             Open an issue or reach out via the repository discussions.
