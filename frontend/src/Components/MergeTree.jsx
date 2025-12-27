export default function MergeTree({ tree, activeRange }) {
  if (!tree) return null;

  const isActive =
    activeRange &&
    tree.range[0] === activeRange[0] &&
    tree.range[1] === activeRange[1];

  return (
    <div className={`tree-node ${isActive ? "active-node" : ""}`}>
      <div className="node-box">
        [{tree.range[0]} – {tree.range[1]}]
      </div>

      <div className="children">
        {tree.left && <MergeTree tree={tree.left} activeRange={activeRange} />}
        {tree.right && (
          <MergeTree tree={tree.right} activeRange={activeRange} />
        )}
      </div>
    </div>
  );
}
