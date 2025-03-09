export default function ButtonsControls({onAddTaskButton, onClearAllTasks}) {
    return (
        <div className="flex justify-between mb-6">
        <button
            onClick={onAddTaskButton}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
            Add Task
        </button>
        <button
            onClick={onClearAllTasks}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
            Clear All Tasks
        </button>
    </div>
    )
}