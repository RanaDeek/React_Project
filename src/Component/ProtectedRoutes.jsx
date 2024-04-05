import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({children}) {
    const token = localStorage.getItem('usertoken');
    if(!token){
     return   <Navigate to='/SignIn' replace/>
    }
  return children;
}

export default ProtectedRoutes