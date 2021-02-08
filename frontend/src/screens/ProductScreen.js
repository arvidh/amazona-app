import React, { useEffect, useState } from 'react'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { createReview, detailsProduct } from '../actions/productActions'

export default function ProductScreen(props){

    const dispatch = useDispatch()
    const productId = props.match.params.id
    const [qty, setQty] = useState(1)

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {uloading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate} = productReviewCreate

    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)

    console.log("ProductScreen")
    console.log("productDetails: "+JSON.stringify(productDetails))

    useEffect(() => {
        if (successReviewCreate){
            window.alert('Review Submitted Successfully')
        }
        console.log("ProductScreen useEffect")
        dispatch(detailsProduct(productId))
        
    }, [dispatch, productId, successReviewCreate])

    const addToCartHandler = () => {
        console.log("add to cart handler qty="+qty)
       // props.history.push(`/cart/${productId}?qty={qty}`)
        props.history.push(`/cart/${productId}/${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (comment && rating) {
            dispatch(createReview(productId, {rating, comment, name: userInfo.name}))
        }
        else {
            alert('Please enter comment')
        }
    }

    function set_quantity(q){
        console.log("set_quantity: "+q)
        setQty(parseInt(q))
    }

    function product_review_form(){
        return (
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h2>Write a customer review</h2>
                </div>
                <div>
                    <label htmlFor="rating" Rating></label>
                    <select id="rating" value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very good</option>
                            <option value="5">5 - Excellent</option>
                        </select>
                </div>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}>

                    </textarea>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">Submit</button>
                </div>
                <div>
                {loadingReviewCreate && <LoadingBox></LoadingBox>}
                {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                </div>
            </form>
        )
    }

    function product_reviews(){
        return (
            <div>
                <h2 id="reviews">Reviews</h2>
                {product.reviews.length === 0 && (<MessageBox>There is no review.</MessageBox>)}
                <ul>
                    {product.reviews.map((review) => (
                        <li key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating rating={review.rating} caption=" "></Rating>
                            <p> {review.createdAt.substring(0, 10)} </p>
                            <p>{review.comment}</p>
                        </li>
                    ))}
                    <li>
                        {
                            userInfo ? product_review_form()
                            : (
                                <MessageBox>
                                    Please <Link to="/signin">Sign In</Link> to write a review
                                </MessageBox>
                            )
                        }
                    </li>
                </ul>
            </div>
        )
    }

    function product_image(){
        return (
            <img className="large" src={product.image} alt={product.name}></img>
        )
    }

    function product_card(){
        return (
            <div className="card card-body">
                <ul>
                    <li>
                        Seller <h2>
                            <Link to={`/seller/${product.seller._id}`}>{product.seller.seller.name}</Link>
                        </h2>
                        <Rating rating={product.seller.seller.rating} numReviews={product.seller.seller.numReviews}></Rating>
                    </li>
                    <li>
                        <div className="row">
                            <div>Price</div>
                            <div className="price">${product.price}</div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? (<span className="success">In Stock</span>) : (<span className="danger">Unavailable</span>)}</div>
                        </div>
                    </li>
                        {
                            product.countInStock > 0 && (
                                <>
                                <li>
                                    <div className="row">
                                        <div>Qty</div>
                                        <div>
                                            <select value={qty} onChange={e => set_quantity((e.target.value))}>
                                                {
                                                    [...Array(product.countInStock).keys()].map(x =>
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                    <li>
                                        <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                    </li>
                                </>
                            )
                        } 
                </ul>
            </div>
        )
    }

    function product_description(){
        return (
            <ul>
                <li>
                    <h1>{product.name}</h1>
                </li>
                <li>
                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                </li>
                <li>
                    Price: ${product.price}
                </li>
                <li>
                    Description: 
                    <p>{product.description}</p>
                </li>
            </ul>
        )
    }

    return (
        <div>
            {
                loading ? (<LoadingBox></LoadingBox>) : 
                error ? (<MessageBox variant="danger">{error}</MessageBox>) : 
                (
                    <div>
                        <Link to="/">Back to results</Link>
                        <div className="row top">
                            <div className="col-2"> {product_image()}       </div>
                            <div className="col-1"> {product_description()} </div>
                            <div className="col-1"> {product_card()}        </div>
                        </div>
                        {product_reviews()}
                    </div>
                )
            }
        </div>
    )
}