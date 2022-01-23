const { Router } = require('express');
const { 
    addNewProduct,
    getProductsForHomeCarousel,
    getListProductsHome, 
    likeOrUnlikeProduct, 
    getAllListCategories,
 } = require('../Controller/ProductController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

    router.post('/product/add-new-product', [validateToken, uploadsProduct.single('productImage')], addNewProduct);
    router.get('/product/get-home-products-carousel', validateToken,  getProductsForHomeCarousel );
    router.get('/product/get-products-home', validateToken, getListProductsHome);
    router.post('/product/like-or-unlike-product', validateToken, likeOrUnlikeProduct);
    router.get('/product/get-all-categories', validateToken, getAllListCategories);

module.exports = router;