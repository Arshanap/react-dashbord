import { useState, useEffect } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), title }]);
    setTitle("");
  };

  const updateTask = (id, newTitle) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="container py-3 tasks-container">
      <style>{`
        @media (max-width: 786px) {
          .tasks-container {
            padding: 10px;
          }
          .tasks-container input[type="text"],
          .tasks-container .form-control {
            font-size: 14px;
            padding: 6px;
          }
          .tasks-container .btn {
            font-size: 14px;
            padding: 6px 8px;
          }
          /* Make task items stack vertically */
          .tasks-container .list-group-item {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 6px;
          }
          .tasks-container .btn-group {
            width: 100%;
            display: flex;
            gap: 6px;
          }
          .tasks-container .btn-group .btn {
            flex: 1; /* Make buttons equal width */
          }
        }
      `}</style>

      <div className="d-flex gap-2 mb-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add task"
          className="form-control"
        />
        <button onClick={addTask} className="btn btn-primary">
          Add
        </button>
      </div>

      <ul className="list-group">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editingId === t.id ? (
              <input
                defaultValue={t.title}
                onBlur={(e) => {
                  updateTask(t.id, e.target.value);
                  setEditingId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTask(t.id, e.target.value);
                    setEditingId(null);
                  }
                }}
                autoFocus
                className="form-control"
              />
            ) : (
              <span>{t.title}</span>
            )}
            <div className="btn-group">
              <button
                onClick={() => setEditingId(t.id)}
                className="btn btn-sm btn-outline-primary"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(t.id)}
                className="btn btn-sm btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;