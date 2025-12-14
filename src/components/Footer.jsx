import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <small>© {new Date().getFullYear()} MyApp — Demo project</small>
      </div>
    </footer>
  )
}
