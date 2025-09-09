# React Calculator

A basic calculator built with React and Vite. Supports addition, subtraction, multiplication, division, decimals, clear (AC), delete (DEL), sign toggle (+/-), and keyboard input.

## Features
- Basic arithmetic operations: +, −, ×, ÷
- Decimal point support
- Clear all (AC)
- Delete last digit (DEL)
- Toggle sign (+/-)
- Keyboard support for digits, operations, and special keys
- Responsive design for mobile and desktop
- No `eval` used for calculations (safe arithmetic handling)
- Thousands separators in display for readability

## Keyboard Shortcuts
- Digits: 0–9
- Decimal: .
- Operations: + (add), - (subtract), * (multiply, maps to ×), / (divide, maps to ÷)
- Equals: Enter or =
- Clear (AC): Escape
- Delete (DEL): Backspace
- Toggle sign (+/-): p (lowercase or uppercase)

## Prerequisites
- Node.js version 18 or higher (recommended for Vite compatibility)
- npm (included with Node.js)

## Getting Started
These instructions assume you're running commands in the project directory: `c:/Users/Nitish/Downloads/react-project/react-calculator`.

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and visit `http://localhost:5173` (or the port shown in the terminal) to use the calculator.

## Available Scripts
In the project directory, you can run:

- `npm run dev`: Starts the development server with hot reloading.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Locally previews the production build (run after `npm run build`).
- `npm run lint`: Runs ESLint to check for code issues.

## Project Structure
- `src/main.jsx`: Entry point that renders the App component.
- `src/App.jsx`: Core logic with state reducer, keyboard handling, and rendering of Display and Keypad.
- `src/components/Display.jsx`: Shows previous operand, operation, and current operand.
- `src/components/Keypad.jsx`: Renders the button grid and dispatches actions.
- `src/components/Button.jsx`: Reusable button component.
- `src/utils/format.js`: Helper for formatting numbers with thousands separators.
- `src/index.css`: Styles for the calculator UI, using CSS Grid and variables.

## How It Works
- **State Management**: Uses `useReducer` with a state object containing `currentOperand`, `previousOperand`, `operation`, and `overwrite` flag.
- **Actions**: Dispatched for adding digits, choosing operations, clearing, deleting, toggling sign, and evaluating.
- **Evaluation**: Performed safely without `eval`, with handling for division by zero (displays "Error").
- **Overwrite Behavior**: After pressing "=", the next digit input overwrites the result.
- **Decimal and Zero Rules**: Prevents multiple decimals or leading zeros.
- **Keyboard Support**: Listens for keydown events and maps keys to actions.

## Notes/Limitations
- This is an immediate-execution calculator (evaluates on each operation press, supports chaining like 12 + 7 - 3).
- No operator precedence (e.g., 2 + 3 × 4 evaluates as (2 + 3) × 4 if chained).
- Divide by zero shows "Error" in the display.
- Tested on modern browsers; keyboard support may vary by OS/browser.

## License
This project is licensed under the MIT License.
