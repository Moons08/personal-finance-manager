import React from 'react';
import { createGlobalStyle } from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, theme } from '@material-ui/core';
import { ThemeProvider, css } from 'styled-components';

import User from '../img/user.jpg';
import Button from '../components/Button/Button';

const useStyles = makeStyles((theme) => ({
  avatarStyles: {
    width: '75px',
    height: '75px',
    marginTop: '35px',
    marginBottom: '10px',
    marginRight: 'auto', 
    marginLeft: 'auto'
  }
}))

const palette = {
  primary: '#fca311',
  secondary: '#14213d'
}

export default function Mypage() {
    return (
        <>
        <ThemeProvider theme={{palette}}>
          <Grid xs={12} style={{display: 'block'}}>
            <Avatar alt="user's face" src={User} style={{width: '75px', height: '75px', marginTop: '35px', marginBottom: '10px', marginRight: 'auto', marginLeft: 'auto'}}></Avatar>
            <Typography style={{ fontWeight: "700", textAlign: 'center', marginBottom: '20px' }} variant="h6" gutterBottom>Gil Dong Hong</Typography>
          </Grid>
          <Grid xs={12} style={{margin: "20px"}}>
            <Button color="primary" size="large" fullWidth style={{borderRadius: '.4rem', marginBottom: '10px'}}>정보변경</Button>
            <a href="/"><Button color="secondary" size="large" fullWidth style={{borderRadius: '.4rem', marginBottom: '10px'}}>로그아웃</Button></a>
          </Grid>
        </ThemeProvider>
        </>      
    );
}