import { useState, useRef } from "react";
import ArrayBars from "../../Components/ArrayBars";
import DivideTree from "../../Components/DivideTree";
import Controls from "../../Components/Controls";
import ExplanationBox from "../../Components/ExplanationBox";
import "./MergeSort.css";

export default function MergeSort() {
  const [array, setArray] = useState([]);
  const [activeRange, setActiveRange] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [divideIndex, setDivideIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const stepsRef = useRef([]);
  const stepIndexRef = useRef(0);
  const timeoutRef = useRef(null);

  /* Generate array */
  const generateArray = () => {
    const arr = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 90) + 10
    );
    setArray(arr);
    reset();
    setMessage("Click Start to see how Merge Sort works");
  };

  const reset = () => {
    setActiveRange(null);
    setActiveIndex(null);
    setDivideIndex(null);
    setIsPaused(false);
    stepIndexRef.current = 0;
    clearTimeout(timeoutRef.current);
  };

  /* Start visualization */
  const start = () => {
    if (!array.length) return;
    stepsRef.current = [];
    stepIndexRef.current = 0;
    generateSteps(0, array.length - 1);
    run();
  };

  /* Generate teaching steps */
  const generateSteps = (l, r) => {
    if (l === r) {
      stepsRef.current.push({
        action: "base",
        range: `${l}-${r}`,
        message: "Only one element → already sorted",
      });
      return;
    }

    const mid = Math.floor((l + r) / 2);

    stepsRef.current.push({
      action: "divide",
      range: `${l}-${r}`,
      mid,
      message: "We divide the array into two halves",
    });

    generateSteps(l, mid);
    generateSteps(mid + 1, r);

    stepsRef.current.push({
      action: "merge",
      range: `${l}-${r}`,
      message: "We merge the two sorted parts",
    });
  };

  /* Run steps slowly */
  const run = () => {
    if (isPaused || stepIndexRef.current >= stepsRef.current.length) return;

    const step = stepsRef.current[stepIndexRef.current];

    timeoutRef.current = setTimeout(() => {
      setActiveRange(step.range);
      setMessage(step.message);

      if (step.action === "divide") {
        setDivideIndex(step.mid);
        setActiveIndex(null);
      }

      if (step.action === "merge") {
        setDivideIndex(null);
        setArray((prev) => [...prev].sort((a, b) => a - b));
      }

      stepIndexRef.current++;
      run();
    }, 1500);
  };

  const pause = () => {
    setIsPaused(true);
    clearTimeout(timeoutRef.current);
    setMessage("Paused ⏸");
  };

  const resume = () => {
    setIsPaused(false);
    setMessage("Resumed ▶");
    run();
  };

  return (
    <div className="merge-page">
      <h1>Merge Sort – Learn Visually</h1>

      {/* Controls */}
      <div className="controls controls-dynamic">
        <button onClick={generateArray}>Generate</button>
        <button onClick={start}>Start</button>
        <button onClick={isPaused ? resume : pause}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="content-wrapper">
        {/* LEFT – DIVIDE TREE */}
        <div className="panel left-panel">
          <div className="phase-title">Divide Phase</div>
          <DivideTree activeRange={activeRange} />
        </div>

        {/* RIGHT – BAR GRAPH */}
        <div className="panel right-panel">
          <div className="phase-title">Merge Phase</div>
          <ArrayBars
            array={array}
            activeIndex={activeIndex}
            divideIndex={divideIndex}
          />
        </div>
      </div>

      {/* MESSAGE BOX */}
      <div className="message-box">
        {message || "Click Start to see Merge Sort step-by-step"}
      </div>
    </div>
  );
}
