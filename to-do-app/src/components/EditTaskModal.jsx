const priority = [{l: 'normal' , h: 'Normal'}, {l: 'medium', h: 'Medium'}, {l:'high', h: 'High'}]
const status = [{l: 'pending' , h: 'Pending'}, {l: 'onhold', h: 'On Hold'},{l:'working', h: 'Working On'}, {l:'postpone', h: 'Postpone'}, {l:'done', h: 'Done'}]

export default function EditTaskModal({ title, isEdit, editData, onClose, onEditTask }) {
    if (!isEdit) return null;

    return (

        <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-10"
        onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-96 border border-white/40"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4 text-gray-900 text-center">{title} Task</h2>

                <form action={onEditTask}>
                    <div className="mb-4">
                        <label htmlFor="task" className="block font-medium text-gray-900">Id</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            className="w-full p-2 border border-gray-300 bg-white rounded focus:ring focus:ring-blue-300"
                            defaultValue={editData?.id || ''} 
                            readOnly
                            />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="task" className="block font-medium text-gray-900">Task</label>
                        <input
                            type="text"
                            id="task"
                            name="task"
                            className="w-full p-2 border border-gray-300 bg-white rounded focus:ring focus:ring-blue-300"
                            placeholder="Enter task"
                            defaultValue={editData?.task || ''} 
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
                            {priority.map(key => key.h === editData?.priority 
                            ? <option value={key.l} selected>{key.h}</option>
                            : <option value={key.l}>{key.h}</option>

                            )}
                        </select>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="date" className="block font-medium text-gray-900">Due Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="w-full p-2 border border-gray-300 bg-white rounded focus:ring focus:ring-blue-300"
                            defaultValue={editData?.date || ''} 
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="priority" className="block font-medium text-gray-900">Status</label>
                        <select
                            name="status"
                            id="status"
                            className="w-full p-2 border border-gray-300 bg-white rounded focus:ring focus:ring-blue-300"
                            >
 
                            {status.map(key => key.h === editData?.status 
                            ? <option value={key.l} selected>{key.h}</option>
                            : <option value={key.l}>{key.h}</option>

                            )}
                        </select>
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