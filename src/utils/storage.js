const TODO = "todos";

export function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(TODO) || "[]");
  } catch {
    return [];
  }
}

export function saveTodos(todos) {
  localStorage.setItem(TODO, JSON.stringify(todos));
}
