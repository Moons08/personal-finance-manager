import React from 'react';
import { css } from 'styled-components';

const sizes = {
    large: {
        width: '56px',
        height: '56px'
    },
    medium: {
        width: '40px',
        height: '40px'
    },
    small: {
        width: '24px',
        height: '24px'
    }
}

const sizeStyles = css`
    ${({ size }) => css`
        width: ${sizes[size].width};
        height: ${sizes[size].height};
    `}
`;

const avatarStyles = css`
    margin: 8px;

    ${sizeStyles}
`;

function Avatar({ children, size, ...rest }){
    return (
        <div>
            {/* <avatarStyles size={size} {...rest}>
                { children }
            </avatarStyles> */}
            <img className={avatarStyles} size={size} {...rest} />
        </div>
    );
}

export default Avatar;