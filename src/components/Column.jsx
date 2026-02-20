import Task from "./Task.jsx"
export default function Column({
    title,
    status,
    tasks,
    onChangeStatus,
    onRemove,
}) {
    const filteredTasks = tasks.filter((task) => task.status === status)
    return (
        <div className="column">
            <h2>{title}</h2>

            {filteredTasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onChangeStatus={onChangeStatus}
                    onRemove={onRemove}
                />
            ))}
        </div>
    )
}
