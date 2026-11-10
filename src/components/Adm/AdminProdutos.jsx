import React, { useState } from 'react';
import ProdutoCard from '../commum/ProdutoCard';
import AdminEditarProduto from './AdminEditarProduto';
import { produtosData } from '../../data/produtos';
import './AdminProdutos.css';

export default function AdminProdutos() {
  const [listaProdutos, setListaProdutos] = useState(produtosData);
  const [busca, setBusca] = useState('');

  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  // Filtra produtos pelo nome digitado 
  const produtosFiltrados = listaProdutos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  //NOVO PRODUTO
  const handleNovoProduto = () => {
    setProdutoEmEdicao(null);
    setModalAberto(true);
  };

  //EDITAR PRODUTO EXISTENTE
  const handleEditar = (produto) => {
    setProdutoEmEdicao(produto);
    setModalAberto(true);
  };

  // SALVAR (EDITAR OU ADICIONAR NOVO)
  const handleSalvarProduto = (produtoSalvo) => {
    if (produtoEmEdicao) {
      // Se estava editando, substitui o produto antigo pelo atualizado
      setListaProdutos((prev) =>
        prev.map((p) => (p.id === produtoSalvo.id ? produtoSalvo : p))
      );
    } else {
      // Se era um produto novo, adiciona no topo da lista
      setListaProdutos((prev) => [produtoSalvo, ...prev]);
    }
    setModalAberto(false);
  };

  return (
    <div className="admin-produtos-container">
      <div className="admin-produtos-header">
        <h3>Gerenciamento de Produtos</h3>
        {/* Atualizado para chamar handleNovoProduto */}
        <button className="btn-novo-produto" onClick={handleNovoProduto}>
          + Novo Produto
        </button>
      </div>

      <div className="admin-produtos-busca">
        <input
          type="text"
          placeholder="Buscar produto pelo nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="admin-produtos-grid">
        {produtosFiltrados.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            modo="admin"
            onAcao={() => handleEditar(produto)}
          />
        ))}
      </div>

      {modalAberto && (
        <AdminEditarProduto
          produto={produtoEmEdicao}
          onFechar={() => setModalAberto(false)}
          onSalvar={handleSalvarProduto}
        />
      )}
    </div>
  );
}