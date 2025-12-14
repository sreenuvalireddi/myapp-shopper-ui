import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function OtpVerify() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state || {}
  const [identifier, setIdentifier] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    // Try to read identifier from location state or sessionStorage
    if (state.email) setIdentifier(state.email)
    else if (state.phone) setIdentifier(state.phone)
    else {
      try {
        const reg = JSON.parse(sessionStorage.getItem('registration') || '{}')
        if (reg.email) setIdentifier(reg.email)
        else if (reg.phone) setIdentifier(reg.phone)
      } catch (e) {}
    }

    // Simulate sending OTP
    setTimeout(() => setSent(true), 400)
  }, [])

  const handleVerify = (e) => {
    e.preventDefault()
    setError('')
    if (!otp || !/^[0-9]{4,6}$/.test(otp)) return setError('Enter the 4–6 digit OTP')

    // Demo: validate against hardcoded OTP value '123456'
    const FIXED_OTP = '123456'
    if (otp !== FIXED_OTP) {
      return setError('Incorrect OTP')
    }

    // OTP matched — proceed to home
    try { sessionStorage.removeItem('registration') } catch (e) {}
    navigate('/home')
  }

  const handleResend = () => {
    setSent(false)
    setTimeout(() => {
      setSent(true)
      alert('OTP resent (demo)')
    }, 600)
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleVerify} aria-label="OTP verification form">
        <h1 className="logo">Verify OTP</h1>

        <p className="note">We sent a one-time code to <strong>{identifier || 'your contact'}</strong>.</p>

        <label htmlFor="otp">Enter code</label>
        <input id="otp" inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} placeholder="123456" />

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn">Verify</button>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
          <button type="button" className="btn" onClick={handleResend} style={{background:'#6b7280'}}>Resend</button>
          <small style={{color:'#6b7280'}}>{sent ? 'OTP sent' : 'Sending...'}</small>
        </div>
      </form>
    </main>
  )
}
