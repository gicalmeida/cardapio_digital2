import React, { useState } from 'react';
import ProdutoCard from '../commum/ProdutoCard';
import './ListaProdutos.css';

export default function ListaProdutos({ produtos, onSelecionarProduto }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const categorias = ['Todas', 'Trufas', 'Brigadeiros', 'Bombons'];

  const produtosFiltrados = categoriaAtiva === 'Todas' 
    ? produtos 
    : produtos.filter(p => p.categoria === categoriaAtiva);

  return (
    <section className="produtos-container" id="produtos">
      <h2 className="section-title">Produtos</h2>

      <div className="filtro-container">
        <label htmlFor="categoria-select" className="filtro-label">Filtro:</label>
        <select 
          id="categoria-select"
          className="filtro-select"
          value={categoriaAtiva}
          onChange={(e) => setCategoriaAtiva(e.target.value)}
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="produtos-grid">
        {produtosFiltrados.map((produto) => (
          <ProdutoCard 
          key={produto.id} 
          produto={produto} 
          onAcao={onSelecionarProduto} 
          modo="cliente"
          />
        ))}
      </div>
    </section>
  );
}