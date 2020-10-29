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

const GlobalStyle = createGlobalStyle`
  body {
    background: #fca311;
    margin: 0;
  }
`;

const palette = {
  primary: '#fca311',
  secondary: '#14213d'
}

function Main() {
  return (
    <>
    <Grid container style={{background: "#fca311"}}>
      <ThemeProvider theme={{palette}}>
        <LoginBox>
          <Typography variant="h5" style={{fontWeight: "800"}}>Sign In</Typography>
          <Grid container style={{marginTop: "20px", marginBottom: "20px"}}>
              <TextField id="" fullWidth label="이메일" />
              <TextField id="" fullWidth style={{marginTop: "12px"}} label="비밀번호" />
          </Grid>
          <ButtonGroup>
            <Button color="secondary" size="large" fullWidth css={css`margin-top: 20px; border-radius: 2rem; margin-bottom: 10px;`}>Enter</Button>
            {/* <Button color="secondary" outline fullWidth>Secondary</Button> */}
          </ButtonGroup>
          <Box display="flex">
              <Box flexGrow={1}><Typography variant="span" style={{fontWeight: "600"}}>Sign Up</Typography></Box>
              <Box><Typography variant="span" style={{color: "#9e9e9e"}} justifyContent="flex-end">Forgot?</Typography></Box>
          </Box>
        </LoginBox>
      </ThemeProvider>
    </Grid>
    </>
  );
}

export default Main;
