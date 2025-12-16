import React from 'react';
import styled from '@emotion/styled';

const JellyfishBackground = () => {
    return (
        <StyledWrapper>
            <div className="loader-container">
                <div className="jellyfish">
                    <div className="jellyfish-head" />
                    <div className="tentacles">
                        <div className="tentacle" />
                        <div className="tentacle" />
                        <div className="tentacle" />
                        <div className="tentacle" />
                        <div className="tentacle" />
                    </div>
                </div>
                <div className="bubbles">
                    <div className="bubble" />
                    <div className="bubble" />
                    <div className="bubble" />
                    <div className="bubble" />
                    <div className="bubble" />
                    <div className="bubble" />
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0; /* Behind content */
  pointer-events: none; /* Don't block clicks */
  opacity: 0.15; /* Semi-transparent as requested */
  
  .loader-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: scale(0.8); /* Fit better */
  }

  .jellyfish {
    position: relative;
    width: 120px;
    height: 120px;
    margin-bottom: 60px;
    animation: float 3s ease-in-out infinite;
  }

  .jellyfish-head {
    width: 120px;
    height: 80px;
    background: radial-gradient(
      ellipse at center top,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(173, 216, 230, 0.8) 30%,
      rgba(135, 206, 250, 0.7) 60%,
      rgba(70, 130, 180, 0.6) 100%
    );
    border-radius: 50% 50% 50% 50% / 100% 100% 40% 40%;
    position: relative;
    box-shadow:
      0 0 20px rgba(173, 216, 230, 0.6),
      inset 0 -10px 20px rgba(255, 255, 255, 0.3);
    animation: pulse 2s ease-in-out infinite;
  }

  .jellyfish-head::before {
    content: "";
    position: absolute;
    top: 15px;
    left: 20px;
    width: 80px;
    height: 40px;
    background: radial-gradient(
      ellipse,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.2) 70%,
      transparent 100%
    );
    border-radius: 50%;
    animation: shimmer 2.5s ease-in-out infinite;
  }

  .tentacles {
    position: absolute;
    bottom: -160px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 200px;
  }

  .tentacle {
    position: absolute;
    width: 4px;
    height: 100px;
    background: linear-gradient(
      to bottom,
      rgba(173, 216, 230, 0.8) 0%,
      rgba(135, 206, 250, 0.6) 50%,
      rgba(70, 130, 180, 0.4) 100%
    );
    border-radius: 2px;
    transform-origin: top center;
  }

  .tentacle:nth-child(1) {
    left: 20%;
    animation: sway1 3s ease-in-out infinite;
    height: 120px;
  }

  .tentacle:nth-child(2) {
    left: 35%;
    animation: sway2 2.5s ease-in-out infinite;
    height: 140px;
  }

  .tentacle:nth-child(3) {
    left: 50%;
    animation: sway3 3.2s ease-in-out infinite;
    height: 130px;
  }

  .tentacle:nth-child(4) {
    left: 65%;
    animation: sway4 2.8s ease-in-out infinite;
    height: 135px;
  }

  .tentacle:nth-child(5) {
    left: 80%;
    animation: sway5 3.5s ease-in-out infinite;
    height: 115px;
  }

  .bubbles {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .bubble {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.8),
      rgba(173, 216, 230, 0.4)
    );
    animation: bubble-rise 4s linear infinite;
    opacity: 0;
  }

  .bubble:nth-child(1) { width: 8px; height: 8px; left: 20%; animation-delay: 0s; }
  .bubble:nth-child(2) { width: 12px; height: 12px; left: 70%; animation-delay: 1s; }
  .bubble:nth-child(3) { width: 6px; height: 6px; left: 40%; animation-delay: 2s; }
  .bubble:nth-child(4) { width: 10px; height: 10px; left: 60%; animation-delay: 0.5s; }
  .bubble:nth-child(5) { width: 5px; height: 5px; left: 80%; animation-delay: 1.5s; }
  .bubble:nth-child(6) { width: 9px; height: 9px; left: 25%; animation-delay: 2.5s; }

  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(173, 216, 230, 0.6); } 50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(173, 216, 230, 0.8); } }
  @keyframes shimmer { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
  @keyframes sway1 { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(12deg); } }
  @keyframes sway2 { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-15deg); } }
  @keyframes sway3 { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(8deg); } }
  @keyframes sway4 { 0%, 100% { transform: rotate(12deg); } 50% { transform: rotate(-10deg); } }
  @keyframes sway5 { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(15deg); } }
  @keyframes bubble-rise {
    0% { bottom: -20px; opacity: 0; transform: translateX(0px) scale(0.5); }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { bottom: 120%; opacity: 0; transform: translateX(20px) scale(1.2); }
  }
`;

export default JellyfishBackground;
