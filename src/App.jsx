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

import AdminLogin from './components/Adm/AdminLogin';
import ConsultaStatus from './components/Clientes/ConsultaStatus';

import { bannerSlides, destaquesData, produtosData } from './data/produtos';
import { api } from './services/api';
import { normalizarProduto } from './utils/NormalizarProduto';
import './App.css';

export default function App() {
  const [visao, setVisao] = useState('cliente'); // 'cliente' ou 'admin'
  const [produtosVitrine, setProdutosVitrine] = useState([]);

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [pedidoItens, setPedidoItens] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [notificacao, setNotificacao] = useState('');
  const [confirmacaoPedido, setConfirmacaoPedido] = useState(null);

  const [modalLoginAberto, setModalLoginAberto] = useState(false);
  const [modalStatusAberto, setModalStatusAberto] = useState(false);

  const carregarVitrine = async () => {
    try {
      const dados = await api.listarProdutos();
      if (Array.isArray(dados) && dados.length > 0) {
        setProdutosVitrine(dados.map((item, idx) => normalizarProduto(item, idx)));
      } else {
        setProdutosVitrine(produtosData.map((item, idx) => normalizarProduto(item, idx)));
      }
    } catch {
      setProdutosVitrine(produtosData.map((item, idx) => normalizarProduto(item, idx)));
    }
  };

  useEffect(() => {
    carregarVitrine();
  }, []);

  useEffect(() => {
    if (
      produtoSelecionado ||
      carrinhoAberto ||
      modalLoginAberto ||
      modalStatusAberto ||
      confirmacaoPedido
    ) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [
    produtoSelecionado,
    carrinhoAberto,
    modalLoginAberto,
    modalStatusAberto,
    confirmacaoPedido,
  ]);

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

    setNotificacao(`Adicionado: ${quantidade}x ${produto.nome}`);
    setTimeout(() => setNotificacao(''), 3000);
  };

  const handleFinalizarPedido = async (dadosCliente, retirarLocal = false) => {
    try {
      const payload = {
        cliente: {
          nome: dadosCliente.nome,
          telefone: dadosCliente.telefone,
          cep: retirarLocal ? 0 : dadosCliente.cep,
          rua: retirarLocal ? 'Retirada no local' : dadosCliente.rua,
          numero: retirarLocal ? 0 : Number(dadosCliente.numero || 0),
          bairro: retirarLocal ? 'Retirada' : dadosCliente.bairro,
          cidade: retirarLocal ? 'Retirada' : dadosCliente.cidade || 'Não informada',
          complemento: dadosCliente.complemento || '',
        },
        dataEntrega: dadosCliente.dataEntrega,
        horarioEntrega: dadosCliente.horaEntrega || dadosCliente.horarioEntrega,
        itens: pedidoItens.map((item) => ({
          idProduto: item.idProduto ?? item.id,
          qtdProdutos: item.quantidade,
          valorUnitario: item.precoUnitario ?? item.preco,
        })),
      };

      const resposta = await api.finalizarPedido(payload);
      setPedidoItens([]);
      setCarrinhoAberto(false);
      setConfirmacaoPedido(resposta);
    } catch (err) {
      alert(err.message || 'Erro ao finalizar o pedido.');
    }
  };

  const totalItens = pedidoItens.reduce((acc, item) => acc + item.quantidade, 0);

  if (visao === 'admin') {
    return (
      <AdminLayout
        onSair={() => {
          localStorage.removeItem('admin_token');
          setVisao('cliente');
          carregarVitrine();
        }}
      />
    );
  }

  const montarLinkWhatsApp = () => {
    if (!confirmacaoPedido?.pedido) return '#';
    const { pedido, whatsappAdmin } = confirmacaoPedido;
    const numeroLimpo = String(whatsappAdmin || '').replace(/\D/g, '');
    const itensTexto = (pedido.itens || [])
      .map(
        (i) =>
          `• ${i.qtdProdutos}x ${i.nome} (R$ ${Number(i.valorUnitario).toFixed(2).replace('.', ',')})`
      )
      .join('\n');

    const c = pedido.cliente || {};
    const enderecoFormatado =
      c.rua === 'Retirada no local'
        ? 'Retirada no local'
        : `${c.rua}, ${c.numero}${c.complemento ? ` (${c.complemento})` : ''} - ${c.bairro}, ${c.cidade} (CEP: ${c.cep})`;

    const msg = [
      'Olá! Finalizei meu pedido no site *Cantinho Doces da Cris* 🍬',
      '',
      `*Código do Pedido:* #${pedido.codigo}`,
      `*Cliente:* ${c.nome || ''}`,
      `*Telefone:* ${c.telefone || ''}`,
      `*Data/Hora:* ${pedido.dataEntrega} às ${pedido.horarioEntrega}`,
      `*Endereço:* ${enderecoFormatado}`,
      '',
      '*Itens:*',
      itensTexto,
      '',
      `*Total:* R$ ${Number(pedido.totalPedido).toFixed(2).replace('.', ',')}`,
    ].join('\n');

    return `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="app-container">
      {notificacao && <div className="toast-notification">{notificacao}</div>}

      <Header
        totalItensPedido={totalItens}
        produtos={produtosVitrine}
        onAbrirCarrinho={() => setCarrinhoAberto(true)}
        onAbrirConsultaStatus={() => setModalStatusAberto(true)}
        onAcessarAdmin={() => setModalLoginAberto(true)}
      />

      <main>
        <Banner slides={bannerSlides} />

        <Destaques
          itens={produtosVitrine.length > 0 ? produtosVitrine.slice(0, 2) : destaquesData}
          onSelecionarProduto={(p) => setProdutoSelecionado(p)}
        />

        <ListaProdutos
          produtos={produtosVitrine}
          onSelecionarProduto={(p) => setProdutoSelecionado(p)}
        />

        <Sobre />
      </main>

      <Footer />

      {modalLoginAberto && (
        <AdminLogin
          onClose={() => setModalLoginAberto(false)}
          onLoginSucesso={() => {
            setModalLoginAberto(false);
            setVisao('admin');
          }}
        />
      )}

      {modalStatusAberto && (
        <ConsultaStatus onClose={() => setModalStatusAberto(false)} />
      )}

      {produtoSelecionado && (
        <ModalProduto
          produto={produtoSelecionado}
          onFechar={() => setProdutoSelecionado(null)}
          onAdicionarAoPedido={handleAdicionarAoPedido}
        />
      )}

      <CarrinhoModal
        isOpen={carrinhoAberto}
        onClose={() => setCarrinhoAberto(false)}
        pedidoItens={pedidoItens}
        onAtualizarQuantidade={(id, novaQtd) => {
          if (novaQtd <= 0) {
            setPedidoItens((prev) => prev.filter((item) => item.id !== id));
          } else {
            setPedidoItens((prev) =>
              prev.map((item) => (item.id === id ? { ...item, quantidade: novaQtd } : item))
            );
          }
        }}
        onRemoverItem={(id) => {
          setPedidoItens((prev) => prev.filter((item) => item.id !== id));
        }}
        onFinalizarPedido={handleFinalizarPedido}
      />

      {confirmacaoPedido?.pedido && (
        <div className="modal-overlay" onClick={() => setConfirmacaoPedido(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Pedido Confirmado!</h2>
            <p>Guarde este código para consultar o status do seu pedido:</p>
            <div className="codigo-pedido-destaque">
              <strong>#{confirmacaoPedido.pedido.codigo}</strong>
            </div>
            <p>
              Total:{' '}
              <strong>
                R$ {Number(confirmacaoPedido.pedido.totalPedido).toFixed(2).replace('.', ',')}
              </strong>
            </p>
            <div className="modal-acoes">
              <a
                href={montarLinkWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                Enviar pedido no WhatsApp
              </a>
              <button type="button" onClick={() => setConfirmacaoPedido(null)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}