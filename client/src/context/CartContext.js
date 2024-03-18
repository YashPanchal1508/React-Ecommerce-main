import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/CartReducer"


const CartContext = createContext();

const getCartData = () => {

    let localCartData = localStorage.getItem("yashCart")

    // if (localCartData === []) {
    //     return [];
    // }

    // else {
    //     return JSON.parse(localCartData)

    // }

    const parseData = JSON.parse(localCartData);
    if(!Array.isArray(parseData)) return [];

    return parseData


}

const initialState = {
    // cart : [],
    cart: getCartData(),
    total_item: "",
    total_amount: 0,
    shipping_fee: 50000,
}

const CartProvider = ({ children }) => {


    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, amount, color, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, amount, color, product } })
    }


    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREASE", payload: id })
    }

    const setIncrease = (id) => {
        dispatch({ type: "SET_INCREASE", payload: id })
    }

    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    }

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }

    useEffect(() => {

        dispatch({ type: "CART_TOTAL_ITEM" })
        dispatch({type: "CART_TOTAL_PRICE"})
        localStorage.setItem("yashCart", JSON.stringify(state.cart))
    }, [state.cart])





    return <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setDecrease, setIncrease }}>
        {children}
    </CartContext.Provider>
}

const useCartContext = () => {
    return useContext(CartContext)
}

export { CartProvider, useCartContext }