import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ProductPage from './components/ProductPage'
import ProductDetails from './components/ProductDetails'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  )
}

export default App
