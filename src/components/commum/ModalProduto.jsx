import React, { useState, useEffect } from 'react';
import './ModalProduto.css';

export default function ModalProduto({ produto, onFechar, onAdicionarAoPedido }) {
  const [quantidade, setQuantidade] = useState(1);
  const [imagemAtiva, setImagemAtiva] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('descricao'); // 'descricao' ou 'ingredientes'

  // Atualiza estado interno quando o produto mudar
  useEffect(() => {
    if (produto) {
      setQuantidade(1);
      setImagemAtiva(produto.imagem);
      setAbaAtiva('descricao');
    }
  }, [produto]);

  // Tecla ESC para fechar o modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onFechar();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onFechar]);

  if (!produto) return null;

  const decrementar = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  const incrementar = () => {
    setQuantidade(quantidade + 1);
  };

  const handleAdicionar = () => {
    onAdicionarAoPedido(produto, quantidade);
    onFechar();
  };

  const galeriaImagens = produto.galeria && produto.galeria.length > 0 
    ? produto.galeria 
    : [produto.imagem];

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botão de Fechar X */}
        <button className="modal-close-btn" onClick={onFechar} aria-label="Fechar modal">
          ✕
        </button>

        <div className="modal-body">
          {/* Lado Esquerdo: Imagem Principal + Miniaturas */}
          <div className="modal-media">
            <div className="modal-img-principal">
              <img src={imagemAtiva} alt={produto.nome} />
            </div>

            {galeriaImagens.length > 1 && (
              <div className="modal-thumbnails">
                {galeriaImagens.map((imgUrl, idx) => (
                  <button 
                    key={idx} 
                    className={`thumb-btn ${imagemAtiva === imgUrl ? 'active' : ''}`}
                    onClick={() => setImagemAtiva(imgUrl)}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lado Direito: Informações e Controles */}
          <div className="modal-info">
            <h2 className="modal-title">{produto.nome}</h2>
            <p className="modal-short-desc">{produto.descricaoCurta}</p>

            <div className="modal-preco-wrapper">
              <span className="modal-preco">
                {typeof produto.preco === 'number' 
                  ? `R$ ${produto.preco.toFixed(2).replace('.', ',')}` 
                  : produto.preco}
              </span>
              <span className="modal-unidades">{produto.unidadesInfo}</span>
            </div>

            <div className="modal-actions-row">
              <div className="quantity-control">
                <button onClick={decrementar} aria-label="Diminuir quantidade">−</button>
                <span>{quantidade}</span>
                <button onClick={incrementar} aria-label="Aumentar quantidade">+</button>
              </div>

              <button className="btn-adicionar-modal" onClick={handleAdicionar}>
                🛒 Adicionar
              </button>
            </div>

            {/* Abas Descrição / Ingredientes */}
            <div className="modal-tabs-container">
              <div className="modal-tabs-header">
                <button 
                  className={`tab-btn ${abaAtiva === 'descricao' ? 'active' : ''}`}
                  onClick={() => setAbaAtiva('descricao')}
                >
                  Descrição
                </button>
                <button 
                  className={`tab-btn ${abaAtiva === 'ingredientes' ? 'active' : ''}`}
                  onClick={() => setAbaAtiva('ingredientes')}
                >
                  Ingredientes
                </button>
              </div>

              <div className="modal-tab-content">
                {abaAtiva === 'descricao' ? (
                  <p>{produto.descricao}</p>
                ) : (
                  <p>{produto.ingredientes}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}