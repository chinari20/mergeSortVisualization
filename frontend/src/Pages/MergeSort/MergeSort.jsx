import { useState } from "react";
import { getMergeSortSteps } from "../../utils/http";
import ArrayBars from "../../Components/ArrayBars";
import Controls from "../../Components/Controls";
import ExplanationBox from "../../Components/ExplanationBox";
import "./MergeSort.css";

export default function MergeSort() {
  const [array, setArray] = useState([]);
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [divideIndex, setDivideIndex] = useState(null);

  /* Generate random array */
  const generateArray = () => {
    const arr = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 20) + 5
    );
    setArray(arr);
    setActiveIndex(null);
    setDivideIndex(null);
    setMessage("New array generated");
  };

  /* Start merge sort */
  const startMergeSort = async () => {
    if (!array.length) return;

    const { steps } = await getMergeSortSteps(array);
    animateSteps(steps);
  };

  /* Animate steps */
  const animateSteps = (steps) => {
    const TOTAL_TIME = 30000; // ⏱ 30 seconds total
    const stepDelay = Math.max(TOTAL_TIME / steps.length, 800);

    steps.forEach((step, i) => {
      setTimeout(() => {
        setMessage(step.message);

        /* 🔴 DIVIDE STEP */
        if (step.action === "divide") {
          setDivideIndex(step.mid);
          setActiveIndex(null);
        }

        /* 🟢 MERGE STEP */
        if (step.action === "merge") {
          setDivideIndex(null);
          setArray((prev) => {
            const copy = [...prev];
            copy[step.index] = step.value;
            return copy;
          });
          setActiveIndex(step.index);
        }

        /* ✅ COMPLETED */
        if (i === steps.length - 1) {
          setTimeout(() => {
            setActiveIndex(null);
            setDivideIndex(null);
            setMessage("Merge Sort Completed ✅");
          }, stepDelay);
        }
      }, i * stepDelay);
    });
  };

  return (
    <div className="merge-sort-page">
      <h1>Merge Sort Visualizer</h1>

      <div className="controls-wrapper">
        <Controls
          onGenerate={generateArray}
          onStart={startMergeSort}
        />
      </div>

      <div className="visualization-wrapper">
        <ArrayBars
          array={array}
          activeIndex={activeIndex}
          divideIndex={divideIndex}
        />
      </div>

      <ExplanationBox message={message} />
    </div>
  );
}
