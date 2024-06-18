const express = require('express');
const mysql = require('../mysql').pool;
const router = express.Router();

const PedidosController = require('../controllers/pedidos-controller');

router.get('/', PedidosController.getPedidos);
router.post('/', PedidosController.postPedidos);       
router.get('/:id_pedido', PedidosController.getSingle);     
router.delete('/', PedidosController.deletePedidos);

module.exports = router; 