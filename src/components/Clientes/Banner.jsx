import React, { useState, useEffect } from 'react';
import './Banner.css';

export default function Banner({ slides }) {
  const [slideAtual, setSlideAtual] = useState(0);

  // Troca automática de slide a cada 5 segundos
  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setSlideAtual((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  const proxSlide = () => setSlideAtual((slideAtual + 1) % slides.length);
  const slideAnterior = () => setSlideAtual((slideAtual - 1 + slides.length) % slides.length);

  return (
    <section className="banner-container" id="inicio">
      {/* Slides de Fundo */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`banner-slide ${index === slideAtual ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.imagem})` }}
        >
          <div className="banner-overlay"></div>
          
          <div className="banner-content">
            <h1 className="banner-title">{slide.titulo}</h1>
            {slide.subtitulo && <p className="banner-subtitle">{slide.subtitulo}</p>}
            <a href={slide.botaoLink} className="banner-btn">
              {slide.botaoTexto}
            </a>
          </div>
        </div>
      ))}

      {/* Controles de Navegação (Setas) */}
      <button className="banner-arrow left" onClick={slideAnterior} aria-label="Slide anterior">
        ❮
      </button>
      <button className="banner-arrow right" onClick={proxSlide} aria-label="Próximo slide">
        ❯
      </button>

      {/* Indicadores do Carrossel (Dots do protótipo) */}
      <div className="banner-carousel-indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === slideAtual ? 'active' : ''}`}
            onClick={() => setSlideAtual(index)}
          ></span>
        ))}
      </div>

      {/* Onda/Curva decorativa inferior */}
      <div className="banner-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z" fill="#FAF5EF"></path>
        </svg>
      </div>

      {/* Botão flutuante do WhatsApp */}
      <a 
        href="https://wa.me/5500000000000" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float-btn"
        title="Fale conosco no WhatsApp"
      >
        💬
      </a>
    </section>
  );
}