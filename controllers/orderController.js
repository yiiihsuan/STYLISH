import axios from 'axios';
import jwt from 'jsonwebtoken';
import { createOrder, updateOrderStatus } from '../models/orderModels.js';

export async function checkOut(req, res) {

    const { prime, order } = req.body;
    var token = req.get('Authorization');

    const accessToken = token.split(' ')[1];
    if (!accessToken) {
        return res.status(401).json({
            error: 'Client Error (No token)',
        });
    }
    const decodedToken = await jwt.verify(accessToken, '10');


    try {
        // TapPay API 
        const tappayResponse = await axios.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', {
            prime: prime,
            partner_key: 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG',
            merchant_id: 'AppWorksSchool_CTBC',
            details: 'YOUR_ORDER_DETAILS',
            amount: order.total,
            currency: 'TWD',
            cardholder: {
                phone_number: order.recipient.phone,
                name: "name",
                email: "email",
            },
            remember: true
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG'
            }
        });

        if (tappayResponse.data.status === 0) {
            const orderId = await createOrder(order);
            return res.status(200).json({
                data: {
                    number: orderId
                }
            });
        } else {
            return res.status(400).json({ error: 'Payment failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


