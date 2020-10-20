import React from "react";
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const colorStyles = css`
    /* 색상 */
    ${({ theme, color }) => {
        const selectedColor = theme.palette[color];
        return css`
            background: ${selectedColor};
            &:hover {
                background: ${lighten(0.1, selectedColor)};
            }
            &:active {
                background: ${darken(0.1, selectedColor)};
            }
            ${props => props.outline && css`
                color: ${selectedColor};
                background: none;
                border: 1px solid ${selectedColor};
                &:hover {
                    background: ${selectedColor};
                    color: white;
                }
            `}
        `;
    }}
`;

const sizes = {
    large: {
        height: '3rem',
        fontSize: '1.25rem',
        paddingTop: '7px'
    },
    medium: {
        height: '2.25rem',
        fontSize: '1rem',
        paddingTop: '5px'
    },
    small: {
        height: '1.75rem',
        fontSize: '0.875rem',
        paddingTop: '3px'
    },
}

const sizeStyles = css`
    /* 크기 */
    ${({ size }) => css`
        height: ${sizes[size].height};
        font-size: ${sizes[size].fontSize};
        padding-top: ${sizes[size].paddingTop};
    `}
`;

const fullWidthStyle = css`
    ${props => props.fullWidth && css`
        width: 100%;
        justify-content: center;
        & + & {
            margin-left: 0;
            margin-top: 1rem;
        }
    `}
`;

const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;
    font-family:'Noto Sans KR';

    /* 기타 */
    & + & {
        margin-left: 1rem;
    }
 
    ${colorStyles}
    ${sizeStyles}
    ${fullWidthStyle}

`;

function Button({ children, color, size, outline, fullWidth, ...rest } ) {
    return (
        <div>
            <StyledButton color={color} size={size} outline={outline} fullWidth={fullWidth} {...rest}>
                { children }
            </StyledButton>
        </div>
    );
}

Button.defaultProps = {
    color: 'secondary',
    size: 'medium'
    /* outline props의 기본값은 false */
}

export default Button;