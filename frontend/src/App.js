import Layout from "./pages/Layout/Layout";
import "./bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from './pages/Product/Product'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Product />}/>
          <Route path='/product/:id' element={<ProductDetail />}/>
          <Route path='/cart/' element={<Cart />}/>
          <Route path='/cart/:id' element={<Cart />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
