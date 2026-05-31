# Testing and Refactoring Report

## 1. Findings
- **Architecture:** The project was initially a monolithic `index.html` with all logic (UI, calculations, parsing) co-located. This structure made it impossible to run unit tests without a full browser environment.
- **Logic Isolation:** Functions like `compute_dop` and `parse_tle` were logically sound but tightly coupled with global variables and the DOM.
- **External Dependencies:** The project relies on `satellite.js` and `sylvester.js` for core math, which are included via `<script>` tags, making them difficult to mock in traditional unit tests.

## 2. Issues Identified
- **Lack of Verification:** No automated tests were present to verify the accuracy of GNSS calculations (DOP, Azimuth/Elevation).
- **TLE Parser Assumptions:** Initial test cases assumed satellite IDs would be numeric, but the implementation correctly extracts the ID with its classification character (e.g., `24876U`). This was discovered and corrected during unit test development.
- **Code Consistency:** No linting or formatting standards were enforced, leading to potential maintenance challenges.
- **CI/CD:** No automated pipeline existed to prevent regressions during new feature development.

## 3. Implemented Changes
- **Modularization:**
    - Core logic extracted into `src/tle-parser.js`, `src/calculations.js`, and `src/constants.js`.
    - `index.html` updated to use `<script type="module">` for importing these components.
- **Testing Suite:**
    - **Unit Tests (Vitest):** Created for TLE parsing and mathematical calculations. Mocking was used to isolate logic from external libraries.
    - **E2E Tests (Playwright):** Established a framework for browser-level validation of the UI and user interactions.
- **Quality Gates:**
    - **ESLint:** Configured to enforce modern JS standards, ignoring third-party libraries.
    - **Prettier:** Configured for consistent code formatting.
- **Automation:**
    - Added a **GitHub Actions** workflow for Continuous Integration.

## 4. Future Proposals
- **Further Decoupling:** Continue extracting UI-related logic (e.g., map and chart initialization) into dedicated modules to further reduce the size of `index.html`.
- **TypeScript Migration:** Convert the project to TypeScript to leverage static typing for complex orbital data structures.
- **Expanded Test Coverage:** Add integration tests for the `location_presets.json` and more exhaustive E2E scenarios covering different GNSS constellations.
- **Code Coverage:** Integrate coverage reporting into the CI pipeline to track test effectiveness.
