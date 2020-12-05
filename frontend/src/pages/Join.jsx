import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { css, ThemeProvider } from 'styled-components';

import Button from '../components/Button/Button';

const palette = {
    primary: '#fca311',
    secondary: '#14213d' 
}

//const readApiUrl = "http://localhost:8000/registration/";

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            idChk: "",
            pw: "",
            re_pw: "",
            pwChk: "",
            email: "",
        }
        this.handleId = this.handleId.bind(this);
        this.checkId = this.checkId.bind(this);
        this.handlePw = this.handlePw.bind(this);
        this.handleRe_pw = this.handleRe_pw.bind(this);
        this.checkPw = this.checkPw.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleId = e => {
        e.preventDefault();
        this.setState({
            id: e.target.value
        })        
    }

    checkId = e => {
        e.preventDefault();

        const chkId = function(str) {
            var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            return regExp.test(str) ? true : false;
        };

        const inputId = {
            id: this.state.id
        };
        const id_info = {
            method: "POST",
            body: JSON.stringify(inputId),
            headers: {
                "Content-Type": "application/json"
            }
        };

        if(chkId(this.state.id) === false) {
            alert("아이디 형식이 유효하지 않습니다. 이메일 형식으로 입력해주세요.");
            this.setState({
                id: ""
            });
        } else {
            fetch("http://localhost:8000/registration/")
                .then(res => res.json())
                .then(json => {
                    if(json === true) {
                        alert("사용가능한 아이디입니다.");
                        this.setState({
                            idChk: this.state.id
                        });
                    } else {
                        alert("이미 존재하는 아이디입니다.");
                    }
                });
        }
    }

    handlePw = e => {
        e.preventDefault();
        this.setState({
            pw: e.target.value
        })        
    }

    handleRe_pw = e => {
        e.preventDefault();
        this.setState({
            re_pw: e.target.value
        })  
    }

    checkPw = e => {
        e.preventDefault();

        const chkPw = function(str) {
            var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
            return !reg_pwd.test(str) ? false : true;
        };

        if(chkPw(this.state.re_pw) === false) {
            alert("영문, 숫자를 혼합하여 6~12자 이내");
            this.setState({
                pw: "",
                re_pw: ""
            });
        } else {
            if(this.state.pw === this.state.re_pw) {
                alert("일치합니다.");
                this.setState({
                    pwChk: this.state.re_pw
                });
            } else {
                alert("불일치합니다.");
            }
        }
    }

    handleEmail = e => {
        e.preventDefault();
        this.setState({
            email: e.target.value
        })        
    }

    onSubmit = e => {
        e.preventDefault();
        const { id, idChk, pw, re_pw, pwChk, email } = this.state;

        const joinInfo = {
            id: this.state.idChk,
            pw: this.state.pwChk
        };

        const join_info = {
            method: "POST",
            body: JSON.stringify(joinInfo),
            headers: {
                "Content-Type": "application/json"
            }
        };

        // if(
        //     id &&
        //     pw &&
        //     re_pw &&
        //     pw === re_pw &&
        //     re_pw === pwChk &&
        //     email
        // ) {
        //     fetch()
        // }
    }

    render() {
        return (
            <>
            <Grid>
                <ThemeProvider theme={{palette}}>
                    <Box>
                        <TextField id="userId" label="아이디" onChange={this.handleId}></TextField>
                        <Button size="small" fullWidth onClick={this.checkId}>중복확인</Button>
                        <TextField id="userPw" label="비밀번호" type="password" onChange={this.handlePw}></TextField>
                        <TextField id="userPwChk" label="비밀번호 확인" type="password" onChange={this.checkPw}></TextField>
                        <TextField id="userEmail" label="이메일" onChange={this.handleEmail}></TextField>
                        <Button size="small" fullWidth onClick={this.onSubmit}>인증</Button>
                    </Box>
                    <Button color="primary" fullWidth css={css`margin-top: 20px; border-radius: 2rem; margin-bottom: 10px;`}>회원가입</Button>
                </ThemeProvider>
            </Grid>
            </>
        );
    }
}

export default Join;