
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import { signout } from './actions/userActions'
import HomeScreen from './screens//HomeScreen'
import CartScreen from './screens/CartScreen'
import ProductScreen from './screens/ProductScreen'
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import ProfileScreen from './screens/ProfileScreen'
import PrivateRoute from './components/PrivateRoute'
import ProductListScreen from './screens/ProductListScreen'
import AdminRoute from './components/AdminRoute'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import SellerRoute from './components/SellerRoute'
import SellerScreen from './screens/SellerScreen'

function App() {

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  const userSignin = useSelector((state) => state.userSignin)
  const {userInfo} = userSignin 
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }

  function brand(){
    return (
      <div>
        < Link className="brand" to="/">OddBits Webshop</Link>
      </div>
    )
  }

  function cart_button(){
    return (
      <Link to="/cart">Cart 
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
      </Link>
    )
  }

  function user_dropdown(){
    return (
      <div className="dropdown">
        <Link to ="#">{userInfo.name} <i className="fa fa-caret-down"> </i></Link>
        <ul className="dropdown-content">
          <li>
            <Link to="/profile">User Profile</Link>
          </li>
          <li>
            <Link to="/orderhistory">Order History</Link>
          </li>
          <li>
          <Link to="#signout" onClick={signoutHandler}>Sign out</Link>
          </li>
        </ul>
      </div>
    )
  }

  function signin_button(){
    return (
      <Link to="/signin">Sign In</Link>
    )
  }

  function admin_dropdown(){
    return (
      <div className="dropdown">
        <Link to="#admin">Admin {' '} 
          <i className="fa fa-caret-down"></i>
        </Link>
        <ul className="dropdown-content">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/productlist">Products</Link>
          </li>
          <li>
            <Link to="/orderlist">Orders</Link>
          </li>
          <li>
            <Link to="/userlist">Users</Link>
          </li>
        </ul>
      </div>
    )
  }

  function seller_dropdown(){
    return (
      <div className="dropdown">
        <Link to="#admin">Seller {' '} 
          <i className="fa fa-caret-down"></i>
        </Link>
        <ul className="dropdown-content">
          <li>
            <Link to="/productlist/seller">Products</Link>
          </li>
          <li>
            <Link to="/orderlist/seller">Orders</Link>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          {brand()}
          <div>
            {cart_button()}
            {userInfo ? user_dropdown() :  signin_button()}
            {userInfo && userInfo.isSeller && seller_dropdown()}
            {userInfo && userInfo.isAdmin && admin_dropdown()}
          </div>
        </header>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?/:qty?" component = {CartScreen}></Route>
          <Route path="/product/:id" exact component={ProductScreen}></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist" exact component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" exact component={OrderListScreen}></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>
          <Route exact path="/" component={HomeScreen}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
