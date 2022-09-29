import { createStore } from 'redux';

export const INCREAMENT = 'increment';
export const INCREASE = 'increase';
export const DECREMENT = 'decrement';

const initialCounter = {
  counter: 0,
};

const counterReducer = (state = initialCounter, action) => {
  if (action.type === INCREAMENT) {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === INCREASE) {
    return {
      counter: state.counter + action.amount,
    };
  }

  if (action.type === DECREMENT) {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
