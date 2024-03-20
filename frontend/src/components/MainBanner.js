
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  margin-top : 4.9rem;
  position: relative;
  height: 300px; 
  background-size: cover;
  background-position: center;
  margin-bottom : 60px;
`;

const BannerText = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white; 
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`;

const Dot = styled.span`
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${props => (props.active ? 'black' : 'white').toString()};
`;

Dot.shouldForwardProp = (prop) => !['active'].includes(prop);

const images = [
  '/banner_image.jpg',
  '/banner2.jpg',
];

const MainBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % images.length);
      }, 5000); 
    }

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true); 
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <BannerWrapper style={{ backgroundImage: `url(${images[activeIndex]})` }}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
      <BannerText>
        <h2> </h2>
        <p> </p>
      </BannerText>
      <DotsContainer>
        {images.map((image, index) => (
          <Dot
            key={index}
            active={index === activeIndex}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsContainer>
    </BannerWrapper>
  );
};

export default MainBanner;





