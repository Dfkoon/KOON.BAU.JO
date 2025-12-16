import React from 'react';
import styled from '@emotion/styled';
import { Send } from '@mui/icons-material';

const GlowInput = ({ value, onChange, onSend, placeholder }) => {
  return (
    <StyledWrapper>
      <div>
        <div id="poda">
          <div className="glow" />
          <div className="darkBorderBg" />
          <div className="darkBorderBg" />
          <div className="darkBorderBg" />
          <div className="white" />
          <div className="border" />
          <div id="main">
            <input
              placeholder={placeholder || "Search..."}
              type="text"
              name="text"
              className="input"
              value={value}
              onChange={onChange}
              onKeyPress={(e) => e.key === 'Enter' && onSend()}
            />
            <div id="input-mask" />
            <div id="pink-mask" />
            <div className="filterBorder" />

            {/* Action Icon (Send) */}
            <div id="filter-icon" onClick={onSend} style={{ cursor: 'pointer' }}>
              <Send sx={{ color: '#fff', width: 20, height: 20, transform: (theme) => theme.direction === 'rtl' ? 'rotate(135deg)' : 'rotate(-45deg)', ml: 0.5 }} />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Container sizing */
  width: 100%;
  display: flex;
  justify-content: center;

  .white,
  .border,
  .darkBorderBg,
  .glow {
    max-height: 70px;
    max-width: 100%; /* Flexible width */
    width: 320px;    /* Base width, allows grow */
    height: 100%;
    position: absolute;
    overflow: hidden;
    z-index: 1;
    border-radius: 12px;
    filter: blur(3px);
  }
  .input {
    background-color: #010201;
    border: none;
    width: 310px; /* Aligned with container */
    max-width: 100%;
    height: 56px;
    border-radius: 10px;
    color: white;
    padding-inline-start: 20px;
    padding-inline-end: 55px;
    font-size: 16px; /* Slightly smaller for mobile safety */
    position: relative;
    z-index: 2;
  }
  #poda {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
  }
  .input::placeholder {
    color: #c0b9c0;
  }

  .input:focus {
    outline: none;
  }

  #main {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  #main:focus-within > #input-mask {
    display: none;
  }

  #input-mask {
    pointer-events: none;
    width: 100px;
    height: 20px;
    position: absolute;
    background: linear-gradient(90deg, transparent, #010201);
    top: 18px;
    inset-inline-start: 70px;
  }
  #pink-mask {
    pointer-events: none;
    width: 30px;
    height: 20px;
    position: absolute;
    background: #8bc34a; /* Green Mask */
    top: 10px;
    inset-inline-start: 5px;
    filter: blur(20px);
    opacity: 0.8;
    transition: all 2s;
  }
  #main:hover > #pink-mask {
    opacity: 0;
  }

  .white {
    max-height: 63px;
    border-radius: 10px;
    filter: blur(2px);
  }

  .white::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(83deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.4);
    background-image: conic-gradient(
      rgba(0, 0, 0, 0) 0%,
      #a099d8,
      rgba(0, 0, 0, 0) 8%,
      rgba(0, 0, 0, 0) 50%,
      #dfa2da,
      rgba(0, 0, 0, 0) 58%
    );
    transition: all 2s;
  }
  .border {
    max-height: 59px;
    border-radius: 11px;
    filter: blur(0.5px);
  }
  .border::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(70deg);
    position: absolute;
    width: 600px;
    height: 600px;
    filter: brightness(1.3);
    background-repeat: no-repeat;
    background-position: 0 0;
    /* Green & Yellow Gradient */
    background-image: conic-gradient(
      #1c191c,
      #8bc34a 5%,
      #1c191c 14%,
      #1c191c 50%,
      #ffeb3b 60%,
      #1c191c 64%
    );
    transition: all 2s;
  }
  .darkBorderBg {
    max-height: 65px;
  }
  .darkBorderBg::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(82deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      rgba(0, 0, 0, 0),
      #004d40,
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0) 50%,
      #33691e,
      rgba(0, 0, 0, 0) 60%
    );
    transition: all 2s;
  }
  
  /* Hover & Focus Transforms */
  #poda:hover > .darkBorderBg::before { transform: translate(-50%, -50%) rotate(262deg); }
  #poda:hover > .glow::before { transform: translate(-50%, -50%) rotate(240deg); }
  #poda:hover > .white::before { transform: translate(-50%, -50%) rotate(263deg); }
  #poda:hover > .border::before { transform: translate(-50%, -50%) rotate(250deg); }

  #poda:focus-within > .darkBorderBg::before { transform: translate(-50%, -50%) rotate(442deg); transition: all 4s; }
  #poda:focus-within > .glow::before { transform: translate(-50%, -50%) rotate(420deg); transition: all 4s; }
  #poda:focus-within > .white::before { transform: translate(-50%, -50%) rotate(443deg); transition: all 4s; }
  #poda:focus-within > .border::before { transform: translate(-50%, -50%) rotate(430deg); transition: all 4s; }

  .glow {
    overflow: hidden;
    filter: blur(30px);
    opacity: 0.4;
    max-height: 130px;
  }
  .glow:before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(60deg);
    position: absolute;
    width: 999px;
    height: 999px;
    background-repeat: no-repeat;
    background-position: 0 0;
    /* Glow Colors: Green/Yellow */
    background-image: conic-gradient(
      #000,
      #8bc34a 5%,
      #000 38%,
      #000 50%,
      #ffeb3b 60%,
      #000 87%
    );
    transition: all 2s;
  }

  #filter-icon {
    position: absolute;
    top: 8px;
    inset-inline-end: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3; /* Above input */
    max-height: 40px;
    max-width: 38px;
    height: 100%;
    width: 100%;

    isolation: isolate;
    overflow: hidden;
    border-radius: 10px;
    background: linear-gradient(180deg, #161329, black, #1d1b4b);
    border: 1px solid transparent;
    transition: 0.3s;
  }
  #filter-icon:hover {
    background: linear-gradient(180deg, #1d1b4b, black, #161329);
    box-shadow: 0 0 10px rgba(139, 195, 74, 0.4);
  }
  
  .filterBorder {
    height: 42px;
    width: 40px;
    position: absolute;
    overflow: hidden;
    top: 7px;
    inset-inline-end: 7px;
    border-radius: 10px;
    z-index: 1;
  }

  .filterBorder::before {
    content: "";
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.35);
    background-image: conic-gradient(
      rgba(0, 0, 0, 0),
      #3d3a4f,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 50%,
      #3d3a4f,
      rgba(0, 0, 0, 0) 100%
    );
    animation: rotate 4s linear infinite;
  }
  
  @keyframes rotate { 100% { transform: translate(-50%, -50%) rotate(450deg); } }
`;

export default GlowInput;
