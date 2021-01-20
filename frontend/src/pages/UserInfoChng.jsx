import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { ThemeProvider, css } from 'styled-components';
import { createBrowserHistory } from 'history';

const palette = {
  primary: '#fca311',
  secondary: '#14213d'
}

const chkUsername = function(str) {
  var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regExp.text(str) ? true : false;
}

class UserInfoChng extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameChk: "",
      password1: "",
      password2: "",
      //passwordChk: "",
      email: "",
      emailChk: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleUserInfoChngClick = this.handleUserInfoChngClick.bind(this);
  }

  // 아이디 인풋 핸들링
  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // 회원가입
  handleUserInfoChngClick() {
    //e.preventDefault();
    if(this.state.password1 == "" || this.state.password2 == "" || this.state.email == "") {
      alert('누락된 정보가 있습니다. 빠짐없이 입력해 주세요.');
      return;
    } else {
      fetch("http://localhost:8000/account/password/change/", {
      method: "POST",
      headers: {
        "origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password1: this.state.password1,
        password2: this.state.password2,
        email: this.state.email
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        alert(this.state.username + "님의 정보가 변경되었습니다.");
        return;
      })
    }
  }

  render() {
    return (
      <>
      <form onSubmit={this.handleUserInfoChngClick}>
      <Grid style={{margin: "20px"}}>
        <ThemeProvider theme={{palette}}>
            <Typography variant="h5" style={{fontWeight: "800"}}>회원정보 변경</Typography>
            <Grid item style={{marginTop: '15px', marginBottom: '25px'}}>
                <TextField id="userPw1" type="password" fullWidth style={{marginTop: "12px"}} label="새로운 비밀번호" name="password1" onChange={this.handleChange} />
                <TextField id="userPw2" type="password" fullWidth style={{marginTop: "12px"}} label="새로운 비밀번호 확인" name="password2" onChange={this.handleChange} />
                <TextField id="userEmail" fullWidth style={{marginTop: "12px"}} label="이메일" name="email" type="email" onChange={this.handleChange} />
                <Button color="secondary" fullWidth style={{marginTop: '10px'}}>중복확인</Button>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button color="primary" size="large" type="submit" fullWidth>확인</Button>
              </Grid>
              <Grid item xs={6}>
                <Link to="/mypage" style={{textDecoration: 'none'}}><Button color="secondary" size="large" fullWidth>취소</Button></Link>
              </Grid>
            </Grid>
        </ThemeProvider>
      </Grid>
      </form>
      </>
    );
  }
}

export default UserInfoChng;



