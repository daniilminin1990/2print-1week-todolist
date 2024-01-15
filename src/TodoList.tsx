import React, { useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import Button from "./Button";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  todoListID: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (todolistID: string, taskId: string) => void;
  changeFilter: (todoListID: string, filter: FilterValuesType) => void;
  addTask: (todoListID: string, title: string) => void;
  changeTaskStatus: (todoListID: string, taskId: string, newIsDoneValue: boolean) => void
  filter: FilterValuesType;
  removeTodoList: (todoListID: string) => void
};

const TodoList = ({
  title,
  tasks,
  filter,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  todoListID,
  removeTodoList
}: TodoListPropsType) => {

  // State для input
  const [taskTitle, setTaskTitle] = useState("")
  // Для обработки пустого input
  const [inputError, setInputError] = useState(false)

  // Сохраняем input и перерисовываем - useRef
  const listItems: Array<JSX.Element> = tasks.map((task: TaskType) => {
    return (
      <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={(e) => changeTaskStatus(todoListID, task.id, e.currentTarget.checked)}
        />
        <span>{task.title}</span>
        <Button title={"x"} onClickHandler={() => removeTask(todoListID, task.id)} />
      </li>
    )
  })

  // Переменная для отображения УСЛОВНОГО РЕНДЕРИНГа. Если задачи есть, но мы их скрыли фильтрами, то одно, а если здаач нет вовсе - напишем задач нет. Вставим в ul то, что ранее было в переменной listItems -  map массива. И вставим эту переменную в окончательный JSX код
  const tasksList: JSX.Element = tasks.length !== 0
    ? <ul> {listItems} </ul>
    : <span>Tasks list is empty</span>;

  // Обработчик для addTask
  const addTaskOnClickHandler = () => {
    // Проверка на наличие пробелов
    const trimmedTaskTitle = taskTitle.trim()
    if (trimmedTaskTitle) {
      addTask(todoListID, taskTitle)
    } else {
      setInputError(true)
    }
    setTaskTitle("")
  }
  // Обработчик для addTask по нажатию Enter. Когда выносим -- ОБЯЗАТЕЛЬНО KeyBoardEvent<HTMLInputElement> + import из react
  const addTaskKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && taskTitle) {
      addTaskOnClickHandler()
    }
  }

  const removeTodoListHandler = () => {
    removeTodoList(todoListID)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
    inputError && setInputError(false)
  }

  return (
    <div className="todolist">
      <h3>{title}
        <button onClick={removeTodoListHandler}>X</button> </h3>
      <div>
        <input
          value={taskTitle}
          onChange={onChangeHandler}
          onKeyDown={addTaskKeyDownHandler}
          className={inputError ? 'inputError' : ''}
        />
        <Button title="+" onClickHandler={addTaskOnClickHandler} isDisabled={!taskTitle} />
        {inputError && <div style={{ color: 'red' }}>Error: title is required </div>}
      </div>
      {tasksList}
      <div>
        <Button classes={filter === 'all' ? 'btn-all' : ''} title="All"
          onClickHandler={() => changeFilter(todoListID, "all")} />
        <Button classes={filter === 'active' ? 'btn-active' : ''} title="Active"
          onClickHandler={() => changeFilter(todoListID, "active")} />
        <Button classes={filter === 'completed' ? 'btn-completed' : ''} title="Completed"
          onClickHandler={() => changeFilter(todoListID, "completed")} />
      </div>
    </div>
  );
};

export default TodoList;
