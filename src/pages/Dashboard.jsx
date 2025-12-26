// src/pages/Dashboard.jsx
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Assignment, Announcement, EventNote } from '@mui/icons-material';

import ShinyHeader from '../components/ui/ShinyHeader';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <ShinyHeader text="لوحة التحكم الخاصة بك" variant="h3" />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>مهامي القادمة</Typography>
              <List>
                <ListItem><Assignment sx={{ mr: 2 }} /><ListItemText primary="تسليم مشروع هياكل البيانات" secondary="بتاريخ 2024-12-25" /></ListItem>
                <Divider />
                <ListItem><EventNote sx={{ mr: 2 }} /><ListItemText primary="محاضرة في الذكاء الاصطناعي" secondary="بتاريخ 2024-12-20" /></ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>آخر الإعلانات</Typography>
              <List>
                <ListItem><Announcement sx={{ mr: 2 }} /><ListItemText primary="إعلان هام: جدول الامتحانات" /></ListItem>
                <Divider />
                <ListItem><Announcement sx={{ mr: 2 }} /><ListItemText primary="فرصة تدريب في شركة مايكروسوفت" /></ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;