import { pool } from './util.js';

export async function createOrder(orderData) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [orderResult] = await connection.query(
            'INSERT INTO orders (name, shipping_method, payment_method, total, is_paid) VALUES (?, ?, ?, ?, ?)',
            [orderData.recipient.name, orderData.shipping, orderData.payment, orderData.total, false]
        );
        const orderId = orderResult.insertId;

        try {
            for (const item of orderData.list) {
                await connection.query(
                    'INSERT INTO orderdetails (order_id, product_id, price, quantity) VALUES (?, ?, ?, ?)',
                    [orderId, item.id, item.price, item.qty]
                );
                const [colorRows] = await connection.query('SELECT id FROM color WHERE name = ?', [item.color.name]);
                const colorId = colorRows[0].id;
           
                const [sizeRows] = await connection.query('SELECT id FROM size WHERE size_name = ?', [item.size]);
                const sizeId = sizeRows[0].id;
   
                await connection.query(
                    'UPDATE variants SET stock = stock - 1 WHERE product_id = ? AND color_id = ? AND size_id = ? AND stock > 0',
                    [item.id, colorId, sizeId]
                );
            }

            await connection.commit();
            return orderId;

        } catch (error) {
            console.error('An error occurred:', error);
        }
    } catch (error) {
        await connection.rollback();
        console.error('Transaction rolled back. An error occurred:', error);
        throw error;
    } finally {
        connection.release();
    }
}

//update orders info
export async function updateOrderStatus(orderId) {
    try {
        await pool.query(
            'UPDATE orders SET is_paid = ? WHERE order_id = ?',
            [true, orderId]
        );
    } catch (error) {
        throw error;
    }
}


export async function createNewNewOrder(orderData) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        for (const order of orderData) {

            const [orderResult] = await connection.query(
                'INSERT INTO  Orders (total, is_paid) VALUES (?, ?)',
                [order.total, false]
            );
            const orderId = orderResult.insertId;


            for (const item of order.list) {
                await connection.query(
                    'INSERT INTO OrderDetails (order_id, product_id, price, quantity, color_code, color_name, size) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [orderId, item.id, item.price, item.qty, item.color.code, item.color.name, item.size]
                );
            }
        }

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        console.error('An error occurred:', error);
        throw error;
    } finally {
        connection.release();
    }
}




export async function getOrders() {
    const connection = await pool.getConnection();

    try {

        const [orders] = await connection.query('SELECT order_id, total FROM Orders');
        
        for (let order of orders) {

            const [orderDetails] = await connection.query(
                'SELECT product_id as id, price, quantity as qty, color_code, color_name, size FROM OrderDetails WHERE order_id = ?',
                [order.order_id]
            );


            order.list = orderDetails.map(detail => ({
                id: detail.id,
                price: detail.price,
                color: {
                    code: detail.color_code,
                    name: detail.color_name
                },
                size: detail.size,
                qty: detail.qty
            }));


            order = {
                total: order.total,
                list: order.list
            };
        }
        return orders;
    } catch (error) {
        console.error('An error occurred while fetching orders:', error);
        throw error;
    } finally {
        connection.release();
    }
}





