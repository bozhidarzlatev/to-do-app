import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import AddTaskModal from './components/AddTaskModal';
import ButtonsControls from './components/ButtonsControls';
import EditTaskModal from './components/EditTaskModal';
import { priority, status } from './util/structure';
import ItemList from './components/ItemList';



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
        setDate(new Date());
    }, []);

    useEffect(() => {
  
        localStorage.setItem('toDoAppTasks', JSON.stringify(toDo));
    }, [toDo]);

    useEffect(() => {
        setToDo(prev => 
            prev.map(item => 
                checkOverdue(item.date) 
                ? { ...item, status: "Overdue" } 
                : checkToday(item.date)
                    ? { ...item, status: "For Today" }
                    : item
            )
        );
    }, [date]);


    const checkOverdue = (dateToVal) => {
        if (!date) return false;
        const today = date.toISOString().split("T")[0]; 
        const dueDate = dateToVal;

        return dueDate < today;
    }

    const checkToday = (dateToVal) => {
        if (!date) return false;
        const today = date.toISOString().split("T")[0]; 
        const dueDate = dateToVal;
        return dueDate === today;
    }

    const onAddTask = (formData) => {
        
        const taskData = Object.fromEntries(formData);
        const stsAndPriority = getStatusAndPrioriy(taskData.priority)

        const id = Date.now()
        const isOverdue = checkOverdue(taskData.date) 
        

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
        
        const updPriority = priority.find(item => item.l === priorityData)?.c || "";
        const updStatus = status.find(item => item.l === statusData)?.c || "Pending"
        console.log({updStatus, updPriority});
        
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
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
            <Header />
    
            <main className="flex-grow max-w-5xl mx-auto mt-6 p-4 w-full">
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
    
                    {toDo.length > 0 
                    ? 
                        <ItemList toDo={toDo} onDoneButton={onDoneButton} onEditButton={onEditButton} onDeleteButton={onDeleteButton} />
                    : <p className="text-center text-gray-500 mt-4">No tasks available.</p>
                    }
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
                date={date}
            />
    
            <Footer /> 
        </div>
    );
    



}

export default App
