// Keypad.jsx
// Component that renders the calculator's keypad as a grid of Button components.
// Props:
// - dispatch: The dispatch function from useReducer to send actions when buttons are clicked.

import React from 'react';
import Button from './Button'; // Import reusable Button component.

const Keypad = ({ dispatch }) => {
  // Define action types as constants for clarity (mirrors those in App.jsx).
  const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    TOGGLE_SIGN: 'toggle-sign',
    EVALUATE: 'evaluate',
  };

  return (
    <div className="keypad">
      {/* Row 1: AC, DEL, +/-, ÷ */}
      <Button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.TOGGLE_SIGN })}>+/-</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '÷' } })} className="operation">÷</Button>

      {/* Row 2: 7, 8, 9, × */}
      <Button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '7' } })}>7</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '8' } })}>8</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '9' } })}>9</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '×' } })} className="operation">×</Button>

      {/* Row 3: 4, 5, 6, - */}
      <Button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '4' } })}>4</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '5' } })}>5</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '6' } })}>6</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '-' } })} className="operation">-</Button>

      {/* Row 4: 1, 2, 3, + */}
      <Button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '1' } })}>1</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '2' } })}>2</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '3' } })}>3</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '+' } })} className="operation">+</Button>

      {/* Row 5: 0, ., = (with = spanning two columns) */}
      <Button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '0' } })} className="span-two">0</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '.' } })}>.</Button>
      <Button onClick={() => dispatch({ type: ACTIONS.EVALUATE })} className="equals">=</Button>
    </div>
  );
};

export default Keypad;
