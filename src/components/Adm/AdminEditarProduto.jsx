import React, { useState, useEffect } from 'react';
import './AdminEditarProduto.css';

export default function AdminEditarProduto({ produto, onFechar, onSalvar }) {
  // Estado inicial do formulário (se receber produto, preenche para editar; se não, cria vazio)
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    categoria: 'Brigadeiros',
    descricao: '',
    imagem: ''
  });

  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome || '',
        preco: produto.preco || '',
        categoria: produto.categoria || 'Brigadeiros',
        descricao: produto.descricao || '',
        imagem: produto.imagem || ''
      });
    }
  }, [produto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar({
      ...formData,
      id: produto ? produto.id : Date.now(), // Gera um ID se for produto novo
      preco: parseFloat(formData.preco) || 0
    });
  };

  return (
    <div className="modal-admin-overlay" onClick={onFechar}>
      <div className="modal-admin-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-admin-header">
          <h3>{produto ? 'Editar Produto' : 'Novo Produto'}</h3>
          <button className="btn-fechar-modal" onClick={onFechar}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-admin-form">
          <div className="form-group">
            <label>Nome do Doce</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Ex: Brigadeiro Gourmet de Leite Ninho"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                required
                placeholder="4.50"
              />
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <select name="categoria" value={formData.categoria} onChange={handleChange}>
                <option value="Brigadeiros">Brigadeiros</option>
                <option value="Bolos no Pote">Bolos no Pote</option>
                <option value="Doces Finos">Doces Finos</option>
                <option value="Kits & Caixas">Kits & Caixas</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Caminho/URL da Imagem</label>
            <input
              type="text"
              name="imagem"
              value={formData.imagem}
              onChange={handleChange}
              placeholder="Ex: /assets/brigadeiro.jpg"
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="descricao"
              rows="3"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Descreva os ingredientes ou detalhes do doce..."
            />
          </div>

          <div className="modal-admin-actions">
            <button type="button" className="btn-cancelar" onClick={onFechar}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              {produto ? 'Salvar Alterações' : 'Cadastrar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}