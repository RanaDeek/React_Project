import React, { useContext, useEffect, useState } from 'react'
import './signin.css'
import { object, string } from 'yup';
import { toast, Zoom } from 'react-toastify'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Context/User';

function SignIn() {
  const Navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);
  const [errors, seterror] = useState("");
  const [loader, setLoader] = useState(false);
  const [user, SetUser] = useState({
    email: '',
    password: '',
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
    if (await validateData()) {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signin`, {
          email: user.email,
          password: user.password
        });
        SetUser({
          email: '',
          password: '',
        });
        if (data.message == 'success') {
          toast(`Welcome ${user.email}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          });
          localStorage.setItem('usertoken', data.token);
          setUserToken(data.token);
          Navigate('/');
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
  }

  const validateData = async () => {
    const RegisterSchema = object({
      email: string().email(),
      password: string().min(8).max(16).required(),
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
      <div className="overlay " >
        <img src="src/assets/6.jpg" alt="" />

      </div>
      <div className="signup-form signin">
        <div className='container'>
          <Link className='link2' to="/">X</Link>
          <div className='row2'>
            <h3>Sign In</h3>
            <p className='Para1'>Dont have an account? <Link to='/SignUp'>Sign Up</Link> </p>
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
                <input type="password" className="form-control email" id="inputPassword4" placeholder="Password" onChange={handleChange} value={user.password} name="password" required />
              </div>
            </div>

            <div className="form-row1">
              <div className="form-group col-md-9 forget">
                <Link className="link4" to="/Code">Forget your Password </Link>
              </div>
            </div>
            <div className="col-auto my-1">
              <button type="submit" className="btn btn-outline-success" disabled={loader ? 'disabled' : null}>{!loader ? 'Sign in' : <span>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="visually-hidden">Loading...</span>
              </span>}</button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn