import { createContext, useContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('seemee-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
      return []
    }
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('seemee-wishlist')
      return savedWishlist ? JSON.parse(savedWishlist) : []
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error)
      return []
    }
  })

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('seemee-cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [cart])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('seemee-wishlist', JSON.stringify(wishlist))
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error)
    }
  }, [wishlist])

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[₹,]/g, ''))
      return total + (price * item.quantity)
    }, 0).toLocaleString('en-IN')
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === product.id)
      
      let newWishlist
      if (exists) {
        newWishlist = prevWishlist.filter(item => item.id !== product.id)
        console.log('Removed from wishlist:', product.name)
      } else {
        newWishlist = [...prevWishlist, product]
        console.log('Added to wishlist:', product.name)
      }
      
      console.log('New wishlist:', newWishlist)
      return newWishlist
    })
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  const getWishlistCount = () => {
    return wishlist.length
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        getWishlistCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
