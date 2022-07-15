import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Avatar, Typography, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [profileData, setProfileData] = useState(() => ({
    name: { title: '', first: '', last: '' },
    email: "",
    profileImg: "",
  }));

  const apiCall = async () => {
    try {
      const response = await axios.get(`https://randomuser.me/api`);

      if (response.status === 200) {
        const result = response.data.results[0];
        const responseProfileData = {
          name: result.name,
          email: result.email,
          profileImg: result.picture.large
        };
        setProfileData(responseProfileData);
        localStorage.setItem('profileData', JSON.stringify(responseProfileData));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 345, m: '10% auto 0', textAlign: 'center' }}>
        <Card sx={{ py: '3rem', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', mb: 4, borderRadius: 1.25 }}>
          <Avatar
            alt={profileData.name.title + ' ' + profileData.name.first + ' ' + profileData.name.last}
            src={profileData.profileImg}
            sx={{ width: 85, height: 85, margin: '0 auto .5rem' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">{profileData.name.title + ' ' + profileData.name.first + ' ' + profileData.name.last}</Typography>
            <Typography variant="body2" color="text.secondary">{profileData.email}</Typography>
          </CardContent>
        </Card>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={apiCall}>Refresh</Button>
      </Box>
    </ThemeProvider>
  );
}

export default App;
