import React, { useState, useEffect } from "react";
import "./About.css";

// کامپوننت اسلایدر عکس
const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // هر 1 ثانیه تغییر کند
    return () => clearInterval(interval); // پاکسازی تایمر
  }, [images.length]);

  return (
    <div className="image-slider-container">
      <img
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex + 1}`}
        className="gallery-image"
      />
    </div>
  );
};

// کامپوننت About
const About = () => {
  const images = [
    "/assets/images/IMG_1172.JPG",
    "/assets/images/IMG_1168.JPG",
    "/assets/images/IMG_1173.JPG",
    "/assets/images/Enorm-Gallery82401-35-1662577922-6318ed020339f.jpg",
    "/assets/images/Enorm-Gallery84998-A26A0144-1677021247-63f5503f845f2.webp",
    "/assets/images/Enorm-Gallery84998-A26A0176-1677021257-63f55049ab8f5.webp",
    "/assets/images/Enorm-Gallery84998-KOP-320-1677021359-63f550af7ed25.webp",
    "/assets/images/Enorm-Gallery84998-L1002084-1677021383-63f550c7e51c1.webp",
    "/assets/images/Enorm-Gallery85248-23OHANA-HIKE-RB-71-of-141-Large-1678391502-640a38ce18e80.jpeg",
    "/assets/images/steve1-large-1727375545-66f5a8b95402a.webp",
    "/assets/images/a42i8509-large-1727375477-66f5a87547af4.webp",
    "/assets/images/bownmediab-w-98-large-1727375484-66f5a87cd6e9f.webp",
    "/assets/images/bownmediab-w-859-large-1727375495-66f5a887196da.webp",
  ];

  return (
    <div className="about-page">
      <header className="about-header">
        <h1 className="about-title">About Our Fitness Journey</h1>
        <p className="about-subtitle">
          Transforming lives with the power of fitness and bodybuilding.
        </p>
      </header>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            At Gym Kaizen, our goal is to empower individuals to achieve their
            fitness aspirations. With expert guidance and top-tier products, we
            ensure your journey to health and strength is both rewarding and
            sustainable.
          </p>
        </div>

        <div className="about-gallery">
          <h2>Gallery</h2>
          {/* اسلایدر عکس ها */}
          <ImageSlider images={images} />
        </div>

        <div className="about-cards">
          <div className="card">
            <h3>Expert Coaches</h3>
            <p>
              Train with the best in the industry, including our champion coach
              Chris Bumstead, a 5X Olympia winner.
            </p>
          </div>
          <div className="card">
            <h3>Premium Products</h3>
            <p>
              We offer high-quality supplements, including pre-workouts, whey
              protein, and EAAs, tailored to your needs.
            </p>
          </div>
          <div className="card">
            <h3>Community Support</h3>
            <p>
              Join a supportive community of fitness enthusiasts who motivate
              each other every step of the way.
            </p>
          </div>
        </div>
      </section>

      <section className="about-history">
        <h2>Our History</h2>
        <p>
          Established in 2020, Gym Kaizen started as a small fitness initiative
          and has grown into a global community. We take pride in our commitment
          to health and fitness.
        </p>
      </section>

      <footer className="about-footer">
        <p>&copy; 2024 Gym Kaizen. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default About;
