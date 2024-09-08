import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, editTodo } from "../../redux/slices/TodoSlice";
import toast, { Toaster } from "react-hot-toast";

const Modal = () => {
  const dispatch = useDispatch();

  const { id, text } = useSelector((state) => state.todo.currentTodo);

  const [todo, setTodo] = useState(text);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.trim() === "") {
      toast.error("Please fill out the task", {
        duration: 2000,
        style: {
          background: "black",
          color: "white",
        },
        icon: '❌',
      });
      return;
    }

    if (todo.trim() === text.trim()) {
      toast.error("Task is the same as the previous one", {
        duration: 2000,
        style: {
          background: "black",
          color: "white",
        },
        icon: '❌',
      });
      return;
    }

    dispatch(editTodo({ id: id, text: todo }));
    dispatch(closeModal());
    toast.success("Task updated successfully", {
      duration: 2000,
      style: {
        background: "black",
        color: "white",
      },
      icon: '✔️',
    });
  };

  return (
    //modal container
    <div className="flex items-center justify-center fixed z-50 inset-0 bg-gray-900/80">
      <Toaster />
      {/* modal */}
      <div className="bg-yellow-100 w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-2xl p-5 dark:bg-neutral-900 dark:shadow-yellow-500 dark:shadow-md">
        <h1 className="text-pink-500 text-4xl font-black drop-shadow-2xl text-center dark:text-yellow-400">
          Edit todo
        </h1>
        <div className="py-5 space-y-5 space-x-2">
          <input
            type="text"
            className="border-b-4 border-pink-500 rounded-lg px-3 py-2 outline-none w-full dark:text-yellow-500 dark:bg-slate-700 dark:border-yellow-400"
            placeholder="Edit todo"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            autoFocus
          />

          <div className="flex justify-around pt-3">
            <button
              className="bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-600 rounded duration-200 dark:bg-gray-500 dark:hover:bg-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
              onClick={() => dispatch(closeModal())}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-800 hover:border-green-600 rounded duration-200"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
