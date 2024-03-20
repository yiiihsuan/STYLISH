import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
`;

const ContentContainer = styled.div`
    flex-grow: 1; 
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
`;

const ThankYouContainer = styled.div`
    text-align: center;
    margin-top: 20px;
`;

const OrderInfo = styled.div`
    margin-top: 20px;
`;
const ThankYou = () => {
    const location = useLocation();
    const { orderId, paymentTime } = location.state || {}; 

    return (
        <>

            <Header />
            <PageContainer>
            <ContentContainer>
                <ThankYouContainer>
                    <h1>感謝您的訂購♡</h1>
                    <OrderInfo>
                        {orderId && <p>訂單編號: {orderId}</p>}
                        {paymentTime && <p>已結帳: {paymentTime}</p>}
                    </OrderInfo>
                </ThankYouContainer>
            </ContentContainer>
            </PageContainer>
            <Footer />
            </>
     
    );
};

export default ThankYou;
