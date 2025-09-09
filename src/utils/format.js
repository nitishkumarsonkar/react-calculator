// format.js
// Utility functions for formatting calculator operands.
// This helps display numbers with thousands separators for readability.

export const formatOperand = (operand) => {
  if (operand == null || operand === '') return '';
  
  // Split into integer and decimal parts.
  const [integer, decimal] = operand.toString().split('.');
  
  // Handle cases where parseInt would return NaN (e.g., empty or just '-').
  if (integer === '' || integer === '-') return operand; // Return as-is for edge cases.
  
  // Add commas to integer part using locale formatting.
  // Note: This uses en-US locale; adjust if internationalization is needed.
  const formattedInteger = Math.abs(parseInt(integer)).toLocaleString('en-US');
  const sign = integer.startsWith('-') ? '-' : '';
  
  // Reattach decimal if present.
  return decimal != null ? `${sign}${formattedInteger}.${decimal}` : `${sign}${formattedInteger}`;
};
