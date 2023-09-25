export default function Item({ item, index, onRemove }) {
    let color = "#000";
    if (item.priority === "high") {
        color = "#f00";
    } else if (item.priority === "med") {
        color = "#FF6347";
    }
    return <div
        key={`item_${index}`}
        style={{
            color,
        }}
    >
        <span>{index + 1}:</span>
        <span>
            {item.priority === "high" && <span>!</span>}
            {item.text} ({item.priority})
        </span>
        <button onClick={() => {
            onRemove();
        }}>Remove</button>
    </div>
}