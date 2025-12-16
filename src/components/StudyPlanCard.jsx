import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Download, Visibility } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

const StudyPlanCard = ({ title, image }) => {
    const { t } = useLanguage();

    return (
        <StyledWrapper>
            <div className="card">
                {/* Main Image (Visible initially) */}
                <div className="card__image-container">
                    <img src={image} alt={title} className="card__image" />
                </div>

                {/* Content (Revealed on hover) */}
                <div className="card__content">
                    <p className="card__title">{title}</p>
                    <div className="card__actions">
                        <Button
                            variant="outlined"
                            startIcon={<Visibility />}
                            href={image}
                            target="_blank"
                            size="small"
                            sx={{ mr: 1, color: '#333', borderColor: '#333', '&:hover': { bgcolor: 'rgba(0,0,0,0.05)', borderColor: '#000' } }}
                        >
                            {t('preview') || 'Preview'}
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Download />}
                            href={image}
                            target="_blank"
                            download
                            size="small"
                            sx={{ bgcolor: '#333', '&:hover': { bgcolor: '#000' } }}
                        >
                            {t('download') || 'Download'}
                        </Button>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  /* Center the card in the container if needed, or let Grid handle it */
  display: flex;
  justify-content: center;

  .card {
    position: relative;
    width: 300px;
    height: 350px; /* Increased height to accommodate vertical posters well */
    background-color: #f2f2f2;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    perspective: 1000px;
    box-shadow: 0 0 0 5px #ffffff80;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
  }

  .card__image-container {
     width: 100%;
     height: 100%;
     padding: 10px;
     display: flex;
     align-items: center;
     justify-content: center;
  }

  .card__image {
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    object-fit: contain;
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .card__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.95); /* Semi-transparent white to read text */
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .card:hover .card__content {
    transform: rotateX(0deg);
  }

  .card__title {
    margin: 0;
    font-size: 20px; /* Slightly smaller for longer Arabic titles */
    color: #333;
    font-weight: 700;
  }

  /* Hide image on hover effect from original code (scale: 0) */
  .card:hover .card__image {
    scale: 0;
    opacity: 0;
  }
`;

export default StudyPlanCard;
