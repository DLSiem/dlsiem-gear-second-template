// ./src/components/Counter.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { increment, decrement } from "./counterSlice";

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <h1 className="text-3xl font-bold">Counter: {count}</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
