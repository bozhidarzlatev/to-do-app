import { useState } from 'react'
import './App.css'

function App() {
    const [toDo, setToDo] = useState({})

    return (
        <>
            <header>

            <h1>To-Do app</h1>
            </header>

            <main>
                <section>
                    <form action="">
                        <div>
                            <label htmlFor="task">Task</label>
                            <input type="text" id="task" name="task" />
                        </div>

                        <div>
                            <label htmlFor="priority">Priority</label>
                            <select name="priority" id="priority">
                                <option value="normal" disabled selected>-Please select priority-</option>
                                <option value="normal">Normal</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <div>

                                <label>Due Date:</label>
                                <input type="date" />
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
                    <article>

                    <div>
                        <p>Go to fitnes</p>
                    </div>
                    <div>
                        <p>Medium</p>
                    </div>
                    <div>
                        <p>02-03-2025</p>
                    </div>
                    <div>
                        <button>Done</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                    </article>
                </section>

            </main>

            <footer>
                <p>To-App Created by Bozhidar Zlatev 2025</p>
            </footer>

        </>
    )
}

export default App
