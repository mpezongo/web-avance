const express = require('express')
const router = express.Router()
const commandesController = require('../controllers/commandes')

router.post('/', commandesController.addCommande)
router.get('/', commandesController.getCommandeByUser)
router.delete('/:id', commandesController.deleteCommande)
router.get('/all', commandesController.getCommande)

module.exports = router