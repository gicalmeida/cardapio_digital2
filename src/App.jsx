import React, { useState, useEffect } from 'react';
import Header from './components/Clientes/Header';
import Banner from './components/Clientes/Banner';
import Destaques from './components/Clientes/Destaques';
import ListaProdutos from './components/Clientes/ListaProdutos';
import ModalProduto from './components/commum/ModalProduto';
import Sobre from './components/Clientes/Sobre';
import Footer from './components/Clientes/Footer';
import AdminLayout from './components/Adm/AdminLayout';

// Importação de todos os dados do arquivo produtos.js (incluindo o bannerSlides)
import { bannerSlides, destaquesData, produtosData } from './data/produtos';
import './App.css';

export default function App() {
  // 1. ESTADO PARA ALTERNAR ENTRE CLIENTE E ADMIN
  const [visao, setVisao] = useState('cliente'); // 'cliente' ou 'admin'

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [pedidoItens, setPedidoItens] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [notificacao, setNotificacao] = useState('');

  // Bloqueia a rolagem da página de fundo quando um modal ou o carrinho estiver aberto
  useEffect(() => {
    if (produtoSelecionado || carrinhoAberto) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [produtoSelecionado, carrinhoAberto]);

  // Função para adicionar item e quantidade ao pedido
  const handleAdicionarAoPedido = (produto, quantidade) => {
    setPedidoItens((prevItens) => {
      const itemExistente = prevItens.find((item) => item.id === produto.id);
      if (itemExistente) {
        return prevItens.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }
      return [...prevItens, { ...produto, quantidade }];
    });

    // Notificação visual de confirmação
    setNotificacao(`Adicionado: ${quantidade}x ${produto.nome}`);
    setTimeout(() => setNotificacao(''), 3000);
  };

  // Cálculos de totais
  const totalItens = pedidoItens.reduce((acc, item) => acc + item.quantidade, 0);

  const valorTotal = pedidoItens.reduce((acc, item) => {
    const preco = typeof item.preco === 'number' ? item.preco : 0;
    return acc + preco * item.quantidade;
  }, 0);

  // 2. SE A VISÃO FOR ADMIN, RENDERIZA O PAINEL DA CRIS
  if (visao === 'admin') {
    return <AdminLayout onSair={() => setVisao('cliente')} />;
  }

  // 3. SE FOR CLIENTE, RENDERIZA A LOJA NORMALMENTE
  return (
    <div className="app-container">
      {/* Botão de Atalho para testar a Área Admin */}
      <button 
        style={{
          position: 'fixed',
          top: 15,
          right: 15,
          zIndex: 9999,
          padding: '8px 16px',
          borderRadius: '20px',
          backgroundColor: '#E5A3B3',
          color: '#fff',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
        onClick={() => setVisao('admin')}
      >
        Ir para Admin ⚙️
      </button>

      {/* Mensagem Toast de Confirmação */}
      {notificacao && <div className="toast-notification">{notificacao}</div>}

      {/* Cabeçalho */}
      <Header 
        totalItensPedido={totalItens} 
        onAbrirCarrinho={() => setCarrinhoAberto(true)} 
      />

      <main>
        {/* Banner Carrossel com as fotos importadas */}
        <Banner slides={bannerSlides} />

        {/* Seção de Destaques */}
        <Destaques 
          itens={destaquesData} 
          onSelecionarProduto={(p) => setProdutoSelecionado(p)} 
        />

        {/* Lista/Cardápio de Produtos */}
        <ListaProdutos 
          produtos={produtosData} 
          onSelecionarProduto={(p) => setProdutoSelecionado(p)} 
        />

        {/* Seção Institucional Sobre */}
        <Sobre />
      </main>

      {/* Rodapé */}
      <Footer />

      {/* Janela Modal de Especificações do Produto */}
      {produtoSelecionado && (
        <ModalProduto 
          produto={produtoSelecionado}
          onFechar={() => setProdutoSelecionado(null)}
          onAdicionarAoPedido={handleAdicionarAoPedido}
        />
      )}

      {/* Modal / Sacola de Pedidos */}
      {carrinhoAberto && (
        <div className="modal-overlay" onClick={() => setCarrinhoAberto(false)}>
          <div className="carrinho-modal" onClick={(e) => e.stopPropagation()}>
            <div className="carrinho-header">
              <h3>Sua Sacola de Pedidos</h3>
              <button onClick={() => setCarrinhoAberto(false)}>✕</button>
            </div>

            <div className="carrinho-body">
              {pedidoItens.length === 0 ? (
                <p className="carrinho-vazio">Sua sacola está vazia.</p>
              ) : (
                pedidoItens.map((item) => (
                  <div key={item.id} className="carrinho-item">
                    <div>
                      <strong className="carrinho-item-nome">{item.nome}</strong>
                      <p className="carrinho-item-qtd">
                        {item.quantidade}x {typeof item.preco === 'number' ? `R$ ${item.preco.toFixed(2)}` : ''}
                      </p>
                    </div>
                    <span className="carrinho-item-subtotal">
                      {typeof item.preco === 'number' 
                        ? `R$ ${(item.preco * item.quantidade).toFixed(2)}` 
                        : 'Sob consulta'}
                    </span>
                  </div>
                ))
              )}
            </div>

            {pedidoItens.length > 0 && (
              <div className="carrinho-footer">
                <div className="carrinho-total">
                  <span>Total:</span>
                  <strong>R$ {valorTotal.toFixed(2).replace('.', ',')}</strong>
                </div>
                <button 
                  className="btn-finalizar-pedido"
                  onClick={() => {
                    alert('Pedido enviado com sucesso para o WhatsApp!');
                    setPedidoItens([]);
                    setCarrinhoAberto(false);
                  }}
                >
                  Finalizar via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}