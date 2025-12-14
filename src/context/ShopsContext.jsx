import React, { createContext, useState } from 'react'

export const ShopsContext = createContext()

export function ShopsProvider({ children }) {
  const [selectedShops, setSelectedShops] = useState([])
  const [currentShop, setCurrentShop] = useState(null)
  const [cartItems, setCartItems] = useState([])

  return (
    <ShopsContext.Provider value={{ selectedShops, setSelectedShops, currentShop, setCurrentShop, cartItems, setCartItems }}>
      {children}
    </ShopsContext.Provider>
  )
}

export function useShops() {
  const context = React.useContext(ShopsContext)
  if (!context) {
    throw new Error('useShops must be used within ShopsProvider')
  }
  return context
}
