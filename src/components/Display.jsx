// Display.jsx
// Component to show the calculator's display, including previous operand, operation, and current operand.
// Props:
// - previousOperand: String of the previous number/result (may be empty).
// - operation: The selected operation symbol (+, -, ×, ÷) or null.
// - currentOperand: String of the number currently being entered.

import React from 'react';
import { formatOperand } from '../utils/format'; // Import optional formatting helper.

const Display = ({ previousOperand, operation, currentOperand }) => {
  // Format operands for better readability (e.g., add commas for thousands).
  const formattedPrevious = formatOperand(previousOperand);
  const formattedCurrent = formatOperand(currentOperand);

  // Dynamic font size based on length to fit long numbers.
  let fontSize = '1.5em';
  const length = formattedCurrent.length;
  if (length > 10 && length <= 12) fontSize = '1.2em';
  else if (length > 12 && length <= 16) fontSize = '1em';
  else if (length > 16) fontSize = '0.8em';

  return (
    <div className="display">
      {/* Show previous operand and operation in a smaller, dimmed font. */}
      <div className="previous-operand">
        {formattedPrevious} {operation}
      </div>
      {/* Show current operand prominently with dynamic font size. */}
      <div className="current-operand" style={{ fontSize }}>
        {formattedCurrent || '0'} {/* Default to '0' if empty. */}
      </div>
    </div>
  );
};

export default Display;
