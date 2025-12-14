import { fetchShops, fetchItems, fetchUsers } from '../../api'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const shopService = {
  async getShops() {
    try {
      const shops = await fetchShops()
      return shops.map((s) => ({ shopId: s.id, shopName: s.name, shopLocation: s.location || s.address || '' }))
    } catch (error) {
      console.error('Error fetching shops:', error)
      throw error
    }
  },

  async getShopById(shopId) {
    try {
      const shops = await fetchShops()
      return shops.find((s) => s.id === shopId)
    } catch (error) {
      console.error('Error fetching shop:', error)
      throw error
    }
  },
}

export const itemService = {
  async getItems() {
    try {
      const items = await fetchItems()
      return items.map((it) => ({
        itemId: it.id,
        itemName: it.name,
        itemCategory: it.category || '',
        price: typeof it.price === 'number' ? it.price : parseFloat(it.price) || 0,
        quantity: it.quantity || 10,
        image: it.image || 'https://via.placeholder.com/300x150?text=Item',
        shopId: it.shopId || null,
      }))
    } catch (error) {
      console.error('Error fetching items:', error)
      throw error
    }
  },

  async getItemsByShop(shopId) {
    try {
      const items = await this.getItems()
      return items.filter((it) => it.shopId === shopId)
    } catch (error) {
      console.error('Error fetching items by shop:', error)
      throw error
    }
  },

  async getItemById(itemId) {
    try {
      const items = await this.getItems()
      return items.find((it) => it.itemId === itemId)
    } catch (error) {
      console.error('Error fetching item:', error)
      throw error
    }
  },
}

export const userService = {
  async getUsers() {
    try {
      const users = await fetchUsers()
      return users
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  async getUserById(userId) {
    try {
      const users = await fetchUsers()
      return users.find((u) => u.id === userId)
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  },
}

export default { shopService, itemService, userService }