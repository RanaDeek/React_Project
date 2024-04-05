import React, { useState } from 'react'
import './SignUp.css'
import axios from 'axios';
import { object, string } from 'yup';
import { toast, Zoom } from 'react-toastify'
import { Link } from 'react-router-dom';

function SignUp() {
  const [errors, seterror] = useState("");
  const [loader, setLoader] = useState(false);
  const [user, SetUser] = useState({
    userName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: '',
    gender: '',
    image: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUser({
      ...user,
      [name]: value
    })
  }
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    SetUser({
      ...user,
      [name]: files[0]
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await validateData()) {
      const formData = new FormData();
      formData.append('userName', user.userName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('gender', user.gender);
      formData.append('image', user.image);
      formData.append('phone', user.phone);
      formData.append('address', user.address);
      formData.append('role', user.role);
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signup`, formData);
        SetUser({
          userName: '',
          email: '',
          password: '',
          gender: '',
          image: '',
          role: '',
          phone: '',
          address: '',
        })

        if (data.message == 'success') {
          toast('Success !,Thank you ', {
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
      } catch (error) {
        setLoader()
        if (error.response.status === 409) {
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
        }
      } finally {
        setLoader(false);
      }
    }
  }

  const validateData = async () => {
    const RegisterSchema = object({
      userName: string().min(3).required(),
      email: string().email(),
      password: string().min(8).max(16).required(),
      image: string().required(),
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
      <div className="signup-form signUP ">
        <div className='container'>
          <Link className='link1' to="/">X</Link>
          <h3>Sign Up?</h3>
          <p className='Para1'>Already have an account? <Link to='/SignIn'>Log In</Link> </p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="col col-md-9">
                <input type="text" className="form-control" placeholder="Username" onChange={handleChange} value={user.userName} name="userName" required />
              </div>
            </div>
            <div className="form-row">
              <div className="col col-md-9">
                <input type="text" className="form-control" placeholder="Phone" onChange={handleChange} value={user.phone} name="phone" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-9">
                <input type="email" className="form-control email" id="inputEmail4" placeholder="Email" onChange={handleChange} value={user.email} name="email" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-9">
                <input type="password" className="form-control email" id="inputPassword4" placeholder="Password" onChange={handleChange} value={user.password} name="password" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-9">
                <input type="text" className="form-control" placeholder="address" onChange={handleChange} value={user.address} name="address"/>
              </div>
            </div>
            <fieldset className="form-group">
              <label className="col-form-label col-sm-1 pt-0">Gender</label>
              <div className="form-check form-check-inline gender" >
                <input className="form-check-input" type="radio" name="gender" id="gridRadios1" onChange={handleChange} value="Male" checked={user.gender === 'Male'} />
                <label className="form-check-label" htmlFor="gridRadios1">Male</label>
              </div>
              <div className="form-check form-check-inline gender female ">
                <input className="form-check-input" type="radio" name="gender" id="gridRadios2" onChange={handleChange} value="Female" checked={user.gender === 'Female'} />
                <label className="form-check-label" htmlFor="gridRadios2">Female</label>
              </div>
            </fieldset>

            <div className="form-group">
              <select className="form-select" aria-label="Default select example">
                <option selected>Role</option>
                <option value="user">User</option>
                <option value="48-arab">Admin</option>
              </select>
            </div>
            <div className="form-group ">
              <label htmlFor="exampleFormControlFile1">Picture OF You</label>
              <input type="file" className="form-control-file mx-3 " id="exampleFormControlFile1" onChange={handleImageChange} name="image" required />
            </div>
            <div className="col-auto my-1">
              <button type="submit" className="btn btn-outline-success" disabled={loader ? 'disabled' : null}>{!loader ? 'SignUp' : <span>
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
export default SignUp