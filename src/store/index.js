import { configureStore } from '@reduxjs/toolkit'
import shopsReducer from './slices/shopsSlice'
import itemsReducer from './slices/itemsSlice'
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'

// Re-export all actions for easy imports
export * from './slices/shopsSlice'
export * from './slices/itemsSlice'
export * from './slices/cartSlice'
export * from './slices/authSlice'

export const store = configureStore({
  reducer: {
    shops: shopsReducer,
    items: itemsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
})

export default store
