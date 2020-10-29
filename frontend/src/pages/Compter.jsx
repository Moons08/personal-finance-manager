import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #eee;
    margin: 0;
  }
`;

export default function Compter() {
    return (
        <>
        {/* <GlobalStyle />  */}
        <div>Compter 화면</div>
        </>      
    );
}