import { useDispatch, useSelector } from "react-redux"
import { closeList } from "../store/userSlice"
import List from "./List"

const Lists = () => {
    const lists = useSelector((state) => state.users.lists)
    const dispatch = useDispatch()

    return (
        <div className="absolute top-8 -left-1 bg-white p-2 border-2 w-[400px]">
            <div className="absolute rounded-full bg-red-500 h-6 w-6 z-10 right-2 cursor-pointer" onClick={() => dispatch(closeList())}>
                <span className="flex justify-center items-center text-white -mt-[1px]">&times;</span>
            </div>
            {lists.map((list) => {
                return (
                    <List key={list.id} {...list}/> 
                )
            })}
        </div>
    )
}

export default Lists