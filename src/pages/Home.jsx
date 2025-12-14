import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  const navigate = useNavigate()

  const actions = [
    {
      id: 'manage-shops',
      title: 'Manage Shops',
      description: 'Add, edit, and manage your shops',
      icon: '🏪',
      path: '/shops'
    },
    {
      id: 'manage-items',
      title: 'Manage Items',
      description: 'Add, edit, and manage shop items',
      icon: '📦',
      path: '/items'
    },
    {
      id: 'manage-icons',
      title: 'Manage Icons',
      description: 'Upload and manage icon resources',
      icon: '🎨',
      path: '/icons'
    }
  ]

  return (
    <div className="home-root">
      <Header />

      <main className="home-main">
        <section className="hero">
          <h2>Admin Dashboard</h2>
          <p className="lead">Select an action to get started</p>
        </section>

        <section className="content-cards">
          {actions.map((action) => (
            <div
              key={action.id}
              className="card"
              style={{ 
                cursor: 'pointer',
                textAlign: 'center',
                padding: '30px 20px'
              }}
              onClick={() => navigate(action.path)}
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
