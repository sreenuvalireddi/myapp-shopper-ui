import React, { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useShops } from '../context/ShopsContext'
import { fetchItems } from '../api'

export default function Items() {
  const { currentShop, cartItems, setCartItems } = useShops()
  const [itemQuantities, setItemQuantities] = useState({})
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchItems()
      .then((data) => {
        if (!mounted) return
        // map external shape to app shape
        const mapped = data.map((it) => ({
          itemId: it.id,
          itemName: it.name,
          itemCategory: it.category || '',
          price: typeof it.price === 'number' ? it.price : parseFloat(it.price) || 0,
          quantity: it.quantity || 10,
          image: it.image || 'https://via.placeholder.com/300x150?text=Item',
          shopId: it.shopId || null
        }))
        setItems(mapped)
      })
      .catch((err) => {
        console.error('Failed to load items', err)
        if (mounted) setError(err.message || 'Failed to load items')
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  // filter by current shop if selected
  const visibleItems = useMemo(() => {
    let list = items
    if (currentShop && currentShop.shopId) {
      list = list.filter((it) => it.shopId ? it.shopId === currentShop.shopId : true)
    }
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter((item) => item.itemName.toLowerCase().includes(q) || item.itemCategory.toLowerCase().includes(q))
  }, [items, currentShop, query])

  return (
    <div className="home-root">
      <Header />

      <main className="home-main">
        <section className="hero">
          <h2>{currentShop ? currentShop.shopName : 'Items'}</h2>
          <p className="lead">Browse and select items</p>

          <div className="home-controls">
            <input
              className="search"
              placeholder="Search items..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search items"
            />
          </div>
        </section>

        <section className="content-cards">
          <h3 style={{ gridColumn: '1 / -1', marginBottom: 10 }}>
            {query ? 'Search results' : 'Available items'}
          </h3>

          {loading && <div style={{ gridColumn: '1 / -1' }}>Loading items…</div>}
          {error && <div style={{ gridColumn: '1 / -1', color: 'red' }}>{error}</div>}

          {visibleItems.map((item) => (
            <div
              key={item.itemId}
              className="card"
            >
              <img 
                src={item.image} 
                alt={item.itemName} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <strong style={{ marginTop: 10, display: 'block' }}>{item.itemName}</strong>
              <div style={{ marginTop: 8, fontSize: '14px', color: '#6b7280' }}>{item.itemCategory}</div>
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>Price: ${item.price.toFixed(2)}</span>
                <span>Qty: {item.quantity}</span>
              </div>
              {itemQuantities[item.itemId] ? (
                <div style={{
                  marginTop: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '6px',
                  background: '#f3f4f6',
                  borderRadius: '4px'
                }}>
                  <button
                    onClick={() => {
                      const newQty = itemQuantities[item.itemId] - 1
                      if (newQty === 0) {
                        const newQuantities = { ...itemQuantities }
                        delete newQuantities[item.itemId]
                        setItemQuantities(newQuantities)
                        setCartItems((s) => s.filter(cartItem => cartItem.itemId !== item.itemId))
                      } else {
                        setItemQuantities((prev) => ({ ...prev, [item.itemId]: newQty }))
                        setCartItems((s) => s.map(cartItem => 
                          cartItem.itemId === item.itemId 
                            ? { ...cartItem, cartQuantity: newQty }
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
                  <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                    {itemQuantities[item.itemId]}
                  </span>
                  <button
                    onClick={() => {
                      const newQty = (itemQuantities[item.itemId] || 0) + 1
                      setItemQuantities((prev) => ({ ...prev, [item.itemId]: newQty }))
                      setCartItems((s) => s.map(cartItem => 
                        cartItem.itemId === item.itemId 
                          ? { ...cartItem, cartQuantity: newQty }
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
              ) : (
                <button
                  onClick={() => {
                    setItemQuantities((prev) => ({ ...prev, [item.itemId]: 1 }))
                    setCartItems((s) => [...s, { ...item, cartQuantity: 1 }])
                  }}
                  style={{
                    marginTop: 8,
                    padding: '6px 12px',
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    width: '100%',
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}
