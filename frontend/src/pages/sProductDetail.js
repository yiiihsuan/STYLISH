import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductDetails } from '../api';
import SHeader from '../components/sHeader';
import SmallFooter from '../components/sFooter';


const ProductContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: flex-start; 
  margin: 0 auto;
  padding: 16px;
  gap: 16px; 
  max-width: 1280px;
  min-width: 360px;
  margin-top: 100px; 
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const ProductTitle = styled.h1`
  font-size: 24px; 
  color: #333; 
  margin-bottom: -10px; 
`;

const ProductId = styled.p`
  font-size: 16px; 
  color: #666; 
  margin-bottom: 2px; 
`;

const ProductPrice = styled.p`
  font-size: 20px; 
  color: #000; 
  margin-bottom: 12px; 
`;


const Divider = styled.div`
  border: none;
  height: 1px; 
  width: 100%; 
  background-color: #ccc; 
  margin-bottom: 10px; 
`;

const ColorOptions = styled.div`
  display: flex; 
  flex-wrap: wrap; 
`;


const ColorOption = styled.button`
  width: 30px; 
  height: 30px;
  border: 1px solid #ddd; 
  background-color: ${props => props.color}; 
  margin-right: 10px; 
  cursor: pointer;
  box-shadow: ${props => props.isSelected ? '0 0 0 2px #808080' : 'none'};
`;


const OptionsContainer = styled.div`
  display: flex; 
  align-items: center; // 垂直居中子項
  margin-bottom: 15px; 
  margin-top:15px;
`;


const Label = styled.span`
  display: inline-block;
  font-size: 16px; 
  font-weight: bold; 
  margin-right: 8px; 
  vertical-align: middle; 
`;

const VerticalDivider = styled.div`
  display: inline-block;
  height: 30px; 
  width: 2px; 
  background-color: #000; 
  margin-right: 12px; 
  vertical-align: middle; 
`;

const SizeSelector = styled.div`
`;

const SizeOption = styled.button`
  width: 40px; 
  height: 40px;
  line-height: 40px; 
  padding: 0;
  margin: 10px 10px 10px 0; 
  border: 2px solid #ddd;
  background-color: ${props => props.isOutOfStock ? '#fff' : (props.isSelected ? '#000' : '#ccc')};
  color: ${props => props.isOutOfStock ? '#ddd' : (props.isSelected ? '#fff' : '#000')};
  cursor: ${props => props.isOutOfStock ? 'not-allowed' : 'pointer'};
  pointer-events: ${props => props.isOutOfStock ? 'none' : 'auto'};
  border-radius: 50%; 
  justify-content: center;
  align-items: center; 
  box-shadow: ${props => props.isSelected ? '0px 0px 10px rgba(0, 0, 0, 0.2)' : 'none'};
  &:hover {
    border-color: #000;
  }
  font-size: 1rem; 
  font-weight: bold; 
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center; 
  border: 1px solid #ccc; 
  border-radius: 20px; 
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 40px; 
  height: 40px; 
  line-height: 35px; 
  border: none; 
  background-color: #fff;
  cursor: pointer;

  &:active {
    background-color:  #f2f2f2; 
  }

  &:hover {
    background-color: #f2f2f2; 
  }

  &:first-child {
    border-radius: 18px 0 0 18px; 
  }
  &:last-child {
    border-radius: 0 18px 18px 0; 
  }
`;

const QuantityInput = styled.input`
  width: 50px; 
  height: 35px; 
  text-align: center;
  border: none; 
  outline: none; 
  margin: 0;

 flex: 1; 
 outline: none; 
`;

const AddToCartButton = styled.button`
  background-color: #000; 
  color: #fff; 
  font-size: 1rem; 
  padding: 15px 30px;
  border: none; 
  cursor: pointer; 
  transition: background-color 0.3s ease; 
  &:hover {
    background-color: #333; 
  }
  &:active {
    background-color: #555; 
  }
  width: 100%; 
  max-width: 300px; 
  display: block; 
  margin: 20px auto; 
`;


const ProductNote = styled.p`
`;

const ProductTexture = styled.p`
`;

const ProductWash = styled.p`
`;

const ProductPlace = styled.p`
`;


const ProductDetailsSection = styled.section`
  padding: 20px 0;
  margin: 40px 40px; 
`;

const ProductDetailsTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px; 
  display: flex;
  align-items: center; 
`;

const ProductDetailsDivider = styled.div`
  flex-grow: 1; 
  height: 2px;
  background-color: #000;
  margin-left: 10px; 
`;

const ProductDescriptionText = styled.p`
  color: #333;
  font-size: 1rem;
  line-height: 1.6;
`;

const AdditionalImagesContainer = styled.div`
  display: flex; 
  justify-content: center; 
  flex-wrap: wrap; 
  gap: 10px; 
  margin: 20px 0; 
`;

const AdditionalImage = styled.img`
  max-width: 100%; 
  height: auto; 
  display: block; 
`;

const sizeOrder = ['XS', 'S', 'M', 'L', 'XL'];


const SmallProductDetail = () => {


  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');

  const { data, isLoading, error } = useQuery({
    queryKey: ['productDetails', productId],
    queryFn: () => fetchProductDetails(productId),
  });



  const product = data?.data;


  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0].code || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedVariantStock, setSelectedVariantStock] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sortedSizes, setSortedSizes] = useState([]);


  useEffect(() => {
    const storedColor = localStorage.getItem('selectedColor');
    const storedSize = localStorage.getItem('selectedSize');

    if (product?.colors && !storedColor) {
      setSelectedColor(product.colors[0].code);
    }
    if (product?.sizes && !storedSize) {
      const orderedSizes = sizeOrder.filter(size => product.sizes.includes(size));
      if (orderedSizes.length > 0) {
        setSelectedSize(orderedSizes[0]);
      }
    }
  }, [product]);




  useEffect(() => {

    if (product?.variants && selectedColor) {
      const updatedSizes = sizeOrder
        .filter(size => product.sizes.includes(size))
        .map(size => {
          const variant = product.variants.find(v => v.color_code === selectedColor && v.size === size);
          return {
            size,
            isOutOfStock: !(variant && variant.stock > 0),
          };
        });

      setSortedSizes(updatedSizes);

      const currentSizeVariant = updatedSizes.find(size => size.size === selectedSize);
      if (currentSizeVariant && currentSizeVariant.isOutOfStock) {
        const firstAvailableSize = updatedSizes.find(size => !size.isOutOfStock);
        if (firstAvailableSize) {
          setSelectedSize(firstAvailableSize.size);
        }
      }


      const variant = product.variants.find(v => v.color_code === selectedColor && v.size === selectedSize);
      setSelectedVariantStock(variant?.stock || 0);

      console.log("Selected Variant: ", variant);

    }
  }, [product?.variants, selectedColor, product?.sizes, selectedSize]);


  useEffect(() => {

    console.log(localStorage);

    const storedColor = localStorage.getItem('selectedColor');
    const storedSize = localStorage.getItem('selectedSize');
    const storedQuantity = localStorage.getItem('selectedQuantity');


    if (storedColor) {
      setSelectedColor(storedColor);
    }

    if (storedSize) {
      setSelectedSize(storedSize);
    }

    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity));
    }
  }, []);



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= selectedVariantStock) {
      setQuantity(newQuantity);
      localStorage.setItem('selectedQuantity', newQuantity);
    }
  };

  return (
    <>
      <SHeader />
      <ProductContainer>
        <ProductImage src={product?.main_image} alt={product?.title} />
        <ProductInfo>
          <ProductTitle>{product?.title}</ProductTitle>
          <ProductId>{product?.id}</ProductId>
          <ProductPrice>TWD.{product?.price}</ProductPrice>
          <Divider />
          <OptionsContainer>
            <Label>顏色</Label>
            <VerticalDivider />
            <ColorOptions>
              {product?.colors.map(color => (
                <ColorOption
                  key={color.code}
                  color={`#${color.code}`}
                  isSelected={selectedColor === color.code}
                  // onClick={() => setSelectedColor(color.code)}
                  onClick={() => {
                    setSelectedColor(color.code);
                    localStorage.setItem('selectedColor', color.code);
                    setQuantity(1);
                    localStorage.setItem('selectedQuantity', 1);
                  }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </ColorOptions>
          </OptionsContainer>
          <OptionsContainer>
            <Label>尺寸</Label>
            <VerticalDivider />
            <SizeSelector>
              {sortedSizes.map(({ size, isOutOfStock }) => (
                <SizeOption
                  key={size}
                  isSelected={selectedSize === size}
                  isOutOfStock={isOutOfStock} // 將 isOutOfStock 傳給 styled component
                  // onClick={() => !isOutOfStock && setSelectedSize(size)}
                  onClick={() => {
                    if (!isOutOfStock) {
                      setSelectedSize(size);
                      localStorage.setItem('selectedSize', size);
                      setQuantity(1); // 重置数量
                      localStorage.setItem('selectedQuantity', 1);
                    }
                  }}
                >
                  {size}
                </SizeOption>
              ))}
            </SizeSelector>
          </OptionsContainer>
          <OptionsContainer>
            <Label>數量</Label>
            <VerticalDivider />
            <QuantitySelector>
              <QuantityButton onClick={() => handleQuantityChange(quantity - 1)}>-</QuantityButton>
              <QuantityInput type="number" value={quantity} onChange={(e) => handleQuantityChange(parseInt(e.target.value))} />
              <QuantityButton onClick={() => handleQuantityChange(quantity + 1)}>+</QuantityButton>
            </QuantitySelector>
          </OptionsContainer>
          <AddToCartButton>加入購物車</AddToCartButton>
          <ProductNote>{product?.note}</ProductNote>
          <ProductTexture>{product?.texture}</ProductTexture>
          <ProductWash>{product?.wash}</ProductWash>
          <ProductPlace>{product?.place}</ProductPlace>
        </ProductInfo>
      </ProductContainer>
      <ProductDetailsSection>
        <ProductDetailsTitle>
          更多產品資訊
          <ProductDetailsDivider />
        </ProductDetailsTitle>
        <ProductDescriptionText>
          {product?.description}
        </ProductDescriptionText>
      </ProductDetailsSection>

      <AdditionalImagesContainer>
        {product?.images.map((imgSrc, index) => (
          <AdditionalImage key={index} src={imgSrc} alt={`Product view ${index + 1}`} />
        ))}
      </AdditionalImagesContainer>
      <SmallFooter />
    </>
  );
};

export default SmallProductDetail;



