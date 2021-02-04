import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

export const cartReducer = (state = {cartItems:[]}, action ) => {
    //console.log("cartReducer: "+JSON.stringify(action))
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            //console.log("item: "+JSON.stringify(item))
            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem){
               // console.log("existItem = true")
                let return_value = {
                    ...state,
                    error: '',
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                }
                //console.log("return_value: "+JSON.stringify(return_value))
                return return_value
            }
            else {
                //console.log("existItem = false")
                let return_value = { ...state, cartItems: [...state.cartItems, item]}
                //console.log("return_value: "+JSON.stringify(return_value))
                return return_value
            }
        case CART_ADD_ITEM_FAIL:
            return { ...state, error: action.payload}
        case CART_REMOVE_ITEM:
            let return_value = {...state, error: '', cartItems: state.cartItems.filter( x => x.product !== action.payload)}
            //console.log("return_value: "+JSON.stringify(return_value))
            return return_value
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload}
        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload}
        case CART_EMPTY:
            return {...state, error: '', cartItems:[]}
        default: return state
    }
}

