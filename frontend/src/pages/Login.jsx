import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import styled, { ThemeProvider, css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

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
      id: "",
      pw: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnClick() {
    if(this.state.id === "" || this.state.pw === "") {
      alert('이메일과 비밀번호를 입력해주세요.')
      return;
    } else {
      this.state.isLogged = true;
      console.log(this.state);
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
                <TextField id="inputId" fullWidth type="email" label="이메일" name="id" onChange={this.handleChange} />
                <TextField id="inputPw" fullWidth type="password" style={{marginTop: "12px"}} label="비밀번호" name="pw" onChange={this.handleChange} />
            </Grid>
            <Button 
              color="secondary" 
              size="large" 
              fullWidth 
              css={css`margin-top: 20px; border-radius: 2rem; margin-bottom: 10px;`} 
              onClick={this.handleOnClick} 
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



