const express = require('express');
const {userRegistration , userLogin} = require('../controller/user_controller')


// const router = express.Router({ mergeParams: true });
const router = express.Router();

//routes
router.route('/registration').post(userRegistration);
router.route('/login').post(userLogin);

module.exports = router;