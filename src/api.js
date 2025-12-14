const API_BASE = import.meta.env.VITE_API_URL || ''

export async function fetchShops() {
  const res = await fetch(`${API_BASE}/myapp/shops/v1.0`)
  if (!res.ok) throw new Error('Failed to fetch shops')
  const data = await res.json()
  return data.shops || []
}

export async function fetchItems() {
  const res = await fetch(`${API_BASE}/myapp/items/v1.0`)
  if (!res.ok) throw new Error('Failed to fetch items')
  const data = await res.json()
  return data.items || []
}

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/myapp/users/v1.0`)
  if (!res.ok) throw new Error('Failed to fetch users')
  const data = await res.json()
  return data.users || []
}

export default { fetchShops, fetchItems, fetchUsers }
