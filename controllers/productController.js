import { addProduct,isExists } from '../models/productModel.js';
import { processColors,processSizes,insertVariants,insertImages } from '../models/productModel.js';
import { buildProductResponse } from '../utils/responseBuilder.js'; 
import {fetchAllProducts,fetchProductsByCategory,fetchColorsByProductId,fetchSizesByProductId,fetchImagesByProductId,fetchVarByProductId} from '../models/productGet.js';
import { searchByKeyword } from '../models/productSearch.js';
import { getProductDetails } from '../models/productDetails.js';
import redis from '../utils/redis.js';

export async function createProduct(req, res) {

    try {
        let main_image_URL;
        let images_URL = [];
        const productResponses = [];

        if (req.files) {
            if (req.files['main_image']) {

                const mainImage = req.files['main_image'][0];
                const mainImageFileName = mainImage.originalname;
                const mainImageFilePath = mainImage.path;
                main_image_URL = `http://127.0.0.1:3000/api/1.0/static/uploads/${mainImageFileName}`;
                //main_image_URL = `https://18.235.176.70/static/uploads/${mainImageFileName}`;
            }


            if (req.files['image']) {
                const uploadedImages = req.files['image'];

                uploadedImages.forEach((file) => {
                    const fileName = file.originalname;
                    const filePath = file.path;
                    const image_URL = `http://127.0.0.1:3000/api/1.0/static/uploads/${fileName}`
                    //const image_URL = `https://18.235.176.70/static/uploads/${fileName}`
                    images_URL.push(image_URL);
                });
            }
        }
   
        const dataObject = JSON.parse(req.body.data);
        const data = dataObject;
        const isExist = await isExists(data.id)
        if(isExist.length > 0){
            return res.status(409).json({ error: 'Product already exists' });
        }
       const productId = await addProduct(data, main_image_URL, images_URL);

       await Promise.all([
        processColors(data.colors),
        processSizes(data.sizes),
        insertVariants(productId, data.variants),
        insertImages(productId, images_URL)
    ]);
    

        res.status(200).json({id : productId});
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export async function getProductList(req, res) {
    try {
            const category = req.params.category;
            const paging = req.query.paging || 0;
            let productList;
            const perPage = 10;

        switch (category) {
            case 'all':
                productList = await fetchAllProducts(paging);
                break;
            case 'women':
                productList = await fetchProductsByCategory('women',paging);
                break;
            case 'men':
                productList = await fetchProductsByCategory('men',paging);
                break;
            case 'accessories':
                productList = await fetchProductsByCategory('accessories',paging);
                break;
            default:
                res.status(400).json({ error: 'Invalid category' });
                return;
        }


        if (productList === undefined || productList.length === 0) {
            return res.status(200).json({ data: [] });
          }

        const promises = productList.map(async (product) => {
            const [colors, sizes, images, variants] = await Promise.all([
                fetchColorsByProductId(product.id),
                fetchSizesByProductId(product.id),
                fetchImagesByProductId(product.id),
                fetchVarByProductId(product.id)
            ]);
        
            return buildProductResponse(product, colors, sizes, images, variants);
        });
        
        const productResponses = await Promise.all(promises);


        const nextPage = (productList.length === perPage) ? (parseInt(paging)+1) : null;


        if (nextPage !== null) {
            res.status(200).json({ data: productResponses, next_paging: nextPage });
          } else {
            res.status(200).json({ data: productResponses });
          }
    } catch (error) {
        console.error('Error fetching product list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export async function searchProduct(req,res){

try{
    const keyword = req.query.keyword;
    const paging = req.query.paging || 0;

    let productList;
    const perPage = 10;

    productList = await searchByKeyword(keyword,paging);


    const productResponses = [];

    if (productList === undefined || productList.length === 0) {
        return res.status(200).json({ data: [] });
      }

    for (const product of productList) {
        const colors = await fetchColorsByProductId(product.id);
        const sizes = await fetchSizesByProductId(product.id);
        const images = await fetchImagesByProductId(product.id);
        const variants = await fetchVarByProductId(product.id);
        const productResponse = buildProductResponse(product, colors, sizes, images,variants);
        productResponses.push(productResponse);
    }

    const nextPage = (productList.length === perPage) ? (parseInt(paging)+1) : null;


    if (nextPage !== null) {
        res.status(200).json({ data: productResponses, next_paging: nextPage });
      } else {
        res.status(200).json({ data: productResponses });
      }
} catch (error) {
    console.error('Error fetching product list:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}


export async function ProductDetails(req, res) {
    try {
        const productId = req.query.id;
        const productResponses = [];

        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        
        const cachedData = await redis.get(`product:${productId}`);

        if (cachedData) {
            const productData = JSON.parse(cachedData);
            res.status(200).json({data:productData});
        } else{
        const productDetails = await getProductDetails(productId);

        if (!productDetails) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const [colors, sizes, images, variants] = await Promise.all([
            fetchColorsByProductId(productDetails.id),
            fetchSizesByProductId(productDetails.id),
            fetchImagesByProductId(productDetails.id),
            fetchVarByProductId(productDetails.id)
        ]);
        
        const productResponse = buildProductResponse(productDetails, colors, sizes, images, variants);
        
        await redis.set(`product:${productId}`, JSON.stringify(productResponse));
        await redis.expire(`product:${productId}`, 3600); 

        res.status(200).json({ data:productResponse });
    }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}