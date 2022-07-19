import { Check, X } from "phosphor-react";
import { api } from "../../services/api";

type TodoProps = {
  _id: string;
  text: string;
  completed: boolean;
  deleteTodoById: (_id: string) => void;
  toggleCompleted: (_id: string) => void;
};

export function Todo({
  _id,
  text,
  completed,
  deleteTodoById,
  toggleCompleted,
}: TodoProps) {
  return (
    <>
      <div
        key={_id}
        className="min-h-32 hover:bg-gray-300 cursor-pointer px-2 py-3 bg-white dark:bg-[#252525] dark:hover:bg-[#303030] transition-all duration-150 w-full flex items-center justify-between text-3xl"
      >
        <span
          className="max-w-[75%] tablet:max-w-[60%] block break-words w-full dark:text-white text-zinc-900 tablet:text-[1.6rem]"
          style={{
            textDecoration: `${completed ? "line-through" : ""}`,
          }}
        >
          {text}
        </span>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center justify-center p-2 bg-white dark:bg-[#303030]  rounded-md hover:brightness-[0.85] transition-all duration-150"
            onClick={() => toggleCompleted(_id)}
          >
            <Check size={24} weight="bold" className="text-blue-500" />
          </button>
          <button
            className="flex items-center justify-center p-2 bg-white dark:bg-[#303030]  rounded-md hover:brightness-[0.85] transition-all duration-150"
            onClick={() => deleteTodoById(_id)}
          >
            <X size={24} weight="bold" className="text-red-500" />
          </button>
        </div>
      </div>
      <div className="w-full min-h-[1px] bg-zinc-400"></div>
    </>
  );
}
