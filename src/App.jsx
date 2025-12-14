import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ShopsProvider } from './context/ShopsContext'
import Login from './components/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import OtpVerify from './pages/OtpVerify'
import Items from './pages/Items'
import Cart from './pages/Cart'
import ManageShops from './pages/ManageShops'
import AddShop from './pages/AddShop'

export default function App() {
  return (
    <ShopsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shops" element={<ManageShops />} />
          <Route path="/shops/add" element={<AddShop />} />
          <Route path="/items" element={<Items />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </ShopsProvider>
  )
}
