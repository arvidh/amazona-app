import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import MessageBox from '../components/MessageBox'

export default function CartScreen(props) {
    const productId = props.match.params.id
    //const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1
    const qty = props.match.params.qty || 1
    const cart = useSelector(state => state.cart)
    const {cartItems, error} = cart

    const dispatch = useDispatch()
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }
    console.log("CartScreen")
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    function change_quantity(item, e){
        let value = e.target.value
        console.log("Quantity changed: "+value+" Nan:"+isNaN(value))
        dispatch(addToCart(item.product, value))
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {error && (<MessageBox variant="danger">{error}</MessageBox>)}
                {cartItems.length === 0 ? <MessageBox>
                    Cart is empty. <Link to="/"> Go shopping</Link>
                </MessageBox>
            :
            (
                <ul>
                    {
                        cartItems.map((item) => (
                            <li key={item.product}>
                                <div className="row">
                                    <div>
                                        <img src={item.image} alt={item.name} className="small"></img>
                                    </div>
                                    <div className="min-30">
                                        <Link to={`/product/${item.product}`} > {item.name} </Link>
                                    </div>
                                    <div>
                                        <select value={item.qty} onChange={e =>  change_quantity(item, e)}>
                                            {[...Array(item.countInStock).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        ${item.price}
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCartHandler(item.product)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>

                            </li>
                        )) 
                    }
                    
                </ul>
            )   } 
            
            </div>
            <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>
                                    Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0) } items) : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0) } 
                                </h2>
                            </li>
                            <li>
                                <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>
                                    Proceed to checkout
                                </button>
                            </li>
                        </ul>
                    </div>
            </div>
           
        </div>
    )
}