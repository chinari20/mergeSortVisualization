import "./ArrayBars.css";

export default function ArrayBars({ array, activeIndex, divideIndex }) {
  if (!array.length) return null;

  const maxValue = Math.max(...array);
  const MAX_BAR_HEIGHT = 240; // ⬅ reduced so bars never overflow

  return (
    <div className="array-container">
      {array.map((value, index) => {
        const height = (value / maxValue) * MAX_BAR_HEIGHT;

        return (
          <div className="bar-wrapper" key={index}>
            <div
              className={`array-bar ${
                index === activeIndex ? "active" : ""
              }`}
              style={{ height }}
            >
              {/* ✅ NUMBER INSIDE BAR */}
              <span className="bar-value">{value}</span>
            </div>

            {/* index */}
            <span className="bar-index">{index}</span>

            {/* divide line */}
            {divideIndex === index && <div className="divide-line" />}
          </div>
        );
      })}
    </div>
  );
}
