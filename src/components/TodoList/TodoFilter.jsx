import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filter } from "../../redux/slices/TodoSlice";

const TodoFilter = () => {
  const dispatch = useDispatch();
  const { filterMode } = useSelector((state) => state.todo);

  return (
    <>
      <h1 className="hidden sm:block font-extrabold text-3xl text-center pb-7 pt-2 text-yellow-500 drop-shadow-xl dark:text-yellow-500">
        Filter
      </h1>
      <div className="font-bold text-black sm:space-y-3 text-lg flex  justify-between flex-col dark:text-yellow-400">
        <div
          className={`cursor-pointer my-2  hover:text-blue-900 duration-200 ${
            filterMode == "All" && "text-pink-500 bg-yellow-200 p-2 rounded-md dark:text-white dark:bg-yellow-500 dark:p-2 dark:rounded-md"
          }`}
          onClick={() => dispatch(filter("All"))}
        >
          All
        </div>
        <div
          className={`cursor-pointer sm:hover:pl-2 duration-200 ${
            filterMode == "Active" && "p-2 rounded-md text-white bg-blue-500 dark:p-2 dark:rounded-md"
          }`}
          onClick={() => dispatch(filter("Active"))}
        >
          Active
        </div>
        <div
          className={`cursor-pointer sm:hover:pl-2 duration-200 ${
            filterMode == "Important" && " text-white bg-pink-400 p-2 rounded-md dark:text-white dark:bg-pink-500 dark:p-2 dark:rounded-md"
          }`}
          onClick={() => dispatch(filter("Important"))}
        >
          Important
        </div>
        <div
          className={`cursor-pointer sm:hover:pl-2 duration-200 ${
            filterMode == "Completed" && "text-white bg-green-500 p-2 rounded-md"
          }`}
          onClick={() => dispatch(filter("Completed"))}
        >
          Completed
        </div>
        
      </div>
    </>
  );
};

export default TodoFilter;
