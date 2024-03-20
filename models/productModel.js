
import { pool } from './util.js';

async function testdbConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release(); 
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

export async function isExists(productId) {
  const [productExist] = await pool.query('SELECT id FROM product WHERE product_id = ?', [productId]);
  return productExist;
}

async function colorInsert(colors) {
  for (const color of colors) {
    const { name, code } = color;
    const [results] = await pool.query('SELECT id FROM color WHERE code = ?', [code]);
    if(!(results.length > 0)){
      await pool.query('INSERT INTO color (name, code) VALUES (?, ?)', [name, code]);
  }
}
}

export async function processColors(colors) {
  if (!colors || colors.length === 0) {
    return; 
  }
  const colorExists = await colorInsert(colors);
}


async function sizeInsert(sizes) {
  for (const size of sizes) {
    const [results] = await pool.query('SELECT size_name FROM size WHERE size_name = ?', [size]);
    if(!(results.length > 0)){
       await pool.query('INSERT INTO size (size_name) VALUES (?)', [size]);
  }
  }
}

export async function processSizes(sizes) {
  if (!sizes || sizes.length === 0) {
    return; 
  }
  const sizeExists = await sizeInsert(sizes);
}


export async function insertVariants( productId,variants) {
  if (variants && variants.length > 0) {
    variants.map(async (variant) => {
      const { color_code, size, stock } = variant;
      const colorIdRes = await pool.query('SELECT id FROM color WHERE code = ?', [color_code]);
      const colorId = colorIdRes[0][0].id;
      const sizeIdRes = await pool.query('SELECT id FROM size WHERE size_name = ?', [size]);
      const sizeId = sizeIdRes[0][0].id;
      await pool.query('INSERT INTO variants (product_id, color_id, size_id, stock) VALUES (?,?,?,?);', [productId, colorId, sizeId, stock]);
    });
  }
}

export async function insertImages(productId,images) {
  if (images && images.length > 0) {
    images.map(async (imageUrl) => {
      const imageInsertQuery = `
      INSERT INTO image (product_id, url)
      VALUES (?, ?);
    `;
    const imageValues = [productId, imageUrl];
    await pool.query(imageInsertQuery, imageValues);
    });
  }
}

export async function addProduct(data,main_image,images_URL) {
  try {
    const {
      id,
      category,
      title,
      description,
      price,
      texture,
      wash,
      place,
      note,
      story,
      colors,
      sizes,
      variants,
    } = data;

    await testdbConnection();

    const productInsertQuery = `
      INSERT INTO product (product_id,category, title, description, price, texture, wash, place, note, story, main_image)
      VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const productValues = [
      id,
      category,
      title,
      description,
      price,
      texture,
      wash,
      place,
      note,
      story,
      main_image,
    ];


  
    try {
      const productResult = await pool.query(productInsertQuery, productValues);
      const productId = productResult[0].insertId; 
      return productId;

    }catch(error) {
      console.error('Error creating product:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}



