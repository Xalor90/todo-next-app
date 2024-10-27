'use client';
import { useState } from "react";
import { TodoTask } from "./lib/TodoTask";

export default function Home() {
  const [newTodoTask, setNewTodoTask] = useState(new TodoTask(''));
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!newTodoTask.text.trim()) {
      alert("Todo task cannot be empty!");
      return;
    }

    setTodoList([...todoList, newTodoTask]);
    setNewTodoTask(new TodoTask(''));
  };

  const handleDelete = (index) => {
    const updatedTodoList = todoList.filter((_, i) => i != index);
    setTodoList(updatedTodoList);
  };

  const handleCompleteTask = (index) => {
    const updatedTodoList = todoList.map((todoTask, i) => {
      if(i == index) {
        todoTask.toggleCompleted();
      }

      return todoTask;
    });
    setTodoList(updatedTodoList);
  };

  return (
    <div className="mt-20 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-5">Todo List</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 mb-4">
        <label>New Todo Task:</label>
        <input
          type="text"
          name="todoTask"
          value={newTodoTask.text}
          onChange={(e) => setNewTodoTask(new TodoTask(e.target.value, newTodoTask.completed))}
        />
        <button type="submit" className="rounded px-2 py-1">
          Add Task
        </button>
      </form>
      <ul className="mt-20">
        {todoList && todoList.length > 0 ? (
          todoList.map((todoTask, index) => (
            <li key={index} className="flex justify-between items-left mb-2">
              <div className="flex items-left mr-4">
                <input
                  type="checkbox"
                  checked={todoTask.completed}
                  onChange={() => handleCompleteTask(index)}
                  className="mr-2"
                />
                <span className={todoTask.completed ? "line-through" : ""}>{todoTask.text}</span>
              </div>
              <button onClick={() => handleDelete(index)} className="rounded px-2 py-1 ml-auto">
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No items to display</li>
        )}
      </ul>
    </div>
  )
};
