import React from 'react';
import styled from 'styled-components';

const ContentsBoxBlock = styled.div`
    width: 100vh;
    height: 68vh;

    position: relative;
    background: #eee;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    box-shadow: 0 0 9px rgba(0, 0, 0, 0.04);

    margin: 0 auto;
    margin-top: 7px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 20px;
    padding-right: 20px;

    display: flex;
    flex-direction: column;
`;

function ContentsBox({ children }) {
    return <ContentsBoxBlock>{ children }</ContentsBoxBlock>
}

export default ContentsBoxBlock;