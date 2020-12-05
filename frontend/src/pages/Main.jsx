import React from 'react';
import Button from '../components/Button/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import styled, { ThemeProvider, css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import LoginBox from '../components/LoginBox';

const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const palette = {
  primary: '#fca311',
  secondary: '#14213d'
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
      username: "",
      password: "",
      idx: null,
    };
    this.loginInSubmit = this.loginInSubmit.bind(this);
    this.handleUserId = this.handleUserId.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUserId = e => {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  loginInSubmit(e) {
    e.preventDefault();
    const readApiUrl = 'http://localhost:8000/login/'
    const loginInfo = {
      username: this.state.username,
      password: this.state.password
    }

    fetch(readApiUrl, {
      method: 'POST',
      headers: {   
        'origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.success === true) {
          alert("로그인되었습니다.");

          // 서버로부터 받은 JSON 형태이 데이터를 로컬스토리지에 저장함.
          window.localStorage.setItem('userInfo', JSON.stringify(data))
          //스테이트에 유저 정보를 저장함.
          this.setState({
            idx: data.idx,
            username: data.username,
            isLogin: data.success
          });
          //this.props.history.push("/home")
        } else {
          alert("아이디 혹은 비밀번호를 확인하세요");
        }
      });
    }

  render() {
    return (
      <>
      <Grid container style={{background: "#fca311"}}>
        <ThemeProvider theme={{palette}}>
          <LoginBox>
            <Typography variant="h5" style={{fontWeight: "800"}}>Sign In</Typography>
            <Grid container style={{marginTop: "20px", marginBottom: "20px"}}>
                <TextField id="username" fullWidth label="아이디 입력" placeholder="abc@naver.com" onChange={this.handleUserId} />
                <TextField id="password" fullWidth type="password" onChange={this.handlePassword} style={{marginTop: "12px"}} label="비밀번호" />
            </Grid>
            <Button color="secondary" size="large" fullWidth css={css`margin-top: 20px; border-radius: 2rem; margin-bottom: 10px;`} onClick={this.loginInSubmit}>Enter</Button>
            <Box display="flex">
                <Box flexGrow={1}><a href="/join" style={{textDecoration: 'none'}}><Typography variant="span" style={{fontWeight: "600"}} >Sign Up</Typography></a></Box>
                <Box><Typography variant="span" style={{color: "#9e9e9e"}} justifyContent="flex-end">Forgot?</Typography></Box>
            </Box>
          </LoginBox>
        </ThemeProvider>
      </Grid>
      </>
    );
  }
}

export default Main;



