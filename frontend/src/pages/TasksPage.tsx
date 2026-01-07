import { useEffect, useMemo, useState } from "react";

type Status = "todo" | "done";

type Task = {
  id: string;
  title: string;
  category: string;
  dueDate: string; // YYYY-MM-DD
  status: Status;
  createdAt: string;
};

const STORAGE_KEY = "tasks_crud_v1";

export default function TasksPage() {
  // ======= STATE =======
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // filtros
  const [filterStatus, setFilterStatus] = useState<"all" | Status>("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDate, setFilterDate] = useState(""); // YYYY-MM-DD

  // ======= LOAD/SAVE LOCAL STORAGE =======
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ======= HELPERS =======
  function resetForm() {
    setTitle("");
    setCategory("");
    setDueDate("");
    setEditingTaskId(null);
  }

  function createTask() {
    if (!title.trim()) return alert("Digite o título da tarefa!");

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      category: category.trim() || "Geral",
      dueDate: dueDate || "",
      status: "todo",
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    resetForm();
  }

  function startEdit(task: Task) {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setCategory(task.category);
    setDueDate(task.dueDate);
  }

  function updateTask() {
    if (!editingTaskId) return;
    if (!title.trim()) return alert("Digite o título da tarefa!");

    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTaskId
          ? {
              ...t,
              title: title.trim(),
              category: category.trim() || "Geral",
              dueDate: dueDate || "",
            }
          : t
      )
    );

    resetForm();
  }

  function deleteTask(id: string) {
    const ok = confirm("Tem certeza que deseja deletar essa tarefa?");
    if (!ok) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleDone(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "todo" : "done" }
          : t
      )
    );
  }

  // categorias disponíveis para filtro (derivadas das tarefas)
  const categories = useMemo(() => {
    const cats = new Set<string>();
    tasks.forEach((t) => cats.add(t.category));
    return ["all", ...Array.from(cats)];
  }, [tasks]);

  // tarefas filtradas
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const statusOk =
        filterStatus === "all" ? true : t.status === filterStatus;
      const categoryOk =
        filterCategory === "all" ? true : t.category === filterCategory;
      const dateOk = filterDate ? t.dueDate === filterDate : true;

      return statusOk && categoryOk && dateOk;
    });
  }, [tasks, filterStatus, filterCategory, filterDate]);

  // ======= UI =======
  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>✅ Tarefas</h1>

      {/* FORM */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 16,
          marginTop: 16,
        }}
      >
        <h3 style={{ marginTop: 0 }}>
          {editingTaskId ? "✏️ Editar tarefa" : "➕ Criar nova tarefa"}
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 12,
          }}
        >
          <input
            placeholder="Título da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Categoria (ex: estudos)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          {editingTaskId ? (
            <>
              <button onClick={updateTask} style={primaryButton}>
                Salvar
              </button>
              <button onClick={resetForm} style={secondaryButton}>
                Cancelar
              </button>
            </>
          ) : (
            <button onClick={createTask} style={primaryButton}>
              Criar
            </button>
          )}
        </div>
      </div>

      {/* FILTERS */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 16,
          marginTop: 16,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <strong>🔎 Filtros:</strong>

        {/* status */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          style={inputStyle}
        >
          <option value="all">Todos</option>
          <option value="todo">Pendentes</option>
          <option value="done">Finalizadas</option>
        </select>

        {/* categoria */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={inputStyle}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "Todas categorias" : c}
            </option>
          ))}
        </select>

        {/* data */}
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={() => {
            setFilterStatus("all");
            setFilterCategory("all");
            setFilterDate("");
          }}
          style={secondaryButton}
        >
          Limpar filtros
        </button>
      </div>

      {/* LIST */}
      <div style={{ marginTop: 16 }}>
        <h3>📋 Lista de tarefas ({filteredTasks.length})</h3>

        {filteredTasks.length === 0 ? (
          <div style={{ color: "#777" }}>Nenhuma tarefa encontrada.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  background: task.status === "done" ? "#4b945dff" : "#802f2fff",
                }}
              >
                {/* LEFT */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <input
                      type="checkbox"
                      checked={task.status === "done"}
                      onChange={() => toggleDone(task.id)}
                      title="Marcar como done"
                    />
                    <strong
                      style={{
                        textDecoration:
                          task.status === "done" ? "line-through" : "none",
                      }}
                    >
                      {task.title}
                    </strong>
                  </div>

                  <div style={{ marginTop: 6, fontSize: 13, color: "#666" }}>
                    <span style={{ marginRight: 12 }}>
                      🏷️ <strong>{task.category}</strong>
                    </span>
                    {task.dueDate && (
                      <span style={{ marginRight: 12 }}>
                        📅 <strong>{task.dueDate}</strong>
                      </span>
                    )}
                    <span>
                      {task.status === "done" ? "✅ done" : "🕓 todo"}
                    </span>
                  </div>
                </div>

                {/* RIGHT ACTIONS */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => startEdit(task)}
                    style={secondaryButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={dangerButton}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ======= STYLES (simples) =======
const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ccc",
  fontSize: 14,
};

const primaryButton: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #000",
  cursor: "pointer",
  background: "#000",
  color: "#fff",
};

const secondaryButton: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #ccc",
  cursor: "pointer",
  background: "#c01414ff",
};

const dangerButton: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #ff6b6b",
  cursor: "pointer",
  background: "#fff",
  color: "#ff6b6b",
};
