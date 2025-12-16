import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material';

const BackgroundPattern = () => {
    const theme = useTheme();
    // We can adapt colors based on theme, or use the user's robust dark style.
    // Given the specific code "background-color: #191a1a", it looks like a dark theme pattern.
    // To ensure text is legible, we might need to adjust the opacity or use it only in dark mode.
    // For now, I'll implement it as a global background layer that sits behind everything.

    return (
        <StyledWrapper isDarkMode={theme.palette.mode === 'dark'}>
            <div className="container" />
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* Place behind all content */
  pointer-events: none; /* Let clicks pass through */
  overflow: hidden;

  .container {
    width: 200%; /* Larger to allow movement */
    height: 200%;
    
    /* User provided variables and gradients */
    --color: ${props => props.isDarkMode ? 'rgba(114, 114, 114, 0.3)' : 'rgba(0, 0, 0, 0.05)'};
    background-color: ${props => props.isDarkMode ? '#191a1a' : '#f0f2f5'};
    
    background-image: linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent),
        linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent);
    
    background-size: 55px 55px;
    
    /* Added Animation: Slow Drift */
    animation: drift 60s linear infinite;
  }

  /* Lighting Effect: A subtle radial gradient overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, transparent 0%, ${props => props.isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)'} 100%);
  }

  @keyframes drift {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-50px, -50px);
    }
  }
`;

export default BackgroundPattern;
