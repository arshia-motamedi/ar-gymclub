import React, { useState } from 'react';
import './Coaches.css';

export default function Coaches() {
  const coaches = [
    {
      name: 'Chris Bumstead',
      specialty: '5X Olympia Champion',
      description: 'Chris Bumstead is a professional bodybuilder and a five-time Classic Physique Olympia champion. Known for his symmetry and classic style, he is an inspiration for many.',
      gallery: [
        '/assets/images/cbum.jpg',
        '/assets/images/a7a4418c-3968-47b0-ac74-a9714742fefd.jpg',
        '/assets/images/ad17cce2-9e71-439f-8e21-c8ed8718c43a.jpg',
        '/assets/images/Chris Bumstead 5 time MR_ Olympia.jpg',
        '/assets/images/Chris bumstead.jpg',
      ],
    },
    {
      name: 'Hadi Choopan',
      specialty: '2022 Olympia Champion',
      description: 'Hadi Choopan, also known as "The Persian Wolf," is a professional bodybuilder who won the 2022 Mr. Olympia title. His determination and conditioning are unmatched.',
      gallery: [
        '/assets/images/download.jpg',
        '/assets/images/6cb5a754-59d7-439c-b39f-9f94c60f80eb.jpg',
        '/assets/images/bb9faba5-1db4-4ad2-8a56-db7e315d1803.jpg',
        '/assets/images/Bodybuilders Gym Motivation & Freaking Workout _ Hadi Choopan.jpg',
        '/assets/images/d5277267-842b-46d2-bf24-7902ad9fe61f.jpg',
      ],
    },
    {
      name: 'Ramon Dino',
      specialty: 'Classic Physique Pro',
      description: 'Ramon Dino is a rising star in the Classic Physique category. His passion and dedication have made him a fan favorite across the globe.',
      gallery: [
        '/assets/images/Ramon Dino.jpg',
        '/assets/images/Popeye 🦖.jpg',
        '/assets/images/Ramon Dino (1).jpg',
        '/assets/images/Ramon Dino Mr Olympia Brasil 2024! 📸Rodrigo….jpg',
        '/assets/images/Ramón Dino.jpg',
      ],
    },
  ];

  const [activeCoach, setActiveCoach] = useState(0); // Active coach index
  const [currentImage, setCurrentImage] = useState(0); // Current image index for gallery

  // Handle image slider
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        (prev + 1) % coaches[activeCoach].gallery.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [activeCoach, coaches]);

  return (
    <div className="back-coaches">
      <h1 className="coaches-title">Meet Our Coaches</h1>
      <div className="coaches-container">
        {coaches.map((coach, index) => (
          <div
            className={`coach-card ${
              activeCoach === index ? 'active' : ''
            }`}
            key={index}
            onClick={() => setActiveCoach(index)}
          >
            <img src={coach.gallery[0]} alt={coach.name} className="coach-image" />
            <div className="coach-info">
              <h3>{coach.name}</h3>
              <p>{coach.specialty}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Section for Active Coach Details */}
      <div className="coach-details">
        <div className="coach-description">
          <h2>{coaches[activeCoach].name}</h2>
          <p>{coaches[activeCoach].description}</p>
        </div>
        <div className="coach-gallery">
          <img
            src={coaches[activeCoach].gallery[currentImage]}
            alt={`${coaches[activeCoach].name} gallery`}
            className="gallery-image"
          />
        </div>
      </div>
    </div>
  );
}
