const { Router } = require('express');
const { addNewUser, changeFotoProfile, updateInformationUser, updateStreetAddress} = require('../Controller/UserController');
const { uploadsProfile } = require('../Helpers/Multer');
const { validateToken }  = require('../Middlewares/ValidateToken');

const router = Router();

    router.post('/user/add-new-user', addNewUser);
    router.get('/user/get-user-by-id', validateToken, getUserById);
    router.put('/user/update-picture-profile', [ validateToken, uploadsProfile.single('image') ], changeFotoProfile );

module.exports = router;