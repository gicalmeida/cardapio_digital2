import React, { useState } from 'react';
import './ConsultaStatus.css';
import logo from '../../assets/logo.jpeg';

export default function ConsultaStatusModal({ onClose }) {
  const [codigoId, setCodigoId] = useState('');
  const [pedidoEncontrado, setPedidoEncontrado] = useState(null);
  const [tentado, setTentado] = useState(false);

  // Simulação de banco de dados para demonstração
  const pedidosMock = {
    '021': {
      id: '021',
      horario: 'Realizado hoje às 21:30',
      etapaAtual: 3, // 1: Aguardando, 2: Confirmado, 3: Sendo preparado, 4: Pronto
    },
    '105': {
      id: '105',
      horario: 'Realizado hoje às 14:15',
      etapaAtual: 4,
    }
  };

  const handleConsultar = (e) => {
    e.preventDefault();
    setTentado(true);
    const limpo = codigoId.trim().replace(/^#/, '');
    if (pedidosMock[limpo]) {
      setPedidoEncontrado(pedidosMock[limpo]);
    } else {
      setPedidoEncontrado(null);
    }
  };

  return (
    <div className="status-overlay">
      <div className="status-modal-card animate-scale">
        <button className="status-close-btn" onClick={onClose} aria-label="Fechar">✕</button>

        <div className="status-header">
          <img src={logo} alt="Logo" className="status-logo" />
          {pedidoEncontrado ? (
            <>
              <h2>Pedido #{pedidoEncontrado.id}</h2>
              <p className="status-time">{pedidoEncontrado.horario}</p>
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
                placeholder="Ex: 021"
                value={codigoId}
                onChange={(e) => setCodigoId(e.target.value)}
                autoFocus
              />
              <button type="submit">Buscar</button>
            </div>
            {tentado && !pedidoEncontrado && (
              <small className="error-msg">Pedido não encontrado. Tente o ID <strong>021</strong> ou <strong>105</strong>.</small>
            )}
          </form>
        ) : (
          <div className="steps-container">
            <div className={`step-item ${pedidoEncontrado.etapaAtual >= 1 ? 'active' : ''}`}>
              <div className="step-circle">⏳</div>
              <span>Aguardando confirmação</span>
            </div>
            <div className={`step-item ${pedidoEncontrado.etapaAtual >= 2 ? 'active' : ''}`}>
              <div className="step-circle">✓</div>
              <span>Pedido confirmado</span>
            </div>
            <div className={`step-item ${pedidoEncontrado.etapaAtual >= 3 ? 'active' : ''}`}>
              <div className="step-circle">🥣</div>
              <span>Sendo preparado</span>
            </div>
            <div className={`step-item ${pedidoEncontrado.etapaAtual >= 4 ? 'active' : ''}`}>
              <div className="step-circle">🛍️</div>
              <span>Pronto para retirada</span>
            </div>
          </div>
        )}

        {pedidoEncontrado && (
          <button className="btn-nova-consulta" onClick={() => { setPedidoEncontrado(null); setCodigoId(''); setTentado(false); }}>
            Consultar outro pedido
          </button>
        )}
      </div>
    </div>
  );
}