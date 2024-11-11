import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const PremiumWelcome = () => {
  const navigate = useNavigate();

  // Welcome text animation - Ultra design effect
  const welcomeAnimation = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.5)' },
    config: { tension: 180, friction: 20, duration: 1500 },
  });

  // Subheading slide and fade-in with staggered delay
  const subheadingAnimation = useSpring({
    opacity: 1,
    transform: 'translateX(0)',
    from: { opacity: 0, transform: 'translateX(-100%)' },
    config: { duration: 1200 },
  });

  // Button animation with bounce and hover effect
  const buttonAnimation = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.95)' },
    config: { tension: 250, friction: 18 },
  });

  // Icon animation with a 3D effect
  const iconAnimation = useSpring({
    transform: 'scale(1) rotate(0deg)',
    from: { transform: 'scale(0) rotate(720deg)' },
    config: { tension: 200, friction: 25 },
  });

  // Footer text fade-in after a delay
  const footerAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1500,
    config: { duration: 1000 },
  });

  // Redirect to the home page after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to homepage after 6 seconds
    }, 6000);

    return () => clearTimeout(timer); // Clean up timeout on component unmount
  }, [navigate]);

  return (
    <Container>
      {/* Animated "Welcome" text */}
      <animated.h1 style={welcomeAnimation}>
        Welcome to the Premium Experience
      </animated.h1>

      {/* Animated Subheading */}
      <animated.h3 style={subheadingAnimation}>
        Unlock a world of exclusive features.
      </animated.h3>

      {/* Animated "Get Started" Button */}
    
      <animated.p style={footerAnimation}>
        You Are Lucky!!
      </animated.p>
      {/* Animated Icon with 3D effect */}
      <animated.div style={iconAnimation}>
        <i className="fa fa-gem" style={{ fontSize: '80px', color: '#ff5e62' }}></i>
      </animated.div>

      {/* Animated Footer Text */}
      <animated.p style={footerAnimation}>
        Your premium journey begins now. Enjoy the perks!
      </animated.p>
    </Container>
  );
};

// Styled Components for Ultra-Design
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  overflow: hidden;

  h1 {
    font-size: 3.8rem;
    margin-bottom: 30px;
    letter-spacing: 5px;
    font-weight: 700;
    text-transform: uppercase;
    color: #fff;
    animation: glow 1.5s infinite alternate;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 50px;
    font-weight: 400;
    color: #f1f1f1;
    opacity: 0;
  }

  button {
    background-color: #ff5e62;
    border: none;
    color: white;
    padding: 20px 70px;
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 50px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 2px;

    &:hover {
      background-color: #ff8a00;
      transform: scale(1.1);
      box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.3);
    }
  }

  i {
    font-size: 80px;
    margin-top: 40px;
    animation: bounce 2s infinite ease-in-out;
  }

  p {
    font-size: 1.3rem;
    margin-top: 50px;
    font-weight: 300;
    color: #f1f1f1;
    letter-spacing: 0.5px;
  }

  @keyframes glow {
    0% {
      text-shadow: 0 0 15px #fff, 0 0 30px #ff5e62, 0 0 45px #ff5e62;
    }
    100% {
      text-shadow: 0 0 25px #fff, 0 0 50px #ff5e62, 0 0 75px #ff5e62;
    }
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default PremiumWelcome;
