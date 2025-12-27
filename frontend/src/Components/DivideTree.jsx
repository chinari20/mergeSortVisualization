import "./DivideTree.css";

export default function DivideTree({ activeRange }) {
  // Fixed structure for 8 elements (0–7)
  const levels = [
  ["0-4"],
  ["0-2", "3-4"],
  ["0-1", "2-2", "3-3", "4-4"],
  ["0-0", "1-1", "2-2", "3-3", "4-4"]
];


  return (
    <div className="tree">
      {levels.map((level, levelIndex) => (
        <div key={levelIndex}>
          {/* RANGE BOXES */}
          <div className="tree-row">
            {level.map((range) => (
              <div
                key={range}
                className={`tree-box ${
                  activeRange === range ? "active" : ""
                }`}
              >
                [{range}]
              </div>
            ))}
          </div>

          {/* ARROWS */}
          {levelIndex !== levels.length - 1 && (
            <div className="arrow-row">
              {level.map((_, i) => (
                <span key={i} className="arrow">↓</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
