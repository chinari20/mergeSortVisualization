export default function Controls({ onGenerate, onStart }) {
  return (
    <div className="controls">
      <button onClick={onGenerate}>Generate Array</button>
      <button onClick={onStart}>Start Merge Sort</button>
    </div>
  );
}
