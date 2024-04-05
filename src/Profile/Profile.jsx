import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/User'
import './Profile.css'
import axios from 'axios';
import PIC from '../assets/6.jpg'

export default function Profile() {
    const { userName } = useContext(UserContext);
    const [orders, setOrders] = useState([])
    const [user, setuser] = useState({
        userName: '',
        email: '',
        phone: '',
    });
    const getorders = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/order`, {
            headers: {
                Authorization: `Tariq__${localStorage.getItem('usertoken')}`
            }
        })
        setOrders(data.orders);
    }
    const getprofile = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/user/profile`, {
            headers: {
                Authorization: `Tariq__${localStorage.getItem('usertoken')}`
            }
        })
        setuser(data.user);
    }
    useEffect(() => {
        getprofile();
        getorders();
    }, []);

    return (
        <>
            <div className="overlay" >
            <img src={PIC} alt="" />
            </div>
            <section >
                <div className="container profile">
                    <div className="row d-flex justify-content-center align-items-center profile">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                                <div className="row g-0 ">
                                    <div className="col-md-4 gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', paddingTop: '150px' }}>
                                        {user.image && <img src={user.image.secure_url} className='img-fluid my-4 user-image' alt="" />}
                                        <h4>{userName}</h4>
                                        <i className="far fa-edit mb-5" />
                                    </div>

                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3 wid">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">{user.email}</p>
                                                </div>
                                            </div>
                                            <h6>Orders</h6>
                                            <hr className="mt-0 mb-4" />
                                            {
                                                orders.length > 0 ? (
                                                    <>
                                                        <div className="row pt-1">
                                                            <div className="col-4 mb-2 d-flex">
                                                                <div>
                                                                    <h6>Order</h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-4 mb-2 d-flex">
                                                                <div>
                                                                    <h6>Status</h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-4 mb-2 d-flex">
                                                                <div>
                                                                    <h6>Price</h6>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {
                                                            orders.map((order, index) => (
                                                                <div className="row pt-1" key={index}>
                                                                    <div className="col-4 mb-2 d-flex">
                                                                        <div>
                                                                            <p className="text-muted index">{index}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-4 mb-2 d-flex">
                                                                        <div>
                                                                            <p className="text-muted">{order.status}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-4 mb-2 d-flex">
                                                                        <div>
                                                                            <p className="text-muted">{order.finalPrice}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </>
                                                ) : (<></>)
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>)
}
