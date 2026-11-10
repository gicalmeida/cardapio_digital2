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
          <h5>Atendimento</h5>
          <p>📷 @cantinhodocesdacris</p>
          <p>📞 (11) 99999-9999</p>
        </div>

        <div className="footer-col">
          <h5>Formas de pagamento</h5>
          <div className="payment-icons">
            <span title="Pix">📱 Pix</span>
            <span title="Cartão">💳 Cartão</span>
            <span title="Dinheiro">💵 Dinheiro</span>
          </div>
        </div>

        <div className="footer-col">
          <h5>Siga-nos</h5>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">📸</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">📘</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Cantinho Doces da Cris. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}