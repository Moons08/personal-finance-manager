import React from 'react';
import { css, ThemeProvider } from 'styled-components';
import '../styles.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';

import ContentsBox from '../components/ContentsBox';
import TabPane from '../components/Tab/TabPane';
import Tabs from '../components/Tab/Tab';
import MuiSelectBox from '../components/MuiSelectBox';
import Button from '../components/Button/Button';
import { Line } from 'react-chartjs-2';
import selectOptions from '../selectOptions';

const appBarStyles = {
  height: '45px',
  backgroundColor: '#eeeeee',
  boxShadow: 'none',
  borderTopLeftRadius: '1rem',
  borderTopRightRadius: '1rem'
}

const tabStyles = {
  fontSize: '15px',
  color: '#424242',
  fontWeight: '700'
}

const palette = {
  primary: '#fca311',
  secondary: '#14213d'
}

export default class Compter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly_input: 0,    // 월별지불액
      interest: 0,        // 연이율
      present_value: 0,    // 현재가치
      future_value: 0,     // 미래가치(결과)
      year: 0,            // 연수
      intCal: 0,          // 복리계산
      value: 0,
      chartData: {}
    }
    this.calculateFunc = this.calculateFunc.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: Number(e.target.value)
    });
    console.log(this.state);
  }

  calculateFunc() {
    if (this.state.monthly_input === 0 || this.state.interest === 0 || this.state.present_value === 0 || this.state.year === 0) {
      alert('항목을 빠짐없이 입력해주세요.')
      return;
    } else {
      fetch("http://localhost:8000/finance_manager/expect_asset/", {
        method: "POST",
        headers: {
          "origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monthly_input: this.state.monthly_input,
          interest: this.state.interest,
          present_value: this.state.present_value,
          year: this.state.year
        }),
      })
        .then(response => response.json())
        .then(response => {
          const fv = response.expect.future_values;
          let labels = [];
          let data = [];
          let real_data = [];
          labels.push(Object.keys(fv));
          data.push(Object.values(fv));
          for(var i = 0; i < data[0].length; i++) {
            real_data.push(data[0][i].future_value);
          }
          this.setState({
            future_value: response.expect.future_value,
            chartData: {
              labels: labels[0],
              datasets: [
                {
                  label: 'My Assets Flow Chart',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: real_data
                }
              ]
            }
          })
        })
    }
  }

  render() {
    return (
      <>
        <Grid container>
          <ThemeProvider theme={{ palette }}>
            <Grid container xs={12} style={{ padding: '20px', height: '104px' }}>
              <Box>
                <Typography style={{ color: "#424242", fontWeight: "700" }} variant="h5" gutterBottom>화폐의 시간적 가치</Typography>
              </Box>
            </Grid>
            <ContentsBox style={{ paddingTop: '0px!important' }}>
              <div className="container">
                <Tabs>
                  <TabPane name="미래가치" label="미래가치" key="1">
                    <Typography variant="h6">현재 가진 정보로<br />미래의 자산 가치를 확인 해 보세요.</Typography>
                    <Grid container style={{ marginTop: "20px", marginBottom: "12px" }}>
                      <TextField id="monthly_input" name="monthly_input" variant="outlined" size="small" fullWidth type="number" label="월별 투자액" onChange={this.handleChange} />
                      <TextField id="interest" name="interest" variant="outlined" size="small" fullWidth style={{ marginTop: "12px" }} type="number" label="연이율(%)" onChange={this.handleChange} />
                      <MuiSelectBox
                        id="intCal"
                        variant="outlined"
                        handleChange={this.handleChange}
                        label="복리 계산" />
                      <TextField id="present_value" name="present_value" variant="outlined" size="small" fullWidth style={{ marginTop: "12px" }} type="number" label="현재 가치" onChange={this.handleChange} />
                      {/* <MuiSelectBox 
                          id="year" 
                          variant="outlined" 
                          handleChange={this.handleChange} 
                          label="연수" 
                          selectOptionList={selectOptions.period}
                        /> */}
                      <TextField id="year" name="year" variant="outlined" size="small" fullWidth style={{ marginTop: "12px" }} type="number" label="연수" onChange={this.handleChange} />
                    </Grid>
                    <Button color="secondary" fullWidth style={{ height: '40px' }} onClick={this.calculateFunc}>계산</Button>
                  </TabPane>
                  <TabPane name="현재가치" label="현재가치" key="2">
                    <Typography variant="h6">현재 가진 정보로<br />현재의 자산 가치를 확인 해 보세요.</Typography>
                    <Grid container style={{ marginTop: "20px", marginBottom: "12px" }}>
                      <TextField id="" variant="outlined" size="small" fullWidth type="number" label="월별 투자액" onChange={this.handleChange} />
                      <TextField id="" variant="outlined" size="small" fullWidth style={{ marginTop: "12px" }} type="number" label="연이율(%)" onChange={this.handleChange} />
                      <MuiSelectBox
                        id=""
                        variant="outlined"
                        handleChange={this.handleChange}
                        label="복리 계산"
                      />
                      <TextField id="" variant="outlined" size="small" fullWidth style={{ marginTop: "12px" }} type="number" label="미래 가치" />
                      <MuiSelectBox
                        id=""
                        variant="outlined"
                        handleChange={this.handleChange}
                        label="연수"
                        selectOptionList={selectOptions.period}
                      />
                    </Grid>
                    <Button color="secondary" fullWidth style={{ height: '40px' }}>계산</Button>
                  </TabPane>
                  <TabPane name="연수" label="연수" key="3">
                    <Typography variant="h6">현재 가진 정보로<br />현재의 자산 가치를 확인 해 보세요.</Typography>
                    <Grid container style={{ marginTop: "20px", marginBottom: "12px" }}>
                      <TextField id="" variant="outlined" size="small" fullWidth type="number" label="월별 투자액" onChange={this.handleChange} />
                      <TextField id="" variant="outlined" size="small" fullWidth style={{ marginTop: "12px" }} type="number" label="연이율(%)" onChange={this.handleChange} />
                      <MuiSelectBox
                        id=""
                        variant="outlined"
                        handleChange={this.handleChange}
                        label="복리 계산"
                      />
                      <TextField id="" variant="outlined" size="small" fullWidth style={{ marginTop: "12px" }} type="number" label="미래 가치" />
                      <MuiSelectBox
                        id=""
                        variant="outlined"
                        handleChange={this.handleChange}
                        label="연수"
                        selectOptionList={selectOptions.period}
                      />
                    </Grid>
                    <Button color="secondary" fullWidth style={{ height: '40px' }}>계산</Button>
                  </TabPane>
                  <TabPane name="월별투자액" label="월별투자액" key="4">
                    <Typography variant="h6">현재 가진 정보로<br />현재의 자산 가치를 확인 해 보세요.</Typography>
                    <Grid container style={{ marginTop: "20px", marginBottom: "12px" }}>
                      <TextField id="" variant="outlined" size="small" fullWidth type="number" label="월별 투자액" onChange={this.handleChange} />
                      <TextField id="" variant="outlined" size="small" fullWidth style={{ marginTop: "12px" }} type="number" label="연이율(%)" onChange={this.handleChange} />
                      <MuiSelectBox
                        id=""
                        variant="outlined"
                        handleChange={this.handleChange}
                        label="복리 계산"
                      />
                      <TextField id="" variant="outlined" size="small" fullWidth style={{ marginTop: "12px" }} type="number" label="미래 가치" />
                      <MuiSelectBox
                        id=""
                        variant="outlined"
                        handleChange={this.handleChange}
                        label="연수"
                        selectOptionList={selectOptions.period}
                      />
                    </Grid>
                    <Button color="secondary" fullWidth style={{ height: '40px' }}>계산</Button>
                  </TabPane>
                </Tabs>
              </div>
              <Grid>
              {Object.keys(this.state.chartData).length &&
                <Line ref="chart" data={this.state.chartData} width={100} options={{ maintainAspectRatio: false }} />
              }
              </Grid>
            </ContentsBox>
            {/* <Grid container xs={12} style={{ padding: '20px', height: '104px' }}>
              <Typography>현재 가치가 {this.state.present_value}인데, 연이율 {this.state.interest}%로 {this.state.year}년간 매달 ￦{this.state.monthly_input}을 투자할 때 미래 가치는 ￦{this.state.future_value} 입니다.</Typography>
            </Grid> */}
          </ThemeProvider>
        </Grid>
      </>
    );
  }
}