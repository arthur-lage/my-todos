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
        className="min-h-32 hover:bg-gray-300 cursor-pointer px-2 py-2 bg-white w-full flex items-center justify-between text-3xl"
      >
        <span
          className="max-w-[70rem] block break-words w-full"
          style={{
            textDecoration: `${completed ? "line-through" : ""}`,
          }}
        >
          {text}
        </span>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center justify-center p-2 bg-white rounded-md hover:brightness-[0.85] transition-all duration-150"
            onClick={() => toggleCompleted(_id)}
          >
            <Check size={24} weight="bold" className="text-blue-500" />
          </button>
          <button
            className="flex items-center justify-center p-2 bg-white rounded-md hover:brightness-[0.85] transition-all duration-150"
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
