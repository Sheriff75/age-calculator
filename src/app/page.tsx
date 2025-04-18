'use client'

import React, { useState } from 'react'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { Stack, Box, InputBase, Typography, Avatar } from '@mui/material';
import {Grid,} from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
const Home = () => {


  const [birthDay, setBirthDay] = useState({
    day: 0,
    month: 0,
    year: 0
  })
  const [days, setDays] = useState<number | string>('');
  const [months, setMonths] = useState<number | string>('');
  const [years, setYears] = useState<number | string>('');

  const calculateAge = (date: Dayjs | null) => {
    if (!date) return { day: 0, month: 0, year: 0 };
  
    const today = dayjs(); // Current date
    const birthDate = dayjs(date); // Birthdate from input
  
    // Calculate the difference in years, months, and days
    let calculatedYear = today.year() - birthDate.year();
    let calculatedMonth = today.month() - birthDate.month();
    let calculatedDay = today.date() - birthDate.date();
  
    // Adjust for negative days
    if (calculatedDay < 0) {
      const daysInPreviousMonth = birthDate.add(calculatedMonth, 'month').daysInMonth();
      calculatedDay += daysInPreviousMonth;
      calculatedMonth--;
    }
  
    // Adjust for negative months
    if (calculatedMonth < 0) {
      calculatedMonth += 12;
      calculatedYear--;
    }
  
    // Update the state with the calculated values
    setBirthDay({
      day: calculatedDay,
      month: calculatedMonth,
      year: calculatedYear,
    });
  };
  

  const handleCalculate = () => {
    // Validate inputs
    if (!years || !months || !days) {
      alert('Please fill in all fields');
      return;
    }
  
    // Pad single-digit months and days to two digits
    const paddedMonth = String(months).padStart(2, '0');
    const paddedDay = String(days).padStart(2, '0');
  
    // Combine the input values into a date string
    const dateString = `${years}-${paddedMonth}-${paddedDay}`;
    const date = dayjs(dateString, 'YYYY-MM-DD');
  
    // Validate the constructed date
    if (!date.isValid()) {
      alert('Please enter a valid date');
      return;
    }
  
    // Calculate the remaining time
    calculateAge(date);
  };


  


  return (
    <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
          backgroundColor: 'hsl(0, 0%, 86%)',
          height: '100vh',
          width: '100%',
    }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container size ={{xs : 12, md: 6}}
        sx={{
          display: 'flex',
          gap: '60px',
          flexDirection: 'column',
          backgroundColor: 'white',
          minHeight: {xs: '65vh', md: '70vh'},
          width: {xs: '95%', sm: '80%', md: '50%'},
          borderRadius: '20px',
          borderBottomRightRadius: '170px',
          padding: '50px 40px',
        }}
        >
          <Stack direction={'row'} sx={{
            display: 'flex',
            gap: {xs: '5px', md: '20px'},
            alignItems: 'center',
          }}>
            <Box sx={{display: 'flex', flexDirection: 'column',}}>
              <Typography gutterBottom sx={{
                textTransform: 'uppercase', 
                fontSize: {xs: '10px', sm: '13px', md: '16px'},
                letterSpacing: '3px'
              }}>Day</Typography>
            <InputBase value={days} 
            onChange={(e) => {const value = e.target.value;
              if (/^\d*$/.test(value) && Number(value) <= 31) {
                setDays(value);
              }
            }}
            sx={{
              border: '1px solid hsl(0, 0%, 86%)',
              borderRadius: '10px',
              padding: '10px',
              minWidth: {xs:'20px', sm: '30px', md: '50px' },
              maxWidth: {xs:'50px', sm: '70px', md: '150px' },
              backgroundColor: 'hsl(0, 0%, 86%)',
              fontSize: {xs: '18px', md: '25px'},
            }} />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column',}}>
              <Typography gutterBottom sx={{
                textTransform: 'uppercase', 
                fontSize: {xs: '10px', sm: '13px', md: '16px'},
                letterSpacing: '3px'
              }}>Month</Typography>
            <InputBase value={months} 
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value) && Number(value) <= 12) {
                setMonths(value);
              }
            }} sx={{
              border: '1px solid hsl(0, 0%, 86%)',
              borderRadius: '10px',
              padding: '10px',
              minWidth: {xs:'20px', sm: '30px', md: '50px' },
              maxWidth: {xs:'50px', sm: '70px', md: '150px' },
              backgroundColor: 'hsl(0, 0%, 86%)',
              fontSize: {xs: '18px', md: '25px'},
            }}   />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column',}}>
              <Typography gutterBottom sx={{
                textTransform: 'uppercase', 
                fontSize: {xs: '10px', sm: '13px', md: '16px'},
                letterSpacing: '3px'
              }}>Year</Typography>
            <InputBase value={years} 
            onChange={(e) => setYears(e.target.value)} sx={{
              border: '1px solid hsl(0, 0%, 86%)',
              borderRadius: '10px',
              padding: '10px',
              minWidth: {xs:'20px', sm: '30px', md: '50px' },
              maxWidth: {xs:'50px', sm: '70px', md: '150px' },
              backgroundColor: 'hsl(0, 0%, 86%)',
              fontSize: {xs: '18px', md: '25px'},
            }}   />
            </Box>
          </Stack>
          <Stack sx={{
            display: 'flex',
            width: '100%',
            justifyContent: {md: 'space-between', xs: 'center'},
            position: 'relative',
          }} >
            <hr style={{zIndex: '0', color: 'grey',  }}/>
            <Avatar sx={{
              width: {xs: '30px', md: '50px'},
              height: {xs: '30px', md: '50px'},
              cursor: 'pointer',
              zIndex: 1,
              position: 'absolute',
              top:{md: '-1.5rem', xs: ''},
              left: {xs: '100%', md: '50%'}
            }} onClick={handleCalculate}>

              <AddIcon sx={{
                color: 'white',
                fontSize: {xs: '20px', md: '30px'},
              }} />
            </Avatar>
          </Stack>
          <Box>
          <Stack direction={'row'} sx={{display: 'flex', alignItems: 'center', height: 'auto', gap: '3px' }}> 
              <Typography sx={{
                fontSize: {xs: '50px',  md: '70px'},
                fontWeight: 'bold',
                color: 'hsl(259, 100%, 65%)',
              }}>{birthDay.year !== 0 ? birthDay.year : '_ _'}</Typography>
              <Typography 
              sx={{
                fontSize: {xs: '25px' ,sm: '50px', md: '70px'},
                fontWeight: 'bold',
              }}>years
              </Typography>
            </Stack>
            <Stack direction={'row'} sx={{display: 'flex', alignItems: 'center', height: 'auto', gap: '3px' }}>
              <Typography sx={{
                fontSize: {xs: '50px',  md: '70px'},
                fontWeight: 'bold',
                color: 'hsl(259, 100%, 65%)',
              }}>{birthDay.month !== 0 ? birthDay.month : '_ _'}</Typography>
              <Typography 
              sx={{
                fontSize: {xs: '25px' ,sm: '50px', md: '70px'},
                fontWeight: 'bold',
              }}>
                months
              </Typography>
            </Stack>
            <Stack direction={'row'} sx={{display: 'flex', alignItems: 'center', height: 'auto', gap: '3px' }}>
              <Typography sx={{
                fontSize: {xs: '50px',  md: '70px'},
                fontWeight: 'bold',
                color: 'hsl(259, 100%, 65%)',
              }}>{birthDay.day !== 0 ? birthDay.day : '_ _'}</Typography>
              <Typography 
              sx={{
                fontSize: {xs: '25px' ,sm: '50px', md: '70px'},
                fontWeight: 'bold',
              }}>
                days
              </Typography>
            </Stack>
          </Box>
        </Grid>
        </LocalizationProvider>
    </Box>
  )
}
export default Home