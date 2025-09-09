// Button.jsx
// Reusable button component for the calculator keypad.
// Props:
// - children: The label or symbol to display on the button (e.g., '1', '+', 'AC').
// - onClick: Function to call when the button is clicked.
// - className: Optional additional CSS classes for styling (e.g., 'span-two' for wider buttons like '=').

import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      // Accessibility: Add role and aria-label for screen readers.
      role="button"
      aria-label={children}
    >
      {children}
    </button>
  );
};

export default Button;
