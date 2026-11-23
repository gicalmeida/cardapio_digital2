import React, { useEffect, useState } from 'react';
import './AdminPedidos.css';
import { api } from '../../services/api';

const OPCOES_STATUS = [
  'Recebido',
  'Em Preparo',
  'Saiu para Entrega',
  'Entregue',
  'Cancelado',
];

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarPedidos = async () => {
    try {
      setCarregando(true);
      setErro('');
      const lista = await api.listarPedidosAdmin();
      setPedidos(Array.isArray(lista) ? lista : []);
    } catch (err) {
      setErro(err.message || 'Erro ao carregar pedidos.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const handleAlterarStatus = async (codigo, novaSituacao) => {
    try {
      await api.atualizarStatusPedido(codigo, novaSituacao);
      setPedidos((prev) =>
        prev.map((p) => (p.codigo === codigo ? { ...p, situacao: novaSituacao } : p))
      );
    } catch (err) {
      alert(err.message || 'Erro ao atualizar status.');
    }
  };

  if (carregando) return <p>Carregando pedidos...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div className="admin-pedidos-container">
      <h3>Pedidos Recebidos</h3>

      <div className="tabela-pedidos-wrapper">
        <table className="tabela-pedidos">
          <thead>
            <tr>
              <th>Código</th>
              <th>Cliente & Entrega</th>
              <th>Itens do Pedido</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length === 0 ? (
              <tr>
                <td colSpan="5">Nenhum pedido encontrado.</td>
              </tr>
            ) : (
              pedidos.map((pedido) => {
                const itensResumo = (pedido.itens || [])
                  .map((i) => `${i.qtdProdutos}x ${i.nome}`)
                  .join(', ');

                return (
                  <tr key={pedido.codigo}>
                    <td>#{pedido.codigo}</td>
                    <td>
                      <div>
                        <strong>{pedido.cliente?.nome}</strong> ({pedido.cliente?.telefone})
                      </div>
                      <small>{pedido.cliente?.endereco}</small>
                      {pedido.cliente?.complemento && (
                        <div>
                          <small>Comp.: {pedido.cliente.complemento}</small>
                        </div>
                      )}
                      <div>
                        <small>
                          Entrega: {pedido.dataEntrega} às {pedido.horarioEntrega}
                        </small>
                      </div>
                    </td>
                    <td>{itensResumo}</td>
                    <td>R$ {Number(pedido.totalPedido || 0).toFixed(2).replace('.', ',')}</td>
                    <td>
                      <select
                        value={pedido.situacao}
                        onChange={(e) => handleAlterarStatus(pedido.codigo, e.target.value)}
                      >
                        {OPCOES_STATUS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}