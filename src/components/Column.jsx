import Task from "./Task.jsx"
export default function Column({
    title,
    status,
    tasks,
    onChangeStatus,
    onRemove,
    onDragStart,
    draggedTaskId,
}) {
    const filteredTasks = tasks.filter((task) => task.status === status)
    return (
        <div
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onChangeStatus(draggedTaskId, status)}
        >
            <h2>{title}</h2>

            {filteredTasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onChangeStatus={onChangeStatus}
                    onRemove={onRemove}
                    onDragStart={onDragStart}
                />
            ))}
        </div>
    )
}
