import React from 'react';
import styled from 'styled-components';

const PortfolioBoxBlock = styled.div`
    position: fixed;
    background: white;
    border-radius: 2rem;
    box-shadow: 0 0 9px rgba(0, 0, 0, 0.04);

    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 20px;
    padding-right: 20px;

    display: flex;
    flex-direction: column;
`;

function PortfolioBox({ children }) {
    return <PortfolioBoxBlock>{ children }</PortfolioBoxBlock>
}

export default PortfolioBox;