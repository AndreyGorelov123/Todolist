
import { useRef, ChangeEvent, useState, KeyboardEvent } from "react"
import { TaskType, FilterValuesType } from "./App"
import { Button } from "./Button"
import './Todolist.css'

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (text: string) => void
    onChangeTaskStatus: (isDone: boolean, id: string) => void
    filter: string
}
export const Todolist = ({ title, tasks, removeTask, changeFilter, addTask, onChangeTaskStatus, filter }: PropsType) => {
    // const inputRef = useRef<HTMLInputElement>(null)

    // if (inputRef.current) {
    //     console.log(inputRef.current.value)
    // }

    console.log(filter)
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState('')
    const addTaskHandler = () => {
        if (taskTitle.trim() !== '' ) {
            addTask( taskTitle.trim() )
            setTaskTitle('')
            
        }
        else{
            setError('Введите заголовок')
        }
    }


    const changeTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value)
        setTaskTitle(event.currentTarget.value)
    }    

    const addTaskOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
        setError('')
    }

    const onChangeTaskStatusHandler = (event: any, id: any) => {
        const newStatus = event.currentTarget.checked
        onChangeTaskStatus(newStatus, id)
    }      
    
    // const onChangeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
    //     console.log(event.currentTarget.checked)
    // }      


    return (
        <div>
           {error ? <div className="error-sms">{error}</div>: ''}
            <h3>{title}</h3>
            <div>
                {/* <input ref={inputRef}/> */}
                <input
                    value={taskTitle}
                    onChange={changeTaskTitle}
                    onKeyUp={addTaskOnKeyUp}
                    className={error ? 'error' : ''}
                />

                
                <button onClick={addTaskHandler}>+</button>
            </div>
            {tasks.length === 0 ? (
                <p>Список Отсутствует</p>
            ) : (
                <ul>
                    {
                        tasks.map((task) => {
                            return (

                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone} onChange={(e) => onChangeTaskStatusHandler(e, task.id)}/>
                                    <span>{task.title}</span>
                                    <Button title={'❌'} сlick={ ()=> removeTask(task.id)} />
                                </li>)
                        })
                    }
                </ul>
            )}

            <div>
                <Button className={filter === 'all'? 'active-filter' : ''} title={'All'} сlick={() => changeFilter('all')} />
                <Button className={filter === 'active'? 'active-filter' : ''} title={'Active'} сlick={() => changeFilter('active')} />
                <Button className={filter === 'completed'? 'active-filter' : ''} title={'Completed'} сlick={() => changeFilter('completed')} />
            </div>
        </div>
    )
}