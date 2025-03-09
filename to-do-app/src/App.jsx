import { useEffect, useState } from 'react'
import './App.css'

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
    if (!isOpen) return null;
  
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
        onClick={onClose} // Close when clicking outside
      >
        {/* Modal Box */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-96 border border-white/40"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <h2 className="text-xl font-bold mb-4 text-gray-900 text-center">Add New Task</h2>
  
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
  
  

function App() {
    const [toDo, setToDo] = useState(() => {
        const localStorageData = localStorage.getItem('toDoAppTasks');
        return localStorageData ? JSON.parse(localStorageData) : [];
    });
    const [addTask, setAddTask] = useState(false)

    useEffect(() => {
        localStorage.setItem('toDoAppTasks', JSON.stringify(toDo));
    }, [toDo]);



    const onAddTask = (formData) => {
        const taskData = Object.fromEntries(formData);
        const id = Date.now()
        const dataToPush = {id, ...taskData, status: "pending"}
        
        setToDo(current => [...current, dataToPush]);
        onCloseTaskButton();
    }

    const onClearAllTasks = () => {
        setToDo([]);
        localStorage.removeItem('toDoAppTasks'); 
    }

    const onAddTaskButton = () => {
        setAddTask(prev => !prev)
        
    }

    
    const onCloseTaskButton = () => {
        setAddTask(false)
        
    }

    const onDeleteButton  = (id) => {
        setToDo(prev => prev.filter(task => task.id !== id))

    }

    const onDoneButton = (id) => {

        setToDo(prev => 
            prev.map(task =>
                task.id === id ? {...task , status: "Done"} : task
            )
        )
    }


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
          {/* Header */}
          <header className="bg-blue-600 text-white py-4 text-center text-2xl font-bold">
            To-Do App
          </header>
      
          {/* Main Content */}
          <main className="max-w-5xl mx-auto mt-6 p-4">
            {/* Buttons */}
            <div className="flex justify-between mb-6">
              <button
                onClick={() => setAddTask(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Add Task
              </button>
              <button
                onClick={() => setToDo([])}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Clear All Tasks
              </button>
            </div>
      
            {/* Task List */}
            <section className="bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-5 font-bold border-b pb-2 text-sm sm:text-base hidden sm:grid">
                <p>Task</p>
                <p>Priority</p>
                <p>Due Date</p>
                <p>Status</p>
                <p>Controls</p>
              </div>
      
              {toDo.length > 0 ? (
                toDo.map((task) => (
                  <div
                    key={task.id}
                    className="grid grid-cols-1 sm:grid-cols-5 py-2 border-b text-sm sm:text-base"
                  >
                    <p>{task.task}</p>
                    <p
                      className={`font-bold ${
                        task.priority === "high"
                          ? "text-red-500"
                          : task.priority === "medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {task.priority}
                    </p>
                    <p>{task.date}</p>
                    <p
                      className={`${
                        task.status === "Done" ? "text-green-500 font-bold" : "text-gray-600"
                      }`}
                    >
                      {task.status}
                    </p>
      
                    <div className="flex flex-col sm:flex-row sm:space-x-2 justify-center mt-2 sm:mt-0">
                      {task.status !== "Done" && (
                        <button
                          onClick={() => onDoneButton(task.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs sm:text-sm mb-2 sm:mb-0"
                        >
                          Done
                        </button>
                      )}
                      <button
                        onClick={() => onEditButton(task.id)} // Edit button with onclick functionality
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-sm mb-2 sm:mb-0"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteButton(task.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-4">No tasks available.</p>
              )}
            </section>
          </main>
      
          {/* Add Task Modal */}
          <AddTaskModal
            isOpen={addTask}
            onClose={() => setAddTask(false)}
            onAddTask={onAddTask}
          />
      
          {/* Footer */}
          <footer className="fixed bottom-0 w-full bg-gray-200 text-center py-4 text-gray-600">
  <div className="flex justify-center space-x-4">
    <a
      href="https://github.com/bozhidarzlatev"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-black"
    >
      <i className="fab fa-github text-xl"></i>
    </a>
    <a
      href="https://www.linkedin.com/in/bozhidarzlatev"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-blue-600"
    >
      <i className="fab fa-linkedin text-xl"></i>
    </a>
  </div>
  <p className="mt-2">
    © 2025 To-Do App. Designed and developed by Bozhidar Zlatev.
  </p>
</footer>
        </div>
      );
      
      
      
}

export default App
