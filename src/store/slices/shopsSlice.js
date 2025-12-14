import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { shopService } from '../services/apiService'

// Async thunk for fetching shops
export const fetchShopsAsync = createAsyncThunk('shops/fetchShops', async (_, { rejectWithValue }) => {
  try {
    const shops = await shopService.getShops()
    return shops
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch shops')
  }
})

export const fetchShopByIdAsync = createAsyncThunk('shops/fetchShopById', async (shopId, { rejectWithValue }) => {
  try {
    const shop = await shopService.getShopById(shopId)
    return shop
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch shop')
  }
})

const initialState = {
  shops: [],
  currentShop: null,
  loading: false,
  error: null,
  selectedShops: [],
}

const shopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    setCurrentShop(state, action) {
      state.currentShop = action.payload
    },
    clearCurrentShop(state) {
      state.currentShop = null
    },
    addSelectedShop(state, action) {
      const exists = state.selectedShops.find((s) => s.shopId === action.payload.shopId)
      if (!exists) {
        state.selectedShops.push(action.payload)
      }
    },
    removeSelectedShop(state, action) {
      state.selectedShops = state.selectedShops.filter((s) => s.shopId !== action.payload)
    },
    clearSelectedShops(state) {
      state.selectedShops = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopsAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchShopsAsync.fulfilled, (state, action) => {
        state.loading = false
        state.shops = action.payload
      })
      .addCase(fetchShopsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchShopByIdAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchShopByIdAsync.fulfilled, (state, action) => {
        state.loading = false
        state.currentShop = action.payload
      })
      .addCase(fetchShopByIdAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setCurrentShop, clearCurrentShop, addSelectedShop, removeSelectedShop, clearSelectedShops } = shopsSlice.actions
export default shopsSlice.reducer
