import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AddShop() {
  const navigate = useNavigate()
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  
  const [shopName, setShopName] = useState('')
  const [district, setDistrict] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [description, setDescription] = useState('')
  
  const [gstinNumber, setGstinNumber] = useState('')
  const [panNumber, setPanNumber] = useState('')
  const [aadhaarNumber, setAadhaarNumber] = useState('')
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!firstName || !lastName || !phoneNumber || !email) {
      return setError('Please fill all owner details')
    }
    
    if (!shopName || !district || !address || !pincode) {
      return setError('Please fill required shop details')
    }
    
    console.log('Shop data:', {
      owner: { firstName, lastName, phoneNumber, email },
      shop: { shopName, district, address, pincode, description },
      business: { gstinNumber, panNumber, aadhaarNumber }
    })
    
    setSuccess('Shop added successfully!')
    setTimeout(() => navigate('/shops'), 2000)
  }

  return (
    <div className="home-root">
      <Header />
      <main className="home-main">
        <section className="hero">
          <h2>Add New Shop</h2>
          <p className="lead">Fill in the details to create a new shop</p>
          <button onClick={() => navigate('/shops')} style={{ marginTop: '16px', padding: '8px 16px', background: '#6b7280', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>← Back to Manage Shops</button>
        </section>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>Owner Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div><label htmlFor="firstName" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>First Name *</label><input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} required /></div>
                <div><label htmlFor="lastName" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Last Name *</label><input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} required /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div><label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Phone Number *</label><input id="phoneNumber" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+1234567890" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} required /></div>
                <div><label htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email ID *</label><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} required /></div>
              </div>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>Shop Details</h3>
              <div><label htmlFor="shopName" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Shop Name *</label><input id="shopName" type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="Enter shop name" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} required /></div>
              <div style={{ marginTop: '16px' }}><label htmlFor="district" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>District *</label><input id="district" type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Enter district" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} required /></div>
              <div style={{ marginTop: '16px' }}><label htmlFor="address" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Address *</label><textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter shop address" rows="3" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', resize: 'vertical' }} required /></div>
              <div style={{ marginTop: '16px' }}><label htmlFor="pincode" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Pincode *</label><input id="pincode" type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter pincode" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} required /></div>
              <div style={{ marginTop: '16px' }}><label htmlFor="description" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Description</label><textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter shop description (optional)" rows="4" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', resize: 'vertical' }} /></div>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>Business Details</h3>
              <div><label htmlFor="gstinNumber" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>GSTIN Number</label><input id="gstinNumber" type="text" value={gstinNumber} onChange={(e) => setGstinNumber(e.target.value)} placeholder="Enter GSTIN number (optional)" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div><label htmlFor="panNumber" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>PAN Number</label><input id="panNumber" type="text" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} placeholder="Enter PAN number (optional)" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} /></div>
                <div><label htmlFor="aadhaarNumber" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Aadhaar Number</label><input id="aadhaarNumber" type="text" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} placeholder="Enter Aadhaar number (optional)" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} /></div>
              </div>
            </div>
            {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#dc2626', borderRadius: '6px' }}>{error}</div>}
            {success && <div style={{ padding: '12px', background: '#d1fae5', color: '#059669', borderRadius: '6px' }}>{success}</div>}
            <button type="submit" className="btn" style={{ padding: '12px 24px', fontSize: '16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Add Shop</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}
