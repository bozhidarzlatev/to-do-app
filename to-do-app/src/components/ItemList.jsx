export default function ItemList({toDo, onDoneButton, onEditButton, onDeleteButton}){
    return (
        toDo.map((task) => (
            <div
                key={task.id}
                className={`grid grid-cols-1 sm:grid-cols-5 py-2 px-2 border-b text-sm sm:text-base ${
                    task.status === "Done"
                        ? "bg-green-100"
                        : task.status === "Overdue"
                            ? "bg-red-200"
                            : task.status === "For Today"
                                ? "bg-yellow-200"
                                : task.status === "Refused"
                                    ? "bg-gray-100"
                                    : ""
                }`}
            >
                <p>{task.task}</p>
                <p
                    className={`font-bold ${
                        task.priority === "High"
                            ? "text-red-500"
                            : task.priority === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                    }`}
                >
                    {task.priority}
                </p>
                <p>{task.date}</p>
                <p
                    className={`${
                        task.status === "Done"
                            ? "text-green-500 font-bold"
                            : task.status === "Overdue"
                                ? "text-red-500 font-bold"
                                : task.status === "Refused"
                                ?   "text-gray-400 font-bold"
                                : "text-gray-600"
                    }`}
                >
                    {task.status}
                </p>

                <div className="flex flex-col sm:flex-row sm:space-x-2 justify-end mt-2 sm:mt-0">
                    {task.status !== "Done"  && task.status !== "Refused" && (
                        <>
                            <button
                                onClick={() => onDoneButton(task.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs sm:text-sm mb-2 sm:mb-0"
                            >
                                Done
                            </button>
                            <button
                                onClick={() => onEditButton(task.id)}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-sm mb-2 sm:mb-0"
                            >
                                Edit
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => onDeleteButton(task.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-xs sm:text-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))
    )
}