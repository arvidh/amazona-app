import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const cartReducer = (state = {cartItems:[]}, action ) => {
    console.log("cartReducer: "+JSON.stringify(action))
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            console.log("item: "+JSON.stringify(item))
            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem){
                console.log("existItem = true")
                let return_value = {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                }
                console.log("return_value: "+JSON.stringify(return_value))
                return return_value
            }
            else {
                console.log("existItem = false")
                let return_value = { ...state, cartItems: [...state.cartItems, item]}
                console.log("return_value: "+JSON.stringify(return_value))
                return return_value
            }
        case CART_REMOVE_ITEM:
            let return_value = {...state, cartItems: state.cartItems.filter( x => x.product !== action.payload)}
            console.log("return_value: "+JSON.stringify(return_value))
            return return_value
        default: return state
    }
}

