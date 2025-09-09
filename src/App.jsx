// App.jsx
// Main component for the calculator app.
// Manages state using a reducer, handles keyboard events, and renders Display and Keypad.

import React, { useReducer, useEffect } from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';

// Define action types as constants for clarity and to avoid typos.
const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  TOGGLE_SIGN: 'toggle-sign',
  EVALUATE: 'evaluate',
};

// Initial state for the calculator.
const initialState = {
  currentOperand: '',
  previousOperand: '',
  operation: null,
  overwrite: false, // Flag to overwrite currentOperand after evaluation.
};

// Reducer function to handle state transitions based on actions.
// This implements the calculator's logic without using eval for safety.
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // If overwrite flag is set (after =), start a new currentOperand.
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      // Prevent multiple leading zeros (e.g., '000' becomes '0').
      if (payload.digit === '0' && state.currentOperand === '0') return state;
      // Prevent multiple decimals.
      if (payload.digit === '.' && state.currentOperand.includes('.')) return state;
      // Digit limit: Prevent more than 15 characters (including sign/decimal).
      if (state.currentOperand.length >= 15) return state;
      // Append digit to currentOperand.
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      // If no operands, do nothing.
      if (state.currentOperand === '' && state.previousOperand === '') return state;
      // If only currentOperand (and it's not empty), move it to previous and set operation.
      if (state.previousOperand === '' && state.currentOperand !== '') {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: '',
        };
      }
      // If currentOperand is empty, just change the operation without evaluating.
      if (state.currentOperand === '') {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      // Otherwise, evaluate and set new operation.
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: '',
      };

    case ACTIONS.CLEAR:
      // Reset to initial state.
      return initialState;

    case ACTIONS.DELETE_DIGIT:
      // If overwrite, clear currentOperand instead of deleting.
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: '',
        };
      }
      // If no currentOperand, do nothing.
      if (state.currentOperand == null) return state;
      // Remove last character from currentOperand.
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.TOGGLE_SIGN:
      // If no currentOperand or invalid for parsing, do nothing.
      if (state.currentOperand == null || state.currentOperand === '') return state;
      const currentNum = parseFloat(state.currentOperand);
      if (isNaN(currentNum)) return state;
      // Toggle the sign by multiplying by -1 (handle as string).
      return {
        ...state,
        currentOperand: (currentNum * -1).toString(),
      };

    case ACTIONS.EVALUATE:
      // If insufficient data, do nothing.
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state;
      }
      // Compute result, set overwrite flag, and update state.
      return {
        ...state,
        overwrite: true,
        previousOperand: '',
        operation: null,
        currentOperand: evaluate(state),
      };

    default:
      return state;
  }
}

// Helper function to compute the result of previousOperand operation currentOperand.
// Returns a string; handles division by zero.
function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return '';
  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      if (current === 0) return 'Error'; // Handle divide by zero.
      computation = prev / current;
      break;
    default:
      return '';
  }
  return computation.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, initialState);

  // Keyboard support: Add event listener for key presses.
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (key >= '0' && key <= '9') {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: key } });
      } else if (key === '.') {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '.' } });
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        const op = key === '*' ? '×' : key === '/' ? '÷' : key;
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: op } });
      } else if (key === 'Enter' || key === '=') {
        dispatch({ type: ACTIONS.EVALUATE });
      } else if (key === 'Escape') {
        dispatch({ type: ACTIONS.CLEAR });
      } else if (key === 'Backspace') {
        dispatch({ type: ACTIONS.DELETE_DIGIT });
      } else if (key.toLowerCase() === 'p') { // Arbitrary key for +/- (can change if desired).
        dispatch({ type: ACTIONS.TOGGLE_SIGN });
      }
      // Prevent default behavior for handled keys (e.g., no browser shortcuts).
      if (['0'-'9', '.', '+', '-', '*', '/', 'Enter', '=', 'Escape', 'Backspace', 'p', 'P'].includes(key)) {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Cleanup listener on unmount.
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Empty dependency array: Run once on mount.

  return (
    <div className="calculator">
      <Display
        previousOperand={previousOperand}
        operation={operation}
        currentOperand={currentOperand}
      />
      <Keypad dispatch={dispatch} />
    </div>
  );
}

export default App;
