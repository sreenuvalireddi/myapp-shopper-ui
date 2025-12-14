import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from '../services/apiService'

// Async thunk for fetching all users
export const fetchUsersAsync = createAsyncThunk('auth/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const users = await userService.getUsers()
    return users
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch users')
  }
})

// Async thunk for fetching a single user
export const fetchUserByIdAsync = createAsyncThunk('auth/fetchUserById', async (userId, { rejectWithValue }) => {
  try {
    const user = await userService.getUserById(userId)
    return user
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch user')
  }
})

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  registeredUsers: [],
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser(state, action) {
      const existing = state.registeredUsers.find(
        (u) => u.email === action.payload.email || u.phone === action.payload.phone
      )
      if (!existing) {
        state.registeredUsers.push(action.payload)
      }
    },

    loginUser(state, action) {
      const user = state.registeredUsers.find(
        (u) => u.email === action.payload.email && u.password === action.payload.password
      )
      if (user) {
        state.currentUser = user
        state.isAuthenticated = true
        state.error = null
      } else {
        state.error = 'Invalid credentials'
      }
    },

    logoutUser(state) {
      state.currentUser = null
      state.isAuthenticated = false
    },

    clearUsers(state) {
      state.registeredUsers = []
      state.currentUser = null
      state.isAuthenticated = false
    },

    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false
        state.registeredUsers = action.payload
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })
      .addCase(fetchUserByIdAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { registerUser, loginUser, logoutUser, clearUsers, clearError } = authSlice.actions
export default authSlice.reducer
