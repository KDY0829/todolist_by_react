import TodoEditor from "../components/TodoEditor";
import TodoList from "../components/TodoList";
import { nextOccurrence } from "../utils/repeat";

export default function TodoPage({ todos, setTodos }) {
  // 추가
  const addTodo = (payload) => {
    const now = Date.now();

    const newTodo = {
      id: crypto.randomUUID(),
      text: payload.text,
      priority: payload.priority,
      dueAt: payload.dueAt,
      repeat: payload.repeat,
      done: false,
      createdAt: now,
      updatedAt: now,
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  // 수정
  const updateTodo = (id, patch) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...patch, updatedAt: Date.now() } : t
      )
    );
  };

  // 삭제
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // 완료
  const toggleDone = (id) => {
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;

        if (t.repeat.type !== "none") {
          const next = nextOccurrence(t);
          return { ...t, dueAt: next, updatedAt: Date.now() };
        }
        return { ...t, done: !t.done, updatedAt: Date.now() };
      })
    );
  };

  return (
    <>
      <TodoEditor onSubmit={addTodo} />
      <TodoList
        todos={todos}
        onUpdate={updateTodo}
        onRemove={removeTodo}
        onToggle={toggleDone}
      />
    </>
  );
}
