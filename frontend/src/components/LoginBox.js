import React from 'react';
import styled from 'styled-components';

const LoginBoxBlock = styled.div`
    width: 100%;
    height: 728px;

    position: relative;
    background: white;
    border-radius: 2rem;
    box-shadow: 0 0 9px rgba(0, 0, 0, 0.04);

    margin: 0 auto;
    margin-top: 60vh;

    display: flex;
    flex-direction: column;
`;

function LoginBox({ children }) {
    return <LoginBoxBlock>{ children }</LoginBoxBlock>
}

export default LoginBox;