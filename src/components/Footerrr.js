import React from 'react'
import './Footer.css'
export default function footer() {
  return (
    <div>
  <link
    href="https://fonts.googleapis.com"
    rel="preconnect"
  />
  <link
    crossOrigin=""
    href="https://fonts.gstatic.com"
    rel="preconnect"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
    rel="stylesheet"
  />
  <link
    href="style.css"
    rel="stylesheet"
  />
  {/* <title>
    Responsive Footer
  </title>
  <h1>
    Responsive Footer
  </h1> */}
  <footer className="footer">
    <div className="container">
      <div className="col1">
        <a
          className="brand"
          href="#"
        >
          Brand
        </a>
        <ul className="media-icons">
          <li>
            <a href="#">
              <i className="fa-brands fa-youtube" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-discord" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-instagram" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-github" />
            </a>
          </li>
        </ul>
      </div>
      <div className="col2">
        <ul className="menu">
          <li>
            <a href="#">
              Home
            </a>
          </li>
          <li>
            <a href="#">
              About
            </a>
          </li>
          <li>
            <a href="#">
              Portfolio
            </a>
          </li>
          <li>
            <a href="#">
              Skills
            </a>
          </li>
          <li>
            <a href="#">
              Contact
            </a>
          </li>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem excepturi ipsam unde obcaecati iusto velit labore consequuntur officiis aut neque?
          </p>
        </ul>
      </div>
      <div className="col3">
        <p>
          Subscribe to our newslatter
        </p>
        <form>
          <div className="input-wrap">
            <input
              placeholder="ex@gmail.com"
              type="email"
            />
            <button type="submit">
              <i className="fa-solid fa-paper-plane" />
            </button>
          </div>
        </form>
        <ul className="services-icons">
          <li>
            <a href="#">
              <i className="fa-brands fa-cc-paypal" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-cc-apple-pay" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-google-pay" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-cc-amazon-pay" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="mekk">
        <p>
          @ndriWebDev 2023 - All Rights Reserved
        </p>
      </div>
    </div>
  </footer>
</div>
  )
}
