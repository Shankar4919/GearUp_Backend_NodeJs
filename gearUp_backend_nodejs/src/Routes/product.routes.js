const { Router } = require('express');
const { 
    addNewProduct,
    getProductsForHomeCarousel,
 } = require('../Controller/ProductController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

    router.post('/product/add-new-product', [validateToken, uploadsProduct.single('productImage')], addNewProduct);
    router.get('/product/get-home-products-carousel', validateToken,  getProductsForHomeCarousel );

module.exports = router;