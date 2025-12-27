import "./ArrayBars.css";

export default function ArrayBars({ array, activeIndex }) {
  return (
    <div className="bars-container">
      {array.map((value, index) => (
        <div className="bar-wrapper" key={index}>
          <div
            className={`bar ${
              index === activeIndex ? "active" : ""
            }`}
            style={{ height: `${value * 2}px` }}
          >
            <span className="value">{value}</span>
          </div>
          <span className="index">{index}</span>
        </div>
      ))}
    </div>
  );
}
