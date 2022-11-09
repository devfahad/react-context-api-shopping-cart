import {Button, Form} from "react-bootstrap";
import {CartState} from "../context/Context";
import Rating from "./Rating";

const Filters = () => {
    const {
        productState: {byStock, byFastDelivery, sort, byRating},
        productDispatch,
    } = CartState();

    // console.log(byStock, byFastDelivery, sort, byRating, searchQuery);

    return (
        <div className='filters'>
            <span className='title'>Filter Products</span>
            <Form.Group className='mb-3'>
                <Form.Check
                    inline
                    label='Ascending'
                    name='group1'
                    type='radio'
                    id={`inline-1`}
                    onChange={() => {
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "lowToHigh",
                        });
                    }}
                    checked={sort === "lowToHigh" ? true : false}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Check
                    inline
                    label='Descending'
                    name='group1'
                    type='radio'
                    id={`inline-2`}
                    onChange={() => {
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "highToLow",
                        });
                    }}
                    checked={sort === "highToLow" ? true : false}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Check
                    inline
                    label='Include Out of Stock'
                    name='group1'
                    type='checkbox'
                    id={`inline-3`}
                    onChange={() => {
                        productDispatch({
                            type: "FILTER_BY_STOCK",
                        });
                    }}
                    checked={byStock}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Check
                    inline
                    label='Fast Delivery Only'
                    name='group1'
                    type='checkbox'
                    id={`inline-4`}
                    onChange={() => {
                        productDispatch({
                            type: "FILTER_BY_DELIVERY",
                        });
                    }}
                    checked={byFastDelivery}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label style={{paddingRight: 10}}>Rating: </Form.Label>
                <Rating
                    rating={byRating}
                    onClick={(i) => {
                        productDispatch({
                            type: "FILTER_BY_RATING",
                            payload: i + 1,
                        });
                    }}
                    style={{cursor: "pointer"}}
                />
            </Form.Group>

            <Button
                variant='light'
                onClick={() => {
                    productDispatch({
                        type: "CLEAR_FILTERS",
                    });
                }}
            >
                Clear Filters
            </Button>
        </div>
    );
};

export default Filters;
