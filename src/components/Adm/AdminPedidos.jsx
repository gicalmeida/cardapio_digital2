import React from 'react';
import './AdminPedidos.css';

// Criamos alguns pedidos simulados para testar a interface
const pedidosSimulados = [
  { id: 101, cliente: 'Maria Silva', itens: '2x Brigadeiro Gourmet, 1x Bolo no Pote', total: 24.50, status: 'Em preparo' },
  { id: 102, cliente: 'João Pedro', itens: '1x Caixinha de Doces (6 un)', total: 18.00, status: 'Pronto' },
  { id: 103, cliente: 'Ana Souza', itens: '3x Cupcake de Red Velvet', total: 27.00, status: 'Novo' }
];

export default function AdminPedidos() {
  return (
    <div className="admin-pedidos-container">
      <h3>Pedidos Recebidos</h3>

      <div className="tabela-pedidos-wrapper">
        <table className="tabela-pedidos">
          <thead>
            <tr>
              <th>Nº</th>
              <th>Cliente</th>
              <th>Itens do Pedido</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pedidosSimulados.map((pedido) => (
              <tr key={pedido.id}>
                <td>#{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.itens}</td>
                <td>R$ {pedido.total.toFixed(2).replace('.', ',')}</td>
                <td>
                  <span className={`status-tag ${pedido.status.toLowerCase().replace(' ', '-')}`}>
                    {pedido.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}