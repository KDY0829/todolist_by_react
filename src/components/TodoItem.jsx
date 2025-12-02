function format(ts) {
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())} ${p(
    d.getHours()
  )}:${p(d.getMinutes())}`;
}

const PRIO = {
  high: "prio-high",
  medium: "prio-medium",
  low: "prio-low",
};

export default function TodoItem({ todo, onEdit, onRemove, onToggle }) {
  return (
    <div className={`item ${PRIO[todo.priority]} ${todo.done ? "done" : ""}`}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input type="checkbox" checked={todo.done} onChange={onToggle} />

        <div>
          <div className="text" style={{ fontSize: 16 }}>
            {todo.text}
          </div>
          <div style={{ fontSize: 13, opacity: 0.7 }}>
            {todo.priority.toUpperCase()} • {format(todo.dueAt)}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn" onClick={onEdit}>
          수정
        </button>
        <button className="btn danger" onClick={onRemove}>
          삭제
        </button>
      </div>
    </div>
  );
}
