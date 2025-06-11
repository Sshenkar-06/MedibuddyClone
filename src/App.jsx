import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import MedicineHome from './pages/MedicineHome'
import SearchResults from './pages/SearchResults'
import ShopByCategory from './pages/ShopByCategory'
import CartProvider from './context/CartContext'
import Login from './pages/Login'
import Cart from './pages/Cart'
import PrivateRoute from './routes/PrivateRoute'
import AuthProvider from './context/AuthContext'
import PatientDetails from './pages/PatientDetails'

function App() {

  return (
    <>
      <CartProvider>
        <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='' element={<Home />}></Route>
            <Route path='home' element={<Home />}></Route>
            <Route path='order-medicine' element={<MedicineHome />}></Route>
            <Route path='order-medicine/search/:searchKey' element={<SearchResults />}></Route>
            <Route path='order-medicine/category/:categoryName' element={<ShopByCategory />}></Route>
            <Route path='cart' element={<PrivateRoute> <Cart/> </PrivateRoute>}></Route>
            <Route path='login' element={<Login/>}></Route>
            <Route path='patient-details' element={<PatientDetails/>}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </>
  )
}

export default App
