const { response, request } = require('express');
const connet = require('../DataBase/DataBase');



const addNewProduct = async (req = request, res = response) => {

    try {

        const { name, description, stock, price, uidCategory } = req.body;

        const conn = await connet();

        await conn.query('INSERT INTO Products (nameProduct, description, codeProduct, stock, price, picture, category_id) VALUE (?,?,?,?,?,?,?)', 
            [ name, description, '000' + name, stock, price, req.file.filename, uidCategory ]);

        await conn.end();   

        return res.json({
            resp: true,
            message: 'Product Added'
        })
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }
}

const getProductsForHomeCarousel = async ( req = request, res = response ) => {

    try {

        const conn = await connet();

        const rows = await conn.query('SELECT * FROM Home_carousel');

        await conn.end();

        return res.json({
            resp: true,
            message: 'Get List products home',
            slideProducts: rows[0]
        });
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}

const getListProductsHome = async (req = request, res = response) => {

    try {

        const conn = await connet();

        const products = await conn.query(`CALL SP_LIST_PRODUCTS_HOME(?);`,[ req.uidPerson ]);

        await conn.end();

        return res.json({
            resp: true,
            message: 'Get List Products for Home',
            listProducts: products[0][0]
        });
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }
}

const likeOrUnlikeProduct = async (req = request, res = response) => {

    try {

        const { uidProduct } = req.body;

        const conn = await connet();

        const isLike = await conn.query('SELECT COUNT(uidFavorite) isfavorite FROM favorite WHERE user_id = ? AND product_id = ?', [ req.uidPerson, uidProduct ]);

        if( isLike[0][0].isfavorite > 0 ){

            await conn.query('DELETE FROM favorite WHERE user_id = ? AND product_id = ?', [ req.uidPerson, uidProduct ]);

            await conn.end();

            return res.json({
                resp: true,
                message: 'Unlike'
            });
        }

        await conn.query('INSERT INTO favorite (user_id, product_id) VALUE (?,?)', [ req.uidPerson, uidProduct ]);

        await conn.end();

        return res.json({
            resp: true,
            message: 'Like'
        });
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}




module.exports = {
    addNewProduct,
    getProductsForHomeCarousel,
    getListProductsHome,
    likeOrUnlikeProduct

}