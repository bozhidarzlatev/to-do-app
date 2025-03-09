export default function AddTaskModal({ title, isOpen, onClose, onAddTask }) {
    if (!isOpen) return null;

    return (

        <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
        onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-96 border border-white/40"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4 text-gray-900 text-center">{title} Task</h2>

                <form action={onAddTask}>
                    <div className="mb-4">
                        <label htmlFor="task" className="block font-medium text-gray-900">Task</label>
                        <input
                            type="text"
                            id="task"
                            name="task"
                            className="w-full p-2 border border-gray-300 bg-white rounded focus:ring focus:ring-blue-300"
                            placeholder="Enter task"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="priority" className="block font-medium text-gray-900">Priority</label>
                        <select
                            name="priority"
                            id="priority"
                            className="w-full p-2 border border-gray-300 bg-white rounded focus:ring focus:ring-blue-300"
                        >
                            <option value="" disabled selected>
                                -Please select priority-
                            </option>
                            <option value="normal">Normal</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="date" className="block font-medium text-gray-900">Due Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="w-full p-2 border border-gray-300 bg-white rounded focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};