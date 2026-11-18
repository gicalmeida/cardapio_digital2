import React, { useState } from 'react';
import './Carrinho.css';

export default function CarrinhoModal({ 
  isOpen, 
  onClose, 
  pedidoItens, 
  onAtualizarQuantidade, 
  onRemoverItem, 
  onFinalizarPedido 
}) {
  const [etapa, setEtapa] = useState(1); // 1: Produtos, 2: Endereço/Retirada, 3: Confirmação
  const [retirarLocal, setRetirarLocal] = useState(true);
  
  // Dados do formulário de entrega/retirada
  const [dadosCliente, setDadosCliente] = useState({
    nome: '',
    telefone: '',
    rua: '',
    numero: '',
    cep: '',
    bairro: '',
    complemento: '',
    dataEntrega: '',
    horaEntrega: ''
  });

  if (!isOpen) return null;

  const valorTotal = pedidoItens.reduce((acc, item) => {
    const preco = typeof item.preco === 'number' ? item.preco : 0;
    return acc + preco * item.quantidade;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosCliente(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="carrinho-modal-card animate-scale" onClick={(e) => e.stopPropagation()}>
        
        {/* Cabeçalho e Passos do Protótipo */}
        <div className="carrinho-top-header">
          <h3>Minha compra</h3>
          <button className="carrinho-close-x" onClick={onClose}>✕</button>
        </div>

        <div className="steps-indicator">
          <div className={`step-circle-ind ${etapa === 1 ? 'active' : etapa > 1 ? 'completed' : ''}`} onClick={() => setEtapa(1)}>
            <span>1</span>
            <small>Produtos</small>
          </div>
          <div className="step-line-ind"></div>
          <div className={`step-circle-ind ${etapa === 2 ? 'active' : etapa > 2 ? 'completed' : ''}`} onClick={() => pedidoItens.length > 0 && setEtapa(2)}>
            <span>2</span>
            <small>Endereço</small>
          </div>
          <div className="step-line-ind"></div>
          <div className={`step-circle-ind ${etapa === 3 ? 'active' : ''}`} onClick={() => etapa > 2 && setEtapa(3)}>
            <span>3</span>
            <small>Confirmação</small>
          </div>
        </div>

        {/* ETAPA 1: PRODUTOS */}
        {etapa === 1 && (
          <div className="etapa-content">
            <div className="etapa-section-title">
              <h4>Produtos</h4>
              <span>Selecione os produtos de compra e quantidade desejada.</span>
            </div>

            {pedidoItens.length === 0 ? (
              <div className="carrinho-vazio-box">
                <p>Sua sacola está vazia.</p>
                <small>Adicione itens direto do cardápio!</small>
              </div>
            ) : (
              <div className="tabela-produtos-carrinho">
                <div className="tabela-header">
                  <span>Produto</span>
                  <span>Preço</span>
                  <span>Quantidade</span>
                  <span>Subtotal</span>
                </div>

                {pedidoItens.map((item) => (
                  <div key={item.id} className="tabela-row">
                    <div className="produto-info-col">
                      <button 
                        className="btn-lixeira" 
                        onClick={() => onRemoverItem(item.id)}
                        title="Remover"
                      >
                        🗑️
                      </button>
                      {item.imagem && <img src={item.imagem} alt={item.nome} />}
                      <span className="prod-nome">{item.nome}</span>
                    </div>

                    <div className="preco-col">
                      {typeof item.preco === 'number' ? `R$ ${item.preco.toFixed(2).replace('.', ',')}` : 'Sob consulta'}
                    </div>

                    <div className="qtd-col">
                      <div className="qtd-controlador">
                        <button onClick={() => onAtualizarQuantidade(item.id, item.quantidade - 1)}>-</button>
                        <span>{item.quantidade}</span>
                        <button onClick={() => onAtualizarQuantidade(item.id, item.quantidade + 1)}>+</button>
                      </div>
                    </div>

                    <div className="subtotal-col">
                      {typeof item.preco === 'number' ? `R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}` : '-'}
                    </div>
                  </div>
                ))}
                
                <div className="tabela-footer-total">
                  <span>Total:</span>
                  <strong>R$ {valorTotal.toFixed(2).replace('.', ',')}</strong>
                </div>
              </div>
            )}

            {pedidoItens.length > 0 && (
              <button className="btn-salvar-prosseguir" onClick={() => setEtapa(2)}>
                Salvar e prosseguir
              </button>
            )}
          </div>
        )}

        {/* ETAPA 2: ENDEREÇO / RETIRADA */}
        {etapa === 2 && (
          <div className="etapa-content">
            <div className="etapa-section-title">
              <h4>Endereço</h4>
              <span>Preencha as informações de entrega ou selecione a opção de retirar no local.</span>
            </div>

            <div className="retirar-toggle-container">
              <span>Retirar no local?</span>
              <div className="toggle-switch-wrapper">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={retirarLocal} 
                    onChange={() => setRetirarLocal(!retirarLocal)} 
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-label-text">{retirarLocal ? 'Sim' : 'Não'}</span>
              </div>
            </div>
            {retirarLocal && (
              <p className="retirar-aviso">Entre em contato pelo Whatsapp para endereço e horário de retirada e/ou ver pedido.</p>
            )}

            <div className="dados-pessoais-grid">
              <h5>Dados Pessoais</h5>
              <div className="form-row">
                <div className="form-group flex-2">
                  <label>Nome</label>
                  <input type="text" name="nome" value={dadosCliente.nome} onChange={handleInputChange} placeholder="Seu nome completo" />
                </div>
                <div className="form-group flex-1">
                  <label>Telefone</label>
                  <input type="text" name="telefone" value={dadosCliente.telefone} onChange={handleInputChange} placeholder="(11) 90000-0000" />
                </div>
              </div>
            </div>

            {!retirarLocal && (
              <div className="endereco-entrega-grid">
                <h5>Endereço</h5>
                <div className="form-row">
                  <div className="form-group flex-3">
                    <label>Rua</label>
                    <input type="text" name="rua" value={dadosCliente.rua} onChange={handleInputChange} />
                  </div>
                  <div className="form-group flex-1">
                    <label>Número</label>
                    <input type="text" name="numero" value={dadosCliente.numero} onChange={handleInputChange} />
                  </div>
                  <div className="form-group flex-1">
                    <label>CEP</label>
                    <input type="text" name="cep" value={dadosCliente.cep} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group flex-2">
                    <label>Bairro</label>
                    <input type="text" name="bairro" value={dadosCliente.bairro} onChange={handleInputChange} />
                  </div>
                  <div className="form-group flex-2">
                    <label>Complemento</label>
                    <input type="text" name="complemento" value={dadosCliente.complemento} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            )}

            <div className="data-hora-grid">
              <div className="form-group">
                <label>Data de entrega / retirada</label>
                <input type="date" name="dataEntrega" value={dadosCliente.dataEntrega} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Selecione a hora de entrega</label>
                <select name="horaEntrega" value={dadosCliente.horaEntrega} onChange={handleInputChange}>
                  <option value="">Selecione o horário</option>
                  <option value="09:00">09:00</option>
                  <option value="12:00">12:00</option>
                  <option value="15:00">15:00</option>
                  <option value="18:00">18:00</option>
                </select>
              </div>
            </div>

            <div className="botoes-etapa-2">
              <button className="btn-voltar-etapa" onClick={() => setEtapa(1)}>Voltar</button>
              <button className="btn-salvar-prosseguir" onClick={() => setEtapa(3)}>Salvar e prosseguir</button>
            </div>
          </div>
        )}

        {/* ETAPA 3: CONFIRMAÇÃO */}
        {etapa === 3 && (
          <div className="etapa-content">
            <div className="etapa-section-title">
              <h4>Confirmação</h4>
              <span>Revise os dados do seu pedido antes de finalizar.</span>
            </div>

            <div className="confirmacao-resumo-boxes">
              <div className="resumo-box">
                <h5>Produtos</h5>
                <ul>
                  {pedidoItens.map(item => (
                    <li key={item.id}>• {item.quantidade}x {item.nome}</li>
                  ))}
                </ul>
                <div className="resumo-total-final">
                  <strong>Total: R$ {valorTotal.toFixed(2).replace('.', ',')}</strong>
                </div>
              </div>

              <div className="resumo-box">
                <h5>Entrega / Retirada</h5>
                <p><strong>Cliente:</strong> {dadosCliente.nome || 'Não informado'} ({dadosCliente.telefone})</p>
                <p><strong>Tipo:</strong> {retirarLocal ? 'Retirada no local' : 'Entrega em domicílio'}</p>
                {!retirarLocal && (
                  <p><strong>Endereço:</strong> {dadosCliente.rua}, nº {dadosCliente.numero} - {dadosCliente.bairro} (CEP: {dadosCliente.cep})</p>
                )}
                <p><strong>Data/Hora:</strong> {dadosCliente.dataEntrega || 'A combinar'} às {dadosCliente.horaEntrega || 'Horário padrão'}</p>
              </div>
            </div>

            <div className="botoes-etapa-3">
              <button className="btn-voltar-etapa" onClick={() => setEtapa(2)}>Voltar</button>
              <button className="btn-confirmar-pedido-final" onClick={() => onFinalizarPedido(dadosCliente, retirarLocal)}>
                Confirmar pedido
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}