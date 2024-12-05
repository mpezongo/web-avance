const express = require('express')
const router = express.Router()
const favoriteController = require('../controllers/favorites')

router.post('/', favoriteController.addDelToFavorite)
router.get('/', favoriteController.getFavorites)

module.exports = router