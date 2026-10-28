import React, { useState, useRef, useEffect } from 'react';
import { carreras } from './data/carreras';
import { config } from './data/config';

const BLUE = '#113bb0';
const INK = '#1c1d1f';
const GRAY = '#4d4d4d';

const STEP_LABELS = ['Bienvenida', 'El predio', 'Sociales', 'Carreras', 'Contacto'];

const NAV_BTN =
  'f-ui font-bold uppercase tracking-widest text-sm rounded-none border-2 border-white bg-transparent text-white ' +
  'px-6 md:px-8 py-3 md:py-4 inline-flex items-center gap-3 md:gap-4 transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const rise = (delay = 0) => ({ animationDelay: `${delay}ms` });

export default function App() {
  const [step, setStep] = useState(0);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [showFullPerfil, setShowFullPerfil] = useState(false);
  const [showAllCareers, setShowAllCareers] = useState(false);
  const mainRef = useRef(null);
  const detailRef = useRef(null);
  const INITIAL_CAREERS = 5;

  const backgrounds = config.backgrounds.length > 0 ? config.backgrounds : [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000',
    'https://images.unsplash.com/photo-1519452331580-2646c0788647?q=80&w=2000',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000',
    'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2000',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000',
  ];

  const avanzar = () => {
    setShowAllCareers(false);
    setStep((s) => Math.min(s + 1, 4));
  };
  const retroceder = () => {
    if (selectedCareerId) {
      setSelectedCareerId(null);
      setShowFullPerfil(false);
      setShowAllCareers(false);
      return;
    }
    setShowAllCareers(false);
    if (step > 0) setStep((s) => s - 1);
  };
  const reiniciar = () => {
    setSelectedCareerId(null);
    setShowFullPerfil(false);
    setShowAllCareers(false);
    setStep(0);
  };

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [step]);

  useEffect(() => {
    if (selectedCareer && detailRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      detailRef.current.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }, [selectedCareer]);

  const selectedCareer = carreras.find((c) => c.id === selectedCareerId);

  const handleFormClick = (e) => {
    if (!config.formUrl) {
      e.preventDefault();
      console.warn('formUrl vacío en src/data/config.js: agregá la URL del Google Form');
      return;
    }
  };

  return (
    <div className="f-ui relative flex h-dvh flex-col overflow-hidden bg-black text-white">
      {/* FONDOS */}
      {backgrounds.map((src, i) => (
        <div
          key={src + i}
          aria-hidden="true"
          className={`fixed inset-0 transition-opacity duration-1000 ${i === step ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            key={i === step ? `on-${step}` : `off-${i}`}
            src={src}
            alt=""
            loading={i === 0 ? 'eager' : i === step ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={i === step ? 'high' : 'low'}
            className={`absolute inset-0 w-full h-full object-cover object-center ${i === step ? 'kenburns' : ''}`}
          />
        </div>
      ))}
      <div className="fixed inset-0 bg-black/60 z-[1]" />
      <div className="fixed inset-0 z-[1] bg-gradient-to-t from-[#113bb0]/80 via-[#113bb0]/25 to-transparent" />

      {/* HEADER */}
      <header className="relative z-50 shrink-0 px-5 pt-4 pb-3 md:px-16 md:pt-8 md:pb-6">
        <div className="flex items-start justify-between">
          <div className="min-h-[40px] md:min-h-[44px]">
            {step > 0 && (
              <button
                onClick={retroceder}
                aria-label="Volver"
                className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-white bg-transparent text-white px-3 py-2 md:px-4 md:py-3 inline-flex items-center gap-3 transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i> Volver
              </button>
            )}
          </div>
          <img
            src={config.logos.whiteCentered}
            alt="Universidad Nacional de Lomas de Zamora"
            className="h-10 md:h-16"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* PROGRESO */}
        <div
          className="mt-3 md:mt-6 flex items-center justify-center gap-3 w-full"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={5}
          aria-valuenow={step + 1}
        >
          <span className="f-cn text-sm tracking-widest px-2 py-1 bg-[#113bb0] text-white inline-block">
            {String(step + 1).padStart(2, '0')} / 05
          </span>
          <div className="flex flex-1 gap-2 max-w-sm md:max-w-md">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex-1 h-[3px] bg-white/30">
                <div className={`h-full bg-white transition-all duration-700 ${i <= step ? 'w-full' : 'w-0'}`} />
              </div>
            ))}
          </div>
          <span className="f-ui text-xs font-bold uppercase tracking-widest hidden lg:block text-white/90">
            {STEP_LABELS[step]}
          </span>
        </div>
      </header>

      {/* CONTENIDO */}
      <main ref={mainRef} className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-5 md:px-16">
        <div key={step} className="w-full max-w-6xl mx-auto min-h-full flex items-center py-6 md:py-10">
          <div className="w-full">

          {/* PASO 0 */}
          {step === 0 && (
            <div className="max-w-4xl mx-auto text-center md:text-left">
              <p className="f-cn rise text-sm sm:text-base md:text-xl uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 md:mb-6 inline-block bg-[#113bb0] text-white px-3 py-1" style={rise(0)}>
                Ciencias Sociales · UNLZ
              </p>
              <h1 className="f-title rise text-4xl sm:text-6xl md:text-9xl uppercase leading-[1.05] sm:leading-[1.0] md:leading-[0.95] mb-4 sm:mb-6 md:mb-8" style={rise(120)}>
                Tu futuro<br />
                empieza <span className="bg-white text-[#113bb0] px-2 sm:px-4 py-0.5 inline-block leading-[1.15]">acá</span>
              </h1>
              <div className="grow h-1 w-16 sm:w-24 mb-4 sm:mb-6 md:mb-8 mx-auto md:mx-0" style={{ backgroundColor: '#fff' }} />
              <p className="f-ui rise font-normal text-base sm:text-lg md:text-xl max-w-xl mb-6 sm:mb-8 md:mb-12 leading-relaxed mx-auto md:mx-0" style={rise(280)}>
                Bienvenido a la Universidad Nacional de Lomas de Zamora. Acompañanos en este recorrido para conocer tu próxima casa de estudios.
              </p>
              <div className="flex justify-center md:justify-start mt-4 sm:mt-6 md:mt-8">
                <button onClick={avanzar} className={`${NAV_BTN} rise`} style={rise(420)}>
                  Iniciar recorrido <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}

          {/* PASO 1 */}
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-center w-full max-w-6xl mx-auto">
              <div className="text-center md:text-left">
                <p className="f-cn rise text-sm sm:text-base md:text-xl uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-3 md:mb-6 inline-block bg-[#113bb0] text-white px-3 py-1" style={rise(0)}>
                  El predio
                </p>
                <h2 className="f-title rise text-4xl sm:text-5xl md:text-7xl uppercase leading-[1.05] sm:leading-[1.0] md:leading-[0.95] mb-3 md:mb-6" style={rise(100)}>
                  Llegamos<br />
                  al <span className="bg-white text-[#113bb0] px-2 sm:px-4 py-0.5 inline-block leading-[1.15]">predio</span>
                </h2>
                <p className="f-ui rise font-normal text-base sm:text-lg md:text-xl mb-4 md:mb-10 max-w-md mx-auto md:mx-0 leading-relaxed" style={rise(220)}>
                  ¿Sabías que somos la primera universidad del conurbano bonaerense?
                </p>
                <div className="flex justify-center md:justify-start mb-5 md:mb-0">
                  <button onClick={avanzar} className={`${NAV_BTN} rise`} style={rise(340)}>
                    Continuar <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <div className="rise bg-white text-[#1c1d1f] p-4 md:p-6 border-t-4 border-[#113bb0] mx-auto w-full max-w-md md:max-w-none" style={rise(260)}>
                <h3 className="f-cn text-sm uppercase tracking-[0.25em] mb-3 sm:mb-4 text-[#113bb0]">
                  Nuestra ubicación
                </h3>
                <iframe
                  title="Mapa de la UNLZ"
                  src={config.mapEmbedUrl}
                  className="w-full h-36 sm:h-48 md:h-72 border-0 mb-3 sm:mb-4"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={config.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-[#1c1d1f] bg-transparent text-[#1c1d1f] px-4 sm:px-5 py-2.5 sm:py-3 inline-flex items-center gap-2 sm:gap-3 transition-colors duration-300 hover:bg-[#1c1d1f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1d1f]"
                >
                  <i className="fa-solid fa-map-location-dot" aria-hidden="true"></i> Abrir en Google Maps
                </a>
              </div>
            </div>
          )}

          {/* PASO 2 */}
          {step === 2 && (
            <div className="w-full max-w-4xl mx-auto text-center">
              <p className="f-cn rise text-sm sm:text-base md:text-xl uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 md:mb-8 inline-block bg-[#113bb0] text-white px-3 py-1" style={rise(0)}>
                Sociales
              </p>
              <h2 className="f-title rise text-4xl sm:text-5xl md:text-8xl uppercase leading-[1.05] sm:leading-[1.0] md:leading-[0.95] mb-4 md:mb-10" style={rise(100)}>
                Facultad de<br />
                <span className="bg-white text-[#113bb0] px-2 sm:px-4 py-0.5 inline-block leading-[1.15]">Ciencias Sociales</span>
              </h2>
              <p className="f-ui rise font-normal text-base sm:text-lg md:text-xl max-w-xl mb-6 md:mb-14 leading-relaxed mx-auto" style={rise(220)}>
                Acá vas a encontrar carreras pensadas para transformar la realidad. ¿Entramos?
              </p>
              <div className="flex justify-center">
                <button onClick={avanzar} className={`${NAV_BTN} rise`} style={rise(340)}>
                  Entrar al edificio <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}

          {/* PASO 3 */}
          {step === 3 && (
            <div className="flex flex-col gap-4 md:gap-6 w-full max-w-6xl mx-auto">
              <div className="text-center w-full">
                <p className="f-cn rise text-sm sm:text-base md:text-xl uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-3 md:mb-4 inline-block bg-[#113bb0] text-white px-3 py-1" style={rise(0)}>
                  El aula
                </p>
                <h2 className="f-title rise text-4xl sm:text-5xl md:text-7xl uppercase leading-[1.05] sm:leading-[1.0] md:leading-[0.95] mb-2 md:mb-3" style={rise(100)}>
                  ¡Llegaste<br />
                  al <span className="bg-white text-[#113bb0] px-2 sm:px-4 py-0.5 inline-block leading-[1.15]">aula</span>!
                </h2>
                {!selectedCareer && (
                  <p className="f-ui rise font-normal text-base sm:text-lg" style={rise(200)}>
                    Seleccioná la carrera que más te interese.
                  </p>
                )}
              </div>

              {!selectedCareer && (
                <div className="w-full">
                  <div className="rise grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full max-w-3xl mx-auto" style={rise(300)}>
                    {carreras.map((carrera, index) => (
                      <button
                        key={carrera.id}
                        onClick={() => {
                          setSelectedCareerId(carrera.id);
                          setShowFullPerfil(false);
                        }}
                        className={`group w-full flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 border border-[#1c1d1f] rounded-none text-left transition-colors duration-300 bg-white text-[#1c1d1f] hover:bg-[#113bb0] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                          index >= INITIAL_CAREERS && !showAllCareers ? 'hidden md:flex' : ''
                        }`}
                      >
                        <i className="fa-regular fa-star transition-colors duration-300 text-[#1c1d1f] group-hover:text-white" aria-hidden="true"></i>
                        <span className="f-ui font-bold uppercase text-xs sm:text-sm tracking-wide">{carrera.nombre}</span>
                      </button>
                    ))}
                  </div>
                  {!showAllCareers && carreras.length > INITIAL_CAREERS && (
                    <div className="flex justify-center mt-4 md:hidden">
                      <button
                        onClick={() => setShowAllCareers(true)}
                        className={`${NAV_BTN} border-white`}
                      >
                        Ver más carreras <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {selectedCareer && (
                <div className="w-full flex flex-col items-center">
                  <article
                    ref={detailRef}
                    key={selectedCareer.id}
                    className="rise bg-white text-[#1c1d1f] p-5 sm:p-6 md:p-8 border-t-4 border-[#113bb0] mx-auto w-full max-w-3xl scroll-mt-4"
                    style={rise(0)}
                  >
                    <h3 className="f-title text-2xl sm:text-3xl md:text-4xl uppercase leading-tight mb-2 text-center">{selectedCareer.nombre}</h3>
                    <p className="f-ui text-sm mb-4 sm:mb-6 text-[#1c1d1f] text-center">{selectedCareer.titulos.join(' · ')}</p>
                    <h4 className="f-cn text-xs sm:text-sm uppercase tracking-[0.25em] mb-3 sm:mb-4 text-[#113bb0] text-center">
                      Perfil del graduado
                    </h4>
                    <div className="f-ui font-normal leading-relaxed mb-4 sm:mb-6" style={{ color: GRAY }}>
                      <p className="mb-3 sm:mb-4">{selectedCareer.perfil[0]}</p>
                      {showFullPerfil &&
                        selectedCareer.perfil.slice(1).map((p, idx) => (
                          <p key={idx} className="mb-3 sm:mb-4">
                            {p}
                          </p>
                        ))}
                    </div>
                    {selectedCareer.perfil.length > 1 && (
                      <div className="flex justify-center">
                        <button
                          onClick={() => setShowFullPerfil((v) => !v)}
                          className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-[#1c1d1f] bg-transparent text-[#1c1d1f] px-3 sm:px-4 py-2 sm:py-3 inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 transition-colors duration-300 hover:bg-[#1c1d1f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1d1f]"
                        >
                          <i className={`fa-solid ${showFullPerfil ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true"></i>
                          {showFullPerfil ? 'Ver menos' : 'Ver perfil completo'}
                        </button>
                      </div>
                    )}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                      <button
                        onClick={() => {
                          setSelectedCareerId(null);
                          setShowFullPerfil(false);
                          setShowAllCareers(false);
                        }}
                        className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-[#1c1d1f] bg-transparent text-[#1c1d1f] px-3 sm:px-5 py-2 sm:py-3 inline-flex items-center gap-2 sm:gap-3 transition-colors duration-300 hover:bg-[#1c1d1f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1d1f]"
                      >
                        <i className="fa-solid fa-list" aria-hidden="true"></i> Ver todas las carreras
                      </button>
                      <button
                        onClick={avanzar}
                        className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border bg-transparent px-3 sm:px-5 py-2 sm:py-3 inline-flex items-center gap-2 sm:gap-3 transition-colors duration-300 hover:bg-[#113bb0] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113bb0]"
                        style={{ borderColor: BLUE, color: BLUE }}
                      >
                        Siguiente paso <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                      </button>
                    </div>
                  </article>
                </div>
              )}
            </div>
          )}

          {/* PASO 4 */}
          {step === 4 && (
            <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-center w-full max-w-6xl mx-auto">
              <div className="text-center">
                <p className="f-cn rise text-sm sm:text-base md:text-xl uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 md:mb-6 inline-block bg-[#113bb0] text-white px-3 py-1" style={rise(0)}>
                  Animarse
                </p>
                <h2 className="f-title rise text-4xl sm:text-5xl md:text-7xl uppercase leading-[1.05] sm:leading-[1.0] md:leading-[0.95] mb-4 md:mb-6" style={rise(100)}>
                  ¡Dale,<br />
                  <span className="bg-white text-[#113bb0] px-2 sm:px-4 py-0.5 inline-block leading-[1.15]">empezá</span> hoy
                </h2>
                <p className="f-ui rise font-normal text-base sm:text-lg max-w-md mx-auto leading-relaxed" style={rise(220)}>
                  Tu futuro en Ciencias Sociales te espera. Completá el formulario y acercate un paso más a formar parte de la UNLZ.
                </p>
              </div>

              <div className="rise bg-white text-[#1c1d1f] p-6 sm:p-8 md:p-10 flex flex-col items-center text-center border-t-4 border-[#113bb0] mx-auto w-full max-w-md md:max-w-none" style={rise(260)}>
                <span className="f-ui font-bold text-sm mb-2 flex items-center gap-2 text-[#113bb0]">
                  Completar y enviar formulario <i className="fa-solid fa-chevron-down text-xs" aria-hidden="true"></i>
                </span>
                <a
                  href={config.formUrl || '#'}
                  target={config.formUrl ? '_blank' : undefined}
                  rel={config.formUrl ? 'noreferrer' : undefined}
                  onClick={handleFormClick}
                  aria-disabled={!config.formUrl}
                  className={`mt-4 f-ui font-bold uppercase tracking-widest text-sm rounded-full bg-[#1c1d1f] text-white px-8 sm:px-12 py-3 sm:py-4 transition-colors duration-300 hover:bg-[#4d4d4d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113bb0] ${
                    !config.formUrl ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  Formulario
                </a>
                <button
                  onClick={reiniciar}
                  className="mt-8 sm:mt-10 f-ui text-xs uppercase tracking-widest text-[#4d4d4d] hover:text-[#1c1d1f] inline-flex items-center gap-2 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113bb0]"
                >
                  <i className="fa-solid fa-rotate-left" aria-hidden="true"></i> Volver a empezar
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </main>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-10 bg-gradient-to-t from-[#113bb0]/80 to-transparent md:hidden" />
    </div>
  );
}
