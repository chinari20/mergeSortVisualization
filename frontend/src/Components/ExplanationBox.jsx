export default function ExplanationBox({ message }) {
  return (
    <div className="explanation-box">
      {message || "Click Start to visualize Merge Sort"}
    </div>
  );
}
