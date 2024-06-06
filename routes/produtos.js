const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    //res.status(200).send({
    //     mensagem: "usando o GET dentro da rota de produtos"
    // });

    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send ({ error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_produto =?;',
            [req.params,id_produto],
            (error, resultado, fields) => {
                if (error) {return res.status(500).send ({ error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send ({ error: error})}
        conn.query(
            'INSERT INTO PRODUTOS (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();      
                if (error) {return res.status(500).send ({ error: error})}

                
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    });

});

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'Você encontrou o ID especial',
            id: id
        })
    }else{
        res.status(200).send({
            mensagem: 'Você passou um ID'
        });
    }
})     

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {    
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send ({ error: error})}
        conn.query(
            `UPDATE produtos
                SET nome        = ?,
                    preco       = ?
               WHERE id_produto = ?`,
            [
                req.body.nome, 
                req.body.preco, 
                req.body.id_produto
            ],
            (error, resultado, field) => {
                conn.release();      
                if (error) {return res.status(500).send ({ error: error})}

                
                res.status(201).send({
                    mensagem: 'Produto alterado com sucesso',
                });
            }
        )
    });

});

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: "Produto excluido"
    });
});

module.exports = router; 