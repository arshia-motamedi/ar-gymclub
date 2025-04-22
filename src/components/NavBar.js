import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { IoLogOutOutline } from "react-icons/io5"; 
import { FaUserCircle } from "react-icons/fa";
import './NavBar.css';
export default function NavBar() {
  const { user, logoutUser } = useUserContext(); // دریافت user و متدهای login و logout از context 
  const navigate = useNavigate(); // استفاده از navigate برای هدایت به صفحه‌ی دیگر 

  const handleLogout = () => { 
    // خروج کاربر از سیستم 
    logoutUser(); // ریست کردن وضعیت کاربر در context 
    localStorage.removeItem('user'); // پاک کردن اطلاعات کاربر از localStorage 
    navigate('/login'); // هدایت به صفحه لاگین 
  }; 

  return (
    <Navbar className="navbar" expand="lg" data-bs-theme="dark">
  <Container>
    <Navbar.Brand>
      <Link style={{ textDecoration: "none", color: "black" }} to={"/home"}>
        AR.Gym Club
      </Link>
    </Navbar.Brand>
    {/* دکمه همبرگری */}
    <Navbar.Toggle aria-controls="navbar-nav" className="hamburger-btn" />
    <Navbar.Collapse id="navbar-nav">
      <Nav className="me-auto nav-links">
        <NavLink className="text-hover" to="/home">
          Home
        </NavLink>
        <NavLink className="text-hover" to="/coaches">
          Coaches
        </NavLink>
        <NavLink className="text-hover" to="/products">
          Products
        </NavLink>
        <NavLink className="text-hover" to="/about">
          About
        </NavLink>
      </Nav>
      <Nav className="ms-auto">
        <NavLink className="nav-link-item" to="/login">
          <FaUserCircle className="icon user-icon" />
          {user ? (
            <span className="animated">{user}</span>
          ) : (
            <span className="animated">Login/SignUp</span>
          )}
        </NavLink>
        {user && (
          <div className="logout-btn">
            <IoLogOutOutline className="logout-icon" />
            <button className="logout-btn animated" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}
