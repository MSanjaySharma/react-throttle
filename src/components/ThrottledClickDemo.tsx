import { useState, useCallback, useMemo } from "react";

// utils
import { throttle } from "../utils/throttle";

// consts
const delay: number = Number(import.meta.env.VITE_THROTTLE_INVTERVAL);

function ThrottledClickDemo() {
  const [clickCountUnthrottled, setClickCountUnthrottled] = useState(0);
  const [clickCountThrottled, setClickCountThrottled] = useState(0);

  const handleClickUnthrottled = () => {
    setClickCountUnthrottled((prevCount) => prevCount + 1);
  };

  const handleClickThrottled = useCallback(() => {
    setClickCountThrottled((prevCount) => prevCount + 1);
  }, []);

  const throttledClickHandler = useMemo(
    () => throttle(handleClickThrottled, delay),
    [handleClickThrottled]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "50%" }}>
        <h2>Unthrottled Button</h2>
        <p>Click Count: {clickCountUnthrottled}</p>
        <button onClick={handleClickUnthrottled}>Click Me (Unthrottled)</button>
      </div>
      <div style={{ width: "50%" }}>
        <h2>Throttled Button (1 click every 4 seconds)</h2>
        <p>Click Count: {clickCountThrottled}</p>
        <button onClick={throttledClickHandler}>Click Me (Throttled)</button>
      </div>
    </div>
  );
}

export default ThrottledClickDemo;
