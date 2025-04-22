import React from 'react';
import './Home.css';
import { Button } from 'react-bootstrap';

export default function Home() {
  return (
    <div className="back-home">
      <h1 className="header-text">Welcome to AR.Gym Club</h1>
      <p className="main-text">
        Here, we introduce you to the best fitness coaches and products for your journey.
      </p>
      <div className="buttons-container">
        <Button variant="dark" href="/products" className="home-button">Products</Button>
        <Button variant="light" href="/about" className="home-button">About Us</Button>
      </div>
    </div>
  );
}
