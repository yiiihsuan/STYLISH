import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SmallProductList from './pages/sProductList'; 
import ProductList from './pages/ProductList'; 
import SmallProductDetail from './pages/sProductDetail'; 
import ProductDetail from './pages/ProductDetail'; 
import ProductCart from './pages/ProductCart'; 
import ThankYou from './pages/ThankYou'; 


const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div>
        <Routes>
        {windowWidth >= 1280 ? (
            <>
              <Route path="/products/:category" element={<ProductList />} />
              <Route path="/products/search" element={<ProductList />} />
              <Route path="/products/details" element={<ProductDetail />} />
              <Route path="/products/cart" element={<ProductCart />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </>
          ) : (
            <>
              <Route path="/products/:category" element={<SmallProductList />} />
              <Route path="/products/details" element={<SmallProductDetail />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;



//<Route path="/products/details" element={<SmallProductDetail />} />






















//this is my old version , if fails, do it



// import React , { useState, useEffect }from 'react';
// import Header from './components/Header';
// import MainBanner from './components/MainBanner';
// import ProductGrid from './components/ProductGrid';
// import Footer from './components/Footer';
// import GlobalStyles from './styles/GlobalStyles';
// import SmallFooter from './components/sFooter';
// import SHeader from './components/sHeader';



// const App = () => {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div>
//       {windowWidth >= 1280 ? (
//   <>
//     <GlobalStyles />
//     <Header />
//     <MainBanner />
//     <ProductGrid>
//       {/* Map through your products and create a ProductCard for each */}
//     </ProductGrid>
//     <Footer />
//   </>
//       ) : (
//         <>
//         <SHeader />
//         <MainBanner />
//         <ProductGrid>
//          {/* Map through your products and create a ProductCard for each */}
//         </ProductGrid>
//          < SmallFooter/>
//          </>
       
//       )}
//     </div>
//   );
// };

// export default App;


