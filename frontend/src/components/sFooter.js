import React from 'react';
import styled from 'styled-components';

const SmallFooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Link = styled.a`
  color: #fff; 
  text-decoration: none; 

  &:hover {
    color: #ddd; 
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; 
`;


const ContactFAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;


const SocialIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1; 
`;


const Icon = styled.img`
  margin: 0 5px;
  width: 24px;
  height: 24px;
`;

const Copyright = styled.div`
  font-size: 0.8em;
  margin-top: 15px;
`;

const CartAndProfileContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  width: 100%;
`;

const HalfContainer = styled.div`
  display: flex;
  justify-content: center; // 使内容居中
  align-items: center;
  flex: 1; // 兩容器個佔50%
  padding: 0 20px; // 內邊距
`;

const IconWithLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
`;



const CartIcon = styled.img.attrs(props => ({
  src: props.src,
  alt: props.alt,
}))`
     margin-right: 10px;
  
    &:hover {
      content: url('/cart-hover.png'); 
    }
  `;


const ProfileIcon = styled.img.attrs(props => ({
  src: props.src,
  alt: props.alt,
}))`
    margin-left: 10px;
  
    &:hover {
      content: url('/member-hover.png'); 
    }
  `;

const Text = styled.span`
  color: white; 
`;

const Divider = styled.div`
  height: 30px; 
  width: 1px; 
  background-color: white; 
  margin: 0 20px; 
  margin-top: 10px; 
`;

const SmallFooter = () => {
  return (
    <SmallFooterContainer>
      <FooterRow>
        <LinksContainer>
          <Link href="/about">關於STYLISH</Link>
          <Link href="/terms">服務條款</Link>
          <Link href="/privacy">隱私政策</Link>
        </LinksContainer>
        <ContactFAQContainer>
          <Link href="/contact">聯絡我們</Link>
          <Link href="/faq">FAQ</Link>
        </ContactFAQContainer>
        <SocialIconsContainer>
          <Icon src="/line.png" alt="Line Icon" />
          <Icon src="/twitter.png" alt="Twitter Icon" />
          <Icon src="/facebook.png" alt="Facebook Icon" />
        </SocialIconsContainer>
      </FooterRow>
      <Copyright>
        © 2023 STYLISH. All rights reserved.
      </Copyright>
      <CartAndProfileContainer>
        <HalfContainer>
          <IconWithLink href="/cart">
            <CartIcon src="/cart-mobile.png" alt="Shopping Cart" />
            <Text>購物車</Text>
          </IconWithLink>
        </HalfContainer>
        <Divider /> {/* 這裡添加了分隔線 */}
        <HalfContainer>
          <IconWithLink href="/profile">
            <ProfileIcon src="/member-mobile.png" alt="User Profile" />
            <Text>會員</Text>
          </IconWithLink>
        </HalfContainer>
      </CartAndProfileContainer>
    </SmallFooterContainer>
  );
};

export default SmallFooter;




