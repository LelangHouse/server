const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authentication, authorization } = require('../middlewares/auth')
const upload = require('../middlewares/gcsUpload')

router.use('/', authentication)
router.post('/', upload.single('image'), ProductController.create)

module.exports = router