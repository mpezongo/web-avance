const express = require('express')
const router = express.Router()
const commandesController = require('../controllers/commandes')

router.post('/', commandesController.addCommande)
router.get('/', commandesController.getCommandeByUser)
router.delete('/:id', commandesController.deleteCommande)
router.get('/all', commandesController.getCommande)
router.get('/:id', commandesController.getCommandeById)
router.put('/:id', commandesController.updateCommande)

module.exports = router