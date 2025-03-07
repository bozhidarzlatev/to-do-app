import { useEffect, useState } from 'react'
import './App.css'

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
    }

    const onClearAllTasks = () => {
        setToDo([]);
        localStorage.removeItem('toDoAppTasks'); 
    }

    const onAddTaskButton = () => {
        setAddTask(prev => !prev)
        
    }

    const onDeleteButton  = (id) => {
        setToDo(prev => prev.filter(task => task.id !== id))

    }



    return (
        <>
            <header>

                <h1>To-Do app</h1>
            </header>

            <main>
                <div>

                <button onClick={onAddTaskButton}>{!addTask ? "Add Task" : "Hide"} </button>
                <button onClick={onClearAllTasks}>Clear All Tasks</button>
                </div>
                {addTask ? 
                <section class="add-task">
                    <form action={onAddTask}>
                        <div>
                            <label htmlFor="task">Task</label>
                            <input type="text" id="task" name="task" />
                        </div>

                        <div>
                            <label htmlFor="priority">Priority</label>
                            <select name="priority" id="priority" >
                                <option value="normal" disabled selected>-Please select priority-</option>
                                <option value="normal">Normal</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                                <label htmlFor="date">Due Date:</label>
                                <input type="date" it="date" name="date" />
                        </div>
                            <div>
                            <button>Submit</button>
                            </div>



                    </form>
                </section>
                : ""}
                <section class="tasks">

                    <article class="task-headers">

                        <div>
                            <p>Task:</p>
                        </div>
                        <div>
                            <p>Priority:</p>
                        </div>
                        <div>
                            <p>Due date:</p>
                        </div>
                        <div>
                            <p>Status:</p>
                        </div>
                        <div>
                            <p>Controls:</p>
                        </div>
                    </article>
                    {toDo.map(task =>
                            <article key={task.id}>
                                <div>
                                    <p>{task.task}</p>
                                </div>
                                <div>
                                    <p>{task.priority}</p>
                                </div>
                                <div>
                                    <p>{task.date}</p>
                                </div>
                                <div>
                                    <p>{task.status}</p>
                                </div>
                                <div>
                                    <button>Done</button>
                                    <button>Edit</button>
                                    <button onClick={() => onDeleteButton(task.id)}>Delete</button>
                                </div>
                            </article>
                        )}
                </section>

            </main>

            <footer>
                <p>To-App Created by Bozhidar Zlatev 2025</p>
            </footer>

        </>
    )
}

export default App
