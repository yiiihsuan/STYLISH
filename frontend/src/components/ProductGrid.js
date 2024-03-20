import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts, fetchkeywordProducts } from '../api';


const GridWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(3, calc((100% - 15vw) / 3));
  gap: 5rem;
  justify-items: center; 
  padding: 0 10vw; 
  margin: auto; 
  justify-content: center; 
  align-content: start; 
  margin-bottom: 5rem;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, calc((100% - 30vw) / 2)); 
    gap: 3rem; 
    padding: 0 5vw; 
    margin-bottom: 3rem;
  }
`;

const ProductGrid = ({ searchKeyword }) => {
  const navigate = useNavigate();
  const { category } = useParams();

  const getQueryFn = () => {
    if (searchKeyword) {
      return () => fetchkeywordProducts(searchKeyword);
    } else {
      return () => fetchProducts(category);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', category, searchKeyword],
    queryFn: getQueryFn(),
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  const handleProductClick = (productId) => {
    navigate(`/products/details?id=${productId}`);
  };


  const products = data?.data || [];



  return (
    <GridWrapper>
      {products.map(product => (
        <ProductCard
          key={product.id}
          title={product.title}
          imageSrc={product.main_image}
          price={`TWD. ${product.price}`}
          colors={product.colors.map(color => `#${color.code}`)}
          onClick={() => handleProductClick(product.id)}
        />
      ))}
    </GridWrapper>
  );
};

export default ProductGrid;
