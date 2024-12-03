const { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } = require('firebase/firestore');
const db = require('../../db/firebase');

const clientesRoutes = (server) => {
    // Rota para adicionar um novo cliente
    server.post('/clientes', async (req, res) => {
        try {
            const { nome_cliente, cpf } = req.body;

            // Validação dos campos
            if (!nome_cliente || !cpf) {
                return res.status(400).json({ error: 'Os campos "nome_cliente" e "cpf" são obrigatórios.' });
            }

            // Adiciona um novo cliente
            const docRef = await addDoc(collection(db, 'clientes'), { nome_cliente, cpf });
            res.status(201).json({ message: 'Cliente adicionado com sucesso.', id: docRef.id });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar o cliente.', details: error.message });
        }
    });

    // Rota para listar todos os clientes
    server.get('/clientes', async (req, res) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'clientes'));

            // Mapeia os documentos retornados
            const clientes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar os clientes.', details: error.message });
        }
    });

    // Rota para atualizar um cliente existente
    server.put('/clientes/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { nome_cliente, cpf } = req.body;

            // Validação dos campos
            if (!nome_cliente || !cpf) {
                return res.status(400).json({ error: 'Os campos "nome_cliente" e "cpf" são obrigatórios.' });
            }

            // Atualiza o cliente
            const clienteRef = doc(db, 'clientes', id);
            await updateDoc(clienteRef, { nome_cliente, cpf });

            res.status(200).json({ message: `Cliente com ID ${id} atualizado com sucesso.` });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar o cliente.', details: error.message });
        }
    });

    // Rota para excluir um cliente
    server.delete('/clientes/:id', async (req, res) => {
        try {
            const { id } = req.params;

            // Exclui o cliente
            const clienteRef = doc(db, 'clientes', id);
            await deleteDoc(clienteRef);

            res.status(200).json({ message: `Cliente com ID ${id} excluído com sucesso.` });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir o cliente.', details: error.message });
        }
    });
};

module.exports = clientesRoutes;
