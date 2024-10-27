const { collection, doc, addDoc, getDoc, getDocs, deleteDoc, updateDoc } = require('firebase/firestore');

const db = require('../db/firebase');

const produtosRoutes = (server) => {

    server.post('/produtos', async (req, res) => {
        try {
            const { nome_produto, preco } = req.body;

            if (!nome_produto || preco == null) {
                return res.status(400).send('Os campos "nome_produto" e "preco" são obrigatórios.');
            }

            const docRef = await addDoc(collection(db, 'produtos'), { nome_produto, preco });
            
            res.status(201).send(`'Produto adicionado com ID: ${docRef.id}`);
        } catch (error) {
            res.status(500).send('Erro ao adicionar o produto: ' + error.message); 
        }
    });

    server.get('/produtos', async (req, res) => {
        try {
            const busca = await getDocs(collection(db, 'produtos'));

            const produtos = busca.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            res.status(200).json(produtos);

        } catch (error) {
            res.status(500).send('Erro ao buscar os produtos: ' + error.message);
        }
    });
    
    server.put('/produtos/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { nome_produto, preco } = req.body;

            if (!nome_produto || preco == null) {
                return res.status(400).send('Os campos "nome_produto" e "preco" são obrigatórios.');
            }

            const produtoRef = doc(db, 'produtos', id);

            await updateDoc(produtoRef, { nome_produto, preco });

            res.status(200).send(`Produto com ID ${id} atualizado com sucesso.`);

        }    catch (error) {
                res.status(500).send('Erro ao atualizar o produto: ' + error.message);
            }
        });

        server.delete('/produtos/:id', async (req, res) => {
            try {
                const { id } = req.params;
    
                const produtoRef = doc(db, 'produtos', id);
    
                await deleteDoc(produtoRef);
    
                res.status(200).send(`Produto com ID ${id} excluído com sucesso.`);

            } catch (error) {
                res.status(500).send('Erro ao excluir o produto: ' + error.message);
            }
        });
    };

module.exports = produtosRoutes;

