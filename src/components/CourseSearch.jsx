// src/components/CourseSearch.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Autocomplete, Paper, Chip } from '@mui/material';
import { treeData } from '../data/coursesData';

const CourseSearch = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const getCourseDetails = (courseName) => {
    return treeData[courseName] || null;
  };

  const details = selectedCourse ? getCourseDetails(selectedCourse) : null;

  return (
    <Box sx={{
      my: 4,
      p: 3,
      background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
      borderRadius: 4,
      boxShadow: 3,
      position: 'relative',
      border: '2px solid #1565c0',
      width: '90%',
      mx: 'auto'
    }}>
      <Typography variant="h5" sx={{
        position: 'absolute',
        top: -20,
        right: 20,
        backgroundColor: 'white',
        px: 2,
        py: 0.5,
        border: '2px solid #1565c0',
        color: '#1565c0',
        borderRadius: 2,
        fontWeight: 'bold'
      }}>
        الخطة الإرشادية
      </Typography>

      <Typography align="center" variant="body1" sx={{ mt: 2, mb: 3, color: '#1c4a99', fontWeight: 'bold' }}>
        أدخل اسم المادة لتعرف المتطلبات السابقة وما تفتحه من مواد لاحقة.
      </Typography>

      <Autocomplete
        options={Object.keys(treeData)}
        renderInput={(params) => <TextField {...params} label="ابحث عن مادة..." variant="outlined" sx={{ bgcolor: 'white', borderRadius: 1 }} />}
        value={selectedCourse}
        onChange={(event, newValue) => setSelectedCourse(newValue)}
        sx={{ width: '100%', maxWidth: 500, mx: 'auto', mb: 3 }}
      />

      {details && (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}>
          <Typography variant="h6" align="center" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
            {selectedCourse}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
            <Chip label={`المتطلب السابق: ${details.prerequisite}`} color="error" variant="outlined" />
            <Chip label={`المتطلب المتزامن: ${details.concurrent || 'لا يوجد'}`} color="warning" variant="outlined" />
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>المواد التي تفتحها:</Typography>
          {details.opens.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {details.opens.map((course, idx) => (
                <Chip key={idx} label={course} color="success" />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">لا تفتح مواد أخرى مباشرة.</Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default CourseSearch;