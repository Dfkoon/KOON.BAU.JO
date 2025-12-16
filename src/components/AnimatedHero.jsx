import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

const AnimatedHero = ({ children }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          {children}
        </div>
        <div className="points_wrapper">
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  /* Ensure it doesn't overflow horizontally */
  overflow: hidden; 
  padding: 4px; /* Simulating the border in the original code */

  .card {
    --border: 4px;
    --rounded: 0px; 
    --w-card: 100%;
    --h-card: auto;
    
    margin: 0;
    width: var(--w-card);
    min-height: 600px; /* Minimum height for the hero */
    height: 100%;
    
    border-radius: var(--rounded);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: transparent;
  }

  .card::before,
  .card::after {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    will-change: auto;
    width: 100%;
    height: 100%;
    border-radius: var(--rounded);
    /* Simplified background for a light/white look */
    background: #ffffff; 
    /* Or if we want a very subtle gradient */
    /* background: linear-gradient(135deg, #f0f4c3 0%, #fff 100%); */
  }

  .points_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1; /* Behind content but in front of background */
  }

  .points_wrapper .point {
    --sz-point: 4px;
    top: -8px;
    position: absolute;
    animation: floating-points infinite ease-in-out;
    pointer-events: none;
    width: var(--sz-point);
    height: var(--sz-point);
    background-color: #00ccb1; /* Changed to primary color for visibility on white */
    border-radius: 9999px;
  }

  @keyframes floating-points {
    0% {
      transform: translate(0, 0);
    }
    95% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      /* Adjust translation for larger screen */
      transform: translate(calc(100vw / 2), calc(100vh / 1.5)); 
    }
  }

  /* Keeping points logic the same */
  .points_wrapper .point:nth-of-type(1) { left: 10%; opacity: 1; animation-duration: 4s; animation-delay: 0.2s; }
  .points_wrapper .point:nth-of-type(2) { left: 30%; opacity: 0.7; animation-duration: 5s; animation-delay: 0.5s; }
  .points_wrapper .point:nth-of-type(3) { left: 25%; opacity: 0.8; animation-duration: 4.5s; animation-delay: 0.1s; }
  .points_wrapper .point:nth-of-type(4) { left: 44%; opacity: 0.6; animation-duration: 4s; }
  .points_wrapper .point:nth-of-type(5) { left: 50%; opacity: 1; animation-duration: 3.8s; }
  .points_wrapper .point:nth-of-type(6) { left: 75%; opacity: 0.5; animation-duration: 4.2s; animation-delay: 1.5s; }
  .points_wrapper .point:nth-of-type(7) { left: 88%; opacity: 0.9; animation-duration: 3.5s; animation-delay: 0.2s; }
  .points_wrapper .point:nth-of-type(8) { left: 58%; opacity: 0.8; animation-duration: 4.1s; animation-delay: 0.2s; }
  .points_wrapper .point:nth-of-type(9) { left: 98%; opacity: 0.6; animation-duration: 4.8s; animation-delay: 0.1s; }
  .points_wrapper .point:nth-of-type(10) { left: 65%; opacity: 1; animation-duration: 5s; animation-delay: 0.2s; }

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: transparent; /* No dark background */
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export default AnimatedHero;
