import React, { useState, useEffect } from 'react';
import ProdutoCard from '../commum/ProdutoCard';
import AdminEditarProduto from './AdminEditarProduto';
import { api } from '../../services/api';
import { normalizarProduto } from '../../utils/NormalizarProduto';
import './AdminProdutos.css';

export default function AdminProdutos() {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  const carregarProdutos = async () => {
    try {
      setCarregando(true);
      const dados = await api.listarProdutos();
      setListaProdutos(
        Array.isArray(dados) ? dados.map((item, idx) => normalizarProduto(item, idx)) : []
      );
    } catch (err) {
      alert(err.message || 'Erro ao carregar produtos.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const produtosFiltrados = listaProdutos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleNovoProduto = () => {
    setProdutoEmEdicao(null);
    setModalAberto(true);
  };

  const handleEditar = (produto) => {
    setProdutoEmEdicao(produto);
    setModalAberto(true);
  };

  const handleExcluir = async (e, produto) => {
    e.stopPropagation();
    const idReal = produto.idProduto ?? produto.id;
    if (!window.confirm(`Deseja remover "${produto.nome}" da vitrine?`)) return;

    try {
      await api.excluirProduto(idReal);
      setListaProdutos((prev) =>
        prev.filter((p) => (p.idProduto ?? p.id) !== idReal)
      );
    } catch (err) {
      alert(err.message || 'Erro ao excluir produto.');
    }
  };

  const handleSalvarProduto = async (dadosProduto) => {
    try {
      if (produtoEmEdicao) {
        const idReal = produtoEmEdicao.idProduto ?? produtoEmEdicao.id;
        await api.editarProduto(idReal, dadosProduto);
      } else {
        await api.criarProduto(dadosProduto);
      }
      await carregarProdutos();
      setModalAberto(false);
    } catch (err) {
      alert(err.message || 'Erro ao salvar produto.');
    }
  };

  return (
    <div className="admin-produtos-container">
      <div className="admin-produtos-header">
        <h3>Gerenciamento de Produtos</h3>
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

      {carregando ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className="admin-produtos-grid">
          {produtosFiltrados.map((produto) => (
            <div key={produto.id} className="admin-produto-item-wrapper">
              <ProdutoCard
                produto={produto}
                modo="admin"
                onAcao={() => handleEditar(produto)}
              />
              <button
                type="button"
                className="btn-excluir-produto"
                onClick={(e) => handleExcluir(e, produto)}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}

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