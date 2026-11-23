import React, { useState } from 'react';
import './AdminLogin.css';
import logo from '../../assets/logo.jpeg';
import { api } from '../../services/api';

export default function LoginModal({ onClose, onLoginSucesso }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCarregando(true);
      setErro('');
      const dados = await api.loginAdmin(email, senha);
      localStorage.setItem('admin_token', dados.token);
      if (dados.admin?.nome) {
        localStorage.setItem('admin_nome', dados.admin.nome);
      }
      onLoginSucesso();
    } catch (err) {
      setErro(err.message || 'E-mail ou senha inválidos.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-backdrop">
      <div className="login-card animate-scale">
        <button className="login-close-btn" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

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

          {erro && <p className="erro-login">{erro}</p>}

          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? 'ENTRANDO...' : 'ENTRAR'}
          </button>
        </form>

        <button className="btn-voltar-site" onClick={onClose}>
          Voltar ao site
        </button>
      </div>
    </div>
  );
}