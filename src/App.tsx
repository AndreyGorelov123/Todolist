import React, { FC, useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid'
import { title } from 'process';
import { isDoStatement } from 'typescript';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'completed' | 'active'


function App() {

    let [todolists, setTodolists] = useState([
        { id: v1(), title: 'музыка', filter: 'all' },

        { id: v1(), title: 'спорт', filter: 'active' }

    ])


    let [tasks, setTasks] = useState([

        { id: v1(), title: "еминем", isDone: false },

        { id: v1(), title: "газманов", isDone: false },

        { id: v1(), title: "киркоров", isDone: true }

    ])

    console.log(tasks)
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        let resault = tasks.filter((task) => {
            return (
                task.id !== taskId
            )
        });
        setTasks(resault)
    }

    function changeFilter(filter: FilterValuesType) {
        setFilter(filter)
    }

    function addTask(text: string) {
        console.log(text)

        const newTask = { id: v1(), title: text, isDone: false }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }




    const changeTaskStatus = (taskStatus: boolean, id: string) => {
        console.log(taskStatus, id)
        let task = tasks.find((task: TaskType) => task.id === id)
        if (task) {
            task.isDone = taskStatus
            setTasks([...tasks])
        }
    }



    return (
        <div className="App">


            {todolists.map(tl => {

                let taskForTodolist = tasks

                if (tl.filter === 'active') {
                    taskForTodolist = tasks.filter((task: any) => task.isDone === false)
                }

                if (tl.filter === 'completed') {
                    taskForTodolist = tasks.filter((task: any) => task.isDone === true)
                }

                return (
                    <Todolist
                        key={tl.id}
                        title={tl.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        onChangeTaskStatus={changeTaskStatus}
                        filter={tl.filter} />
                )
            })}








            {/* <Todolist
                title={"Музыка"}
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                onChangeTaskStatus={changeTaskStatus}
                filter={filter}
            /> */}


        </div>
    );
}

export default App;


// const tasks2: TaskType[] = [
//     {
//         id: 1,
//         title: "футбол",
//         isDone: false
//     },
//     {
//         id: 2,
//         title: "баскетбол",
//         isDone: true
//     },
//     {
//         id: 3,
//         title: "теннис",
//         isDone: false
//     }
// ]