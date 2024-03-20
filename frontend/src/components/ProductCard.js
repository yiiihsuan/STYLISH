import React from 'react';
import styled from 'styled-components';


const Card = styled.div`
  display: flex;
  flex-direction: column; 
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  width: 22vw; 
  height: auto; 
  min-width: 180px;
`;


const ProductImage = styled.img`
  width: 100%;
  flex-grow: 0; 
  flex-shrink: 0; 
  height: auto; 
  object-fit: cover;
`;

const ProductInfo = styled.div`
  flex-grow: 1; 
  padding: 1rem 0 ;
`;

const ProductTitle = styled.h3`
 font-size: 1rem; 
 margin: 0.5rem 0;
`;

const ProductPrice = styled.p`
 font-size: 0.9rem; 
 margin: 0.5rem 0;
`;


const ColorSelector = styled.div`
display: flex;
  margin-top: 1vw; 
  gap: 1%; 
  padding-left: 0rem;

`;


const ColorOption = styled.span`
  height: 1.5rem;
  width: 1.5rem; 
  margin: 0 0.5rem 0.5rem; 
  border: 1px solid #ddd; 
  cursor: pointer;
  display: inline-block;
  background-color: ${props => props.color};
  &:first-of-type {
    margin-left: 0; 
  }
`;


const ProductCard = ({ title, imageSrc, price, colors, onClick }) => (
  <Card onClick={onClick}>
    <ProductImage src={imageSrc} alt={title} />
    <ProductInfo>
      <ColorSelector>
        {colors.map((color, index) => (
          <ColorOption key={index} color={color} onClick={() => console.log(`Color ${color} selected!`)} />
        ))}
      </ColorSelector>
      <ProductTitle>{title}</ProductTitle>
      <ProductPrice>{price}</ProductPrice>
    </ProductInfo>
  </Card>
);

export default ProductCard;

