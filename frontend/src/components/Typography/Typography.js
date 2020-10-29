import React from 'react';
import styled, { css } from 'styled-components';

const colorStyles = css`
    /* 색상 */
    ${({ theme, color }) => {
        const selectedColor = theme.palette[color];
        return css`
            color: ${selectedColor};
        `;
    }}
`;
const StyledTypography = styled.text`
    /* 공통 스타일 */
    @font-face {
        font-family:'Noto Sans KR';
        // src: url(${require('../../fonts/NotoSansKR-Light.otf')})
    }

    ${colorStyles}
`;



function Typography({ children, color, size, ...rest}) {
    return (
        <div>
            <StyledTypography color={color} size={size} {...rest}>
                { children }
            </StyledTypography>
        </div>
    );
}

Typography.defaultProps = {
    color: 'primary'
}

export default Typography;