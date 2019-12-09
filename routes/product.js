const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authentication, authorization } = require('../middlewares/auth')
const upload = require('../middlewares/gcsUpload')

router.use('/', authentication)
router.post('/', upload.single('image'), ProductController.create)
router.get('/', ProductController.read)
router.put('/:id', ProductController.update)
router.post('/shareWa', ProductController.shareWa)


module.exports = router