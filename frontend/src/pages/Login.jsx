import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import styled, { ThemeProvider, css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { createBrowserHistory } from 'history';

import Button from '../components/Button/Button';
import LoginBox from '../components/LoginBox';

const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: #fca311;
    margin: 0;
    height: 100%;
  }
`;

const palette = {
  primary: '#fca311',
  secondary: '#14213d'
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      username: "",
      password: "",
      token: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit() {
    if(this.state.username === "" || this.state.password === "") {
      alert('아이디와 비밀번호를 입력해주세요.')
      return;
    } else {
      fetch("http://localhost:8000/account/login/", {
        method: "POST",
        headers: {
          "origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        }),
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if(response.access_token) {
          window.localStorage.setItem("access_token", response.access_token);
          this.setState({
            isLogged: true,
            token: localStorage.getItem("access_token")
          })
          alert(this.state.username + "님, 안녕하세요.")
          this.props.history.push("/home");
          console.log(localStorage.getItem("access_token"));
        } else if (!response.access_token) {
          alert("가입된 회원이 아닙니다.");
          this.props.history.push("/join");
        }
      })
    } 
  }

  render() {
    return (
      <>
      <GlobalStyle />
      <Grid container style={{background: "#fca311"}}>
        <ThemeProvider theme={{palette}}>
          <LoginBox>
            <Typography variant="h5" style={{fontWeight: "800"}}>로그인</Typography>
            <Grid container style={{marginTop: "20px", marginBottom: "20px"}}>
                <TextField id="username" fullWidth label="아이디" name="username" onChange={this.handleChange} />
                <TextField id="password" fullWidth type="password" style={{marginTop: "12px"}} label="비밀번호" name="password" onChange={this.handleChange} />
            </Grid>
            <Button 
              color="secondary" 
              size="large" 
              fullWidth 
              css={css`margin-top: 20px; border-radius: 2rem; margin-bottom: 10px;`} 
              onClick={this.onSubmit} 
            >로그인</Button>
            <Box display="flex" style={{paddingTop: '3px'}}>
                <Box flexGrow={1}><a href="/join" style={{textDecoration: 'none'}}><Typography variant="span" style={{fontWeight: "600"}} >회원가입</Typography></a></Box>
                <Box><Typography variant="span" style={{color: "#9e9e9e", justifyContent: "flex-end"}}>Forgot?</Typography></Box>
            </Box>
          </LoginBox>
        </ThemeProvider>
      </Grid>
      </>
    );
  }
}

export default Login;



