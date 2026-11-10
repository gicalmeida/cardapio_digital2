// Importação de todas as imagens locais
import banner1 from '../assets/banner1.jpeg';
import banner2 from '../assets/banner2.jpeg';
import banner3 from '../assets/banner3.jpeg';

import logoImg from '../assets/logo.jpeg';
//import sobreImg from '../assets/sobre.jpg';

import produto1 from '../assets/produto1.jpeg';
import produto2 from '../assets/produto2.jpeg';
import produto3 from '../assets/produto3.jpeg';
import produto4 from '../assets/produto4.jpeg';

// Imagens para o carrossel do Banner
export const bannerSlides = [
  {
    id: 1,
    titulo: 'NOME DO PRODUTO 1',
    subtitulo: 'Doces artesanais feitos com amor',
    botaoTexto: 'Confira',
    botaoLink: '#produtos',
    imagem: banner1
  },
  {
    id: 2,
    titulo: 'NOME DO PRODUTO 2',
    subtitulo: 'Encomendas especiais para o seu evento',
    botaoTexto: 'Conheça nossos doces',
    botaoLink: '#destaques',
    imagem: banner2
  },
  {
    id: 3,
    titulo: 'NOME DO PRODUTO 3',
    subtitulo: 'Sabores inesquecíveis e ingredientes nobres',
    botaoTexto: 'Ver Cardápio',
    botaoLink: '#produtos',
    imagem: banner3
  }
];

// Imagens institucionais
export const institucionalData = {
  logo: logoImg,
  fotoSobre: logoImg
};

// Produtos em Destaque
export const destaquesData = [
  {
    id: 'd1',
    nome: 'Pão de Mel Recheado Personalizado',
    preco: 130.00,
    unidadesInfo: '20 unidades',
    descricaoCurta: 'Pão de mel artesanal recheado com doce de leite e coberto com chocolate nobre.',
    descricao: 'Nossos pães de mel são produzidos de forma totalmente artesanal, com massa fofinha e perfumada com especiarias selecionadas.',
    ingredientes: 'Farinha de trigo, mel puríssimo, especiarias, doce de leite caseiro, chocolate ao leite nobre.',
    imagem: produto1,
    galeria: [produto1]
  },
  {
    id: 'd2',
    nome: 'Cone de Brigadeiro Personalizado',
    preco: 65.00,
    unidadesInfo: '10 unidades',
    descricaoCurta: 'Casquinha crocante banhada no chocolate por dentro e recheada com brigadeiro.',
    descricao: 'Cone crocantíssimo por fora, selado com uma camada generosa de chocolate por dentro.',
    ingredientes: 'Casquinha de biscoito, chocolate ao leite, leite condensado, cacau 100%.',
    imagem: produto2,
    galeria: [produto2]
  }
];

// Produtos do Cardápio
export const produtosData = [
  {
    id: 'p1',
    categoria: 'Trufas',
    nome: 'Trufa Crocante de Chocolate',
    preco: 6.00,
    unidadesInfo: 'Unidade (40g)',
    descricaoCurta: 'Trufa artesanal de chocolate meio amargo recheada com ganache e avelãs.',
    descricao: 'Trufa artesanal de chocolate meio amargo recheada com ganache aveludada e pedaços crocantes de avelã torrada.',
    ingredientes: 'Chocolate meio amargo 54%, creme de leite fresco, avelãs, açúcar.',
    imagem: produto3,
    galeria: [produto3]
  }
];