// src/pages/Contact.jsx
import React from 'react';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import ShinyHeader from '../components/ui/ShinyHeader';

const Contact = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <ShinyHeader text="اتصل بنا" variant="h3" />
      <Typography variant="body1" paragraph>
        نحن هنا لمساعدتك. يمكنك التواصل معنا عبر النموذج أدناه أو من خلال معلومات الاتصال المباشرة.
      </Typography>

      <Box component="form" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="الاسم الأول" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="الاسم الأخير" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="البريد الإلكتروني" variant="outlined" type="email" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="رسالتك" variant="outlined" multiline rows={4} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large">
              إرسال الرسالة
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 5, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          معلومات الاتصال:
        </Typography>
        <Typography variant="body1" paragraph><LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />العنوان: السلط، الأردن</Typography>
        <Typography variant="body1" paragraph><Phone sx={{ verticalAlign: 'middle', mr: 1 }} />الهاتف: +962 5 1234567</Typography>
        <Typography variant="body1"><Email sx={{ verticalAlign: 'middle', mr: 1 }} />البريد: info@bau.edu.jo</Typography>
      </Box>
    </Container>
  );
};

export default Contact;