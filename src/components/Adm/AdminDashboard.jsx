import React from 'react';
import './AdminDashboard.css';

export default function AdminDashboard({ onNavegar }) {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-cards">
        <div className="card-stat">
          <h4>Novos Pedidos</h4>
          <span className="stat-number">3</span>
        </div>
        <div className="card-stat">
          <h4>Em Preparo</h4>
          <span className="stat-number">1</span>
        </div>
        <div className="card-stat">
          <h4>Prontos</h4>
          <span className="stat-number">2</span>
        </div>
        <div className="card-stat">
          <h4>Finalizados</h4>
          <span className="stat-number">12</span>
        </div>
      </div>

      <div className="dashboard-atalho">
        <button onClick={() => onNavegar('produtos')}>
          🧁 Gerenciar Produtos
        </button>
      </div>
    </div>
  );
}