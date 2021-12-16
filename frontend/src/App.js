import Layout from "./pages/Layout/Layout";
import "./bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserProfile from './pages/UserProfile/UserProfile'
import Shipping from "./pages/Shipping/Shipping";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import PaymentMethod from "./pages/PaymentMethod/PaymentMethod";
import Order from "./pages/Order/Order";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/profile/" element={<UserProfile />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />}/>
          
          <Route path="/payment" element={<PaymentMethod />}/>
          <Route path="/placeorder" element={<PlaceOrder />}/>
          <Route path="/order/:id" element={<Order />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
