const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    const id_produto = req.query.id_produto; 
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [id_produto],
            (error, resultado, fields) => {
                conn.release(); 
                if (error) {
                    return res.status(500).send({ error: error });
                }
                const response = {
                    quantidade: resultado.length,
                    produtos: resultado.map(prod => {
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                                tipo: 'GET',
                                descricao: '',
                                url: 'http://localhost:3000/produtos/' + prod.id_produto
                            }
                        };
                    })
                };
                return res.status(200).send(response);
            }
        );
    });
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

                
                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso',
                });
            }
        )
    });

});

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send ({ error: error})}
        conn.query(
            `DELETE FROM produtos WHERE id_produto = ?`,[req.body.id_produto],
            (error, resultado, field) => {
                conn.release();      
                if (error) {return res.status(500).send ({ error: error})}

                
                res.status(202).send({
                    mensagem: 'Produto removido com sucesso',
                });
            }
        )
    });
});

module.exports = router; 