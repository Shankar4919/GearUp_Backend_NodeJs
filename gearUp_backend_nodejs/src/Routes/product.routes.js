const { Router } = require('express');
const { 
    addNewProduct,
    getProductsForHomeCarousel,
    getListProductsHome, 
    getAllListCategories,
    productFavoriteForUser,
    getProductsForCategories,
 } = require('../Controller/ProductController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

    router.post('/product/add-new-product', [validateToken, uploadsProduct.single('productImage')], addNewProduct);
    router.get('/product/get-home-products-carousel', validateToken,  getProductsForHomeCarousel );
    router.get('/product/get-products-home', validateToken, getListProductsHome);
    router.get('/product/get-all-categories', validateToken, getAllListCategories);
    router.get('/product/get-all-favorite', validateToken, productFavoriteForUser);
    router.get('/product/get-products-for-category/:idCategory', validateToken, getProductsForCategories);

module.exports = router;