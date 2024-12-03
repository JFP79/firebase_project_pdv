const { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } = require('firebase/firestore');
const db = require('../../db/firebase');

const produtosRoutes = (server) => {
    // Rota para adicionar um novo produto
    server.post('/produtos', async (req, res) => {
        try {
            const { nome_produto, preco } = req.body;

            // Validação dos campos
            if (!nome_produto || preco === undefined || preco === null) {
                return res.status(400).json({ error: 'Os campos "nome_produto" e "preco" são obrigatórios.' });
            }

            // Adiciona um novo produto
            const docRef = await addDoc(collection(db, 'produtos'), { nome_produto, preco });
            res.status(201).json({ message: 'Produto adicionado com sucesso.', id: docRef.id });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar o produto.', details: error.message });
        }
    });

    // Rota para listar todos os produtos
    server.get('/produtos', async (req, res) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'produtos'));

            // Mapeia os documentos retornados
            const produtos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar os produtos.', details: error.message });
        }
    });

    // Rota para atualizar um produto existente
    server.put('/produtos/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { nome_produto, preco } = req.body;

            // Validação dos campos
            if (!nome_produto || preco === undefined || preco === null) {
                return res.status(400).json({ error: 'Os campos "nome_produto" e "preco" são obrigatórios.' });
            }

            // Atualiza o produto
            const produtoRef = doc(db, 'produtos', id);
            await updateDoc(produtoRef, { nome_produto, preco });

            res.status(200).json({ message: `Produto com ID ${id} atualizado com sucesso.` });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar o produto.', details: error.message });
        }
    });

    // Rota para excluir um produto
    server.delete('/produtos/:id', async (req, res) => {
        try {
            const { id } = req.params;

            // Exclui o produto
            const produtoRef = doc(db, 'produtos', id);
            await deleteDoc(produtoRef);

            res.status(200).json({ message: `Produto com ID ${id} excluído com sucesso.` });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir o produto.', details: error.message });
        }
    });
};

module.exports = produtosRoutes;
