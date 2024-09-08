import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/slices/TodoSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

const TodoForm = () => {
  const dispatch = useDispatch();

  const [todo, setTodo] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.trim() === "" || dueDate === null) {
      toast.error("Please fill out both fields", {
        duration: 2000,
        style: {
          background: "black",
          color: "white",
        },
        icon: '❌',
      });
      return;
    }

    dispatch(addTodo({ id: Date.now(), text: todo, completed: false, dueDate }));
    setTodo("");
    setDueDate(null);
  };

  return (
    <>
      <Toaster />
      <h1 className="text-4xl font-black text-yellow-500 uppercase drop-shadow-2xl dark:text-yellow-500 text-center">
        Todo list
      </h1>
      <form onSubmit={handleSubmit} className="py-5 lg:flex lg:flex-row space-x-2 flex flex-col items-center gap-3">
        <input
          type="text"
          className="border-b-4  border-pink-500 font-semibold rounded-lg px-3 py-2 outline-none w-full dark:text-yellow-400 dark:bg-slate-700 dark:border-yellow-500"
          placeholder="Add a new todo"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          className="border-b-4 border-pink-500 font-bold rounded-lg px-1 py-2 outline-none dark:text-yellow-400 dark:bg-slate-700 dark:border-yellow-500"
          placeholderText="Select due date"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:scale-105 hover:bg-pink-500 dark:hover:bg-yellow-500 hover:text-black text-white font-bold py-2 border-b-4 border-blue-800 hover:border-blue-600 rounded duration-200 px-10"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default TodoForm;
