import { useEffect, useState, useRef } from "react"
import Column from "./Column.jsx"
import TaskForm from "./TaskForm.jsx"

const columns = [
    { title: "A fazer", status: "todo" },
    { title: "Em progresso", status: "doing" },
    { title: "Concluido", status: "done" },
]

export default function Board() {
    const [tasks, setTasks] = useState(() => {
        const stored = localStorage.getItem("trello-clone-tasks")
        return stored ? JSON.parse(stored) : []
    })

    const [activeCol, setActiveCol] = useState(0)
    const startX = useRef(0)

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

    function onTouchStart(e) {
        startX.current = e.touches[0].clientX
    }

    function onTouchEnd(e) {
        const endX = e.changedTouches[0].clientX
        const diff = startX.current - endX

        if (diff > 60 && activeCol < columns.length - 1) {
            setActiveCol(activeCol + 1)
        }

        if (diff < -60 && activeCol > 0) {
            setActiveCol(activeCol - 1)
        }
    }

    return (
        <>
            <TaskForm onAddTask={addTask} />

            <div
                className="board"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="columns"
                    style={{ transform: `translateX(-${activeCol * 100}%) ` }}
                >
                    {columns.map((col) => (
                        <Column
                            key={col.status}
                            title={col.title}
                            status={col.status}
                            tasks={tasks}
                            onChangeStatus={changeTaskStatus}
                            onRemove={removeTask}
                        />
                    ))}
                </div>
                <div className="dots">
                    {columns.map((_, i) => (
                        <span
                            key={i}
                            className={i === activeCol ? "dot active" : "dot"}
                        ></span>
                    ))}
                </div>
            </div>
        </>
    )
}
