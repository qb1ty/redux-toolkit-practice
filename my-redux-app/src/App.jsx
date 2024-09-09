import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewTodo, fetchTodos } from "./store/todoSlice"
import { toggleList, fetchUsers } from "./store/userSlice"
import TodoList from "./components/TodoList"
import InputField from "./components/InputField"
import Loader from "./components/Loader"
import Error from "./components/Error"
import Lists from "./components/Lists"

function App() {
  const [value, setValue] = useState('')
  const status = useSelector(state => state.todos.status)
  const statusTodo = useSelector(state => state.todos.statusTodo)
  const sheet = useSelector(state => state.users.sheet)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
    dispatch(fetchUsers())
  }, [])

  const addTask = () => {
    dispatch(addNewTodo(value))
    setValue('')
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      { statusTodo === "Loading" && 
        <div className="absolute top-40 right-0 left-0 z-30">
          <Loader />
        </div>
      }
      <div className={statusTodo === "Loading" ? 'blur-sm z-20' : ''}>
        <div className="flex justify-center items-center border-b-2 border-slate-600 mt-5 pb-3 w-full">
          <p className="text-xl">React + Redux (Redux Toolkit)</p>
          <div className="relative select-none ml-10" onClick={() => dispatch(toggleList({stat: sheet}))}>
            <span className="text-xl text-blue-400 cursor-pointer">Users</span>
            { sheet && <div className="flex flex-col">
              <Lists />
            </div> }
          </div>
        </div>
        <div>
          { status === "Loading" ? <Loader /> : status === "Resolved" ?
            <>
              <InputField value={value} handleChange={handleChange} addTask={addTask} />
              <TodoList /> 
            </> :
            status === "Rejected" && <Error /> }
        </div>
      </div>
    </>
  )
}

export default App