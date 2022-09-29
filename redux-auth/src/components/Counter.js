import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';

import { INCREAMENT, INCREASE, DECREMENT } from '../store/index';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch({
      type: INCREAMENT,
    });
  };

  const increaseHandler = () => {
    dispatch({
      type: INCREASE,
      amount: 10,
    });
  };

  const decrementHandler = () => {
    dispatch({
      type: DECREMENT,
    });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>증가</button>
        <button onClick={increaseHandler}>10씩 증가</button>
        <button onClick={decrementHandler}>감소</button>
      </div>
    </main>
  );
};

export default Counter;
