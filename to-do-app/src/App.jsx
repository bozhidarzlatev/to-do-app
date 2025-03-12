import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import AddTaskModal from './components/AddTaskModal';
import ButtonsControls from './components/ButtonsControls';
import EditTaskModal from './components/EditTaskModal';

const status = [
    { l: 'pending', h: 'Pending' },
    { l: 'onhold', h: 'On Hold' }, 
    { l: 'working', h: 'Working On' },
    { l: 'postpone', h: 'Postpone' },
    { l: 'done', h: 'Done' },
    { l: 'overdue', h: 'Overdue' }
]

const priority = [
    {l: 'normal' , h: 'Normal'}, 
    {l: 'medium', h: 'Medium'}, 
    {l:'high', h: 'High'}

]


function App() {
    const [toDo, setToDo] = useState(() => {
        const localStorageData = localStorage.getItem('toDoAppTasks');
        return localStorageData ? JSON.parse(localStorageData) : [];
    });

    const [addTask, setAddTask] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editData, setEditData] = useState('')
    const [date, setDate] = useState()

    useEffect(() => {
        setDate(new Date()); // Update current date
    }, []);

    useEffect(() => {
  
        localStorage.setItem('toDoAppTasks', JSON.stringify(toDo));
    }, [toDo]);

    useEffect(() => {
        setToDo(prev => 
            prev.map(item => 
                chechDate(item.date) ? { ...item, status: "Overdue" } : item
            )
        );
    }, [date]);


    const chechDate = (dateToVal) => {
        return new Date(dateToVal) < date
    }

    const onAddTask = (formData) => {
        
        const taskData = Object.fromEntries(formData);
        const stsAndPriority = getStatusAndPrioriy(taskData.priority)
        
        const id = Date.now()
        const isOverdue = chechDate(taskData.date) 
        console.log(new Date(taskData.date) < date);
        console.log(isOverdue);
        

        const dataToPush = { 
            id, 
            ...taskData, 
            status: isOverdue ? "Overdue" : stsAndPriority.updStatus,
            priority: stsAndPriority.updPriority}

        setToDo(current => [...current, dataToPush]);
        onCloseTaskButton();
    }


    const onClearAllTasks = () => {
        setToDo([]);
        localStorage.removeItem('toDoAppTasks');
    }

    const onAddTaskButton = () => {
        setAddTask(true)

    }


    const onCloseTaskButton = () => {
        setAddTask(false)
        setEditMode(false)

    }

    const onDeleteButton = (id) => {
        setToDo(prev => prev.filter(task => task.id !== id))

    }

    const onDoneButton = (id) => {
        setToDo(prev =>
            prev.map(task =>
                task.id === id ? { ...task, status: "Done" } : task
            )
        )
    }

    const onEditButton = (id) => {
        const task = toDo.filter(item => item.id === id)[0];

        setEditData(prev => prev = task)
        setEditMode(true)
        setAddTask(true)

    }

    const getStatusAndPrioriy = (priorityData, statusData) => {
        
        const updPriority = priority.find(item => item.l === priorityData)?.h || "";
        const updStatus = status.find(item => item.l === statusData)?.h || "Pending"
        return {updStatus, updPriority}
    }



    const onEditTask = (formData) => {
        const editedTaskData = Object.fromEntries(formData);
        const updatedStatus  = getStatusAndPrioriy( editedTaskData.priority, editedTaskData.status)
        
        setToDo(prev =>
            prev.map(task =>
                Number(task.id) === Number(editedTaskData.id) ? { ...editedTaskData,priority: updatedStatus.updPriority, status: updatedStatus.updStatus  } : task
            )
        )

        onCloseTaskButton();
        setEditMode(false)
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <Header />


            <main className="max-w-5xl mx-auto mt-6 p-4">
                <ButtonsControls
                    onAddTaskButton={onAddTaskButton}
                    onClearAllTasks={onClearAllTasks}
                />

                <section className="bg-white p-4 rounded-lg shadow-md">

                    <div className="grid grid-cols-5 font-bold border-b pb-2 px-2 text-sm sm:text-base hidden sm:grid">
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
                                className={`grid grid-cols-1 sm:grid-cols-5 py-2 px-2 border-b text-sm sm:text-base ${task.status === "Done" ? "bg-green-100" : task.status === "Overdue" ? "bg-red-100" :""}`}
                            >
                                <p>{task.task}</p>
                                <p
                                    className={`font-bold ${task.priority === "High"
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
                                    className={`${task.status === "Done" ? "text-green-500 font-bold" : task.status === "Overdue" ? "text-red-500 font-bold" :"text-gray-600"
                                        }`}
                                >
                                    {task.status}
                                </p>

                                <div className="flex flex-col sm:flex-row sm:space-x-2 justify-end mt-2 sm:mt-0">
                                    {task.status !== "Done" && (
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
                    ) : (
                        <p className="text-center text-gray-500 mt-4">No tasks available.</p>
                    )}
                </section>


            </main>


            <AddTaskModal
                title="Add New"
                isOpen={addTask}
                onClose={onCloseTaskButton}
                onAddTask={onAddTask}
            />

            <EditTaskModal
                title="Edit"
                editData={editData}
                isEdit={editMode}
                onClose={onCloseTaskButton}
                onEditTask={onEditTask}
            />

            <Footer />
        </div>
    );



}

export default App
