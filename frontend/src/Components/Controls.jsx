export default function Controls({
  onGenerate,
  onStart,
  onPause,
  onResume,
  isPaused
}) {
  return (
    <div className="controls">
      <button onClick={onGenerate}>Generate</button>
      <button onClick={onStart}>Start</button>
      {!isPaused ? (
        <button onClick={onPause}>Pause</button>
      ) : (
        <button onClick={onResume}>Resume</button>
      )}
    </div>
  );
}
