import produto1 from '../assets/produto1.jpeg';
import produto2 from '../assets/produto2.jpeg';
import produto3 from '../assets/produto3.jpeg';
import produto4 from '../assets/produto4.jpeg';
import produto5 from '../assets/produto5.jpeg';
import produto6 from '../assets/produto6.jpeg';
import produto7 from '../assets/produto7.jpeg';

const IMAGENS_LOCAIS = [
  produto1,
  produto2,
  produto3,
  produto4,
  produto5,
  produto6,
  produto7,
];

export function normalizarProduto(item, index = 0) {
  const idReal = item.idProduto ?? item.id;
  const precoNumerico = Number(item.precoUnitario ?? item.preco ?? 0);
  const qtdMinima = Number(item.quantidadeMinima ?? 1);
  const imagemResolvida =
    item.imagemUrl && String(item.imagemUrl).trim() !== ''
      ? item.imagemUrl
      : item.imagem || IMAGENS_LOCAIS[index % IMAGENS_LOCAIS.length];

  return {
    id: idReal,
    idProduto: item.idProduto ?? idReal,
    categoria: item.categoria || 'Doces',
    nome: item.nome || '',
    preco: precoNumerico,
    precoUnitario: precoNumerico,
    quantidadeMinima: qtdMinima,
    unidadesInfo:
      item.unidadesInfo ||
      (qtdMinima > 1 ? `Min ${qtdMinima} unidades` : 'Unidade'),
    descricaoCurta: item.descricaoCurta || item.descricao || '',
    descricao: item.descricao || item.descricaoCurta || '',
    ingredientes: item.ingredientes || '',
    imagem: imagemResolvida,
    galeria:
      Array.isArray(item.galeria) && item.galeria.length > 0
        ? item.galeria
        : [imagemResolvida],
  };
}