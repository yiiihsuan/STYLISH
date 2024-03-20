import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import MainBanner from '../components/MainBanner';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import GlobalStyles from '../styles/GlobalStyles';

const ProductList = () => {

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');


  return (
    <div>
      <GlobalStyles />
      <Header />
      <MainBanner />
      <ProductGrid searchKeyword={searchKeyword} />
      <Footer />
    </div>
  );
};

export default ProductList;