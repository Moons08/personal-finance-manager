import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import ContentsBox from '../components/ContentsBox';
import Apple from '../img/apple.png';
import Facebook from '../img/facebook.png';
import Google from '../img/google.png';
import AWS from '../img/aws.png';
import User from '../img/user.jpg';

const paperStyles = {
  height: '55px',
  borderRadius: '1.25rem',
  marginLeft: '15px',
  marginRight: '15px',
  marginTop: '15px',
};

const companys = [
  {
    name: 'apple',
    image: Apple,
    usemap: '#apple'
  },
  {
    name: 'facebook',
    image: Facebook,
    usemap: '#facebook'
  },
  {
    name: 'google',
    image: Google,
    usemap: '#google'
  },
  {
    name: 'aws',
    image: AWS,
    usemap: '#aws'
  },
];

function Company({name, image}) {
  return (
    <div>
      <Paper elevation={2} style={paperStyles}>
        <img src={image} alt={name} width="45px" height="45px" style={{padding: '5px 10px'}}></img>
      </Paper>
    </div>
  )
}

class Home extends Component {
  render() {
    return (
      <>
        <Grid container>
          <Grid container alignItems="center" style={{padding: '20px 35px'}}>
            <Grid container xs={10}>
              <Box >
                <Typography style={{ color: "#424242" }} variant="span" gutterBottom>현재 Da Yeong님의 자산</Typography>
                <Typography style={{ color: "#fca311", fontWeight: "700" }} variant="h5" gutterBottom>￦ 5,000,000</Typography>
              </Box>
            </Grid>
            <Grid container xs={2}>
              <Avatar alt="user's face" src={User} style={{width: '62px', height: '62px'}}></Avatar>
            </Grid>
          </Grid>
          <ContentsBox>
            {companys.map(element => <Company name={element.name} image={element.image} usemap={element.usemap} />)}            
          </ContentsBox>
        </Grid>
      </>
    );
  }
}

export default Home;