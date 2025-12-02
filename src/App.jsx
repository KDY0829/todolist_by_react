import { useEffect, useState } from "react";
import TodoPage from "./pages/TodoPage";
import { loadTodos, saveTodos } from "./utils/storage";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css";

export default function App() {
  const [todos, setTodos] = useState(() => loadTodos());

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <div className="container">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h1 className="title">📝 Todo List</h1>
        <div className="theme-toggle">
          <ThemeToggle />
        </div>{" "}
      </div>

      <TodoPage todos={todos} setTodos={setTodos} />
    </div>
  );
}
