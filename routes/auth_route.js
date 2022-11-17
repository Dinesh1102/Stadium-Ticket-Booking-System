const express = require('express'); 
const router = express.Router();

const authController_login = require('../controllers/auth_controller');
router.post('/login',authController_login.login);

const authController_admin = require('../controllers/auth_controller');
router.post('/admin',authController_admin.admin);

const authController_register = require('../controllers/auth_controller');
router.post('/register',authController_register.register);

const authController_select = require('../controllers/auth_controller');
router.post('/select',authController_select.select);

const authController_cancel = require('../controllers/auth_controller');
router.post('/cancel',authController_cancel.cancel);

const authController_confirm = require('../controllers/auth_controller');
router.post('/confirm',authController_confirm.confirm);

const authController_taketobooking = require('../controllers/auth_controller');
router.post('/todo',authController_taketobooking.todo);

const authController_home = require('../controllers/auth_controller');
router.post('/home',authController_home.home);

const authController_cancelgame = require('../controllers/auth_controller');
router.post('/cancel_game',authController_cancelgame.cancel_game);

module.exports = router;