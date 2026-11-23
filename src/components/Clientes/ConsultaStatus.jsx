import React, { useState } from 'react';
import './ConsultaStatus.css';
import logo from '../../assets/logo.jpeg';
import { api } from '../../services/api';

const MAPA_ETAPAS = {
  Recebido: 1,
  'Em Preparo': 2,
  'Saiu para Entrega': 3,
  Entregue: 4,
  Cancelado: 0,
};

export default function ConsultaStatusModal({ onClose }) {
  const [codigoId, setCodigoId] = useState('');
  const [pedidoEncontrado, setPedidoEncontrado] = useState(null);
  const [erroBusca, setErroBusca] = useState('');
  const [buscando, setBuscando] = useState(false);

  const handleConsultar = async (e) => {
    e.preventDefault();
    const limpo = codigoId.trim().replace(/^#/, '');
    if (!limpo) return;

    try {
      setBuscando(true);
      setErroBusca('');
      const dados = await api.consultarPedido(limpo);
      setPedidoEncontrado({
        ...dados,
        etapaAtual: MAPA_ETAPAS[dados.situacao] ?? 1,
      });
    } catch (err) {
      setPedidoEncontrado(null);
      setErroBusca(err.message || 'Pedido não encontrado.');
    } finally {
      setBuscando(false);
    }
  };

  return (
    <div className="status-overlay">
      <div className="status-modal-card animate-scale">
        <button className="status-close-btn" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <div className="status-header">
          <img src={logo} alt="Logo" className="status-logo" />
          {pedidoEncontrado ? (
            <>
              <h2>Pedido #{pedidoEncontrado.codigo}</h2>
              <p className="status-time">
                Entrega: {pedidoEncontrado.dataEntrega} às {pedidoEncontrado.horarioEntrega} •{' '}
                <strong>{pedidoEncontrado.situacao}</strong>
              </p>
            </>
          ) : (
            <h2>Consultar Pedido</h2>
          )}
        </div>

        {!pedidoEncontrado ? (
          <form onSubmit={handleConsultar} className="status-form">
            <label htmlFor="codigo-input">Digite o código do seu pedido:</label>
            <div className="status-input-group">
              <input
                id="codigo-input"
                type="text"
                placeholder="Ex: 482915"
                value={codigoId}
                onChange={(e) => setCodigoId(e.target.value)}
                autoFocus
              />
              <button type="submit" disabled={buscando}>
                {buscando ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
            {erroBusca && <small className="error-msg">{erroBusca}</small>}
          </form>
        ) : (
          <div className="steps-container">
            <div className={`step-item ${pedidoEncontrado.etapaAtual >= 1 ? 'active' : ''}`}>
              <div className="step-circle">⏳</div>
              <span>Recebido</span>
            </div>
            <div className={`step-item ${pedidoEncontrado.etapaAtual >= 2 ? 'active' : ''}`}>
              <div className="step-circle">🥣</div>
              <span>Em Preparo</span>
            </div>
            <div className={`step-item ${pedidoEncontrado.etapaAtual >= 3 ? 'active' : ''}`}>
              <div className="step-circle">🛵</div>
              <span>Saiu para Entrega</span>
            </div>
            <div className={`step-item ${pedidoEncontrado.etapaAtual >= 4 ? 'active' : ''}`}>
              <div className="step-circle">🛍️</div>
              <span>Entregue</span>
            </div>
          </div>
        )}

        {pedidoEncontrado && (
          <button
            className="btn-nova-consulta"
            onClick={() => {
              setPedidoEncontrado(null);
              setCodigoId('');
              setErroBusca('');
            }}
          >
            Consultar outro pedido
          </button>
        )}
      </div>
    </div>
  );
}