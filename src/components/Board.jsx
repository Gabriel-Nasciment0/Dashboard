import { useEffect, useState } from "react"
import Column from "./Column.jsx"
import TaskForm from "./TaskForm.jsx"

export default function Board() {
    const [tasks, setTasks] = useState(() => {
        const stored = localStorage.getItem("trello-clone-tasks")
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        if (tasks.length === 0) return

        localStorage.setItem("trello-clone-tasks", JSON.stringify(tasks))
    }, [tasks])

    function addTask(newTask) {
        setTasks((prev) => [...prev, newTask])
    }

    function changeTaskStatus(id, newStatus) {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task,
            ),
        )
    }

    function removeTask(id) {
        setTasks((current) => current.filter((tasks) => tasks.id !== id))
    }

    return (
        <>
            <TaskForm onAddTask={addTask} />

            <div className="board">
                <Column
                    title="A fazer"
                    status="todo"
                    tasks={tasks}
                    onChangeStatus={changeTaskStatus}
                    onRemove={removeTask}
                />
                <Column
                    title="Em progresso"
                    status="doing"
                    tasks={tasks}
                    onChangeStatus={changeTaskStatus}
                    onRemove={removeTask}
                />
                <Column
                    title="Concluido"
                    status="done"
                    tasks={tasks}
                    onChangeStatus={changeTaskStatus}
                    onRemove={removeTask}
                />
            </div>
        </>
    )
}
