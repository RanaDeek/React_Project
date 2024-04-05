import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { object, string } from 'yup';
import { toast, Zoom } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import './Order.css'
function Order() {
    const Navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [user, SetUser] = useState({
        phone: '',
        address: '',
        couponName: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        SetUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API}/order`, {
                address: user.address,
                phone: user.phone,
                couponName: user.couponName,
            }, {
                headers: {
                    Authorization: `Tariq__${localStorage.getItem('usertoken')}`
                }
            });
            if (data.message == 'success') {
                toast(`Order is pending , we will call you`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Zoom,
                });
            }
            Navigate('/');
        } catch (error) {
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
    return (
        <>
            <div className="overlay" >
                <img src="src/assets/6.jpg" alt="" />

            </div>
            <div className="orderForm ">
                <div className='container'>
                    <div className='order-info'>
                        <h3>Order Information</h3>
                        <Link className='link-close' to="/Cart">X</Link>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-rows">
                            <div className="form-group col-md-9">
                                <input type="text" className="form-control" placeholder="Address" onChange={handleChange} value={user.email} name="address" required />
                            </div>
                        </div>
                        <div className="form-rows">
                            <div className="col col-md-9">
                                <input type="text" className="form-control" placeholder="Phone" onChange={handleChange} value={user.phone} name="phone" required />
                            </div>
                        </div>
                        <div className="form-rows">
                            <div className="col col-md-9">
                                <input type="text" className="form-control" placeholder="Coupon" onChange={handleChange} value={user.couponName} name="couponName" />
                            </div>
                        </div>
                        <div className="col-auto my-1">
                            <button type="submit" className="btn btn-outline-success" disabled={loader ? 'disabled' : null}>{!loader ? 'Confirm' : <span>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="visually-hidden">Loading...</span>
                            </span>}</button>
                        </div>
                    </form>
                </div >
            </div >
        </>)
}

export default Order