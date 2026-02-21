import Card from "./Card.jsx"

export default function Task({ task, onChangeStatus, onRemove, onDragStart }) {
    function handleChange(e) {
        onChangeStatus(task.id, e.target.value)
    }

    function handleRemove() {
        onRemove(task.id)
    }

    return (
        <Card
            status={task.status}
            draggable
            onDragStart={() => onDragStart(task.id)}
        >
            <p>{task.title}</p>

            <select
                value={task.status}
                onChange={handleChange}
            >
                <option value="todo">A fazer</option>
                <option value="doing">Em progresso</option>
                <option value="done">Concluido</option>
            </select>

            <button onClick={handleRemove}>Remove</button>
        </Card>
    )
}
