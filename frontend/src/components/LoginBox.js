import React from 'react';
import styled from 'styled-components';

const LoginBoxBlock = styled.div`
    width: 100%;

    position: relative;
    background: white;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    box-shadow: 0 0 9px rgba(0, 0, 0, 0.04);

    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 20px;
    padding-right: 20px;

    display: flex;
    flex-direction: column;
`;

let wHeight = window.innerHeight;

function LoginBox({ children }) {
    return <LoginBoxBlock style={{marginTop: wHeight-360}}>{ children }</LoginBoxBlock>
}

export default LoginBox;