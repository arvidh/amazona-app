import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from '../../node_modules/axios/index'
import { detailsProduct, updateProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

export default function ProductEditScreen(props) {
    const productId = props.match.params.id
    const [name, set_name] = useState('')
    const [price, set_price] = useState('')
    const [image, set_image] = useState('')
    const [category, set_category] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [brand, set_brand] = useState('')
    const [description, set_description] = useState('')
    const dispatch = useDispatch()

    const product_details = useSelector(state => state.productDetails)
    const {loading, error, product} = product_details

    const product_update = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = product_update

    const submit_handler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({_id: productId, name, price, image, category, brand, countInStock, description}))
       // TODO
    }

    useEffect(() => {
        if (successUpdate) {
            props.history.push('/productlist')
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            dispatch(detailsProduct(productId))
        }
        else {
            set_name(product.name)
            set_price(product.price)
            set_image(product.image)
            set_category(product.category)
            setCountInStock(product.countInStock)
            set_brand(product.brand)
            set_description(product.description)
        }
    }, [product, dispatch, productId, successUpdate, props.history])
    
    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState('')
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin

    const uploadFileHandler = async (e) => {
        console.log("uploadFileHandler")
        const file = e.target.files[0]
        const bodyFormData = new FormData()
        bodyFormData.append('image', file)
        setLoadingUpload(true)
        try {
            const { data } = await axios.post('/api/uploads', bodyFormData, {
                headers: { 
                    'Content-Type':'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                }
            } )
            set_image(data)
            setLoadingUpload(false)

        }
        catch (error){
            setErrorUpload(error.message)
            setLoadingUpload(false)
        }
    }

    return (
		<div>
            <form className="form" onSubmit={submit_handler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                <>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" placeholder="Enter name" value={name}
                        onChange={(e) => set_name(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input id="price" type="text" placeholder="Enter price" value={price}
                        onChange={(e) => set_price(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                        <input id="image" type="text" placeholder="Enter image" value={image}
                        onChange={(e) => set_image(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="imageFile">Image File</label>
                        <input id="imageFile" type="file" label="Choose image" 
                        onChange={uploadFileHandler}></input>
                        {loadingUpload && <LoadingBox></LoadingBox>}
                        {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                    </div>
                    <div>
                        <label htmlFor="category">category</label>
                        <input id="category" type="text" placeholder="Enter category" value={category}
                        onChange={(e) => set_category(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="countInStock">countInStock</label>
                        <input id="countInStock" type="text" placeholder="Enter countInStock" value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="brand">brand</label>
                        <input id="brand" type="text" placeholder="Enter brand" value={brand}
                        onChange={(e) => set_brand(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="description">description</label>
                        <textarea id="description" rows="3" type="text" placeholder="Enter description" value={description}
                        onChange={(e) => set_description(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label>

                        </label>
                        <button className="primary" type="submit">Update</button>
                    </div>
                </>
            }
            </form>
		</div>
	)

}