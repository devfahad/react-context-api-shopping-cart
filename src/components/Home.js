import React from "react";
import {CartState} from "../context/Context";
import SingleProduct from "./SingleProduct";
import Filters from "./Filters";
import "./styles.css";

const Home = () => {
    const {
        state: {products},
        productState: {byStock, byFastDelivery, sort, byRating, searchQuery},
    } = CartState();
    // console.log(products);

    const transformProducts = () => {
        let sortedProducts = products;

        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) =>
                sort === "lowToHigh" ? a.price - b.price : b.price - a.price
            );
        }

        if (!byStock) {
            // at first, show products which are in stock only
            sortedProducts = sortedProducts.filter(
                (product) => product.inStock
            );
        }

        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter(
                (product) => product.fastDelivery
            );
        }

        if (byRating) {
            sortedProducts = sortedProducts.filter(
                (product) => product.ratings === byRating
            );
        }

        if (searchQuery) {
            sortedProducts = sortedProducts.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return sortedProducts;
    };

    return (
        <div className='home'>
            <Filters />
            <div className='productContainer'>
                {transformProducts().map((product) => (
                    <SingleProduct product={product} key={product.id} />
                ))}
            </div>
        </div>
    );
};

export default Home;
