import React, { useState, useEffect } from 'react';
import Header from './components/Clientes/Header';
import Banner from './components/Clientes/Banner';
import Destaques from './components/Clientes/Destaques';
import ListaProdutos from './components/Clientes/ListaProdutos';
import ModalProduto from './components/commum/ModalProduto';
import CarrinhoModal from './components/Clientes/Carrinho';
import Sobre from './components/Clientes/Sobre';
import Footer from './components/Clientes/Footer';
import AdminLayout from './components/Adm/AdminLayout';

// Importação dos modais de login e status
import AdminLogin from './components/Adm/AdminLogin';
import ConsultaStatus from './components/Clientes/ConsultaStatus';

// Importação de todos os dados do arquivo produtos.js
import { bannerSlides, destaquesData, produtosData } from './data/produtos';
import './App.css';

export default function App() {
  // 1. ESTADO PARA ALTERNAR ENTRE CLIENTE E ADMIN
  const [visao, setVisao] = useState('cliente'); // 'cliente' ou 'admin'

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [pedidoItens, setPedidoItens] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [notificacao, setNotificacao] = useState('');

  // Estados para controlar os modais do Header
  const [modalLoginAberto, setModalLoginAberto] = useState(false);
  const [modalStatusAberto, setModalStatusAberto] = useState(false);

  // Bloqueia a rolagem da página de fundo quando qualquer modal estiver aberto
  useEffect(() => {
    if (produtoSelecionado || carrinhoAberto || modalLoginAberto || modalStatusAberto) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [produtoSelecionado, carrinhoAberto, modalLoginAberto, modalStatusAberto]);

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

  // 2. SE A VISÃO FOR ADMIN, RENDERIZA O PAINEL DA CRIS
  if (visao === 'admin') {
    return <AdminLayout onSair={() => setVisao('cliente')} />;
  }

  // 3. SE FOR CLIENTE, RENDERIZA A LOJA NORMALMENTE
  return (
    <div className="app-container">
      {/* Mensagem Toast de Confirmação */}
      {notificacao && <div className="toast-notification">{notificacao}</div>}

      {/* Cabeçalho integrado com as funções dos botões */}
      <Header 
        totalItensPedido={totalItens} 
        onAbrirCarrinho={() => setCarrinhoAberto(true)} 
        onAbrirConsultaStatus={() => setModalStatusAberto(true)}
        onAcessarAdmin={() => setModalLoginAberto(true)}
      />

      <main>
        {/* Banner Carrossel */}
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

      {/* MODAL DE LOGIN ADMINISTRATIVO (COM BLUR) */}
      {modalLoginAberto && (
        <AdminLogin 
          onClose={() => setModalLoginAberto(false)}
          onLoginSucesso={() => {
            setModalLoginAberto(false);
            setVisao('admin'); // Direciona para o painel administrativo
          }}
        />
      )}

      {/* MODAL DE CONSULTA DE STATUS DO PEDIDO */}
      {modalStatusAberto && (
        <ConsultaStatus 
          onClose={() => setModalStatusAberto(false)} 
        />
      )}

      {/* JANELA MODAL DE DETALHES/ESPECIFICAÇÕES DO PRODUTO */}
      {produtoSelecionado && (
        <ModalProduto 
          produto={produtoSelecionado}
          onFechar={() => setProdutoSelecionado(null)}
          onAdicionarAoPedido={handleAdicionarAoPedido}
        />
      )}

      {/* MODAL DA SACOLA / CARRINHO (COMPONENTE DEDICADO EM ETAPAS) */}
      <CarrinhoModal 
        isOpen={carrinhoAberto}
        onClose={() => setCarrinhoAberto(false)}
        pedidoItens={pedidoItens}
        onAtualizarQuantidade={(id, novaQtd) => {
          if (novaQtd <= 0) {
            setPedidoItens(prev => prev.filter(item => item.id !== id));
          } else {
            setPedidoItens(prev => prev.map(item => item.id === id ? { ...item, quantidade: novaQtd } : item));
          }
        }}
        onRemoverItem={(id) => {
          setPedidoItens(prev => prev.filter(item => item.id !== id));
        }}
        onFinalizarPedido={(dadosCliente, retirarLocal) => {
          alert('Pedido finalizado com sucesso! Redirecionando para o WhatsApp da Cris...');
          setPedidoItens([]);
          setCarrinhoAberto(false);
        }}
      />
    </div>
  );
}