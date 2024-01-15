import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import todoList from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";
type todoListsType = {
  id: string,
  title: string,
  filter: FilterValuesType
}


function App() {

  let todoListID1 = v1();
  let todoListID2 = v1();

  let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState({
    [todoListID1]:[
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Rest API', isDone: false},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
    [todoListID2]:[
      {id: v1(), title: 'HTML&CSS2', isDone: true},
      {id: v1(), title: 'JS2', isDone: true},
      {id: v1(), title: 'ReactJS2', isDone: false},
      {id: v1(), title: 'Rest API2', isDone: false},
      {id: v1(), title: 'GraphQL2', isDone: false},
    ],
  })

  // const [tasks, setTasks] = useState<Array<TaskType>>([
  //   { id: v1(), title: "HTML", isDone: true },
  //   { id: v1(), title: "CSS", isDone: true },
  //   { id: v1(), title: "ES6/TS", isDone: false },
  //   { id: v1(), title: "ReactJS", isDone: false },
  //   { id: v1(), title: "Rest API", isDone: false },
  //   { id: v1(), title: "GraphQL", isDone: false },
  // ]);

  // // ! Отрисовка нескольких TodoList
  // let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
  //   {id: v1(), title: 'What to learn', filter: 'all'},
  //   {id: v1(), title: 'What to buy', filter: 'all'},
  // ])

  // Стейт для фильтрации. В нем используем filter (новые отрисованные active/complete/active tasks)
  // const [filter, setFilter] = useState<FilterValuesType>("all");

  // Функция для удаления задачи по taskId
  const removeTask = (todolistID: string, taskID: string) => {
    setTasks({...tasks, [todolistID] : tasks[todolistID].filter(el => el.id !== taskID)})
    // let filteredTasks = tasks.filter(t => t.id != id);
    // setTasks(filteredTasks);
  };

  //  Функция добавления залачи
  const addTask = (todoListID: string, title: string) => {
    let newTask = {id: v1(), title: title, isDone: false}
    setTasks({...tasks, [todoListID] : [newTask, ...tasks[todoListID]]})
    // const task: TaskType = {
    //   id: v1(),
    //   title: title,
    //   isDone: false,
    // };
    // const newTasks: Array<TaskType> = [task, ...tasks];
    // setTasks(newTasks);
  };

  const changeStatus = (todoListID: string, taskId: string, isDone: boolean) => {
    setTasks({...tasks, [todoListID] : tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    // let task = tasks.find((t: TaskType) => t.id === taskId)
    // if(task) {
    //   task.isDone = isDone
    // }
    // setTasks([...tasks])
  }

  const changeFilter = (todoListID: string, value: FilterValuesType) => {
    setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter : value} : el))
    // const currentTodoList = todoList.find(el => el.id === todoListID)
    // if(currentTodoList) {
    //   currentTodoList.filter = value
    //   setTodoList([...todoList])
    // }
  };

  const removeTodoList = (todoListID: string) => {
    setTodoLists(todoLists.filter(el => el.id !== todoListID))
    delete tasks[todoListID]
  }

  return (
    <div className="App">
      {todoLists.map(el => {
        let tasksForTodoList = tasks[el.id];

        if(el.filter === 'active') {
          tasksForTodoList = tasks[el.id].filter(t => t.isDone === false)
        }
        if(el.filter === 'completed') {
          tasksForTodoList = tasks[el.id].filter(t => t.isDone === true)
        }

        return (
          <TodoList
            key={el.id}
            todoListID={el.id}
            title={el.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={el.filter}
            removeTodoList={removeTodoList}
          />
        )
      })}
    </div>
  );
}

export default App;
