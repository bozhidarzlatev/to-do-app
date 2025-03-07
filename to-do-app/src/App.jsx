import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [toDo, setToDo] = useState(() => {
        const localStorageData = localStorage.getItem('toDoAppTasks');
        return localStorageData ? JSON.parse(localStorageData) : [];
    });

    useEffect(() => {
        localStorage.setItem('toDoAppTasks', JSON.stringify(toDo));
    }, [toDo]);



    const onAddTask = (formData) => {
        const taskData = Object.fromEntries(formData)
        setToDo(current => [...current,taskData] );
        console.log(JSON.stringify(toDo));
        console.log(toDo);
        
    }

    

    return (
        <>
            <header>

            <h1>To-Do app</h1>
            </header>

            <main>
                <section>
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
                            <div>

                                <label htmlFor="date">Due Date:</label>
                                <input type="date" it="date" name="date"/>
                            </div>
                            <button>Submit</button>
                        </div>



                    </form>
                </section>

                <section>

                    <article>

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
                        <p>Controls:</p>
                    </div>
                    </article>
                    {toDo.map(task => 

<>
                    <article>
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
                        <button>Done</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                    </article>
                           
                           </>)}
                </section>

            </main>

            <footer>
                <p>To-App Created by Bozhidar Zlatev 2025</p>
            </footer>

        </>
    )
}

export default App
