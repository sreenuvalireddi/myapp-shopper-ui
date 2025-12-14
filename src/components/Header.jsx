import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShops } from '../context/ShopsContext'

export default function Header() {
  const { cartItems, setCartItems } = useShops()
  const navigate = useNavigate()

  const handleLogout = () => {
    try { sessionStorage.removeItem('registration') } catch (e) {}
    try { setCartItems([]) } catch (e) {}
    navigate('/')
  }

  return (
    <header className="site-header">
      <div className="container">
        <div className="brand">MyApp</div>
        <nav className="nav">
          <Link to="/home">Home</Link>
          <a href="#">About</a>
          <a href="#">Help</a>
          <Link to="/cart" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '4px', marginRight: 8 }}>
            🛒 Cart
            {cartItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#ef4444',
                color: '#fff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
              }}>
                {cartItems.length}
              </span>
            )}
          </Link>
          <button onClick={handleLogout} style={{marginLeft:20, background:'transparent', border:'1px solid #e5e7eb', padding:'6px 10px', borderRadius:6, cursor:'pointer'}}>Logout</button>
        </nav>
      </div>
    </header>
  )
}
