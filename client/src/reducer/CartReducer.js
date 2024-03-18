

const CartReducer = (state, action) => {

    if (action.type === "ADD_TO_CART") {
        let { id, color, amount, product } = action.payload;
        // console.log(product);

        let existingProduct = state.cart.find((curElem) => curElem.id === id + color)

        if (existingProduct) {

            let updatedProduct = state.cart.map((curElem) => {

                if (curElem.id === id + color) {
                    let newAmount = curElem.amount + amount;

                    if(newAmount >= curElem.max){
                         newAmount = curElem.max
                    }

                    return {
                        ...curElem,
                        amount: newAmount
                    }
                }
                else{
                    return curElem
                }
            })

            

            return {
                ...state,
                cart :updatedProduct
            }

        } else {
            let cartProduct = {
                id: id + color,
                name: product.name,
                color,
                amount,
                image: product.image[0].url,
                price: product.price,
                max: product.stock,
            };

            return {
                ...state,
                cart: [...state.cart, cartProduct],
            };
        }
    }

    if(action.type === "SET_DECREASE"){
        const updatedProduct = state.cart.map((curElem) => {

            if(curElem.id === action.payload){
                let decAmount = curElem.amount - 1;

                if(decAmount <= 1){
                    decAmount = 1
                }


                return{
                    ...curElem,
                    amount: decAmount
                }
            }
            else{
                return curElem 
            }

        })  
        return{
            ...state,
            cart :updatedProduct
        }
    }

    if(action.type === "SET_INCREASE"){

        let updatedProduct = state.cart.map((curElem) => {

            if(curElem.id === action.payload){
                let incrementAmount = curElem.amount + 1;

                if(incrementAmount >= curElem.max){
                    incrementAmount = curElem.max
                }
                return{
                    ...curElem,
                    amount: incrementAmount
                }
            }
            else{
                return {...curElem}
            }

        })
        return{
            ...state,
            cart: updatedProduct
        }
    }







    if (action.type === "REMOVE_ITEM") {


        let updatedCart = state.cart.filter((curElem) => curElem.id !== action.payload);

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            cart: []
        }
    }

    if(action.type === "CART_TOTAL_ITEM"){

            let updatedCartItem = state.cart.reduce((initialValue, curElem) => {

              let {amount} = curElem  

               initialValue = initialValue + amount

              return initialValue
            }, 0)

        return{
            ...state,
            total_item: updatedCartItem
        }
    }

    if(action.type === "CART_TOTAL_PRICE"){

        let updatedTotalAmount = state.cart.reduce((initialValue, curElem) => {
            const {amount, price} = curElem

            initialValue = initialValue + price * amount 

            return initialValue;

        } , 0)

        return {
            ...state,
            total_amount: updatedTotalAmount
        }
    }

    return state

}

export default CartReducer