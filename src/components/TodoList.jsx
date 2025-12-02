import { useMemo, useState } from "react";
import TodoItem from "./TodoItem";
import TodoEditor from "./TodoEditor";

export default function TodoList({ todos, onUpdate, onRemove, onToggle }) {
  const [editingId, setEditingId] = useState(null);

  const sorted = useMemo(() => {
    return [...todos].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return a.dueAt - b.dueAt;
    });
  }, [todos]);

  return (
    <div className="list">
      {sorted.map((t) =>
        editingId === t.id ? (
          <div key={t.id} className="item">
            <TodoEditor
              initial={t}
              onSubmit={(patch) => {
                onUpdate(t.id, patch);
                setEditingId(null);
              }}
            />
            <button className="btn" onClick={() => setEditingId(null)}>
              취소
            </button>
          </div>
        ) : (
          <TodoItem
            key={t.id}
            todo={t}
            onEdit={() => setEditingId(t.id)}
            onRemove={() => onRemove(t.id)}
            onToggle={() => onToggle(t.id)}
          />
        )
      )}
    </div>
  );
}
