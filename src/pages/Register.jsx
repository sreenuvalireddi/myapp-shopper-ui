import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../store'

function isPhone(s) {
  return /^\+?[0-9]{7,15}$/.test(s)
}

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  // captcha
  const rand = () => Math.floor(Math.random() * 9) + 1
  const [captcha, setCaptcha] = useState({ a: rand(), b: rand() })
  const [captchaInput, setCaptchaInput] = useState('')
  const captchaSum = Number(captcha.a) + Number(captcha.b)
  const captchaNumber = captchaInput === '' ? NaN : Number(captchaInput)
  const captchaValid = Number.isFinite(captchaNumber) && captchaNumber === captchaSum
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e && e.preventDefault()
    setError('')
    if (!firstName.trim()) return setError('Please enter first name')
    if (!lastName.trim()) return setError('Please enter last name')
    if (!phone.trim()) return setError('Please enter phone number')
    if (!isPhone(phone)) return setError('Enter a valid phone number')
    if (!email.trim()) return setError('Please enter email')
    // minimal email check
    if (!/\S+@\S+\.\S+/.test(email)) return setError('Enter a valid email')
    if (!password) return setError('Please enter password')
    if (password.length < 6) return setError('Password must be at least 6 characters')
    if (!confirmPassword) return setError('Please confirm your password')
    if (password !== confirmPassword) return setError('Passwords do not match')
    if (!captchaValid) return setError('Captcha incorrect')

    // Save registration to redux store and navigate to OTP verification page (OTP handled separately)
    const registration = { firstName, lastName, phone, email, password }
    try { dispatch(registerUser(registration)) } catch (e) {}
    navigate('/verify-otp', { state: registration })
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit} aria-label="Register form">
        <h1 className="logo">Create account</h1>

        <div className="form-grid">
          <div>
            <label htmlFor="firstName">First name</label>
            <input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div>
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>

        <label htmlFor="phone">Phone number</label>
        <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+15551234567" />
        
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        
        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter password"
          autoComplete="new-password"
        />
        
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
          id="confirmPassword" 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm password"
          autoComplete="new-password"
        />
        
        <div style={{height:8}} />
        <label htmlFor="captcha">Captcha: What is {captcha.a} + {captcha.b} ?</label>
        <div style={{display:'flex',gap:8,alignItems:'center',marginTop:6}}>
          <input id="captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value.replace(/[^0-9]/g, ''))} placeholder="Answer" style={{width:100}} />
          <button type="button" onClick={() => { setCaptcha({ a: rand(), b: rand() }); setCaptchaInput(''); setError('') }} className="btn" style={{background:'#6b7280'}}>Refresh</button>
        </div>
        {captchaInput !== '' && !captchaValid && <div className="error" style={{marginTop:8}}>Captcha incorrect</div>}
        {error && <div className="error">{error}</div>}

        <div style={{height:8}} />
        <button type="submit" className="btn" disabled={!captchaValid}>Create account</button>
        
        <p className="note">By creating an account you agree to the demo terms.</p>
      </form>
    </main>
  )
}
