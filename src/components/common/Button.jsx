import React from 'react';
import { Button as AntdButton } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(AntdButton)`
  border-radius: 2px;
  height: 36px;
`;

export const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
