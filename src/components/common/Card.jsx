import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
`;

export const Card = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};
