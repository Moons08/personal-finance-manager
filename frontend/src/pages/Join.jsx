import React from 'react';
import Button from '../components/Button/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, css } from 'styled-components';

const palette = {
  primary: '#fca311',
  secondary: '#14213d'
}

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      idCheck: "",
      pw: "",
      re_pw: "",
      pwCheck: "",
      nickname: "",
      nicknameCheck: ""
    }
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.handleCheckId = this.handleCheckId.bind(this);
  }

  // 아이디 인풋 핸들링
  handleIdChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // 회원가입
  handleJoinClick() {
    console.log(this.state.id)
  }

  // 아이디 중복검사
  handleCheckId(e) {
    e.preventDefault();

    // 유효성 검사
    const chkId = function(str) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regExp.text(str) ? true : false;
    }

    const inputId = {
      id: this.state.id
    };
    const id_info = {
      method: 'post',
      body: JSON.stringify(inputId),
      headers: {
        "Content-Type": "application/json"
      }
    };

    if(chkId(this.state.id) === false) {
      alert("아이디 형식이 유효하지 않습니다. 메일 형식으로 기입해 주세요.");
      this.setState({
        id: ""
      });
    } else {
      fetch("http://localhost:3000/user/id", id_info)
      .then(res => res.json())
      .then(json => {
        if(json === true) {
          alert("사용가능한 아이디입니다.");
          this.setState({
            idCheck: this.state.id
          });
        } else {
          alert("이미 존재하는 아이디입니다.")
        }
      })
    }
  }

  render() {
    return (
      <>
      <Grid style={{margin: "20px"}}>
        <ThemeProvider theme={{palette}}>
            <Typography variant="h5" style={{fontWeight: "800"}}>회원가입</Typography>
            <Grid item style={{marginTop: '15px', marginBottom: '25px'}}>
                <TextField id="userId" fullWidth label="아이디" name="id" type="email" onChange={this.handleIdChange} />
                <Button color="secondary" fullWidth style={{marginTop: '10px'}} onClick={this.handleCheckId} >중복확인</Button>
                <TextField id="userPw" type="password" fullWidth style={{marginTop: "12px"}} label="비밀번호" name="pw" onChange={this.handleChange} />
                <TextField id="userRe_pw" type="password" fullWidth style={{marginTop: "12px"}} label="비밀번호 확인" name="re_pw" onChange={this.handleChange} />
                <TextField id="userNickname" fullWidth style={{marginTop: "12px"}} label="닉네임" name="nickname" onChange={this.handleChange} />
                <Button color="secondary" fullWidth style={{marginTop: '10px'}}>중복확인</Button>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" size="large" fullWidth onClick={this.handleJoinClick}>회원가입</Button>
            </Grid>
        </ThemeProvider>
      </Grid>
      </>
    );
  }
}

export default Join;



