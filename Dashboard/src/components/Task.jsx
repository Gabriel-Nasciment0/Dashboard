export default function Task({ task, onChangeStatus, onRemove }) {
    function handleChange(e) {
        onChangeStatus(task.id, e.target.value)
    }

    function handleRemove() {
        onRemove(task.id)
    }

    return (
        <div className={`task ${task.status}`}>
            <p>{task.title}</p>

            <select
                value={task.status}
                onChange={handleChange}
            >
                <option value="todo">A fazer</option>
                <option value="doing">Em progresso</option>
                <option value="done">Concluído</option>
            </select>
            <button onClick={handleRemove}>Remove</button>
        </div>
    )
}
