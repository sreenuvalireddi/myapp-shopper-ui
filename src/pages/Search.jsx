import React, { useMemo, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useShops } from '../context/ShopsContext'

export default function Search() {
  const masterShops = [
    { shopId: 1, shopName: 'Fresh Mart', shopLocation: '123 Main St, Downtown' },
    { shopId: 2, shopName: 'QuickStop', shopLocation: '456 Oak Ave, Midtown' },
    { shopId: 3, shopName: 'Gourmet Groceries', shopLocation: '789 Pine Rd, Uptown' },
    { shopId: 4, shopName: 'Corner Store', shopLocation: '321 Elm St, Eastside' },
    { shopId: 5, shopName: 'Budget Bazaar', shopLocation: '654 Maple Dr, Westside' },
    { shopId: 6, shopName: 'Local Market', shopLocation: '987 Cedar Ln, Suburbs' },
    { shopId: 7, shopName: 'Premium Plus', shopLocation: '147 Birch Ct, Downtown' },
    { shopId: 8, shopName: 'Value Shop', shopLocation: '258 Willow Way, Midtown' },
    { shopId: 9, shopName: 'Express Mart', shopLocation: '369 Ash Blvd, Uptown' },
    { shopId: 10, shopName: 'Super Save', shopLocation: '741 Spruce Pl, Harbor' },
  ]

  const { selectedShops, setSelectedShops } = useShops()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return masterShops.filter(
      (shop) => shop.shopName.toLowerCase().includes(q) || shop.shopLocation.toLowerCase().includes(q)
    )
  }, [query])

  const isSelected = (shopId) => selectedShops.some((s) => s.shopId === shopId)

  const handleSelect = (shop) => {
    if (isSelected(shop.shopId)) {
      setSelectedShops((s) => s.filter((x) => x.shopId !== shop.shopId))
    } else {
      setSelectedShops((s) => [...s, shop])
    }
  }

  return (
    <div className="home-root">
      <Header />

      <main className="home-main">
        <section className="hero">
          <h2>Search & Select Shops</h2>
          <p className="lead">Find and select shops from the master list.</p>

          <div className="home-controls">
            <input
              className="search"
              placeholder="Search shops by name or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search shops"
            />
          </div>
        </section>

        <section className="content-cards">
          {query && filtered.length > 0 && (
            <>
              <h3 style={{ gridColumn: '1 / -1', marginBottom: 10 }}>Search results ({filtered.length})</h3>
              {filtered.map((shop) => (
                <div
                  key={shop.shopId}
                  className="card"
                  style={{
                    cursor: 'pointer',
                    opacity: isSelected(shop.shopId) ? 0.6 : 1,
                    border: isSelected(shop.shopId) ? '2px solid #2563eb' : '1px solid #e6e9ee',
                  }}
                  onClick={() => handleSelect(shop)}
                >
                  <strong>{shop.shopName}</strong>
                  <div style={{ marginTop: 8, fontSize: '14px', color: '#6b7280' }}>{shop.shopLocation}</div>
                  <small style={{ marginTop: 8, color: '#2563eb', fontWeight: 600 }}>
                    {isSelected(shop.shopId) ? '✓ Selected' : 'Click to select'}
                  </small>
                </div>
              ))}
            </>
          )}

          {query && filtered.length === 0 && (
            <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6b7280' }}>
              No shops found
            </div>
          )}

          {!query && (
            <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6b7280' }}>
              Type to search for shops...
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
