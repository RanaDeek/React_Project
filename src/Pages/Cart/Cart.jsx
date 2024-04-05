import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsPlusCircleFill } from "react-icons/bs";
import { HiMinusCircle } from "react-icons/hi2";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { toast, Zoom } from 'react-toastify'
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { TfiFaceSad } from "react-icons/tfi";

import './Cart.css'
import { useNavigate } from 'react-router-dom';
function Cart() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const Navigate = useNavigate();

  const getCart = async () => {
    setLoader(true);
    try {
      const token = localStorage.getItem('usertoken');
      const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      setProducts(data.products);
    } catch (error) {
      setLoader(false);
      toast('Error: ' + error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: true,
        theme: "dark",
        transition: Zoom,
      });
    } finally {
      setLoader(false);
    }
  }
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('usertoken');
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API}/cart/removeItem`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      setProducts(products);
    } catch (error) {
      toast('Error: ' + error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: true,
      });
    }
  }
  const decreaseItems = async (productId) => {
    const token = localStorage.getItem('usertoken');
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API}/cart/decraseQuantity`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });

    } catch (error) {
      toast('Error: ' + error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: true,
      });
    }
  }
  const increaseItems = async (productId) => {
    const token = localStorage.getItem('usertoken');
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API}/cart/incraseQuantity`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });

    } catch (error) {
      toast('Error: ' + error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: true,
      });
    }
  }
  const clearCart = async (e) => {
    e.preventDefault();
    setLoader(true);
    const token = localStorage.getItem('usertoken');
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API}/cart/clear`,
        null,
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        });
    } catch (error) {
      toast('Error: ' + error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: true,
      });
    } finally {
      setLoader(false);
      window.location.reload();
    }
  }
  const CHECKOUT = (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      Navigate('/order')
    } catch (error) {
      toast('Error: ' + error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: true,
      });
    }
    finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    const newSubtotal = products.reduce((total, product) => total + (product.quantity * product.details.finalPrice), 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + 80);
    getCart();
    setLoader(false);
  }, [products]);
  useEffect(() => {

  }, [total]);
  return (
    <>

      {
        products.length > 0 ? (
          <>
            <h3>Shopping Cart</h3>
            <div className='order'>
              <div className='Titles'>
                <span>Item</span>
                <div className='sub-title'>
                  <span>Quantity</span>
                  <span>Price</span>
                  <span>Subtotal</span>
                </div>
              </div>
              <div className='cart-details'>
                <div className='cart_item'>
                  {products.map((product) => (
                    <div className='product_cart' key={product._id}>
                      <div className='na_img'>
                        <div className='imges'>
                          <img src={product.details.mainImage.secure_url} alt="" />
                        </div>
                        <div className='name'>
                          <span>{product.details.name}</span>
                          <div className='remove'>
                            <button className="remove-button" onClick={() => removeFromCart(product.productId)}>
                              <GrClose style={{ color: "red", height: "12.5px", width: "12.5px" }} />
                            </button>
                            <span className="cart-remove">Remove</span>
                          </div>
                        </div>
                      </div>
                      <div className='prices'>
                        <span className="quantity num ">
                          <button className='btn1 minus' onClick={() => decreaseItems(product.productId)}>
                            <FaMinus />
                          </button>
                          {product.quantity}
                          <button>
                            <FaPlus className='btn1' onClick={() => increaseItems(product.productId)} />
                          </button>
                        </span>
                        <span>{product.details.finalPrice}$</span>
                        <span className={`quantity num ${product.details.finalPrice.toString().includes('.') ? '' : 'padd'}`}>
                          {product.quantity * product.details.finalPrice}</span>
                      </div>
                    </div>
                  ))}
                  <button onClick={clearCart} className="btn btn-outline-success clear" disabled={loader ? 'disabled' : null}>
                    {!loader ? 'Clear...' : (
                      <span>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="visually-hidden">Loading...</span>
                      </span>
                    )}
                  </button>
                </div>
                <div className='order-summary'>
                  <h3>Order Summary</h3>
                  <div className='order-cost'>
                    <span>subtotal</span>
                    <span>{subtotal}$</span>
                  </div>
                  <div className='order-cost'>
                    <span>Tax</span>
                    <span>{subtotal > 0 ? `80$` : '0$'}</span>
                  </div>
                  <div className='order-cost'>
                    <span>Total</span>
                    <span>{subtotal > 0 ? `${total}` : '0$'}</span>
                  </div>
                  <button onClick={CHECKOUT} disabled={loader ? 'disabled' : null}>
                    {!loader ? 'CHECKOUT' : (
                      <span>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="visually-hidden">Loading...</span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) :
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Set the height of the container to the full viewport height
          }}>
            <PiShoppingCartSimpleLight style={{
              height: '40%',
              width: '40%',
              color: 'gray',
            }} />

            <h4 style={{
              textAlign: 'center',
              color: 'gray',
              marginTop: '10px',
              marginBottom: '10px'
            }}>No item in the cart <TfiFaceSad />
            </h4>

          </div>
      }

    </>)
}

export default Cart