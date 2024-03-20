/* global TPDirect */
import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../components/CartContext';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
const host = process.env.REACT_APP_HOST
//const port = process.env.REACT_APP_PORT
//const BASE_URL = `https://${host}:${port}/api/1.0`;
const BASE_URL = `https://${host}/api/1.0`;



const CartWrapper = styled.div`
  margin: auto;
  width: 80%; 
  margin-top:30px;
`;


const CartTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 100px;
  margin-bottom: -40px;
  margin-left:10rem;
  
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-around; 
  padding-bottom: 10px;
  margin-bottom: 10px;
  margin-left:380px;
  margin-right: 100px;
`;

const CartContainer = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 50px;
`;


const QuantityTitle = styled.span`

`;

const PriceTitle = styled(QuantityTitle)``;
const SubtotalTitle = styled(QuantityTitle)``;


const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  justify-content: flex-start; 
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  margin-right: 140px; 
  flex: 1; 
`;


const ItemQuantityPrice = styled.div`
  display: flex;
  justify-content: space-between; 
  min-width: 400px; 
  flex: 2;
`;

const Quantity = styled.span`
  flex: 1; 
  margin-right: 20px; 
`;

const CustomSelect = styled.select`
    width: 40px;
    height: 30px;
    background-color:#fff;
    border: 1px solid #ccc;
    cursor: pointer; 
    font-size: 14px;          
    color: #333;  
    border-radius: 4px; 
`;

const Price = styled.span`
  flex: 1; 
  margin-right: 20px; 
`;

const Subtotal = styled.span`
  flex: 1; 
  margin-right: 20px; 
`;


const ItemImage = styled.img`
  width: 100px;
  margin-right: 20px;
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
`;




const DeleteButton = styled.button`
  background: url('/cart-remove.png') no-repeat center;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-size: cover;
`;

const Divider = styled.hr`
  border: none; 
  height: 1px; 
  background-color: #000; 
  margin: 20px 0; 
`;

const FormWrapper = styled.section`
  padding: 20px;
  margin-top: 30px;
  width: 80%; 
  margin: auto;
  `;



const FormField = styled.div`
  margin-bottom: 20px;
  display: flex; 
  justify-content: flex-start; 
  align-items: center; 
  margin-bottom: 20px;
`;

const Label = styled.label` 
flex-basis: 10%; 
margin-right: 10px; 
`;

const Input = styled.input`
flex-basis: 70%; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const CardFormWrapper = styled.section`
padding: 20px;
margin-top: 30px;
width: 80%; 
margin: auto;
`;

const CardFormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  display: flex; // Use flexbox to place label and input side by side
  justify-content: flex-start; // Space out the label and input
  align-items: center; // Align them vertically
`;

const CardLabel = styled.label`
  flex-basis: 30%;
  margin-right: -217px;
`;

const CardFormInputContainer = styled.div`
  flex-basis: 71.7%;
  border: 1px solid #ccc;
  border-radius: 10px;
  height:35px;

`;


const SpecialNote = styled.span`
  display: flex;
  flex-basis: 50%;
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 0.8rem; 
  color: #8B0000; 
  margin-left :48rem;
`;

const DeliveryTimeSection = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center; 
  margin-top: 20px;
`;

const DeliveryTimeLabel = styled.span`
  margin-top:13px;
  line-height: 1;
  margin-right: 50px; 
  vertical-align: middle; 
`;

const DeliveryTimeOptions = styled.div`
  display: flex;
  gap: 20px;
  align-items: center; 
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const RadioButton = styled.input`
  margin-right: 10px;
`;

const RadioLabel = styled.label`
  margin-right: 20px;
`;

const ConfirmationWrapper = styled.div`
  margin: auto;
  width: 80%; 
  margin-top:30px;
  margin-bottom:50px;
  display: flex;
  flex-direction: column;
  align-items: flex-end; 
`;

const SummaryWrapper = styled.div`
  width: fit-content; 
`;

const SummaryDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr auto; 
  gap: 30px;
  align-items: center; 
  padding: 10px 0;
`;

const TotalLabel = styled.div`

`;

const TotalAmount = styled.div`
  text-align: right; 
`;

const SmallDivider = styled.hr`
  border: none;
  border-top: 1px solid black; 
  margin: 20px 0;
`;

const ConfirmationButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  align-self: center; 
  width:100%;
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  margin-top: 20px;
`;


const ProductCart = () => {
  const { cartItems, setCartItems } = useCart();

  const handleRemoveItem = (id, color, size) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.color === color && item.size === size)));
  };


  const calculateSubtotal = (quantity, price) => {
    return quantity * price;
  };

  useEffect(() => {
    // 設置 TapPay SDK
    TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox');
    TPDirect.card.setup({
      fields: {
        number: {
          element: '.card-number-container',
          placeholder: '**** **** **** ****',
        },
        expirationDate: {
          element: '.expiration-date-container',
          placeholder: 'MM / YY',
        },
        ccv: {
          element: '.ccv-container',
          placeholder: '後三碼',
        }
      },
      styles: {
        'input': {
          'color': 'gray'
        },
        'input.ccv': {
          // 'font-size': '16px'
        },
        ':focus': {
          'color': 'black'
        },
        '.valid': {
          'color': 'green'
        },
        '.invalid': {
          'color': 'red'
        },
        '@media screen and (max-width: 400px)': {
          'input': {
            'color': 'orange'
          }
        }
      },
      isMaskCreditCardNumber: true,
      maskCreditCardNumberRange: {
        beginIndex: 0,
        endIndex: 15
      }
    });
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    setCartItems([]);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneValid = (phone) => {
    const phoneRegex = /^09\d{8}$/;
    return phoneRegex.test(phone);
  };



  const isFormValid = () => {

    if (!purchaserName.trim()) {
      nameRef.current.focus();
      return false;
    }

    if (!purchaserEmail.trim()) {
      emailRef.current.focus();
      return false;
    }
    if (!phone.trim()) {
      phoneRef.current.focus();
      return false;
    }
    if (!address.trim()) {
      addressRef.current.focus();
      return false;
    }
    return true;
  };

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);


  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action

    if (!isFormValid()) {
      alert('請填寫完整收件人資訊！');
      return;
    }

    if (!isEmailValid(purchaserEmail.trim())) {
      emailRef.current.focus();
      alert('請輸入有效的電子郵件地址');
      return false;
    }

    if (!isPhoneValid(phone.trim())) {
      phoneRef.current.focus();
      alert('請輸入有效的手機號碼');
      return false;
    }


    // Check if TapPay Fields are all valid
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();
    if (!tappayStatus.canGetPrime) {
      alert('Cannot get prime. The form has invalid fields.');
      return;
    }

    // Get prime from TapPay Fields
    TPDirect.card.getPrime((result) => {
      if (result.status !== 0) {
        alert(`Failed to get prime: ${result.msg}`);
        return;
      }

      const prime = result.card.prime;
      console.log(`Prime received: ${prime}`);
      alert(`信用卡驗證成功`);
      checkoutOrder(result.card.prime);

    }); //End  TPDirect.card.getPrime((result) 
  };//End handleFormSubmit

  const handlePhoneFocus = () => {
    setMaskedPhone(phone);
  };

  const handlePhoneBlur = () => {
    const masked = phone.replace(/\d(?=\d{4})/g, "*");
    setMaskedPhone(masked);
  };

  const navigate = useNavigate();


  function checkoutOrder(prime) {

    var orderDetails = {
      "prime": prime,
      "order": {
        "shipping": "delivery",
        "payment": "credit_card",
        "subtotal": subtotal,
        "freight": shippingFee,
        "total": totalAmount,
        "recipient": {
          "name": purchaserName,
          "phone": phone,
          "email": purchaserEmail,
          "address": address,
          "time": deliveryTime,
        },
        "list": cartItems.map(item => ({
          "id": item.id,
          "name": item.title,
          "price": item.price,
          "color": {
            "code": item.colorCode,
            "name": item.color
          },
          "size": item.size,
          "qty": item.quantity
        }))
      }
    };
    //const accessToken = localStorage.getItem('accessToken');


    const accessToken = `Bearer ${process.env.REACT_APP_ACCESSTOKEN}`;


    console.log(orderDetails)

    fetch(`${BASE_URL}/order/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
      body: JSON.stringify(orderDetails)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })


      .then(data => {
        console.log(data);
        alert('付款成功');
        clearLocalStorage();
        navigate('/thank-you', {
          state: {
            orderId: data.data.number,
            paymentTime: new Date().toLocaleString()
          }
        });
      })

      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('付款失敗');
      });
  };

  const handleQuantityChange = (id, color, size, newQuantity, maxQuantity) => {
    if (newQuantity > 0 && newQuantity <= maxQuantity) {
      setCartItems(currentItems => {
        return currentItems.map(item => {
          if (item.id === id && item.color === color && item.size === size) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
      });

      localStorage.setItem(`selectedQuantity-${id}-${color}-${size}`, newQuantity);
    }
  };

  const [purchaserName, setPurchaserName] = useState('');
  const [purchaserEmail, setPurchaserEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [shippingFee, setShippingFee] = useState(0);
  const [maskedPhone, setMaskedPhone] = useState('');
  const [ccv, setCcv] = useState('');
  const [maskedCcv, setMaskedCcv] = useState('');

  const handleCcvChange = (e) => {
    setCcv(e.target.value);
    setMaskedCcv(e.target.value);
  };

  const handleCcvBlur = () => {
    const masked = ccv.replace(/\d/g, "*");
    setMaskedCcv(masked);
  };

  const handleCcvFocus = () => {
    setMaskedCcv(ccv);
  };


  useEffect(() => {
    if (cartItems.length > 0) {
      setShippingFee(30);
    } else {
      setShippingFee(0);
    }
  }, [cartItems]);



  const subtotal = cartItems.reduce((acc, item) => acc + calculateSubtotal(item.quantity, item.price), 0);
  const totalAmount = subtotal + shippingFee;

  console.log(`carleng = ${cartItems.length}`);



  return (
    <>
      <Header />
      <CartTitle>購物車</CartTitle>
      {cartItems.length > 0 ? (
        <CartWrapper>
          <CartHeader>
            <QuantityTitle>數量</QuantityTitle>
            <PriceTitle>單價</PriceTitle>
            <SubtotalTitle>小計</SubtotalTitle>
          </CartHeader>
          <CartContainer>
            {cartItems.map(item => (
              <CartItem key={item.id}>
                <ItemDetails>
                  <ItemImage src={item.image} alt={item.title} />
                  <ItemDescription>
                    <h3>{item.title}</h3>
                    <p>ID: {item.id}</p>
                    <p>顏色：{item.color}</p>
                    <p>尺寸：{item.size}</p>
                  </ItemDescription>
                </ItemDetails>
                <ItemQuantityPrice>

                  <Quantity>

                    <CustomSelect
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(
                        item.id,
                        item.color,
                        item.size,
                        parseInt(e.target.value, 10),
                        item.maxQuantity
                      )}
                    >
                      {Array.from({ length: item.maxQuantity }, (_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </CustomSelect>

                  </Quantity>


                  <Price>TWD.{item.price}</Price>
                  <Subtotal>TWD.{calculateSubtotal(item.quantity, item.price)}</Subtotal>
                </ItemQuantityPrice>
                <DeleteButton onClick={() => handleRemoveItem(item.id, item.color, item.size)} />
              </CartItem>

            ))}
          </CartContainer>
        </CartWrapper>
      ) : (
        <EmptyCartMessage>請加入喜歡的商品！</EmptyCartMessage>
      )}
      <FormWrapper>
        <h2>訂購資料</h2>
        <Divider />
        <FormField>
          <Label htmlFor="name">收件人姓名</Label>
          <Input
            id="name"
            type="text"
            value={purchaserName}
            onChange={(e) => setPurchaserName(e.target.value)}
            ref={nameRef}
          />
        </FormField>

        <SpecialNote>請務必填寫完整姓名，避免包裹無法順利投遞</SpecialNote>

        <FormField>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={purchaserEmail}
            onChange={(e) => setPurchaserEmail(e.target.value)}
            ref={emailRef}
          />
        </FormField>
        <FormField>
          <Label htmlFor="phone">手機</Label>
          <Input
            id="phone"
            type="tel"
            value={maskedPhone}
            onFocus={handlePhoneFocus}
            onBlur={handlePhoneBlur}
            onChange={(e) => {
              setPhone(e.target.value);
              setMaskedPhone(e.target.value);
            }}
            ref={phoneRef}
          />
        </FormField>


        <FormField>
          <Label htmlFor="address">地址</Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            ref={addressRef}
          />
        </FormField>

        <DeliveryTimeSection>
          <DeliveryTimeLabel>配送時間</DeliveryTimeLabel>
          <DeliveryTimeOptions>
            <RadioGroup>
              <RadioButton
                id="morning"
                type="radio"
                name="deliveryTime"
                value="08:00-12:00"
                checked={deliveryTime === '08:00-12:00'}
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
              <RadioLabel htmlFor="morning">08:00-12:00</RadioLabel>

              <RadioButton
                id="afternoon"
                type="radio"
                name="deliveryTime"
                value="14:00-18:00"
                checked={deliveryTime === '14:00-18:00'}
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
              <RadioLabel htmlFor="afternoon">14:00-18:00</RadioLabel>

              <RadioButton
                id="noPreference"
                type="radio"
                name="deliveryTime"
                value="noPreference"
                checked={deliveryTime === 'noPreference'}
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
              <RadioLabel htmlFor="noPreference">不指定</RadioLabel>
            </RadioGroup>
          </DeliveryTimeOptions>
        </DeliveryTimeSection>
      </FormWrapper>
      <form onSubmit={handleFormSubmit}>
        <CardFormWrapper>
          <h2>信用卡資料</h2>
          <Divider />

          <CardFormGroup>
            <CardLabel htmlFor="card-number">信用卡號碼</CardLabel>
            <CardFormInputContainer className="card-number-container" id="card-number"></CardFormInputContainer>
          </CardFormGroup>

          <CardFormGroup>
            <CardLabel htmlFor="expiration-date">有效期限</CardLabel>
            <CardFormInputContainer className="expiration-date-container" id="expiration-date"></CardFormInputContainer>
          </CardFormGroup>

          <CardFormGroup>
            <CardLabel htmlFor="ccv">安全碼</CardLabel>
            <CardFormInputContainer
              className="ccv-container"
              id="ccv"
              type="text"
              value={maskedCcv}
              onChange={handleCcvChange}
              onBlur={handleCcvBlur}
              onFocus={handleCcvFocus}

            />
          </CardFormGroup>
        </CardFormWrapper>


        <ConfirmationWrapper>
          <SummaryWrapper>
            <SummaryDetail>
              <TotalLabel>總金額</TotalLabel>
              <TotalAmount>NT.{subtotal}</TotalAmount>
            </SummaryDetail>
            <SummaryDetail>
              <TotalLabel>運費</TotalLabel>
              <TotalAmount>NT.{shippingFee}</TotalAmount>
            </SummaryDetail>
            <SmallDivider />
            <SummaryDetail>
              <TotalLabel>應付金額</TotalLabel>
              <TotalAmount>NT.{totalAmount}</TotalAmount>
            </SummaryDetail>
            <ConfirmationButton>確認付款</ConfirmationButton>
          </SummaryWrapper>
        </ConfirmationWrapper>
      </form>
      <Footer />
    </>
  );

}


export default ProductCart;






