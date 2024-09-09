import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=12")
            
            if (!response.ok) {
                throw new Error('Server error!')
            }

            const data = await response.json()

            return data
        } catch (error) {
            return rejectWithValue(error.message)            
        }
    }
)

export const removeTodo = createAsyncThunk(
    'todos/removeTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error('Can\'t delete task. Server error.')
            }

            dispatch(deleteTodo({
                id: id
            }))

            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleTodo = createAsyncThunk(
    'todos/toggleTodo',
    async function(id, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todos.todos.find((todo) => todo.id === id)
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                body: {
                    completed: !todo.completed
                }
            })

            if (!response.ok) {
                throw new Error('Can\'t toggle task. Server error.')
            }

            dispatch(checkTodo({
                id: id
            }))
            
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function(text, {rejectWithValue, dispatch}) {
        const todo = {
            title: text,
            completed: false,
            userId: Date.now()
        }
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            })

            if (!response.ok) {
                throw new Error('Can\'t add task. Server error.')
            }

            dispatch(addTodo({
                value: text
            }))

            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
        statusTodo: null,
        errorTodo: null,
    },
    reducers: {
        addTodo(state, action) {
            if (action.payload.value.trim().length !== 0) {
                state.todos.push({
                    id: Date.now(),
                    title: action.payload.value,
                    completed: false
                })
            }
        },
        checkTodo(state, action) {
            const newTodos = state.todos.reduce((acc, todo) => {
                if (todo.id === action.payload.id) {
                    return [...acc, {
                        ...todo,
                        completed: !todo.completed
                    }]
                }

                return [...acc, todo]
            }, [])

            state.todos = newTodos
        },
        deleteTodo(state, action) {
            const newTodos = state.todos.filter((todo) => todo.id !== action.payload.id)
            state.todos = newTodos
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.status = 'Loading'
            state.error = null
        }),
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = 'Resolved'
            state.todos = action.payload
        }),
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.status = action.error.message
            state.error = action.payload
        }),
        builder.addCase(removeTodo.pending, (state) => {
            state.statusTodo = "Loading"
            state.errorTodo = null
        }),
        builder.addCase(removeTodo.fulfilled, (state) => {
            state.statusTodo = "Resolved"
        }),
        builder.addCase(removeTodo.rejected, (state, action) => {
            state.statusTodo = action.error.message
            state.errorTodo = action.payload
        }),
        builder.addCase(toggleTodo.pending, (state) => {
            state.statusTodo = "Loading"
            state.errorTodo = null
        }),
        builder.addCase(toggleTodo.fulfilled, (state) => {
            state.statusTodo = "Resolved"
        }),
        builder.addCase(toggleTodo.rejected, (state, action) => {
            state.statusTodo = action.error.message
            state.errorTodo = action.payload
        }),
        builder.addCase(addNewTodo.pending, (state) => {
            state.statusTodo = "Loading"
            state.errorTodo = null
        }),
        builder.addCase(addNewTodo.fulfilled, (state) => {
            state.statusTodo = "Resolved"
        }),
        builder.addCase(addNewTodo.rejected, (state, action) => {
            state.statusTodo = action.error.message
            state.errorTodo = action.payload
        })
    }
})

export const { addTodo, checkTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer