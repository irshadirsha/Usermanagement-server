let express = require('express');
let router = express.Router();
const userController=require('../controller/userController')
const upload =require ('../middleware/multer')

router.get('/getusers',userController.getUsers)

router.post('/',userController.auth)
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/profile',upload.single('image'),userController.prof)
module.exports = router;


