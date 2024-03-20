import React from 'react';
import styled from 'styled-components';


const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff; 
  margin-bottom: -4.9rem;
`;

const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;
`;

const Logo = styled.img`
  height: auto; 
  width: 15vw; 
  max-width: 120px; 
`;


const SearchIcon = styled.img`
  width: 1.5rem; 
  height: 1.5rem;
  cursor: pointer;
  position: absolute; 
  right: 5rem; 
`;

const Menu = styled.nav`
  display: flex;
  justify-content: space-between; 
  background-color: #333; 
  width: 100%;
`;

const MenuItem = styled.a`
  color: white;
  padding: 1rem;
  text-decoration: none;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative; 
  
  &:not(:last-of-type)::after {
    content: ''; 
    position: absolute; 
    right: 0; 
    top: 15%; 
    bottom: 15%; 
    width: 0.5px; 
    background-color: white; 
  }
`;


const SHeader = () => {
  return (
    <HeaderContainer>
      <TopSection>
        <Logo src="/logo.png" alt="STYLISH" />
        <SearchIcon src="/search.png" alt="Search" />
      </TopSection>
      <Menu>
        <MenuItem href="/products/women">女裝</MenuItem>
        <MenuItem href="/products/men">男裝</MenuItem>
        <MenuItem href="/products/accessories">配件</MenuItem>
      </Menu>
    </HeaderContainer>
  );
};

export default SHeader;


