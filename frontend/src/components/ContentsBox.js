import React from 'react';
import styled from 'styled-components';

const ContentsBoxBlock = styled.div`
    width: 100vh;
    height: 80vh;

    position: relative;
    background: #eee;
    border-top-left-radius: 1.25rem;
    border-top-right-radius: 1.25rem;
    box-shadow: 0 0 9px rgba(0, 0, 0, 0.04);

    margin: 0 auto;
    // padding: 20px;

    display: flex;
    flex-direction: column;
`;

function ContentsBox({ children }) {
    return <ContentsBoxBlock>{ children }</ContentsBoxBlock>
}

export default ContentsBox;