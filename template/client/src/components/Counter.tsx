// ./src/components/Counter.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { increment, decrement } from "../features/counterSlice";

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Counter: {count}</h1>
      <div className="space-x-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
