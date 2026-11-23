import './Footer.css';
import logo from '../../assets/logo.jpeg';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-banner-img"></div>

      <div className="footer-content">
        <div className="footer-col brand-col">
          <div className="footer-logo-container">
            <img src={logo} alt="Cantinho Doces da Cris" className="footer-logo-img" />
            <h4>Cantinho Doces da Cris</h4>
          </div>
        </div>

        <div className="footer-col">
          <h5>Navegação</h5>
          <ul>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#produtos">Cardápio</a></li>
            <li><a href="#sobre">Sobre</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Contato</h5>
          <p>📷 @cantinhodoce_dacris</p>
          <p>📞 (11) 97330-0110</p>
        </div>

        <div className="footer-col">
          <h5>Formas de pagamento</h5>
          <div className="payment-icons">
            <span title="Pix">Pix</span>
            <span title="Cartão">Cartão</span>
            <span title="Dinheiro">Dinheiro</span>
          </div>
        </div>

        
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Cantinho Doces da Cris. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}