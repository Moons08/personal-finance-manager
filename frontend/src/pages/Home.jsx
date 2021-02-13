import React from 'react';
import { ThemeProvider } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import ContentsBox from '../components/ContentsBox';
import Apple from '../img/apple.png';
import Facebook from '../img/facebook.png';
import Google from '../img/google.png';
import AWS from '../img/aws.png';
import PortfolioBox from '../components/PortfolioBox';
import Button from '../components/Button/Button';

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

const palette = {
  primary: '#fca311',
  secondary: '#14213d',
  third: '#ffffff',
  fourth: '#ddd'
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portExist: false,
      addPort: false,
      name: "",
    }
    this.addPortfoiloBtn = this.addPortfoiloBtn.bind(this);
    this.PortBoxClose = this.PortBoxClose.bind(this);
    this.createPortfolio = this.createPortfolio.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addPortfoiloBtn(e) {
    this.setState({
      addPort: true
    })
  }

  PortBoxClose(e) {
    this.setState({
      addPort: false
    })
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  } 

  createPortfolio(e) {
    if(this.state.name === "") {
      alert('포트폴리오명을 입력해주세요.')
      return;
    } else {
      fetch("http://localhost:8000/finance_manager/portfolio/", {
        method: "POST",
        headers: {
          "origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.name
        }),
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      }) 
    }       
  }

  render() {
    const { portExist, addPort } = this.state;
      return (
        <>
          <Grid container>
            <ThemeProvider theme={{palette}}>
              <Grid container alignItems="center" style={{margin: '10px 24px', height: '50px'}}>
                <Grid item xs={11}>
                  <Box>
                    <Typography color={"#424242"} variant="h6" gutterBottom>포트폴리오</Typography>
                  </Box>
                </Grid>
                <Grid item justify="flex-end">
                  <Typography color={'primary'} variant="h4" style={{fontWeight:'700'}} gutterBottom onClick={this.addPortfoiloBtn}>+</Typography>
                </Grid>
              </Grid>
              <ContentsBox style={{justifyContent: 'space-between'}}>
                {portExist === false && <>
                  <Grid style={{position: 'absolute', top: '50%', left: '50%', marginLeft: '-100px'}}>
                    <Typography variant="subtitle1" gutterBottom><Box textAlign="center">등록된 포트폴리오가 없습니다.</Box></Typography>
                  </Grid>
                </>}
                {addPort && <>
                  <Box style={{justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%', borderRadius: '2rem', width: '100%'}}>
                    <PortfolioBox>
                      <Typography variant="h6" style={{fontWeight: "800"}}>포트폴리오 생성</Typography>
                      <Grid container>
                        <TextField id="name" fullWidth label="생성할 포트폴리오 이름" name="name" onChange={this.handleChange} />
                      </Grid>
                      {/* <Typography variant="h6" style={{fontWeight: "800", marginTop: '20px'}}>자산 등록</Typography>
                      <Grid container>
                        <TextField id="company_nm" fullWidth label="회사명" name="company_nm" onChange={this.handleChange} />
                        <TextField id="avg_price" fullWidth label="평균 단가" name="avg_price" onChange={this.handleChange} />
                        <TextField id="amount" fullWidth label="수량" name="amount" onChange={this.handleChange} />
                      </Grid> */}
                      <Grid container spacing={2} style={{marginTop: '12px'}}>
                        <Grid item xs={6}>
                          <Button color="primary" size="large" type="submit" fullWidth onClick={this.createPortfolio}>확인</Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button color="secondary" size="large" fullWidth onClick={this.PortBoxClose}>취소</Button>
                        </Grid>
                      </Grid>
                    </PortfolioBox>
                  </Box>
                </>}
              </ContentsBox>
            </ThemeProvider>
          </Grid>
        </>
      );
    }
  }