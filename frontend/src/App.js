
import React, { useEffect, useState } from 'react'
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
import SearchBox from './components/SearchBox'
import SearchScreen from './screens/SearchScreen'
import { listProductCategories } from './actions/productActions'
import LoadingBox from './components/LoadingBox'
import MessageBox from './components/MessageBox'
import MapScreen from './screens/MapScreen'

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  const userSignin = useSelector((state) => state.userSignin)
  const {userInfo} = userSignin 
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }
  const productCategoryList = useSelector(state => state.productCategoryList)
  const {loading: loadingCategories, error: errorCategories, categories } = productCategoryList
  useEffect(() => {
    dispatch(listProductCategories())
  }, [dispatch])


  function hamburger_menu_button(){
    return (
        <button type="button" className="open-sidebar" onClick={() => setSidebarIsOpen(true)}>
          <i className="fa fa-bars"> </i>
        </button>
    )
  }

  function brand(){
    return (
      <Link className="brand" to="/"> Lundazon </Link>
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

  function categories_list(){
    return(
      <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {
              loadingCategories ? ( <LoadingBox> </LoadingBox> ) : 
              errorCategories ? (<MessageBox variant="danger">{errorCategories}</MessageBox>) :
              (
                categories.map((c) => (
                  <li key={c}>
                    <Link to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}>{c}</Link>
                  </li>
                ))
              )
            }
          </ul>
    )
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            {hamburger_menu_button()}
            {brand()}
          </div>
          <div>
            <Route render={({ history }) => ( <SearchBox history={history}></SearchBox> )}></Route>
          </div>
          <div>
            {cart_button()}
            {userInfo ? user_dropdown() :  signin_button()}
            {userInfo && userInfo.isSeller && seller_dropdown()}
            {userInfo && userInfo.isAdmin && admin_dropdown()}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : '' }>
          {categories_list()}
        </aside>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?/:qty?" component = {CartScreen}></Route>
          <Route exact path="/product/:id" component={ProductScreen}></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute exact path="/productlist" component={ProductListScreen}></AdminRoute>
          <AdminRoute exact path="/productlist/pageNumber/:pageNumber" component={ProductListScreen}></AdminRoute>

          <AdminRoute exact path="/orderlist" component={OrderListScreen}></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>
          <Route exact path="/" component={HomeScreen}></Route>
          <Route exact path="/search/name/:name?" component={SearchScreen}></Route>
          <Route exact path="/search/category/:category" component={SearchScreen}></Route>
          <Route exact path="/search/category/:category/name/:name" component={SearchScreen}></Route>
          <Route exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" component={SearchScreen}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
