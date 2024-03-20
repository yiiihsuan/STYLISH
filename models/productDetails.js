
import { pool } from './util.js';
// Fetch product details by ID
export async function getProductDetails(productId) {
    try {
        const query = `
        SELECT *
        FROM product
        WHERE id = ?;
        `;

        const [productDetails] = await pool.query(query, [productId]);

        if (productDetails.length === 0) {
            return null; 
        }

        return productDetails[0];
    } catch (error) {
        throw error;
    }
}


