import React from "react";
import {
    Badge,
    Button,
    Container,
    Dropdown,
    Form,
    Nav,
    Navbar,
} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";
import {CartState} from "../context/Context";
import {AiFillDelete} from "react-icons/ai";

const Header = () => {
    const {
        state: {cart},
        dispatch,
        productDispatch,
    } = CartState();
    // console.log(cart);

    return (
        <Navbar bg='dark' variant='dark' style={{height: 80}}>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>Shopping Cart</Link>
                </Navbar.Brand>
                <Navbar.Text className='search'>
                    <Form.Control
                        type='search'
                        style={{width: 500}}
                        placeholder='Search a product'
                        className='m-auto'
                        aria-label='Search'
                        onChange={(e) => {
                            productDispatch({
                                type: "FILTER_BY_SEARCH",
                                payload: e.target.value,
                            });
                        }}
                    />
                </Navbar.Text>
                <Nav>
                    <Dropdown align='end'>
                        <Dropdown.Toggle variant='success'>
                            <FaShoppingCart color='white' fontSize='20px' />
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{minWidth: 370}}>
                            {cart.length ? (
                                <>
                                    {cart.map((product) => (
                                        <span
                                            className='cartitem'
                                            key={product.id}
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className='cartItemImg'
                                            />
                                            <div className='cartItemDetail'>
                                                <span>{product.name}</span>
                                                <span>${product.price}</span>
                                            </div>
                                            <AiFillDelete
                                                fontSize='20px'
                                                style={{cursor: "pointer"}}
                                                onClick={() => {
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: product,
                                                    });
                                                }}
                                            />
                                        </span>
                                    ))}
                                    <Link to='/cart'>
                                        <Button
                                            style={{
                                                width: "95%",
                                                margin: "0 10px",
                                            }}
                                        >
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <span style={{padding: 10}}>
                                    Cart is Empty!
                                </span>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
