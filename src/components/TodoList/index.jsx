import React from "react";
import TodoForm from "./TodoForm";
import TodoItems from "./TodoItems";
import TodoFilter from "./TodoFilter";
import Modal from "./Modal";
import Lottie from "lottie-react";
import anim from "./Animation.json";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const TodoList = () => {
  const { isOpenModal } = useSelector((state) => state.todo);

  return (
    <>
      <Toaster />
      {isOpenModal && <Modal />}
      <div className="min-h-screen bg-gradient-to-r bg-pink-600 dark:from-yellow-500 dark:to-yellow-500 pt-16 sm:pt-24 flex flex-col ">
        <h1 className="text-center text-3xl font-extrabold text-black">
        boardinfinity Assignment
        </h1>
        <div className="animation-container">
          <Lottie animationData={anim} />
        </div>
        <div className="bg-yellow-100 flex flex-col-reverse sm:flex-row justify-center w-11/12 sm:w-5/6 md:w-2/3 mx-auto shadow-2xl dark:bg-neutral-900 dark:shadow-yellow-500 dark:shadow-md">
          <div className="w-full sm:w-1/3 p-7 border-t-2 sm:border-t-0 sm:border-r-2 border-yellow-500">
            <TodoFilter />
          </div>
          <div className="w-full sm:w-2/3 p-5 md:p-7 dark:text-custom-white">
            <TodoForm />
            <TodoItems />
          </div>
        </div>
        <p className=" text-center m-3 font-semibold font-nunito">
          All rights reserved:{" "}
          <span className=" underline">
            <a href="https://is.gd/jfbkT_siyasingh" target="_blank">
              @Siya singh
            </a>
          </span>
        </p>
      </div>
    </>
  );
};

export default TodoList;
