import React, { useState } from 'react'
import './Forget.css'
import { toast, Zoom } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Code() {
    const Navigate = useNavigate();
    const [errors, seterror] = useState("");
    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_API}/auth/sendcode`, {
                email: email
            });
            if (data.message == 'success') {
                Navigate('./Forget');
            }
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
            <div className="overlay">
                <img src="src/assets/6.jpg" alt="" />

            </div>
            <div className="signup-form signin2">
                <div className='container'>
                    <Link className='link2' to="/">X</Link>
                    <div className='row3'>
                        <h4>Please enter your email</h4>
                    </div>
                    <form className='form2' onSubmit={handleSubmit} >
                        <div className="form-row1">
                            <div className="form-group col-md-9">
                                <input type="email" className="form-control email" id="inputEmail4" placeholder="Email" onChange={handleChange} value={email} name="email" required />
                            </div>
                        </div>
                        <div className="col-auto my-1">
                            <button type="submit" className="btn btn-outline-success" disabled={loader ? 'disabled' : null}>{!loader ? 'Submit' : <span>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="visually-hidden">Loading...</span>
                            </span>}</button>
                        </div>

                    </form>
                </div>
            </div>
        </>)
}

export default Code