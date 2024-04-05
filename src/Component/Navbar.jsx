import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import pic from "../assets/1.png"
import { UserContext } from '../Context/User'
import { BiSolidSun } from "react-icons/bi";
import { BsMoon } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

function Navbar() {
    const { userName, setUserToken, setUserName } = useContext(UserContext); // Get the value from context
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('usertoken');
        setUserToken(null);
        setUserName(null);
        navigate('/SignIn');
    }
    const [isClicked, setIsClicked] = useState(false)
    const [mode, setMode] = useState('light');
    const toggleMode = () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
        const body = document.body;
        body.classList.toggle('dark');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <img src={pic} alt="Logo" className="image" />
                <div className='row'>
                    <Link className="navbar_name" to='/' >Deek's Shop</Link>
                    <h5>Welcome {userName} </h5>
                </div>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Cart">Cart</NavLink>
                        </li>

                    </ul>
                    {
                        userName ?
                            <>
                                <div className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href='#' id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <CgProfile style={{
                                            width: '170%',
                                            height: '170%',
                                        }} />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><NavLink className="nav-link" to="/Profile">Profile</NavLink></li>
                                        <li><NavLink className="nav-link logout" onClick={logout}>LogOut</NavLink></li>
                                    </ul>
                                </div>

                            </>
                            :
                            <>
                                <ul className="d-flex list-unstyled">

                                    <li className="nav-item1">
                                        <Link className='nav-link1' to="/SignIn">Sign In</Link>
                                    </li>
                                    <li className="nav-item1">

                                        <Link className='nav-link1 text-white' to="/SignUp">Sign Up?</Link>
                                    </li>
                                </ul>
                            </>
                    }
                    <div className={mode === 'dark' ? 'dark' : ''}>
                        <button className="dark-mode-btn click" onClick={toggleMode}>
                            {mode === 'dark' ? <BsMoon className='mode' /> : <BiSolidSun className='mode' />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar