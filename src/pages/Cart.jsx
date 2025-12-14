import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useShops } from '../context/ShopsContext'

export default function Cart() {
  const { cartItems, setCartItems } = useShops()

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.cartQuantity || 1)), 0)

  return (
    <div className="home-root">
      <Header />

      <main className="home-main">
        <section className="hero">
          <h2>Shopping Cart</h2>
          <p className="lead">Review your items</p>
        </section>

        <section className="content-cards">
          {cartItems.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px' }}>
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '20px' }}>Your cart is empty</p>
              <Link to="/home" className="btn" style={{ display: 'inline-block', padding: '8px 16px', background: '#2563eb', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <h3 style={{ gridColumn: '1 / -1', marginBottom: 10 }}>
                Cart Items ({cartItems.length})
              </h3>
              {cartItems.map((item, index) => (
                <div key={index} className="card">
                  <img 
                    src={item.image} 
                    alt={item.itemName} 
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <strong style={{ marginTop: 10, display: 'block' }}>{item.itemName}</strong>
                  <div style={{ marginTop: 8, fontSize: '14px', color: '#6b7280' }}>{item.itemCategory}</div>
                  <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Price: ${item.price.toFixed(2)}</span>
                    <span>Selected Qty: {item.cartQuantity || 1}</span>
                  </div>
                  <div style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>
                    <span>Subtotal: ${(item.price * (item.cartQuantity || 1)).toFixed(2)}</span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: '12px', color: '#9ca3af' }}>
                    Available: {item.quantity}
                  </div>
                  <div style={{
                    marginTop: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px',
                    background: '#f3f4f6',
                    borderRadius: '4px'
                  }}>
                    <button
                      onClick={() => {
                        if ((item.cartQuantity || 1) === 1) {
                          setCartItems((s) => s.filter((_, i) => i !== index))
                        } else {
                          setCartItems((s) => s.map((cartItem, i) => 
                            i === index 
                              ? { ...cartItem, cartQuantity: (cartItem.cartQuantity || 1) - 1 }
                              : cartItem
                          ))
                        }
                      }}
                      style={{
                        padding: '4px 8px',
                        background: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
                      {item.cartQuantity || 1}
                    </span>
                    <button
                      onClick={() => {
                        setCartItems((s) => s.map((cartItem, i) => 
                          i === index 
                            ? { ...cartItem, cartQuantity: (cartItem.cartQuantity || 1) + 1 }
                            : cartItem
                        ))
                      }}
                      style={{
                        padding: '4px 8px',
                        background: '#10b981',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ gridColumn: '1 / -1', marginTop: 30, padding: '20px', background: '#f3f4f6', borderRadius: '8px', textAlign: 'right' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                  Total: ${totalPrice.toFixed(2)}
                </div>
                <button
                  style={{
                    padding: '10px 20px',
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
