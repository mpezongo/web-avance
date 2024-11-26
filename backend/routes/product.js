const express = require('express')
const router = express.Router()
const articlesController = require('../controllers/product')

router.post('/', articlesController.add)
router.delete('/:id', articlesController.delete)
router.get('/', articlesController.getAllArticles)
router.get('/:id', articlesController.getArticle)
router.put('/:id', articlesController.modify)

module.exports = router