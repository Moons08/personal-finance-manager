import React from 'react';
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

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameChk: "",
      password1: "",
      password2: "",
      //passwordChk: "",
      email: "",
      emailChk: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    //this.checkEmail = this.checkEmail.bind(this);
  }

  // 아이디 인풋 핸들링
  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // 회원가입
  handleJoinClick() {
    //e.preventDefault();
    if(this.state.username == "" || this.state.password1 == "" || this.state.password2 == "" || this.state.email == "") {
      alert('누락된 정보가 있습니다. 빠짐없이 입력해 주세요.');
      return;
    } else {
      fetch("http://localhost:8000/account/registration/", {
      method: "POST",
      headers: {
        "origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password1: this.state.password1,
        password2: this.state.password2,
        email: this.state.email
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        alert(this.state.username + "님으로 가입되었습니다. 로그인 후 이용해 주세요.");
        this.props.history.push("/");
      })
    }
  }

  // 아이디 중복검사
  checkUsername(e) {
    e.preventDefault();

    fetch("http://localhost:8000/account/user/", {
      method: "POST",
      headers: {
        "origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: this.state.username})
    })
    .then(res => {if(res.status === 200) {
        alert("사용가능한 아이디입니다.");
        this.setState({
          username: this.state.username
        });
        console.log(res.status);
      } else if(res.status === 409) {
        alert("이미 존재하는 아이디입니다.")
        console.log(res.status);
      } else {
        alert("사용할 수 없는 아이디입니다.")
        console.log(res.status);
      }
    })
    // .then(response => response.json())
    // .then(response => {
    //   console.log(response.status);
    // })
  }



  render() {
    return (
      <>
      <form onSubmit={this.handleJoinClick}>
      <Grid style={{margin: "20px"}}>
        <ThemeProvider theme={{palette}}>
            <Typography variant="h5" style={{fontWeight: "800"}}>회원가입</Typography>
            <Grid item style={{marginTop: '15px', marginBottom: '25px'}}>
                <TextField id="userName" fullWidth label="아이디" name="username" onChange={this.handleChange} />
                <Button color="secondary" fullWidth style={{marginTop: '10px'}} onClick={this.checkUsername} >중복확인</Button>
                <TextField id="userPw1" type="password" fullWidth style={{marginTop: "12px"}} label="비밀번호" name="password1" onChange={this.handleChange} />
                <TextField id="userPw2" type="password" fullWidth style={{marginTop: "12px"}} label="비밀번호 확인" name="password2" onChange={this.handleChange} />
                <TextField id="userEmail" fullWidth style={{marginTop: "12px"}} label="이메일" name="email" type="email" onChange={this.handleChange} />
                <Button color="secondary" fullWidth style={{marginTop: '10px'}}>중복확인</Button>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" size="large" fullWidth type="submit">회원가입</Button>
            </Grid>
        </ThemeProvider>
      </Grid>
      </form>
      </>
    );
  }
}

export default Join;



