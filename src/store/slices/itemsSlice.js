import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { itemService } from '../services/apiService'

// Async thunk for fetching all items
export const fetchItemsAsync = createAsyncThunk('items/fetchItems', async (_, { rejectWithValue }) => {
  try {
    const items = await itemService.getItems()
    return items
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch items')
  }
})

// Async thunk for fetching items by shop
export const fetchItemsByShopAsync = createAsyncThunk('items/fetchItemsByShop', async (shopId, { rejectWithValue }) => {
  try {
    const items = await itemService.getItemsByShop(shopId)
    return items
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch items by shop')
  }
})

// Async thunk for fetching a single item
export const fetchItemByIdAsync = createAsyncThunk('items/fetchItemById', async (itemId, { rejectWithValue }) => {
  try {
    const item = await itemService.getItemById(itemId)
    return item
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch item')
  }
})

const initialState = {
  items: [],
  currentItem: null,
  loading: false,
  error: null,
  filteredItems: [],
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setCurrentItem(state, action) {
      state.currentItem = action.payload
    },
    clearCurrentItem(state) {
      state.currentItem = null
    },
    setFilteredItems(state, action) {
      state.filteredItems = action.payload
    },
    clearFilteredItems(state) {
      state.filteredItems = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.filteredItems = action.payload
      })
      .addCase(fetchItemsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchItemsByShopAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchItemsByShopAsync.fulfilled, (state, action) => {
        state.loading = false
        state.filteredItems = action.payload
      })
      .addCase(fetchItemsByShopAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchItemByIdAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchItemByIdAsync.fulfilled, (state, action) => {
        state.loading = false
        state.currentItem = action.payload
      })
      .addCase(fetchItemByIdAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setCurrentItem, clearCurrentItem, setFilteredItems, clearFilteredItems } = itemsSlice.actions
export default itemsSlice.reducer
