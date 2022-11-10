import faker from "faker";
import React, {createContext, useContext, useReducer} from "react";
import {cartReducer, productReducer} from "./Reducers";

// Create context
const Cart = createContext();

// It renders one type of data
faker.seed(99);

const Context = ({children}) => {
    const products = [...Array(20)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.random.image(),
        inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    }));

    const initialCartState = {
        products: products,
        cart: [],
    };

    const initialProductState = {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
    };

    // Creating Reducers
    // useReducer hook returns an array of 2 elements, (state & dispatch method)
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    const [productState, productDispatch] = useReducer(
        productReducer,
        initialProductState
    );

    return (
        <Cart.Provider value={{state, dispatch, productState, productDispatch}}>
            {children}
        </Cart.Provider>
    );
};

export default Context;

// In order to use the Context in a child component, we need to access it using the useContext Hook.
// useContext hook is doing the consumer role here.
export const CartState = () => {
    return useContext(Cart);
};
