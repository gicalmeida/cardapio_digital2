import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg';

export default function Header({ totalItensPedido, onAbrirCarrinho }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <header className="header-container">
      <div className="header-content">

        {/* Logo e nome da loja */}
        <a
          href="#inicio"
          className="header-logo"
          onClick={fecharMenu}
        >
          <img
            src={logo}
            alt="Logo Cantinho Doces da Cris"
            className="logo-icon"
          />

          <span className="logo-text">
            Cantinho Doces da Cris
          </span>
        </a>

        {/* Menu de navegação */}
        <nav className={`header-nav ${menuAberto ? 'nav-open' : ''}`}>
          <a href="#inicio" onClick={fecharMenu}>Início</a>
          <a href="#destaques" onClick={fecharMenu}>Destaques</a>
          <a href="#produtos" onClick={fecharMenu}>Cardápio</a>
          <a href="#sobre" onClick={fecharMenu}>Sobre</a>
        </nav>

        {/* Ações do cabeçalho */}
        <div className="header-actions">
          <button
            className="btn-carrinho-topo"
            onClick={onAbrirCarrinho}
            title="Ver Sacola de Pedidos"
          >
            <span className="cart-text">Carrinho</span>

            {totalItensPedido > 0 && (
              <span className="cart-badge">
                {totalItensPedido}
              </span>
            )}
          </button>

          <a
            href="#pesquisa"
            className="btn-icon-action"
            title="Pesquisar"
            aria-label="Pesquisar produtos"
          >
            🔍
          </a>

          <button
            className="menu-mobile-btn"
            onClick={toggleMenu}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
          >
            {menuAberto ? '✕' : '☰'}
          </button>
        </div>

      </div>
    </header>
  );
}