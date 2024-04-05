import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/products/${id}`);
            setProduct(data.product);
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
        getProduct();
    }, [id]);
    const productArray = product ? [product] : [];

    return (
        <>
            {productArray.map(details => (
                <div className='details' key={details._id}>
                    <h3 className='name'>{details.name}</h3>
                    <ul>
                        <li><span>Stock : {details.stock}</span><br /></li>
                        <li><span>Number of Seller: {details.number_sellers}</span></li>
                    </ul>

                    <div className="row">
                        <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
                            <div className="carousel-inner">
                                {details.subImages && details.subImages.length > 0 ? (
                                    details.subImages.map((subImage, index) => (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                            <img src={subImage.secure_url} className="d-block " alt={`SubImage-${index}`} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="carousel-item active">
                                        <p>No subimages available</p>
                                    </div>
                                )}
                            </div>
                            <button className="carousel-control-prev Danger" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                                <div
                                    style={{
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    <IoIosArrowBack
                                        style={{
                                            color: '#8c2503',
                                            width: '50px',
                                            height: '50px',
                                        }}
                                    />
                                </div>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                                <div
                                    style={{
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    <IoIosArrowForward
                                        style={{
                                            color: '#8c2503',
                                            width: '50px',
                                            height: '50px',

                                        }}
                                    />
                                </div>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                </div>
            ))}
        </>
    )
}

export default Product