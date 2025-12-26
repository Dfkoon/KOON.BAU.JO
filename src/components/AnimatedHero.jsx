import React from 'react';
import styled from '@emotion/styled';
import Ballpit from './Ballpit';

const AnimatedHero = ({ children }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="ballpit-container">
          <Ballpit
            count={typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 200}
            gravity={0.7}
            friction={0.8}
            wallBounce={0.95}
            followCursor={true}
            colors={[0x81D4FA, 0xFFFFFF, 0xE1F5FE, 0x29B6F6]} // Light Blue, White, Pale Cyan, Sky Blue
          />
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden; 
  padding: 4px;

  .card {
    --border: 4px;
    --rounded: 0px; 
    --w-card: 100%;
    --h-card: auto;
    
    margin: 0;
    width: var(--w-card);
    min-height: 600px;
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
    background: #ffffff; 
  }

  .ballpit-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; /* Behind content (content is z-index 2) */
    pointer-events: auto; /* Allow interaction with balls */
  }

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    pointer-events: none; /* Let clicks pass through to ballpit unless on buttons */
  }
  
  .content > * {
    pointer-events: auto; /* Re-enable pointer events for actual content elements */
  }
`;

export default AnimatedHero;
