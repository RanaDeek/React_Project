import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="text-center text-white">
        <div className="container">
          <section className="mt-5">
            <div className="row text-center d-flex justify-content-center contact ">
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link href="#!" className="text-white">About us</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link href="#!" className="text-white">Products</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link href="#!" className="text-white">Awards</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link href="#!" className="text-white">Help</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link href="#!" className="text-white">Contact</Link>
                </h6>
              </div>
            </div>
          </section>
         
          <hr className="line" />
          <section className="mb-5">
            <div className="row d-flex justify-content-center desc2">
              <div className="col-lg-8">
                <p>
                Deek Shop offers a diverse selection of products from top brands, providing a seamless shopping experience.
                 With secure payment options and user-friendly navigation, Deep Shop is committed to customer satisfaction.
                </p>
              </div>
            </div>
          </section>
          <section className="text-center mb-5">
            <a href className="text-white me-4">
              <FaFacebook />

            </a>
            <a href className="text-white me-4">
              <FaTwitter />
            </a>
            <a href className="text-white me-4">
              <FaGoogle />
            </a>
            <a href className="text-white me-4">
              <SlSocialInstagram />
            </a>
            <a href className="text-white me-4">
              <CiLinkedin style={
                {
                  width: "22px",
                  height: "22px",
                }
              }/>
            </a>
            <a href className="text-white me-4">
              <FaGithub />
            </a>
          </section>
        </div>

        <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
      </footer>
    </>
  )
}

export default Footer