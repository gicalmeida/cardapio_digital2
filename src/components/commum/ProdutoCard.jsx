import React from 'react';
import './ProdutoCard.css';

export default function ProdutoCard({ produto, onAcao, modo = 'cliente' }) {
  return (
    <div className="produto-card" onClick={() => onAcao(produto)}>
      <div className="produto-card-img">
        <img src={produto.imagem} alt={produto.nome} loading="lazy" />
      </div>
      
      <div className="produto-card-info">
        <h3 className="produto-card-title">{produto.nome}</h3>
        <p className="produto-card-desc">{produto.descricaoCurta}</p>
        
        <div className="produto-card-footer">
          <div className="preco-container">
            <span className="produto-card-preco">
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </span>
            {produto.unidadesInfo && (
              <span className="produto-card-unidade">{produto.unidadesInfo}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}