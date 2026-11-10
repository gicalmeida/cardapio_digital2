import React from 'react';
import './Destaques.css';

export default function Destaques({ itens, onSelecionarProduto }) {
  return (
    <section className="destaques-container" id="destaques">
      <h2 className="section-title">Destaques</h2>
      
      <div className="destaques-grid">
        {itens.map((item) => (
          <div 
            key={item.id} 
            className="destaque-card"
            onClick={() => onSelecionarProduto(item)}
          >
            <div className="destaque-img-wrapper">
              <img src={item.imagem} alt={item.nome} loading="lazy" />
            </div>
            <h3 className="destaque-nome">{item.nome}</h3>
            <p className="destaque-preco">
              {typeof item.preco === 'number' 
                ? `R$ ${item.preco.toFixed(2).replace('.', ',')} (${item.unidadesInfo})` 
                : item.preco}
            </p>
          </div>
        ))}
      </div>

      <div className="divider-line"></div>
    </section>
  );
}