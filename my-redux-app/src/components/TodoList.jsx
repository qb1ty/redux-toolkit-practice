import { useSelector } from 'react-redux'
import TodoItem from "./TodoItem"

const TodoList = () => {
    const todos = useSelector(state => state.todos.todos)

    return (
        <>
            <ul className="flex flex-col gap-2 justify-center items-center mt-5 w-full">
                { todos.length > 0 ?
                    todos.map((todo) => {
                        return (
                            <TodoItem key={todo.id} {...todo} />
                        )
                    })
                    : 'Дел нет'
                }
            </ul>
        </>
    )
}

export default TodoList