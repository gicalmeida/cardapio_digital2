const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function getToken() {
  return localStorage.getItem("admin_token");
}

function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function tratarResposta(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.erro || `Erro HTTP ${response.status}`);
  }
  return data;
}

export const api = {
  // 1. Vitrine pública
  listarProdutos() {
    return fetch(`${API_URL}/produtos`).then(tratarResposta);
  },

  // 2. Finalizar pedido (cliente sem login)
  finalizarPedido(payload) {
    return fetch(`${API_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(tratarResposta);
  },

  // 3. Consultar status pelo código único
  consultarPedido(codigo) {
    return fetch(`${API_URL}/pedidos/${encodeURIComponent(codigo)}`).then(tratarResposta);
  },

  // 4. Login da administradora
  loginAdmin(email, senha) {
    return fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    }).then(tratarResposta);
  },

  // 5. Área administrativa - Produtos
  criarProduto(produto) {
    return fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(produto),
    }).then(tratarResposta);
  },

  editarProduto(idProduto, produto) {
    return fetch(`${API_URL}/produtos/${idProduto}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(produto),
    }).then(tratarResposta);
  },

  excluirProduto(idProduto) {
    return fetch(`${API_URL}/produtos/${idProduto}`, {
      method: "DELETE",
      headers: authHeaders(),
    }).then(tratarResposta);
  },

  // 6. Área administrativa - Pedidos
  listarPedidosAdmin() {
    return fetch(`${API_URL}/admin/pedidos`, {
      headers: authHeaders(),
    }).then(tratarResposta);
  },

  atualizarStatusPedido(codigo, situacao) {
    return fetch(`${API_URL}/admin/pedidos/${codigo}/status`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ situacao }),
    }).then(tratarResposta);
  },
};