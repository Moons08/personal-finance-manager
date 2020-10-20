import React from 'react';
import styled, { css } from 'styled-components';
import Typography from '@material-ui/core/Typography';

const StyledTypography = styled.text`
    /* 공통 스타일 */
    @font-face {
        font-family:'Noto Sans KR';
        src: url(${require('./fonts/NotoSansKR-Light.otf')})
    }
`;

export default function Typography({ children, color, size, ...rest}) {
    return (
        <div>

        </div>
    );
}