# Mocking Bird - AI Coding Guidelines

## Project Overview
Mocking Bird is a Manifest V3 browser extension that populates form fields with realistic mocked data. It uses `bun` for building and `@faker-js/faker` for data generation.

## Architecture
- **Entry Point**: `src/content.ts` is the sole content script. It runs on `<all_urls>` and handles all logic.
- **Build Output**: `dist/` contains the bundled `content.js` and `manifest.json`.
- **Manifest**: `manifest.json` defines the extension configuration.

## Key Patterns & Logic
- **Field Detection**:
  - `detectFieldType(element)` determines the data type (e.g., "email", "firstName").
  - `matchesAttribute(element, keywords)` checks `type`, `name`, `id`, `placeholder`, and associated `<label>` text.
  - `getLabelText(element)` finds the label via `for` attribute matching the input's `id`.
- **Data Generation**:
  - `generateMockData(type)` maps detected types to `faker` methods (e.g., `faker.internet.email()`).
- **User Interaction**:
  - **Inputs/Textareas**: `dblclick` + `Alt` key.
  - **Selects**: `click` + `Alt` key (picks a random enabled option).
- **Reactivity**:
  - `triggerInputEvents(element)` dispatches `input` and `change` events after setting values to ensure compatibility with frameworks like React/Vue.

## Development Workflow
- **Build**: `bun run build` (Bundles `src/content.ts` -> `dist/content.js` and copies `manifest.json`).
- **Lint & Format**: `biome check .` and `biome format --write .`.
- **Dependencies**: Use `bun install` / `bun add`.
- **Testing**: Load the `dist/` folder as an unpacked extension in Chrome/Edge/Brave (`chrome://extensions`).

## Coding Conventions
- **TypeScript**: Strict mode. Use explicit types for DOM elements (e.g., `HTMLInputElement`).
- **DOM Access**: Use `closest()` to handle clicks on child elements of inputs.
- **Error Handling**: Fail silently or return null/default values rather than throwing errors, as this runs in the user's browsing context.
- **Imports**: Use named imports from `@faker-js/faker`.

## Example: Adding a New Field Type
1.  Add keywords to `detectFieldType` in `src/content.ts`:
    ```typescript
    if (matchesAttribute(element, ["custom"])) return "customType";
    ```
2.  Add generation logic to `generateMockData`:
    ```typescript
    case "customType": return faker.some.method();
    ```