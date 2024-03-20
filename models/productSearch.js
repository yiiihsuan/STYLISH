import { pool } from './util.js';

export async function searchByKeyword(keyword,paging) {
    try {
        let page = 0; 
        let offset = 0; 
        
        if (paging !== null) {
            page = Math.max(0, parseInt(paging)); 
            offset = (page) * 10; 
        }


            if (Number.isNaN(offset)) {
            offset = 0;
            }

        const query = `
        SELECT *
        FROM product
        WHERE
        title LIKE '%${keyword}%' 
        ORDER BY id DESC
        LIMIT 10
        OFFSET ${offset}
      `;
        const [products] = await pool.query(query, [keyword,offset]);
        return products;
    } catch (error) {
        throw error;
    }
}