import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ManageShops() {
  const navigate = useNavigate()

  const shopActions = [
    {
      id: 'add-shop',
      title: 'Add Shop',
      description: 'Create a new shop',
      icon: '➕',
      action: 'add'
    },
    {
      id: 'update-shop',
      title: 'Update Shop',
      description: 'Edit existing shop details',
      icon: '✏️',
      action: 'update'
    },
    {
      id: 'archive-shop',
      title: 'Archive Shop',
      description: 'Archive or delete shops',
      icon: '🗄️',
      action: 'archive'
    }
  ]

  const handleAction = (action) => {
    // Navigate to specific action pages
    navigate(`/shops/${action}`)
  }

  return (
    <div className="home-root">
      <Header />

      <main className="home-main">
        <section className="hero">
          <h2>Manage Shops</h2>
          <p className="lead">Choose an action to manage your shops</p>
          <button
            onClick={() => navigate('/home')}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              background: '#6b7280',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ← Back to Dashboard
          </button>
        </section>

        <section className="content-cards">
          {shopActions.map((action) => (
            <div
              key={action.id}
              className="card"
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: '30px 20px'
              }}
              onClick={() => handleAction(action.action)}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {action.icon}
              </div>
              <strong style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>
                {action.title}
              </strong>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                {action.description}
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}
