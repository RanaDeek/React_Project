import React from 'react'
import Navbar from '../Component/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './../Component/Footer';
import './root.css'
function root() {
  return (
    <>
    <div className='bodyss'>
      <Navbar/>
      <div className='con'>
        <Outlet />
      </div>
      <Footer />
    </div>
   </>
  )
}

export default root