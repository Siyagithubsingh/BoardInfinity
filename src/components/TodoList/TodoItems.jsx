import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, deleteTodo, clearCompleted, openModal, findTodo, toggleImportant } from "../../redux/slices/TodoSlice";
import { FaEdit, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import format from 'date-fns/format';
import toast from "react-hot-toast";

const TodoItems = () => {
  const { items, filterMode } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  let filtered = items;

  if (filterMode === "Active") {
    filtered = items.filter((item) => !item.completed);
  } else if (filterMode === "Completed") {
    filtered = items.filter((item) => item.completed);
  } else if (filterMode === "Important") {
    filtered = items.filter((item) => item.important);
  }

  if (items.length === 0) {
    return <div className="text-red-600 font-bold text-xl text-center">List is empty...</div>;
  } else if (filtered.length === 0 && filterMode === "Active") {
    return <div className="text-red-600 font-bold text-xl text-center">No active todo</div>;
  } else if (filtered.length === 0 && filterMode === "Completed") {
    return <div className="text-red-600 font-bold text-xl text-center">No completed todo</div>;
  }

  return (
    <>
      <div className="space-y-2">
        {filtered.map(({ id, text, completed, dueDate, important }) => (
          <div key={id} className="flex items-center justify-between">
            <div className="space-x-2 lg:flex gap-2 items-center w-4/5">
              <input
                type="checkbox"
                id={id}
                className="w-5 h-5 bg-yellow-300"
                checked={completed}
                onChange={() => dispatch(toggle(id))}
              />
              <label
                htmlFor={id}
                className={`${completed ? "line-through font-medium" : "font-bold"} text-pink-600 dark:text-yellow-300 w-4/5 overflow-hidden text-xl`}
              >
                {text}
              </label>
              {dueDate && (
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {format(new Date(dueDate), 'MM/dd/yyyy')}
                </span>
              )}
            </div>
            <div className="space-x-3 flex max-w-1/6">
              <span
                className={`text-2xl cursor-pointer hover:scale-110 transition-all duration-150 ${important ? "text-pink-600" : "text-pink-200"}`}
                onClick={() => {
                  dispatch(toggleImportant(id));
                  toast.success(important ? "Task marked as not important" : "Task marked as important", {
                    duration: 2000,
                    style: {
                      background: "black",
                      fontWeight: "bold",
                      color: "#c524a2",
                    },
                    icon: '💗',
                  });
                }}
              >
                <FaHeart />
              </span>
              <span
                className="dark:text-yellow-400 text-blue-500 text-2xl cursor-pointer hover:scale-110 hover:text-pink-300 dark:hover:text-yellow-600 transition-all duration-150"
                onClick={() => {
                  dispatch(openModal());
                  dispatch(findTodo(id));
                }}
              >
                <FaEdit />
              </span>
              <span
                className="text-red-600 text-2xl cursor-pointer hover:scale-110 hover:text-red-400 transition-all duration-150"
                onClick={() => dispatch(deleteTodo(id))}
              >
                <MdDelete />
              </span>
            </div>
          </div>
        ))}
      </div>
      {filterMode !== "Active" && (
        <button
          type="submit"
          className="mt-10 hover:scale-105 float-right bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-800 hover:border-red-600 rounded duration-200"
          onClick={() => {
            dispatch(clearCompleted());
            toast.success("Completed tasks deleted", {
              duration: 2000,
              style: {
                background: "black",
                color: "white",
              },
              icon: '✔️',
            });
          }}
        >
          Clear Completed
        </button>
      )}
    </>
  );
};

export default TodoItems;
