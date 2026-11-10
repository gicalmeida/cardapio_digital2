import React, { useState } from 'react';
import './AdminLayout.css';
import logo from '../../assets/logo.jpeg';

import AdminDashboard from './AdminDashboard';
import AdminProdutos from './AdminProdutos';
import AdminPedidos from './AdminPedidos'; 

//{ onSair } é a função que fecha a área administrativa
export default function AdminLayout({ onSair }) {
  // Guarda qual o separador ativo no momento
  const [abaAtiva, setAbaAtiva] = useState('inicio'); 

  return (
    <div className="admin-container">
      
      {/*(SIDEBAR)*/}
      <aside className="admin-sidebar">
        
        <div className="sidebar-logo">
          <img src={logo} alt="Cantinho Doces da Cris" />
        </div>

        {/* Menu de Navegação */}
        <nav className="sidebar-nav">
          
          {/* Botão INÍCIO */}
          {/* Se abaAtiva === 'inicio', junta a classe 'active' para mudar a cor do botão */}
          <button
            className={`nav-item ${abaAtiva === 'inicio' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('inicio')}
          >
            <span>🏠</span> Início
          </button>

          {/* Botão PRODUTOS */}
          <button 
            className={`nav-item ${abaAtiva === 'produtos' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('produtos')}
          >
            <span>🧁</span> Produtos
          </button>    

          {/* Botão PEDIDOS */}
          <button 
            className={`nav-item ${abaAtiva === 'pedidos' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('pedidos')}
          >
            <span>📋</span> Pedidos
          </button>
        </nav>

        {/* Botão SAIR da Barra Lateral */}
        <button className="sidebar-sair-btn" onClick={onSair}>
          <span>🚪</span> Sair
        </button>
      </aside>

      {/* 4.2 ÁREA DE CONTEÚDO PRINCIPAL*/}
      <main className="admin-main-content">
        
        {/* Cabeçalho superior */}
        <header className="admin-topbar">
          <h2>Olá, Cris ! ♡</h2>
          <button className="btn-sair-topbar" onClick={onSair}>Sair</button>
        </header>

        {/* Corpo da página*/}
        <div className="admin-page-body">
          {/* Operador &&: Se a condição à esquerda for verdadeira, renderiza o componente à direita */}
          {abaAtiva === 'inicio' && <AdminDashboard onNavegar={setAbaAtiva} />}
          {abaAtiva === 'produtos' && <AdminProdutos />}
          {abaAtiva === 'pedidos' && <AdminPedidos />}
        </div>
      </main>
    </div>
  );
}