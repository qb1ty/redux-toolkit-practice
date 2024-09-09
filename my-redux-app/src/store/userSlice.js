import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')

            if (!response.ok) {
                throw new Error('Server error!')
            }

            const data = await response.json()

            return data
        }
         catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState: {
        lists: [],
        sheet: false,
        status: null,
        error: null
    },
    reducers: {
        toggleList(state, action) {
            state.sheet = !action.payload.stat
        },
        closeList(state) {
            state.sheet = false
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = 'Loading'
            state.error = null
        }),
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'Resolved'
            state.lists = action.payload
        }),
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.status = action.error.message
            state.error = action.payload
        })
    }
})

export const { toggleList, closeList } = userSlice.actions

export default userSlice.reducer