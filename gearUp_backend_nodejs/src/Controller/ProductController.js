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




module.exports = {
    addNewProduct,

}