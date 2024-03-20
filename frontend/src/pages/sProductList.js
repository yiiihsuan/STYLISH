import React from 'react';
import SHeader from '../components/sHeader';
import MainBanner from '../components/MainBanner';
import ProductGrid from '../components/ProductGrid';
import SmallFooter from '../components/sFooter';
import GlobalStyles from '../styles/GlobalStyles';

const SmallProductList = () => {
  return (
    <div>
      <GlobalStyles />
      <SHeader />
      <MainBanner />
      <ProductGrid>
      </ProductGrid>
      <SmallFooter />
    </div>
  );
};

export default SmallProductList;
