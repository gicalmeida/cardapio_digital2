import React, { useState } from 'react';
import './AdminLogin.css';
import logo from '../../assets/logo.jpeg';

export default function LoginModal({ onClose, onLoginSucesso }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de login administrativo direto
    onLoginSucesso();
  };

  return (
    <div className="login-backdrop">
      <div className="login-card animate-scale">
        <button className="login-close-btn" onClick={onClose} aria-label="Fechar">✕</button>

        <div className="login-logo-container">
          <img src={logo} alt="Cantinho Doces da Cris" />
        </div>

        <h2>Área Administrativa</h2>
        <p className="login-subtitle">Gerencie seus produtos e pedidos</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite aqui..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite aqui..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-entrar">ENTRAR</button>
        </form>

        <button className="btn-voltar-site" onClick={onClose}>
          Voltar ao site
        </button>
      </div>
    </div>
  );
}