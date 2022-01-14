const { Router } = require('express');
const { 
    addNewProduct,
 } = require('../Controller/ProductController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

    router.post('/product/add-new-product', [validateToken, uploadsProduct.single('productImage')], addNewProduct);

module.exports = router;