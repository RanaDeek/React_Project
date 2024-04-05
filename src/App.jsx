import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Root from './Routes/root';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import Categories from './Pages/Categories/CategoryProducts';
import Products from './Pages/Products/Products';
import Cart from './Pages/Cart/Cart';
import Home from './Pages/Home/Home';
import ProtectedRoutes from './Component/ProtectedRoutes';
import UserContextProvider from './Context/User';
import './App.css';
import Code from './Auth/Code';
import Forget from './Auth/Forget';
import Product from './Product/Product';
import Order from './Order/Order';
import CategoryProducts from './Pages/Categories/CategoryProducts';
import Profile from './Profile/Profile';
function App() {
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    // Simulate loading delay with setTimeout
    const timeoutId = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (adjust as needed)
    }, 2000);

    // Clean up timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, []); // Only run this effect once on component mount

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/SignIn', element: <SignIn /> },
        { path: '/SignUp', element: <SignUp /> },
        {
          path: '/Categories',
          element: (
            <ProtectedRoutes>
              <CategoryProducts />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/product/Category/:id',
          element: (
            <ProtectedRoutes>
              <CategoryProducts />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/Products',
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/Product/:id',
          element: (
            <ProtectedRoutes>
              <Product />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/Cart', element:
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
        }, {
          path: '/Code', element:
            <Code />
        },
        {
          path: '/Code/Forget', element:
            <Forget />
        }, {
          path: '/Order', element:
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
        }, {
          path: '/Profile', element:
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
        }
      ],
    },
  ]);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="d-flex justify-content-center">
            <div className="loader" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
      ) : (
        <UserContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </UserContextProvider>

      )}
    </>
  );
}

export default App;
