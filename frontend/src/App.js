import React from 'react';
import { css } from '@emotion/core';
import Button from './components/Button/Button';
import styled, { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import LoginBox from './components/LoginBox';

const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: #fca311;
  }
`;

const palette = {
  primary: '#fca311',
  secondary: '#14213d'
}

function App() {
  return (
    <>
    <GlobalStyle />    
    <ThemeProvider theme={{palette}}>
      <LoginBox>
        <ButtonGroup>
          {/* <Button color="secondary" size="large" fullWidth>Enter</Button> */}
          {/* <Button color="secondary" outline fullWidth>Secondary</Button> */}
        </ButtonGroup>
      </LoginBox>
    </ThemeProvider>
    </>
  );
}

export default App;
