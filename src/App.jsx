import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NewArrivals from './components/NewArrivals'
import CategoriesSlider from './components/CategoriesSlider'
import Fabrics from './components/Categories'
import FeaturedCollection from './components/FeaturedCollection'
import Magazine from './components/Magazine'
import About from './components/About'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import Auth from './pages/Auth'
import Orders from './pages/Orders'
import AnarkaliPage from './pages/AnarkaliPage'
import PalazzoPage from './pages/PalazzoPage'
import StraightCutPage from './pages/StraightCutPage'
import ShararaPage from './pages/ShararaPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  const HomePage = () => (
    <>
      <Navbar 
        onCartOpen={() => setIsCartOpen(true)} 
        onWishlistOpen={() => setIsWishlistOpen(true)}
      />
      <Hero />
      <NewArrivals />
      <CategoriesSlider />
      <Fabrics />
      <FeaturedCollection />
      <Magazine />
      <About />
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  )

  const PageWithNav = ({ children }) => (
    <>
      <Navbar 
        onCartOpen={() => setIsCartOpen(true)} 
        onWishlistOpen={() => setIsWishlistOpen(true)}
      />
      {children}
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  )

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Auth Page */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Orders Page */}
              <Route path="/orders" element={<Orders />} />

              {/* Category Pages */}
              <Route path="/category/anarkali" element={<PageWithNav><AnarkaliPage /></PageWithNav>} />
              <Route path="/category/palazzo" element={<PageWithNav><PalazzoPage /></PageWithNav>} />
              <Route path="/category/straight-cut" element={<PageWithNav><StraightCutPage /></PageWithNav>} />
              <Route path="/category/sharara" element={<PageWithNav><ShararaPage /></PageWithNav>} />

              {/* Home Page */}
              <Route path="/*" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
