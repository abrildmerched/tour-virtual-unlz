import React, { useState } from 'react';

/* ------------------------------------------------------------------
   RECORRIDO INMERSIVO · Facultad de Ciencias Sociales · UNLZ
   Requisitos en index.html:
   - Font Awesome 7 Free (solo íconos)
   - Archivos de Zurich en /fonts (ver @font-face más abajo)
------------------------------------------------------------------- */

const BLUE = '#113bb0';
const INK = '#1c1d1f';

// Reemplazar por fotos reales de cada espacio (idealmente en /img, 2000px de ancho)
const BACKGROUNDS = [
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000', // 0 Entrada predio
  'https://images.unsplash.com/photo-1519452331580-2646c0788647?q=80&w=2000', // 1 Campus verde
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000', // 2 Entrada Sociales
  'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2000', // 3 Aula
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000', // 4 Final
];

const CAREERS = ['Periodismo', 'Publicidad', 'Relaciones Públicas', 'Ciencias de la Educación'];

const STEP_LABELS = ['Bienvenida', 'El predio', 'Sociales', 'Carreras', 'Contacto'];

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Archivo+Black&family=Archivo+Narrow:wght@700&display=swap');

/* Zurich es una fuente licenciada: colocar los archivos en /fonts.
   Mientras tanto se usan fuentes de reemplazo de peso similar (Archivo). */
@font-face {
  font-family: 'Zurich Extra Black BT';
  src: url('/fonts/ZurichExtraBlackBT.woff2') format('woff2');
  font-weight: 900; font-display: swap;
}
@font-face {
  font-family: 'Zurich Cn BT';
  src: url('/fonts/ZurichCnBT-Bold.woff2') format('woff2');
  font-weight: 700; font-display: swap;
}

.f-title { font-family: 'Zurich Extra Black BT', 'Archivo Black', Impact, sans-serif; font-weight: 900; }
.f-cn    { font-family: 'Zurich Cn BT', 'Archivo Narrow', 'Arial Narrow', sans-serif; font-weight: 700; }
.f-ui    { font-family: 'Poppins', sans-serif; }

@keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.12); } }
.kenburns { animation: kenburns 18s ease-out forwards; }

@keyframes rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
.rise { opacity: 0; animation: rise .8s cubic-bezier(.2,.7,.2,1) forwards; }

@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.grow { transform-origin: left; animation: grow .9s .1s cubic-bezier(.2,.7,.2,1) both; }

@media (prefers-reduced-motion: reduce) {
  .kenburns, .rise, .grow { animation: none; opacity: 1; transform: none; }
}
`;

/* Botón de navegación: cuadrado, transparente, borde blanco, se invierte en hover */
const NAV_BTN =
  'f-ui font-bold uppercase tracking-widest text-sm rounded-none border-2 border-white bg-transparent text-white ' +
  'px-8 py-4 inline-flex items-center gap-4 transition-colors duration-300 hover:bg-white hover:text-black';

const rise = (delay = 0) => ({ animationDelay: `${delay}ms` });

export default function RecorridoUNLZ() {
  const [step, setStep] = useState(0);
  const [selectedCareer, setSelectedCareer] = useState(null);

  const avanzar = () => setStep((s) => Math.min(s + 1, 4));
  const retroceder = () => {
    if (selectedCareer) setSelectedCareer(null);
    else if (step > 0) setStep(step - 1);
  };
  const reiniciar = () => {
    setSelectedCareer(null);
    setStep(0);
  };

  return (
    <div className="f-ui relative w-full h-screen overflow-hidden bg-black text-white">
      <style>{GLOBAL_CSS}</style>

      {/* FONDOS: capas apiladas con fundido cruzado + zoom lento */}
      {BACKGROUNDS.map((src, i) => (
        <div
          key={src}
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-1000 ${i === step ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            key={i === step ? `on-${step}` : `off-${i}`}
            className={`absolute inset-0 bg-cover bg-center ${i === step ? 'kenburns' : ''}`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-50 px-6 md:px-16 pt-6 md:pt-8">
        <div className="flex items-start justify-between">
          <div className="min-h-[44px]">
            {step > 0 && (
              <button
                onClick={retroceder}
                aria-label="Volver"
                className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-white bg-transparent text-white px-4 py-3 inline-flex items-center gap-3 transition-colors duration-300 hover:bg-white hover:text-black"
              >
                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i> Volver
              </button>
            )}
          </div>
          <img src="LOGO-CENTRADO-BLANCO-retina-mobile.webp" alt="Universidad Nacional de Lomas de Zamora" className="h-14 md:h-16" />
        </div>

        {/* Progreso: 5 tramos */}
        <div className="mt-6 flex items-center gap-3" role="progressbar" aria-valuemin={1} aria-valuemax={5} aria-valuenow={step + 1}>
          <span className="f-cn text-sm tracking-widest w-14">
            {String(step + 1).padStart(2, '0')} / 05
          </span>
          <div className="flex flex-1 gap-2 max-w-md">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex-1 h-[3px] bg-white/30">
                <div className={`h-full bg-white transition-all duration-700 ${i <= step ? 'w-full' : 'w-0'}`} />
              </div>
            ))}
          </div>
          <span className="f-ui text-xs font-normal uppercase tracking-widest hidden md:block text-white/80">
            {STEP_LABELS[step]}
          </span>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="relative z-10 w-full h-full flex items-end md:items-center px-6 md:px-16 pb-14 md:pb-0 pt-40 overflow-y-auto">
        <div key={step} className="w-full max-w-6xl mx-auto md:mx-0">

          {/* PASO 0 · Bienvenida */}
          {step === 0 && (
            <div className="max-w-4xl">
              <p className="f-cn rise text-base md:text-xl uppercase tracking-[0.3em] mb-6" style={rise(0)}>
                Ciencias Sociales · UNLZ
              </p>
              <h1 className="f-title rise text-6xl md:text-9xl uppercase leading-[0.9] mb-8" style={rise(120)}>
                Tu futuro<br />empieza acá
              </h1>
              <div className="grow h-1 w-24 mb-8" style={{ backgroundColor: '#fff' }} />
              <p className="f-ui rise font-normal text-lg md:text-xl max-w-xl mb-12 leading-relaxed" style={rise(280)}>
                Bienvenido a la Universidad Nacional de Lomas de Zamora. Acompañanos en este
                recorrido para conocer tu próxima casa de estudios.
              </p>
              <button onClick={avanzar} className={`${NAV_BTN} rise`} style={rise(420)}>
                Iniciar recorrido <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          )}

          {/* PASO 1 · Predio y mapa */}
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <p className="f-cn rise text-base md:text-xl uppercase tracking-[0.3em] mb-6" style={rise(0)}>
                  Paso 01 · El predio
                </p>
                <h2 className="f-title rise text-5xl md:text-7xl uppercase leading-[0.95] mb-6" style={rise(100)}>
                  Llegamos<br />al predio
                </h2>
                <p className="f-ui rise font-normal text-lg md:text-xl mb-10 max-w-md leading-relaxed" style={rise(220)}>
                  ¿Sabías que somos la primera universidad del conurbano bonaerense?
                </p>
                <button onClick={avanzar} className={`${NAV_BTN} rise`} style={rise(340)}>
                  Continuar <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>

              <div className="rise bg-white text-[#1c1d1f] p-5 md:p-6" style={rise(260)}>
                <h3 className="f-cn text-sm uppercase tracking-[0.25em] mb-4" style={{ color: BLUE }}>
                  Nuestra ubicación
                </h3>
                <iframe
                  title="Mapa de la UNLZ"
                  src="https://www.google.com/maps?q=Universidad+Nacional+de+Lomas+de+Zamora&output=embed"
                  className="w-full h-56 md:h-72 border-0 mb-4"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://maps.app.goo.gl/6PjVvx19rHHq2TaSA"
                  target="_blank"
                  rel="noreferrer"
                  className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-[#1c1d1f] bg-transparent text-[#1c1d1f] px-5 py-3 inline-flex items-center gap-3 transition-colors duration-300 hover:bg-[#1c1d1f] hover:text-white"
                >
                  <i className="fa-solid fa-map-location-dot" aria-hidden="true"></i> Abrir en Google Maps
                </a>
              </div>
            </div>
          )}

          {/* PASO 2 · Entrada a Sociales */}
          {step === 2 && (
            <div className="max-w-4xl">
              <div className="rise inline-block bg-white p-3 mb-8" style={rise(0)}>
                <img src="logo_azu_chicol.fw_.png" alt="Facultad de Ciencias Sociales" className="h-16 md:h-20" />
              </div>
              <h2 className="f-title rise text-5xl md:text-8xl uppercase leading-[0.92] mb-8" style={rise(120)}>
                Facultad de<br />Ciencias Sociales
              </h2>
              <p className="f-ui rise font-normal text-lg md:text-xl max-w-xl mb-12 leading-relaxed" style={rise(260)}>
                Acá vas a encontrar carreras pensadas para transformar la realidad. ¿Entramos?
              </p>
              <button onClick={avanzar} className={`${NAV_BTN} rise`} style={rise(380)}>
                Entrar al edificio <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          )}

          {/* PASO 3 · Aula y carreras */}
          {step === 3 && (
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <p className="f-cn rise text-base md:text-xl uppercase tracking-[0.3em] mb-6" style={rise(0)}>
                  Paso 03 · El aula
                </p>
                <h2 className="f-title rise text-5xl md:text-7xl uppercase leading-[0.95] mb-5" style={rise(100)}>
                  ¡Llegaste<br />al aula!
                </h2>
                <p className="f-ui rise font-normal text-lg mb-8" style={rise(200)}>
                  Seleccioná la carrera que más te interese.
                </p>

                <ul className="rise flex flex-col w-full md:w-96" style={rise(300)}>
                  {CAREERS.map((carrera, i) => {
                    const active = selectedCareer === carrera;
                    return (
                      <li key={carrera} className={i > 0 ? '-mt-px' : ''}>
                        <button
                          onClick={() => setSelectedCareer(carrera)}
                          aria-pressed={active}
                          className={`group w-full flex items-center gap-4 px-6 py-4 border border-[#1c1d1f] rounded-none text-left transition-colors duration-300 hover:bg-[#1c1d1f] hover:text-white ${
                            active ? 'bg-[#1c1d1f] text-white' : 'bg-white text-[#1c1d1f]'
                          }`}
                        >
                          <i
                            className={`fa-regular fa-star transition-colors duration-300 group-hover:text-white ${
                              active ? 'text-white' : 'text-[#1c1d1f]'
                            }`}
                            aria-hidden="true"
                          ></i>
                          <span className="f-ui font-bold uppercase text-sm tracking-wide">{carrera}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {selectedCareer && (
                <article
                  key={selectedCareer}
                  className="rise bg-white text-[#1c1d1f] p-8 md:p-10 border-t-4"
                  style={{ borderColor: BLUE, ...rise(0) }}
                >
                  <h3 className="f-title text-3xl md:text-4xl uppercase leading-tight mb-3">{selectedCareer}</h3>
                  <h4 className="f-cn text-sm uppercase tracking-[0.25em] mb-6" style={{ color: BLUE }}>
                    Perfil del graduado
                  </h4>
                  <p className="f-ui font-normal leading-relaxed mb-8" style={{ color: '#4d4d4d' }}>
                    Como profesional de {selectedCareer}, vas a estar capacitado para analizar la realidad y
                    liderar proyectos que impacten en la sociedad.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedCareer(null)}
                      className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-[#1c1d1f] bg-transparent text-[#1c1d1f] px-5 py-3 inline-flex items-center gap-3 transition-colors duration-300 hover:bg-[#1c1d1f] hover:text-white"
                    >
                      <i className="fa-solid fa-list" aria-hidden="true"></i> Otras carreras
                    </button>
                    <button
                      onClick={avanzar}
                      className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border bg-transparent px-5 py-3 inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
                      style={{ borderColor: BLUE, color: BLUE }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = BLUE; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      Siguiente paso <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </article>
              )}
            </div>
          )}

          {/* PASO 4 · Formulario */}
          {step === 4 && (
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <p className="f-cn rise text-base md:text-xl uppercase tracking-[0.3em] mb-6" style={rise(0)}>
                  Último paso
                </p>
                <h2 className="f-title rise text-5xl md:text-7xl uppercase leading-[0.95] mb-6" style={rise(100)}>
                  ¿Querés<br />saber más?
                </h2>
                <p className="f-ui rise font-normal text-lg max-w-md leading-relaxed" style={rise(220)}>
                  Dejanos tus datos para enviarte el plan de estudios, fechas de inscripción y más
                  información sobre la vida universitaria en Sociales UNLZ.
                </p>
              </div>

              <div className="rise bg-white text-[#1c1d1f] p-8 md:p-10 flex flex-col items-center text-center" style={rise(260)}>
                <span className="f-ui font-bold text-sm mb-2 flex items-center gap-2" style={{ color: BLUE }}>
                  Completar y enviar formulario <i className="fa-solid fa-chevron-down text-xs" aria-hidden="true"></i>
                </span>
                <a
                  href="https://docs.google.com/forms/..."
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 f-ui font-bold uppercase tracking-widest text-sm rounded-full bg-[#1c1d1f] text-white px-12 py-4 transition-colors duration-300 hover:bg-[#4d4d4d]"
                >
                  Formulario
                </a>
                <button
                  onClick={reiniciar}
                  className="mt-10 f-ui text-xs uppercase tracking-widest text-[#4d4d4d] hover:text-[#1c1d1f] inline-flex items-center gap-2 transition-colors duration-300"
                >
                  <i className="fa-solid fa-rotate-left" aria-hidden="true"></i> Volver a empezar
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
