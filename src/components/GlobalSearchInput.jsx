import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { searchContent } from '../utils/searchLogic';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Paper, IconButton, ClickAwayListener } from '@mui/material';
import { Search as SearchIcon, Description, Article, Link as LinkIcon, Close } from '@mui/icons-material';

const GlobalSearchInput = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim()) {
                const searchResults = searchContent(query);
                setResults(searchResults);
                setIsOpen(true);
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleResultClick = (link) => {
        setIsOpen(false);
        setQuery(''); // Optional: clear search after navigation
        navigate(link);
    };

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Course': return <Description fontSize="small" color="primary" />;
            case 'Update': return <Article fontSize="small" color="secondary" />;
            case 'Page': return <LinkIcon fontSize="small" color="action" />;
            default: return <SearchIcon fontSize="small" />;
        }
    };

    return (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <Box sx={{ position: 'relative', zIndex: 1200 }}>
                <StyledWrapper>
                    <div className="group">
                        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                            </g>
                        </svg>
                        <input
                            ref={inputRef}
                            placeholder="Find..."
                            type="search"
                            className="input"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => { if (query) setIsOpen(true); }}
                        />
                    </div>
                </StyledWrapper>

                {isOpen && results.length > 0 && (
                    <Paper
                        elevation={4}
                        sx={{
                            position: 'absolute',
                            top: '120%',
                            left: 0, // Align left normally
                            right: 0, // Stretch width
                            width: '320px', // Fixed width or '100%' of parent container
                            maxHeight: '400px',
                            overflowY: 'auto',
                            borderRadius: '12px',
                            bgcolor: 'background.paper',
                            // For RTL support if needed, or keeping it centered relative to input
                            '@media (max-width: 600px)': {
                                position: 'fixed',
                                top: '60px',
                                left: '5%',
                                width: '90%',
                                zIndex: 9999
                            }
                        }}
                    >
                        <List dense>
                            {results.map((result, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => handleResultClick(result.link)}
                                    sx={{ '&:hover': { bgcolor: 'action.hover' }, borderBottom: '1px solid #eee' }}
                                >
                                    <ListItemIcon sx={{ minWidth: '36px' }}>
                                        {getIcon(result.type)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={result.title}
                                        secondary={result.description}
                                        primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                        secondaryTypographyProps={{ variant: 'caption', noWrap: true }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}

                {isOpen && results.length === 0 && query.trim() !== '' && (
                    <Paper
                        elevation={4}
                        sx={{
                            position: 'absolute',
                            top: '120%',
                            left: 0,
                            width: '250px',
                            p: 2,
                            textAlign: 'center',
                            borderRadius: '12px'
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">No results found</Typography>
                    </Paper>
                )}
            </Box>
        </ClickAwayListener>
    );
}

const StyledWrapper = styled.div`
  .group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    max-width: 190px;
  }

  .input {
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    width: 100%;
    padding-left: 2.5rem; /* Make room for icon */
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #f0f4f8; /* Slightly lighter than user example for better navbar integration */
    color: #0d0c22;
    box-shadow: 0 0 5px #e1e5ee, 0 0 0 5px #f5f5f5eb; /* Reduced outer shadow */
    transition: .3s ease;
    font-family: inherit;
    font-size: 0.9rem;
  }
  
  /* RTL Support for placeholder/icon padding if needed, can be driven by props, but keeping simple for now */

  .input::placeholder {
    color: #777;
  }
  
  .input:focus {
      background-color: #ffffff;
      border-color: #00ccb1;
      width: 240px; /* Expand on focus */
      box-shadow: 0 0 5px #C1D9BF, 0 0 0 5px #e0f2f1;
  }

  .icon {
    position: absolute;
    left: 0.8rem;
    fill: #777;
    width: 1rem;
    height: 1rem;
    z-index: 10;
  }
`;

export default GlobalSearchInput;
