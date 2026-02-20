import { useState } from "react"

export default function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("todo")

    function handleSubmit(e) {
        e.preventDefault()

        if (!title.trim()) return

        onAddTask({
            id: Date.now(),
            title,
            status,
        })
        setTitle("")
        setStatus("todo")
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="task-form"
        >
            <input
                type="text"
                placeholder="Nova tarefa..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="todo">A fazer</option>
                <option value="doing">Em progresso</option>
                <option value="done">Concluido</option>
            </select>
            <button type="submit">Adicionar</button>
        </form>
    )
}
