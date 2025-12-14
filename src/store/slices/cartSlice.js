import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload
      const existingItem = state.cartItems.find((ci) => ci.itemId === item.itemId)

      if (existingItem) {
        existingItem.cartQuantity += item.cartQuantity || 1
      } else {
        state.cartItems.push({ ...item, cartQuantity: item.cartQuantity || 1 })
      }

      // Recalculate totals
      state.totalItems = state.cartItems.reduce((sum, ci) => sum + ci.cartQuantity, 0)
      state.totalPrice = state.cartItems.reduce((sum, ci) => sum + ci.price * ci.cartQuantity, 0)
    },

    removeFromCart(state, action) {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((ci) => ci.itemId !== itemId)

      // Recalculate totals
      state.totalItems = state.cartItems.reduce((sum, ci) => sum + ci.cartQuantity, 0)
      state.totalPrice = state.cartItems.reduce((sum, ci) => sum + ci.price * ci.cartQuantity, 0)
    },

    updateCartItemQuantity(state, action) {
      const { itemId, quantity } = action.payload
      const item = state.cartItems.find((ci) => ci.itemId === itemId)

      if (item) {
        if (quantity <= 0) {
          state.cartItems = state.cartItems.filter((ci) => ci.itemId !== itemId)
        } else {
          item.cartQuantity = quantity
        }
      }

      // Recalculate totals
      state.totalItems = state.cartItems.reduce((sum, ci) => sum + ci.cartQuantity, 0)
      state.totalPrice = state.cartItems.reduce((sum, ci) => sum + ci.price * ci.cartQuantity, 0)
    },

    clearCart(state) {
      state.cartItems = []
      state.totalItems = 0
      state.totalPrice = 0
    },
  },
})

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
