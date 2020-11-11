import React from 'react';
import styled, { css } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ContentsBox from '../components/ContentsBox';
import Apple from '../img/apple.png';
import Facebook from '../img/facebook.png';
import Google from '../img/google.png';
import AWS from '../img/aws.png';
import User from '../img/user.jpg';

const companys = [
  {
    name: 'Apple',
    image: Apple,
    devidend: '$0.21',
    month: '2, 5, 8, 11',
    date: '2020-08-10'
  },
  {
    name: 'Facebook',
    image: Facebook,
    devidend: '$0.43',
    month: '3, 4, 6, 11',
    date: '2020-08-11'
  },
  {
    name: 'Google',
    image: Google,
    devidend: '$0.56',
    month: '2, 5, 8, 11',
    date: '2020-08-17'
  },
  {
    name: 'Aws',
    image: AWS,
    devidend: '$0.77',
    month: '2, 5, 8, 11',
    date: '2020-09-01'
  },
];

const styles = makeStyles((theme) => ({
  cover: {
    width: 85,
  },
  root: {
    display: 'flex',
    height: '70px',
    borderRadius: '1rem',
    marginLeft: '12px',
    marginRight: '12px',
    marginTop: '12px',
  },
  inner: {
    padding: '5px 10px',
    width: '100%'
  }
}));

function Company({name, image, devidend, date, month}) {
  const classes = styles();
  return (
    <div>
      <Card className={classes.root}>
        <CardMedia 
          image={image} 
          className={classes.cover}
        />
        <CardContent className={classes.inner}>
          <Box style={{display: 'flex'}}>
            <Typography variant="span" style={{fontWeight: "600", color: '#fca311'}}>{name}</Typography>
            <Typography variant="subtitle2">공시배당금: {devidend}</Typography>
          </Box>
          <Box style={{display: 'flex'}}>
            <Typography variant="subtitle2">{date}</Typography>
            <Typography variant="subtitle2">배당월: {month}</Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default class Home extends React.Component {
    render() {
      return (
        <>
          <Grid container>
            <Grid container alignItems="center" style={{padding: '20px 35px', height: '104px'}}>
              <Grid xs={9}>
                <Box>
                  <Typography style={{ color: "#424242" }} variant="span" gutterBottom>현재 Gil Dong님의 자산</Typography>
                  <Typography style={{ color: "#fca311", fontWeight: "700" }} variant="h5" gutterBottom>￦ 5,000,000</Typography>
                </Box>
              </Grid>
              <Grid item justify="flex-end">
                <Avatar alt="user's face" src={User} style={{width: '60px', height: '60px'}}></Avatar>
              </Grid>
            </Grid>
            <ContentsBox style={{justifyContent: 'space-between'}}>
              {companys.map(element => <Company name={element.name} image={element.image} devidend={element.devidend} date={element.date} month={element.month} />)}            
            </ContentsBox>
          </Grid>
        </>
      );
    }
  }
