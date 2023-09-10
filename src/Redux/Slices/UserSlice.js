import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fetching users data //////////////////////////////////////////////////////////////////////////////////////

export const getUsersData = createAsyncThunk('FetchUsersData', async (data, { rejectWithValue }) => {

    const fetchData = await fetch('http://localhost:5500/', { method: 'GET' });

    try {
        const data = await fetchData.json()
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

// Creating new user //////////////////////////////////////////////////////////////////////////////////////////

export const createNewUser = createAsyncThunk('CreateUser', async (data, { rejectWithValue }) => {

    const createUser = await fetch('http://localhost:5500/api/add-employee', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })

    try {
        const result = await createUser.json()
        return result
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// Updating existing user's data //////////////////////////////////////////////////////////////////////////////////////////

export const editUserDetails = createAsyncThunk('EditData', async (data, { rejectWithValue }) => {

    const editData = await fetch('http://localhost:5500/api/update-data', {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })

    try {
        if (editData.status === 200) {
            const result = await editData.json()
            return result
        } else {
            const result = await editData.json()
            return rejectWithValue(result)
        }
    } catch (error) {
        return rejectWithValue(error)
    }
})

// Delete User //////////////////////////////////////////////////////////////////////////////////////////

export const deleteUser = createAsyncThunk('DeleteUser', async (data, { rejectWithValue }) => {

    const deleteData = await fetch(`http://localhost:5500/api/delete-record/${data}`, { method: "DELETE" })

    try {
        if (deleteData.status === 200) {
            const result = await deleteData.json()
            return result
        } else {
            const result = await deleteData.json()
            return rejectWithValue(result)
        }

    } catch (error) {
        return rejectWithValue(error)
    }
})

export const UsersData = createSlice({
    name: "Users",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers :{
        setError : (state, action)=>{
            state.error = (action.payload);
    }
    },
    extraReducers: {
        [getUsersData.pending]: (state) => {
            state.loading = true
        },
        [getUsersData.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload
        },
        [getUsersData.rejected]: (state, action) => {
            state.loading = false
            state.error = {error:"Something went wrong.... Could not fetch"};
        },
        //////////////////////////////////
        [createNewUser.pending]: (state) => {
            state.loading = true
        },
        [createNewUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users.push(action.payload)
        },
        [createNewUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        //////////////////////////////////
        [editUserDetails.pending]: (state) => {
            state.loading = true
        },
        [editUserDetails.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload
        },
        [editUserDetails.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        //////////////////////////////////
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {setError} = UsersData.actions
export default UsersData.reducer
