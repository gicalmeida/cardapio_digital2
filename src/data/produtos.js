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
import produto5 from '../assets/produto5.jpeg';
import produto6 from '../assets/produto6.jpeg';
import produto7 from '../assets/produto7.jpeg';

// Imagens para o carrossel do Banner
export const bannerSlides = [
  {
    id: 1,
    titulo: 'Brigadeiro ao Leite',
    subtitulo: 'Brigadeiro ao leite tradicional feito com chocolate e com granulado.',
    botaoTexto: 'Confira',
    botaoLink: '#produtos',
    imagem: banner1
  },
  {
    id: 2,
    titulo: 'Mini Pão de Mel Recheado Personalizado',
    subtitulo: 'Nossos pães de mel são produzidos de forma totalmente artesanal, com massa fofinha e perfumada com especiarias selecionadas.',
    botaoTexto: 'Conheça nossos doces',
    botaoLink: '#destaques',
    imagem: banner2
  },
  {
    id: 3,
    titulo: 'Trufa Crocante de Chocolate',
    subtitulo: 'Trufa de recheio e casca variados.',
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
    nome: 'Mini Pão de Mel Recheado Personalizado',
    preco: 6.50,
    unidadesInfo: 'min 20 unidades',
    descricaoCurta: 'Pão de mel artesanal recheado com doce de leite e coberto com chocolate nobre.',
    descricao: 'Nossos pães de mel são produzidos de forma totalmente artesanal, com massa fofinha e perfumada com especiarias selecionadas.',
    imagem: produto2,
    galeria: [produto2]
  },
  {
    id: 'd2',
    nome: 'Cone de Brigadeiro Personalizado',
    preco: 6.50,
    unidadesInfo: 'min 10 unidades',
    descricaoCurta: 'Casquinha crocante banhada no chocolate por dentro e recheada com brigadeiro.',
    descricao: 'Cone crocantíssimo por fora, selado com uma camada generosa de chocolate por dentro.',
    imagem: produto6,
    galeria: [produto6]
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
    descricaoCurta: 'Trufa de recheio e casca variados.',
    descricao: 'Trufa de recheio e casca variados, combinar ambos com a vendedora',
    imagem: produto3,
    galeria: [produto3]
  },
  {
    id: 'p2',
    categoria: 'Pão de Mel',
    nome: 'Mini Pão de Mel Recheado Personalizado',
    preco: 6.50,
    unidadesInfo: 'Min 20 unidades',
    descricaoCurta: 'Trufa artesanal de chocolate meio amargo recheada com ganache e avelãs.',
    descricao: 'Trufa artesanal de chocolate meio amargo recheada com ganache aveludada e pedaços crocantes de avelã torrada.',
    imagem: produto2,
    galeria: [produto2]
  },
  {
    id: 'p3',
    categoria: 'Brigadeiros',
    nome: 'Brigadeiro Rosa',
    preco: 1.00,
    unidadesInfo: 'Min 50 unidades',
    descricaoCurta: 'Brigadeiro Rosa artesanal feito com Nesquik',
    descricao: 'Brigadeiro Rosa artesanal feito com Nesquik e granulado rosa',
    imagem: produto1,
    galeria: [produto1]
  },
  {
    id: 'p4',
    categoria: 'Todas',
    nome: 'Cone Personalizado',
    preco: 6.50,
    unidadesInfo: 'Min 10 unidades',
    descricaoCurta: 'Casquinha crocante banhada no chocolate por dentro e recheada.',
    descricao: 'Cone crocantíssimo por fora, selado com uma camada generosa por dentro. OBS: Combinar recheio com a vendedora.',
    imagem: produto6,
    galeria: [produto6]
  },
  {
  id: 'p5',
    categoria: 'Bombons',
    nome: 'Surpresa de Uva',
    preco: 2.40,
    unidadesInfo: 'Min 20 unidades',
    descricaoCurta: 'Surpresa de uva feita com brigadeiro de leite ninho recheado com uva verde',
    descricao: 'Surpresa de uva feita com brigadeiro de leite ninho recheado com uva verde e leite ninho em volta.',
    imagem: produto5,
    galeria: [produto5]
  },
  {
  id: 'p6',
    categoria: 'Brigadeiro',
    nome: 'Brigadeiro ao Leite',
    preco: 1.00,
    unidadesInfo: 'Min 50 unidades',
    descricaoCurta: 'Brigadeiro ao leite tradicional',
    descricao: 'Brigadeiro ao leite tradicional feito com chocolate e com granulado.',
    imagem: produto7,
    galeria: [produto7]
  },
  {
  id: 'p7',
    categoria: 'Brigadeiro',
    nome: 'Beijinho Tradicional',
    preco: 1.00,
    unidadesInfo: 'Min 50 unidades',
    descricaoCurta: 'Beijinho de leite Ninho tradicional',
    descricao: 'Beijinho tradicional feito com leite Ninho.',
    imagem: produto7,
    galeria: [produto7]
  }
];