import React, { useState, useEffect } from 'react';
import { Star, Sparkles, Crown } from 'lucide-react';

const PremiumWelcome = () => {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    setMounted(true);
    
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 6 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = '/';
    }, 6000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className={`container ${mounted ? 'mounted' : ''}`}>
      {/* Countdown display */}
      <div className="countdown">{countdown}</div>

      {/* Background sparkles */}
      <div className="sparkle-container">
        <div className="sparkle sparkle-1">
          <Sparkles color="#FFD700" size={32} />
        </div>
        <div className="sparkle sparkle-2">
          <Star color="#FFD700" size={24} />
        </div>
        <div className="sparkle sparkle-3">
          <Sparkles color="#FFD700" size={40} />
        </div>
      </div>

      {/* Main content */}
      <div className="content">
        <div className="icon-container">
          <Crown color="#FFD700" size={64} className="crown-icon" />
        </div>

        <h1 className="title">Welcome to Premium</h1>
        <h2 className="subtitle">Experience the Extraordinary</h2>
        
        <p className="message">Redirecting to homepage in {countdown} seconds...</p>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          position: relative;
          overflow: hidden;
          padding: 2rem;
          font-family: system-ui, -apple-system, sans-serif;
          color: white;
        }

        .countdown {
          position: fixed;
          top: 2rem;
          right: 2rem;
          font-size: 2rem;
          font-weight: bold;
          color: #FFD700;
          animation: pulse 1s infinite;
        }

        .sparkle-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .sparkle {
          position: absolute;
          opacity: 0;
          transform: scale(0);
          transition: opacity 1s ease, transform 1s ease;
        }

        .mounted .sparkle {
          opacity: 0.6;
          transform: scale(1);
        }

        .sparkle-1 {
          top: 15%;
          left: 15%;
          animation: float 3s infinite ease-in-out;
        }

        .sparkle-2 {
          top: 30%;
          right: 20%;
          animation: float 4s infinite ease-in-out;
        }

        .sparkle-3 {
          bottom: 25%;
          left: 25%;
          animation: float 5s infinite ease-in-out;
        }

        .content {
          text-align: center;
          transform: translateY(30px);
          opacity: 0;
          transition: all 1s ease;
        }

        .mounted .content {
          transform: translateY(0);
          opacity: 1;
        }

        .icon-container {
          margin-bottom: 2rem;
        }

        .crown-icon {
          animation: glow 2s infinite alternate;
        }

        .title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(to right, #ffffff, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
        }

        .subtitle {
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 3rem;
          opacity: 0.9;
        }

        .message {
          font-size: 1.2rem;
          opacity: 0.8;
          margin-top: 2rem;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glow {
          0% {
            filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.6));
          }
          100% {
            filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }
          
          .subtitle {
            font-size: 1.2rem;
          }
          
          .countdown {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PremiumWelcome;