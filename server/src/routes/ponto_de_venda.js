const { collection, doc, getDoc, addDoc, getDocs } = require('firebase/firestore');
const db = require('../../db/firebase');

const buscarCliente = async (clienteId) => {
  const clienteRef = doc(db, 'clientes', clienteId);
  const clienteSnap = await getDoc(clienteRef);
  if (!clienteSnap.exists()) throw new Error('Cliente não encontrado.');
  return clienteSnap.data();
};

const buscarProdutos = async (produtosIds) => {
  const produtos = [];
  
  for (const produtoId of produtosIds) {
    const produtoRef = doc(db, 'produtos', produtoId);
    const produtoSnap = await getDoc(produtoRef);

    if (!produtoSnap.exists()) {
      throw new Error(`Produto com ID ${produtoId} não encontrado.`);
    }

    produtos.push({ id: produtoSnap.id, ...produtoSnap.data() });
  }

  return produtos;
};


// Rotas do PDV
const pdvRotas = (server) => {
  server.post('/pdv', async (req, res) => {
    try {
      const { produtoIds, clienteId, valorPago } = req.body;

      if (!produtoIds || !Array.isArray(produtoIds) || produtoIds.length === 0) {
        return res.status(400).send('A lista de "produtoIds" é obrigatória e deve conter pelo menos um ID.');
      }

      if (!clienteId || valorPago == null) {
        return res.status(400).send('Os campos "clienteId" e "valorPago" são obrigatórios.');
      }

      const cliente = await buscarCliente(clienteId);

      const produtosData = await buscarProdutos(produtoIds);

      let itensCupom = [];
      let valorTotal = 0;

      produtosData.forEach(produto => {
        const { nome_produto, preco } = produto;
        
        itensCupom.push({
          nome: nome_produto || 'Nome não disponível',
          preco: preco || 0,
        });
        valorTotal += preco || 0;
      });

      if (valorPago < valorTotal) {
        return res.status(400).send('Valor pago insuficiente para cobrir o total da compra.');
      }

      const troco = parseFloat((valorPago - valorTotal));

      const cupom = {
        cliente: { nome_cliente: cliente.nome_cliente, cpf: cliente.cpf },
        itens: itensCupom,
        valor_total: parseFloat(valorTotal),
        valor_pago: parseFloat(valorPago),
        troco,
      };

      await addDoc(collection(db, 'pdv'), { cupom });

      res.status(201).json(cupom);
    } catch (error) {
      console.error('Erro ao gerar cupom:', error.message);
      res.status(500).send('Erro ao gerar cupom: ' + error.message);
    }
  });

  server.get('/pdv', async (req, res) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pdv'));
      const cupons = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(cupons);
    } catch (error) {
      console.error('Erro ao buscar cupons:', error.message);
      res.status(500).send('Erro ao buscar cupons: ' + error.message);
    }
  });
};

module.exports = pdvRotas;
