import React from 'react';
import styled from 'styled-components';

const ContentsBoxBlock = styled.div`
    width: 100vh;

    position: relative;
    background: #eee;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    box-shadow: 0 0 9px rgba(0, 0, 0, 0.04);

    margin: 0 auto;
    // padding: 20px;

    display: flex;
    flex-direction: column;
`;

let wHeight = window.innerHeight;

function ContentsBox({ children }) {
    return <ContentsBoxBlock style={{height: wHeight-152}}>{ children }</ContentsBoxBlock>
}

export default ContentsBox;