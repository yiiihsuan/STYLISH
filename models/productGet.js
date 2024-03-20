import { pool } from './util.js';

export async function fetchAllProducts(paging) {
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
        const query = `SELECT * FROM product ORDER BY id DESC LIMIT 10 OFFSET ${offset} ;`; 
        const [products] = await pool.query(query);
        return products;
    } catch (error) {
        throw error;
    }
}


export async function fetchProductsByCategory(category,paging) {
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

        const query = `SELECT * FROM product WHERE category = ? ORDER BY id DESC LIMIT 10 OFFSET ${offset} ;`; 
        const [products] = await pool.query(query, [category]);
        return products;
    } catch (error) {
        throw error;
    }
}


export async function fetchColorsByProductId(productId) {
    try {
        const query ='SELECT DISTINCT c.code, c.name FROM variants AS v JOIN color AS c ON v.color_id = c.id WHERE v.product_id = ? '
        const [colors] = await pool.query(query, [productId]);
        return colors;
    } catch (error) {
        throw error;
    }
}


export async function fetchSizesByProductId(productId) {
    try {
        const query = `
        SELECT GROUP_CONCAT(DISTINCT s.size_name) AS sizes
        FROM variants AS v
        JOIN size AS s ON v.size_id = s.id
        WHERE v.product_id = ?        
    `;

    const [result] = await pool.query(query, [productId]);

    if (result.length > 0 && result[0].sizes !== null) {
        const sizes = result[0].sizes.split(','); 
        return sizes;
    }

    return [];
    
    } catch (error) {
        throw error;
    }
}


export async function fetchImagesByProductId(productId) {
    try {
        const query = 'SELECT url FROM image WHERE product_id = ?';
        const [images] = await pool.query(query, [productId]);
        return images.map(image => image.url);
    } catch (error) {
        throw error;
    }
}


export async function fetchVarByProductId(productId) {
    try {
        const query = `
            SELECT c.code AS color_code, s.size_name as size , v.stock
            FROM variants AS v
            JOIN color AS c ON v.color_id = c.id
            JOIN size AS s ON v.size_id = s.id
            WHERE v.product_id = ?
        `;

        const [variants] = await pool.query(query, [productId]);
        return variants;
    } catch (error) {
        throw error;
    }
}

