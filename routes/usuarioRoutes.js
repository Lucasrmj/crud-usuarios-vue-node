const express = require('express');

const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.listarId);
router.post('/', usuarioController.criar);
router.delete('/:id', usuarioController.excluir);
router.put('/:id', usuarioController.atualizar);
router.patch('/:id', usuarioController.atualizarParcial);

module.exports = router;