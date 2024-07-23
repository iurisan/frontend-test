import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  border-bottom: 2px solid ${(props) => props.theme.color.primary};
  background: ${(props) => props.theme.color.secondary};
`;

const HeaderImage = styled.img`
  width: 150px;
  margin: auto;
  position: relative;
  display: block;
`;

const Header = () => {
  return (
    <StyledHeader>
      <HeaderImage src="./images/dhg_whole.png" alt="header-logo" />
    </StyledHeader>
  );
};

export default Header;
