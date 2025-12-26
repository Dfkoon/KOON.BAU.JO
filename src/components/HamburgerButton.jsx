import React from 'react';
import styled from '@emotion/styled';

const HamburgerButton = ({ onClick, isOpen }) => {
    return (
        <StyledWrapper onClick={onClick}>
            <div className="hamburger">
                <input className="checkbox" type="checkbox" checked={isOpen} readOnly />
                <svg fill="none" viewBox="0 0 50 50" height="40" width="40">
                    <path className="lineTop line" strokeLinecap="round" strokeWidth={4} stroke="black" d="M6 11L44 11" />
                    <path strokeLinecap="round" strokeWidth={4} stroke="black" d="M6 24H43" className="lineMid line" />
                    <path strokeLinecap="round" strokeWidth={4} stroke="black" d="M6 37H43" className="lineBottom line" />
                </svg>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .hamburger {
    height: 40px;
    width: 40px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hamburger .checkbox {
    position: absolute;
    opacity: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    z-index: 2;
    margin: 0;
  }
  
  .line {
    transition: 0.5s;
    stroke-width: 6px;
    stroke: black; /* Default color */
  }
  
  /* Use currentColor to inherit color from parent (for dark mode support) */
  .line {
    stroke: currentColor;
  }

  .lineTop {
    stroke-dasharray: 40 40;
    stroke-dashoffset: 25;
  }
  .lineBottom {
    stroke-dasharray: 40 40;
    stroke-dashoffset: 60;
  }
  .lineMid {
    stroke-dasharray: 40 40;
  }
  
  /* Active State (Checked) */
  .hamburger .checkbox:checked + svg .line {
    stroke: #dc143c; /* crimson */
  }
  .hamburger .checkbox:checked + svg .lineTop {
    stroke-dashoffset: 0;
    transform-origin: left;
    transform: rotateZ(45deg) translate(-7px, -5px);
  }
  .hamburger .checkbox:checked + svg .lineMid {
    stroke-dashoffset: 40;
  }
  .hamburger .checkbox:checked + svg .lineBottom {
    stroke-dashoffset: 0;
    transform-origin: left;
    transform: rotateZ(-45deg) translate(-5px, 5px);
  }`;

export default HamburgerButton;
