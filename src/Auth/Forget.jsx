import React, { useContext, useEffect, useState } from 'react'
import './Forget.css'
import { object, string } from 'yup';
import { toast, Zoom, Bounce } from 'react-toastify'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/User';

function Forget() {
  const Navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);
  const [errors, seterror] = useState("");
  const [loader, setLoader] = useState(false);
  const [user, SetUser] = useState({
    email: '',
    password: '',
    code: '',
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
    const { data } = await axios.patch(`${import.meta.env.VITE_API}/auth/forgotPassword`, {
      email: user.email,
      password: user.password,
      code: user.code
    });
    if (data.message == 'success') {
      toast.info('Password rest SuccessFully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      Navigate('/Signin');
    } else {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }
  const validateData = async () => {
    const RegisterSchema = object({
      email: string().email(),
      password: string().min(8).max(16).required(),
      code: string().required(),
    });
    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      seterror(error.errors);
      setLoader(false);
      return false;
    }
  };
  return (
    <>
      <div className="overlay">
        <img src="src/assets/6.jpg" alt="" />

      </div>
      <div className="signup-form signin heights">
        <div className='container'>
          <Link className='link2' to="/">X</Link>
          <div className='row2'>
            <h3>Update Password</h3>
          </div>
          <div className='error2'>
            {errors.length > 0 ? errors.map(error =>
              <p>{error}</p>
            ) : ''}
          </div>
          <form className='form1' onSubmit={handleSubmit} >
            <div className="form-row1">
              <div className="form-group col-md-9">
                <input type="email" className="form-control email" id="inputEmail4" placeholder="Email" onChange={handleChange} value={user.email} name="email" required />
              </div>
            </div>
            <div className="form-row1">
              <div className="form-group col-md-9">
                <input type="password" className="form-control email" id="inputPassword4" placeholder="New Password" onChange={handleChange} value={user.password} name="password" required />
              </div>
            </div>
            <div className="form-row1">
              <div className="form-group col-md-9">
                <input type="text" className="form-control" placeholder="Code" onChange={handleChange} value={user.code} name="code" required />
              </div>
            </div>
            <div className="col-auto my-1">
              <button type="submit" className="btn btn-outline-success">Submit</button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Forget