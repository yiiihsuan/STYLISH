
import React from 'react';
import styled from 'styled-components';


const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333; 
  color: white; 
`;

const LeftSection = styled.div`
  font-size: 0.8rem;
`;

const Section = styled.div`
`;


const MiddleSection = styled(Section)`
  display: flex;
  justify-content: center;
  align-items: center;
  & > a:not(:last-child)::after {
    content: '|';
    margin: 0 10px; 
    color: white; 
  }
  & > a {
    margin: 0; 
    color: white;
    text-decoration: none; 
    &:hover {
      text-decoration: underline; 
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 1rem; 
  }

`;

const Icon = styled.img`
  width: 20px; 
  height: 20px; 
  cursor: pointer; 
  &:hover {
    opacity: 0.8;
  }
`;

const Copyright = styled.span`
`;

const Footer = () => (
  <FooterWrapper>
    <LeftSection>
    </LeftSection>
    <MiddleSection>
      <a href="/about">關於STYLISH</a>
      <a href="/terms">服務條款</a>
      <a href="/privacy">隱私政策</a>
      <a href="/contact">聯絡我們</a>
      <a href="/faq">FAQ</a>
    </MiddleSection>
    <RightSection>
      <Icon src="/line.png" alt="Line Icon" />
      <Icon src="/twitter.png" alt="Twitter Icon" />
      <Icon src="/facebook.png" alt="Facebook Icon" />
      <Copyright>
        © 2023 STYLISH. All rights reserved.
      </Copyright>
    </RightSection>
  </FooterWrapper>
);

export default Footer;

