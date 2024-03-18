const filterReducer = (state, action) => {

    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":

            let priceArr = action.payload.map((curElem) => curElem.price)
            // console.log(priceArr);

            let maxPrice = Math.max(...priceArr)
            // console.log(maxPrice);
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: { ...state.filters, maxPrice, price: maxPrice }
            }

        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view: true,
            }

        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view: false,
            };

        case "GET_SORT_VALUE":

            // const userValue = document.getElementById("sort");
            // const sortValue = userValue.options[userValue.selectedIndex].value;

            return {
                ...state,
                sorting_value: action.payload
            }

        case "SORTING_PRODUCTS":

            const { filter_products } = state;

            let newSortData;
            let tempSortData = [...filter_products];

            //sort in ascending order
            const sortingProducts = (a, b) => {

                //sort in lowest to highest
                if (state.sorting_value === "lowest") {
                    return a.price - b.price
                }

                //sort in highest to lowest
                if (state.sorting_value === "highest") {
                    return b.price - a.price
                }

                //sort in ascending order
                if (state.sorting_value === "a-z") {
                    return a.name.localeCompare(b.name)
                }

                //sort in descending order
                if (state.sorting_value === "z-a") {
                    return b.name.localeCompare(a.name)
                }



            }

            newSortData = tempSortData.sort(sortingProducts);

            return {
                ...state,
                filter_products: newSortData,
            }

        case "UPDATE_FILTER_VALUE":
            const { name, value } = action.payload
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                }

            }

        case "FILTER_PRODUCTS":
            let { all_products } = state
            let tempFilterProducts = [...all_products]
            const { text, category, company, color, price } = state.filters
            if (text) {
                tempFilterProducts = tempFilterProducts.filter((curElem) => {
                    return curElem.name.toLowerCase().includes(text);
                });
            }

            if (category !== "all") {
                tempFilterProducts = tempFilterProducts.filter((curElem) => {
                    return curElem.category === category
                })
            }

            if (company === "all"){
                tempFilterProducts = tempFilterProducts.filter((curElem) => {
                    return curElem
                })
            }else {
                tempFilterProducts = tempFilterProducts.filter((curElem) => {
                    return curElem.company.toLowerCase()  === company.toLowerCase()
                })
            }

            if (color !== "all") {
                tempFilterProducts = tempFilterProducts.filter((curElem) => {
                    return curElem.colors.includes(color)
                })
            }

            if (price){
                tempFilterProducts = tempFilterProducts.filter((curElem) => {
                    return curElem.price <= price
                })
            }


            return {
                ...state,
                filter_products: tempFilterProducts
            }

        case "CLEAR_FILTERS":
        
            return {
                ...state,  
                filters: {
                    ...state.filters,
                    text: "",
                    category: "all",
                    company: "all",
                    color: "all",
                    maxPrice: state.filters.maxPrice,
                    price: state.filters.maxPrice,
                    minPrice: state.filters.minPrice
                }
            }



        default:
            return state;
    }


}

export default filterReducer