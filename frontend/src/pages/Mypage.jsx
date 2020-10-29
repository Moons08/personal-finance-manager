import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #eee;
    margin: 0;
  }
`;

export default function Mypage() {
    return (
        <>
        {/* <GlobalStyle />  */}
        <div>Mypage 화면</div>
        </>      
    );
}