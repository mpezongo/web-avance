const express = require('express')
const router = express.Router()
const cartRouter = require('../controllers/cart')

router.post('/', cartRouter.addProduct)
router.get('/', cartRouter.getCart)
router.put('/', cartRouter.modify)
router.delete('/:productId', cartRouter.deleteProduct)

module.exports = router