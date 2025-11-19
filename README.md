# Mocking Bird 🐦

A simple and modern browser extension that helps developers and quality assurance professionals populate forms with mocked but realistic data. This extension works on both Firefox and Chrome.

## Features

- **Form Population**: Populate form fields with realistic mocked data by holding the Alt key and double-clicking on the field.
- **Smart Detection**: Automatically detects the type of field (e.g., name, email, phone number, address) based on attributes like `type`, `name`, `id`, and `placeholder`.
- **Cross-Browser Support**: Compatible with both Chrome and Firefox using Manifest V3.

## How It Works

When you hold the Alt key and double-click on an input field or textarea, the extension will:

1. Analyse the field's attributes to determine its type.
2. Generate appropriate mocked data using the Faker library.
3. Populate the field with the generated data.

### Supported Field Types

- **Email**: Generates a random email address (e.g., `john.doe@example.com`).
- **Phone**: Generates a random phone number.
- **Name**: Generates a full name.
- **Address**: Generates a street address.
- **URL**: Generates a random URL.
- **Number**: Generates a random integer between 1 and 100.
- **Text**: Generates random lorem ipsum words.

## Installation for Development

To install and test the extension as a developer:

### Prerequisites

- [Bun](https://bun.sh/) JavaScript runtime
- [Biome](https://biomejs.dev/) for linting and formatting

### Building the Extension

1. Clone or download the repository.
2. Navigate to the project directory.
3. Install dependencies:

   ```bash
   bun install
   ```

4. Build the extension:

   ```bash
   bun run build
   ```

   This will create a `dist` folder containing the built extension files.

### Installing in Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" in the top right corner.
3. Click "Load unpacked" and select the `dist` folder from the project directory.
4. The extension should now be installed and active.

### Installing in Firefox

1. Open Firefox and navigate to `about:debugging`.
2. Click "This Firefox" in the left sidebar.
3. Click "Load Temporary Add-on".
4. Select the `manifest.json` file from the `dist` folder.
5. The extension will be loaded temporarily for testing.

### Development Commands

- `bun run dev`: Build the extension (alias for build).
- `bun run lint`: Run Biome linter.
- `bun run format`: Format code with Biome.

## Contributing

Contributions are welcome! Please ensure code is formatted with Biome and follows the existing style.

## Licence

This project is licensed under the MIT Licence.
