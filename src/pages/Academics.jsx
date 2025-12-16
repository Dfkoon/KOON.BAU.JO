// src/pages/Academics.jsx
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import ShinyHeader from '../components/ui/ShinyHeader';

const faculties = [
  { name: 'كلية الهندسة', description: 'تضم تخصصات هندسية متنوعة ومتطورة.', image: 'engineering' },
  { name: 'كلية العلوم', description: 'تقدم برامج في العلوم الأساسية والتطبيقية.', image: 'science' },
  { name: 'كلية تكنولوجيا المعلومات', description: 'رائدة في مجالات علوم الحاسب وتقنية المعلومات.', image: 'technology' },
  { name: 'كلية إدارة الأعمال', description: 'تخرج قادة ومديرين للمستقبل.', image: 'business' },
];

const Academics = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <ShinyHeader text="كلياتنا وبرامجنا الأكاديمية" variant="h3" />
      <Grid container spacing={4}>
        {faculties.map((faculty) => (
          <Grid item key={faculty.name} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={`https://source.unsplash.com/random?${faculty.image}`}
                alt={faculty.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {faculty.name}
                </Typography>
                <Typography>
                  {faculty.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Academics;