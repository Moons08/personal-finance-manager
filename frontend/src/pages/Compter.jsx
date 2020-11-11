import React, { useState } from 'react';
import { css, ThemeProvider } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import ContentsBox from '../components/ContentsBox';
import TabPanel from '../components/TabPanel';
import MuiSelectBox from '../components/MuiSelectBox';
import Button from '../components/Button/Button';
import BarChart from '../components/Chart/BarChart';
import selectOptions from './selectOptions.js';

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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Compter() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <>
      <Grid container>
        <ThemeProvider theme={{palette}}>
          <Grid container xs={12} style={{padding: '20px', height: '104px'}}>
            <Box>
            <Typography style={{ color: "#424242", fontWeight: "700" }} variant="h5" gutterBottom>화폐의 시간적 가치</Typography>
            </Box>
          </Grid>
          <ContentsBox style={{ paddingTop: '0px!important'}}>
              <AppBar position="static" fullWidth style={appBarStyles}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="미래가치" {...a11yProps(0)} style={tabStyles} />
                  <Tab label="현재가치" {...a11yProps(1)} style={tabStyles} />
                  <Tab label="연수" {...a11yProps(2)} style={tabStyles} />
                  <Tab label="월별지불액" {...a11yProps(3)} style={tabStyles} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <Typography variant="h6">현재 가진 정보로<br />미래의 자산 가치를 확인 해 보세요.</Typography>
                <Grid container style={{marginTop: "20px", marginBottom: "12px"}}>
                  <TextField id="month-inv" variant="outlined" size="small" fullWidth type="number" label="월별 투자액" />
                  <TextField id="year-int" variant="outlined" size="small" fullWidth style={{marginTop: "12px"}} type="number" label="연이율(%)" />
                  <MuiSelectBox 
                    id="multi-int" 
                    variant="outlined" 
                    handleChange={handleChange} 
                    label="복리 계산" />
                  <TextField id="now-prof" variant="outlined" size="small" fullWidth style={{marginTop: "12px"}} type="number" label="현재 가치" />
                  <MuiSelectBox 
                    id="multi-int" 
                    variant="outlined" 
                    handleChange={handleChange} 
                    label="연수" 
                    selectOptionList={selectOptions.period}
                  />
                </Grid>
                <Button color="secondary" fullWidth style={{height:'40px'}}>계산</Button>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Typography variant="h6">현재 가진 정보로<br />현재의 자산 가치를 확인 해 보세요.</Typography>
                  <Grid container style={{marginTop: "20px", marginBottom: "12px"}}>
                    <TextField id="month-inv" variant="outlined" size="small" fullWidth type="number" label="월별 투자액" />
                    <TextField id="year-int" variant="outlined" size="small" fullWidth style={{marginTop: "12px"}} type="number" label="연이율(%)" />
                    <MuiSelectBox 
                      id="multi-int" 
                      variant="outlined" 
                      handleChange={handleChange} 
                      label="복리 계산" 
                    />
                    <TextField id="now-prof" variant="outlined" size="small" fullWidth style={{marginTop: "12px"}} type="number" label="미래 가치" />
                    <MuiSelectBox 
                      id="multi-int" 
                      variant="outlined" 
                      handleChange={handleChange} 
                      label="연수" 
                      selectOptionList={selectOptions.period}
                    />
                  </Grid>
                  <Button color="secondary" fullWidth style={{height:'40px'}}>계산</Button>
              </TabPanel>
              <TabPanel value={value} index={2}>
                연수
              </TabPanel>
              <TabPanel value={value} index={3}>
                월별지불액
              </TabPanel>
          </ContentsBox>
          <Grid>
            <BarChart />
          </Grid>
        </ThemeProvider>
      </Grid>
      </>      
  );
}