import './Sobre.css';
import logo from '../../assets/logo.jpeg';

// Importe a sua imagem de logo ou foto real da pasta assets

export default function Sobre() {
  return (
    <>
      {/* Faixa decorativa "FEITO COM AMOR" */}
      <section className="banner-amor">
        <span className="heart-icon">♡</span>
        <div className="banner-amor-text">
          <h2>FEITO COM AMOR</h2>
          <p>Produtos feitos artesanalmente</p>
        </div>
        <span className="heart-icon">♡</span>
      </section>

      {/* Seção Institucional */}
      <section className="sobre-container" id="sobre">
        <div className="sobre-header">
          <span className="sobre-subtitle">SOBRE O CANTINHO DOCES DA CRIS</span>
          <span className="heart-small">♡</span>
        </div>

        <div className="sobre-content">
          <div className="sobre-logo-wrapper">
            <div className="sobre-logo-circle">
              {/* Imagem real no lugar do emoji e do texto improvisado */}
              <img src={logo} alt="Logo Cantinho Doces da Cris" className="sobre-logo-img" />
            </div>
          </div>

          <div className="sobre-texto">
            <h2 className="sobre-title">Conheça a história por trás dos doces</h2>
            <p>
              O Cantinho Doces da Cris nasceu do carinho e da paixão pela confeitaria artesanal. 
              Cada receita é desenvolvida com ingredientes selecionados de alta qualidade e o toque especial 
              de quem faz com o coração.
            </p>
            <p>
              Nossa missão é transformar pequenos momentos em memórias inesquecíveis através de saborear 
              um doce feito especialmente para você e sua família.
            </p>
          </div>
        </div>
      </section>
    </>
);
}