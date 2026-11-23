import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import { produtosData, destaquesData } from '../../data/produtos.js';

export default function Header({
  totalItensPedido,
  produtos = [],
  onAbrirCarrinho,
  onAbrirConsultaStatus,
  onAcessarAdmin,
}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [pesquisaAberta, setPesquisaAberta] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);
  const [pesquisaRealizada, setPesquisaRealizada] = useState(false);

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  const normalizarTexto = (texto) =>
    String(texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const pesquisarProdutos = (e) => {
    e.preventDefault();
    const termo = normalizarTexto(termoPesquisa);

    if (!termo) {
      setResultados([]);
      setPesquisaRealizada(false);
      return;
    }

    const baseCatalogo =
      Array.isArray(produtos) && produtos.length > 0
        ? produtos
        : [...destaquesData, ...produtosData];

    const catalogoUnico = baseCatalogo.filter(
      (produto, index, array) =>
        array.findIndex(
          (item) => normalizarTexto(item.nome) === normalizarTexto(produto.nome)
        ) === index
    );

    const encontrados = catalogoUnico.filter((produto) => {
      const conteudo = normalizarTexto(
        [
          produto.nome,
          produto.categoria,
          produto.descricaoCurta,
          produto.descricao,
          produto.unidadesInfo,
        ].join(' ')
      );
      const palavras = termo.split(/\s+/);
      return palavras.every((palavra) => conteudo.includes(palavra));
    });

    setResultados(encontrados);
    setPesquisaRealizada(true);
  };

  const fecharPesquisa = () => {
    setPesquisaAberta(false);
    setTermoPesquisa('');
    setResultados([]);
    setPesquisaRealizada(false);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <a href="#inicio" className="header-logo" onClick={fecharMenu}>
          <img src={logo} alt="Logo Cantinho Doces da Cris" className="logo-icon" />
          <span className="logo-text">Cantinho Doces da Cris</span>
        </a>

        <nav className={`header-nav ${menuAberto ? 'nav-open' : ''}`}>
          <a href="#inicio" onClick={fecharMenu}>Início</a>
          <a href="#destaques" onClick={fecharMenu}>Destaques</a>
          <a href="#produtos" onClick={fecharMenu}>Cardápio</a>
          <a href="#sobre" onClick={fecharMenu}>Sobre</a>
        </nav>

        <div className="header-actions">
          <button
            className="btn-status-topo"
            onClick={onAbrirConsultaStatus}
            title="Consultar Status do Pedido"
            aria-label="Consultar Status do Pedido"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span className="status-text-desktop">Status</span>
          </button>

          <button
            className="btn-carrinho-topo"
            onClick={onAbrirCarrinho}
            title="Ver Sacola de Pedidos"
          >
            <span className="cart-text">Carrinho</span>
            {totalItensPedido > 0 && (
              <span className="cart-badge">{totalItensPedido}</span>
            )}
          </button>

          <button
            className="btn-icon-action"
            onClick={() => setPesquisaAberta(!pesquisaAberta)}
            title="Pesquisar produtos"
            aria-label="Pesquisar produtos"
            aria-expanded={pesquisaAberta}
          >
            <svg
              viewBox="0 0 24 24"
              width="23"
              height="23"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </button>

          <button
            className="btn-admin-topo"
            onClick={onAcessarAdmin}
            title="Área Administrativa"
          >
            Admin
          </button>

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

      {pesquisaAberta && (
        <div className="header-search-container">
          <form onSubmit={pesquisarProdutos} className="header-search-form">
            <input
              type="search"
              placeholder="O que você está procurando?"
              value={termoPesquisa}
              onChange={(e) => {
                setTermoPesquisa(e.target.value);
                setPesquisaRealizada(false);
                setResultados([]);
              }}
              autoFocus
            />
            <button type="submit">Pesquisar</button>
            <button
              type="button"
              className="search-close"
              onClick={fecharPesquisa}
              aria-label="Fechar pesquisa"
            >
              ✕
            </button>
          </form>

          {pesquisaRealizada && (
            <div className="search-results">
              {resultados.length > 0 ? (
                <>
                  <p className="search-results-title">
                    Encontramos {resultados.length} produto(s):
                  </p>
                  <div className="search-results-list">
                    {resultados.map((produto) => (
                      <a
                        href="#produtos"
                        className="search-result-item"
                        key={produto.id}
                        onClick={fecharPesquisa}
                      >
                        <img src={produto.imagem} alt={produto.nome} />
                        <div className="search-result-info">
                          <h4>{produto.nome}</h4>
                          <span>{produto.categoria || 'Doce artesanal'}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <div className="search-no-results">
                  <span>🍬</span>
                  <p>Nenhum produto encontrado.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}