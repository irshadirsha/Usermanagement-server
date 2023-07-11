let express = require('express');
let router = express.Router();
let adminController = require ('../controller/adminConroller')


router.post('/adminlogin',adminController.adminlogin)
router.post('/auth',adminController.auth)
router.post('/deleteuser',adminController.deleteuser)
router.post('/edit-user',adminController.editUser)
router.post('/add-user',adminController.addUser)

module.exports=router