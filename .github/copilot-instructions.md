# Mocking Bird - AI Coding Guidelines

## Project Overview
Mocking Bird is a Manifest V3 browser extension that populates form fields with realistic mocked data using Alt+double-click. Built with TypeScript, Bun, and Faker.js for cross-browser compatibility (Chrome/Firefox).

## Architecture
- **Content Script**: `src/content.ts` - Single entry point handling form detection and data injection
- **Build System**: Bun-based bundling to `dist/` with manifest copy
- **Extension Manifest**: `manifest.json` - Defines content scripts and permissions

## Key Patterns
- **Field Detection**: Analyze `type`, `name`, `id`, `placeholder` attributes for type inference (see `detectFieldType` in `src/content.ts`)
- **Data Generation**: Use `@faker-js/faker` methods like `faker.internet.email()`, `faker.person.fullName()` for realistic data
- **Event Handling**: Alt+double-click listener on document, prevent default to avoid text selection

## Development Workflow
- **Build**: `bun run build` - Bundles `src/content.ts` to `dist/content.js` and copies `manifest.json`
- **Lint/Format**: `biome check .` and `biome format --write .` for code quality
- **Testing**: Load unpacked extension from `dist/` in browser dev mode (`chrome://extensions` or `about:debugging`)

## Conventions
- **Imports**: ES modules with `import { faker } from "@faker-js/faker"`
- **TypeScript**: Strict mode enabled, target ESNext, JSX for potential future UI
- **Naming**: CamelCase functions, lowercase attribute checks with includes() for flexibility
- **Error Handling**: Minimal - assume valid DOM elements, no try/catch in core logic

## Integration Points
- **Browser APIs**: Content scripts run in isolated world, access DOM but not page scripts
- **Faker.js**: Peer dependency, generate data synchronously on user interaction
- **Manifest V3**: No background scripts, use action for popup if needed

## Code Examples
- Add new field type: Extend `detectFieldType` with attribute checks, add case in `generateMockData`
- Modify data: Use faker methods like `faker.company.name()` for business fields
- Event tweaks: Adjust modifier key or add shift/ctrl combinations in dblclick listener