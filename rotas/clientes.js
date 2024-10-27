const { collection, doc, addDoc, getDoc, getDocs, deleteDoc, updateDoc } = require('firebase/firestore');

const db = require('../db/firebase');

const clientesRoutes = (server) => {

    server.post('/clientes', async (req, res) => {
        try {
            const { nome_cliente, cpf } = req.body;

            if (!nome_cliente || cpf == null) {
                return res.status(400).send('Os campos "nome_cliente" e "cpf" são obrigatórios.');
            }

            const docRef = await addDoc(collection(db, 'clientes'), { nome_cliente, cpf });
            
            res.status(201).send(`Cliente adicionado com ID: ${docRef.id}`);
        } catch (error) {
            res.status(500).send('Erro ao adicionar o cliente: ' + error.message); 
        }
    });

    server.get('/clientes', async (req, res) => {
        try {
            const busca = await getDocs(collection(db, 'clientes'));

            const clientes = busca.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).send('Erro ao buscar os clientes: ' + error.message);
        }
    });
    
    server.put('/clientes/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { nome_cliente, cpf } = req.body; 

            if (!nome_cliente || cpf == null) {
                return res.status(400).send('Os campos "nome_cliente" e "cpf" são obrigatórios.');
            }

            const clienteRef = doc(db, 'clientes', id);

            await updateDoc(clienteRef, { nome_cliente, cpf });

            res.status(200).send(`Cliente com ID ${id} atualizado com sucesso.`);
        } catch (error) {
            res.status(500).send('Erro ao atualizar o cliente: ' + error.message);
        }
    });

    server.delete('/clientes/:id', async (req, res) => {
        try {
            const { id } = req.params;

            const clienteRef = doc(db, 'clientes', id);

            await deleteDoc(clienteRef);

            res.status(200).send(`Cliente com ID ${id} excluído com sucesso.`);
        } catch (error) {
            res.status(500).send('Erro ao excluir o cliente: ' + error.message);
        }
    });
};

module.exports = clientesRoutes;
