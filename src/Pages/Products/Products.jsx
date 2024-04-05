import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Products.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { MdAddShoppingCart } from "react-icons/md";
import { FreeMode, Pagination } from 'swiper/modules';
import { toast, Zoom, Bounce } from 'react-toastify'


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products?page=1&limit=10`);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
  }
  const addToCart = async (productId) => {
    const token = localStorage.getItem('usertoken');
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/cart`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      if (data.message == 'success') {
        toast.success('Item Added Successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
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
    }
  };
  useEffect(() => {
    getProducts();

  }, []);
  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : products.length > 0 ? (
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {products.map(product => (
            <SwiperSlide key={product._id}>
              <div className='product'>
                <h3 className='product_name'>{product.name}</h3>
                <img className='product_image' src={product.mainImage.secure_url} alt="Product Image" /><br />
                <div className='row1'>
                  <div className='price'>
                    <span className={product.discount > 0 ? 'original-price discounted' : 'original'}>{product.price}$</span>
                    {product.discount > 0 && (
                      <>
                        <span className='discounted-price pad2'>{product.finalPrice}$</span>
                      </>
                    )}
                  </div>

                  <button onClick={() => addToCart(product._id)}>
                    <MdAddShoppingCart className='Carts' />
                  </button>
                </div>
                <Link className='detail-button' to={`/Product/${product._id}`}>more details</Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <h3>No products available</h3>
      )}
    </>


  )
}

export default Products