
import React, { useState, useEffect } from 'react';
import './Banner.css';

export default function Banner({ slides }) {
  const [slideAtual, setSlideAtual] = useState(0);

  // Verifica se existem slides
  if (!slides || slides.length === 0) return null;

  // Troca automática de slide a cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideAtual((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  // Próximo slide
  const proxSlide = () => {
    setSlideAtual((prev) => (prev + 1) % slides.length);
  };

  // Slide anterior
  const slideAnterior = () => {
    setSlideAtual((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
            <h1 className="banner-title">
              {slide.titulo}
            </h1>

            {slide.subtitulo && (
              <p className="banner-subtitle">
                {slide.subtitulo}
              </p>
            )}

            {slide.botaoTexto && (
              <a href={slide.botaoLink} className="banner-btn">
                {slide.botaoTexto}
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Controles de Navegação */}
      <button
        className="banner-arrow left"
        onClick={slideAnterior}
        aria-label="Slide anterior"
      >
        ❮
      </button>

      <button
        className="banner-arrow right"
        onClick={proxSlide}
        aria-label="Próximo slide"
      >
        ❯
      </button>

      {/* Indicadores do Carrossel */}
      <div className="banner-carousel-indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === slideAtual ? 'active' : ''}`}
            onClick={() => setSlideAtual(index)}
            role="button"
            tabIndex={0}
            aria-label={`Ir para o slide ${index + 1}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSlideAtual(index);
              }
            }}
          ></span>
        ))}
      </div>

      {/* Onda decorativa inferior */}
      <div className="banner-wave">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z"
            fill="#FAF5EF"
          ></path>
        </svg>
      </div>

      {/* Botão flutuante do WhatsApp */}
      <a
        className="btn-whatsapp-flutuante"
        href="https://wa.me/5511973300110?text=Oi%20Cris!%20Vi%20o%20seu%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20doces,%20como%20faço%20para%20encomendar?"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="38"
          height="38"
          fill="#7D6E65"
        >
          <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.5 0 .14 5.35.13 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.9 11.9 0 0 0 5.82 1.48h.01c6.58 0 11.94-5.35 11.94-11.94a11.86 11.86 0 0 0-3.5-8.42zM12.08 21.8a9.88 9.88 0 0 1-5.04-1.38l-.36-.22-3.71.97.99-3.62-.24-.37a9.85 9.85 0 1 1 8.36 4.62zm5.4-7.39c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.13-.27-.2-.57-.35z"/>
        </svg>
      </a>
    </section>
  );
}
