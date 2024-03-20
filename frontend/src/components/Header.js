import React, { useState, useCallback} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { useCart } from './CartContext';

const HeaderWrapper = styled.header`
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem  1rem  ; 
  background-color: #fff;
  border-bottom: 30px solid #000000; 
  z-index: 1000;
`;


const Logo = styled.div`
   margin-left: 2rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-left: -10rem; 

  a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    transition: color 0.3s ease;
    &:hover {
      color: #555;
    }
  }


  a:not(:last-child)::after {
    content: '|';
    color: #333;
    margin-left: 2rem;
    margin-right: 2rem;
  }
`;



const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: calc(10rem + (35 * ((100vw - 1280px) / 640)));
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  padding-right: 2.5rem; 
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 100%; 
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const SearchIcon = styled.img`
  width: 1.5rem; 
  height: auto; 
`;

const CartIcon = styled.img.attrs(props => ({
    src: props.src,
    alt: props.alt,
  }))`
    margin-left: 1rem;
    cursor: pointer;
    width: 1.5rem;
    height: auto;
  
    &:hover {
      content: url('/cart-hover.png');  
    }
  `;
  

  const UserIcon = styled.img.attrs(props => ({
    src: props.src,
    alt: props.alt,
  }))`
    margin-left: 1rem;
    cursor: pointer;
    width: 1.5rem;
    height: auto;
  
    &:hover {
      content: url('/member-hover.png');
    }
  `;

const UtilityNav = styled.div`
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  padding-right: 3rem;
`;

const Header = () => {
  const navigate = useNavigate();

  const [localSearchKeyword, setLocalSearchKeyword] = useState('');

  const handleSearchChange = useCallback((event) => {
    setLocalSearchKeyword(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    navigate(`/products/search?keyword=${encodeURIComponent(localSearchKeyword)}`);
  }, [localSearchKeyword, navigate]);

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  const goToCart = () => {
    navigate('/products/cart'); 
  };

  const { cartItems} = useCart();
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <HeaderWrapper>
      <Logo>
        <img src="/logo.png" alt="STYLISH" style={{ width: '120px', height: 'auto' }} />
      </Logo>
      <Nav>
        <Link to="/products/women" onClick={() => handleCategoryClick('women')}>女裝</Link>
        <Link to="/products/men" onClick={() => handleCategoryClick('men')}>男裝</Link>
        <Link to="/products/accessories" onClick={() => handleCategoryClick('accessories')}>配件</Link>
      </Nav>
      <UtilityNav>
      <SearchWrapper>
          <SearchInput type="text" placeholder="搜索" value={localSearchKeyword} onChange={handleSearchChange} />
          <SearchButton onClick={handleSearchSubmit}>
            <SearchIcon src="/search.png" alt="Search Icon" />
          </SearchButton>
        </SearchWrapper>
        <div style={{ position: 'relative' }} onClick={goToCart}>
    <CartIcon src="/cart.png" alt="Cart Icon" />
    {cartItemCount > 0 && 
      <span style={{
        position: 'absolute',
        top: '-10px', 
        right: '-10px', 
        background: '#876D5A',
        color: 'white',
        borderRadius: '50%',
        width: '20px', 
        height: '20px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '0.75rem' 
      }}>
        {cartItemCount}
      </span>
    }
  </div>
        <UserIcon img src="/member.png" alt="Member Icon" />
      </UtilityNav>
    </HeaderWrapper>
  );
};

export default Header;






 