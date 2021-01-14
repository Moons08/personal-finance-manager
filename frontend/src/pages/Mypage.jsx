import React from 'react';
import { Link } from 'react-router-dom';
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

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: true,
    }
    this.logoutSubmit = this.logoutSubmit.bind(this);
  }

  logoutSubmit() {
    fetch("http://localhost:8000/account/logout/", {
      method: "POST",
      headers: {
        "origin": "*",
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      localStorage.removeItem("access_token");
      this.setState({
        isLogged: false
      })
      console.log(localStorage.getItem("access_token"));
      this.props.history.push("/")
    })
  }

  render() {
    return (
        <>
        <ThemeProvider theme={{palette}}>
          <Grid xs={12} style={{display: 'block'}}>
            <Avatar alt="user's face" src={User} style={{width: '75px', height: '75px', marginTop: '35px', marginBottom: '10px', marginRight: 'auto', marginLeft: 'auto'}}></Avatar>
            <Typography style={{ fontWeight: "700", textAlign: 'center', marginBottom: '20px' }} variant="h6" gutterBottom>Gil Dong Hong</Typography>
          </Grid>
          <Grid xs={12} style={{margin: "20px"}}>
            <Link to="/info-change" style={{textDecoration: 'none'}}><Button color="primary" size="large" fullWidth style={{borderRadius: '.4rem', marginBottom: '10px'}}>정보변경</Button></Link>
            <Button color="secondary" size="large" fullWidth style={{borderRadius: '.4rem', marginBottom: '10px'}} onClick={this.logoutSubmit}>로그아웃</Button>
          </Grid>
        </ThemeProvider>
        </>      
    );
  }
}

export default Mypage;