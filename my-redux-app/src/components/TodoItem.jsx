import { useDispatch } from "react-redux"
import { toggleTodo, removeTodo } from "../store/todoSlice"

const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch()
    const checkTodo = (id) => dispatch(toggleTodo(id))
    const deleteTodo = (id) => dispatch(removeTodo(id))

    return (
        <>
            <li className="flex justify-between items-center border border-slate-200 rounded-none w-[30%]">
                <div className="pl-3 truncate">
                    <span className={!completed ? "text-lg truncate" : "text-lg truncate line-through"}>{title}</span>
                </div>
                <div className="flex ml-3">
                    <button onClick={() => checkTodo(id)} className={!completed ? "bg-orange-500 py-[6px] px-3 cursor-pointer" : "bg-green-500 py-[6px] px-3 cursor-pointer"}>$</button>
                    <button onClick={() => deleteTodo(id)} className="bg-red-500 py-[6px] px-3 cursor-pointer">#</button>
                </div>
            </li>
        </>
    )
}

export default TodoItem