import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Products from '../Products/Products';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { FreeMode, Pagination } from 'swiper/modules';
import './Home.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
function Home() {
    const [swiperRef, setSwiperRef] = useState(null);

    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/categories/active?page=1&limit=10`);
        setCategories(data.categories);
    };
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <div className='container Desc'>
                <div class="header-container">
                    <div class="line"></div>
                    <h1 class="header">About Us</h1>
                    <div class="line"></div>
                </div>
                <p>
                    Deek Shop is an innovative online marketplace that caters to the needs of modern consumers.
                    With a focus on providing high-quality products at competitive prices, Deek Shop offers a wide range of items, from electronics and gadgets to fashion and home goods.
                </p >
            </div>
            <div className="container all-benefit ">
                <section className="Benefits">
                    <div class="header-container">
                        <div class="line"></div>
                        <h1 class="header">Benefits</h1>
                        <div class="line"></div>
                    </div>                    <div className="bene-up">
                        <div className="bene-left">
                            <p>Deep Shop's commitment to customer satisfaction is evident in its seamless shopping experience,
                                user-friendly navigation, and secure payment options. With a wide range of products from top brands and vendors,
                                customers can easily find what they're looking for. What truly sets Deep Shop apart is its personalized approach,
                                tailoring recommendations and promotions to match each customer's preferences. This dedication to innovation keeps Deep Shop ahead of the curve, offering the latest trends and technologies to its customers.</p>
                        </div>
                    </div>
                    <div className="bene-down">
                        <div className="bene-item">
                            <h1>01</h1>
                            <span>Exceptional Customer Service</span>
                            <p>Our dedicated customer service team is always ready to assist you with any queries or issues.</p>
                        </div>
                        <div className="bene-item">
                            <h1>02</h1>
                            <span>User-Friendly Interface</span>
                            <p>Enjoy a seamless shopping experience with our easy-to-navigate interface.</p>
                        </div>
                        <div className="bene-item">
                            <h1>03</h1>
                            <span>Secure Transactions</span>
                            <p>Shop with confidence knowing that your transactions and personal data are secure.</p>
                        </div>
                        <div className="bene-item">
                            <h1>04</h1>
                            <span>Wide Product Range</span>
                            <p>Explore a diverse selection of products from top brands and vendors.</p>
                        </div>
                        <div className="bene-item">
                            <h1>05</h1>
                            <span>Quality Assurance</span>
                            <p>Rest assured that all our products meet high-quality standards.</p>
                        </div>
                        <div className="bene-item">
                            <h1>06</h1>
                            <span>Convenient Shopping Experience</span>
                            <p>Enjoy a hassle-free shopping experience from browsing to checkout.</p>
                        </div>
                    </div>
                </section>

            </div>
            <div className='container categories'>
                <div class="header-container">
                    <div class="line"></div>
                    <h2 class="header">Our Offers</h2>
                    <div class="line"></div>
                </div>                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={9}
                    centeredSlides={true}
                    spaceBetween={10}
                    pagination={{
                        dynamicBullets: 3,
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper1"
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id} className='swipe'>
                            <div className="items">
                                <Link to={`/product/category/${category.id}`}>
                                    <img src={category.image.secure_url} alt="Category Image" />
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


        </>
    );
}

export default Home;
;