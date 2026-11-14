import React, { useState, useRef, useEffect } from 'react';
import { carreras } from './data/carreras';
import { zonas } from './data/zonas';
import { config } from './data/config';

const BLUE = '#113bb0';
const INK = '#1c1d1f';
const GRAY = '#4d4d4d';

const MAX_RONDAS = 5;
const MAX_OPCIONES = 4;

// Etiquetas del progreso, por id de paso: así mover pasos no corre ninguna.
const STEP_LABELS = {
  bienvenida: 'Bienvenida',
  predio: 'El predio',
  sociales: 'Sociales',
  carreras: 'Carreras',
  contacto: 'Contacto',
};

// Una zona está completa cuando todos sus textos están cargados y ninguno quedó en "COMPLETAR...".
const esValida = (z) =>
  [z.nombre, z.imagen, z.alt, z.descripcion, z.dato].every(
    (c) => typeof c === 'string' && c.trim() && !c.trim().startsWith('COMPLETAR')
  );

const zonasValidas = zonas.filter((z) => z && esValida(z));

// El juego de zonas vive dentro del paso Sociales, igual que las carreras dentro del suyo:
// el wizard vuelve a tener 5 pasos. Con menos de 2 zonas completas el botón del juego no aparece.
const STEPS = ['bienvenida', 'predio', 'sociales', 'carreras', 'contacto'];

// Avisos de contenido duplicado en zonas.js: no rompen el juego, solo ayudan a limpiar el archivo.
const avisarDuplicados = (lista) => {
  const ids = new Set();
  const nombres = new Set();
  lista.forEach((z) => {
    if (!z) return;
    if (ids.has(z.id)) console.warn(`zonas.js: id repetido "${z.id}"`);
    ids.add(z.id);
    const nombre = typeof z.nombre === 'string' ? z.nombre.trim().toLowerCase() : '';
    if (nombre && nombres.has(nombre)) console.warn(`zonas.js: dos zonas con el mismo nombre "${z.nombre}"`);
    if (nombre) nombres.add(nombre);
  });
};
avisarDuplicados(zonas);

const mezclar = (lista) => {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

// Las opciones se calculan una sola vez, al armar las rondas: así no cambian de orden al responder.
// Se guarda el índice de la correcta para que la trivia de zonas use el mismo markup que la de carreras.
const armarRondas = (zonasJugables) => {
  const total = Math.min(zonasJugables.length, MAX_RONDAS);
  return mezclar(zonasJugables)
    .slice(0, total)
    .map((zona) => {
      const distractores = mezclar(zonasJugables.filter((z) => z.id !== zona.id))
        .slice(0, MAX_OPCIONES - 1)
        .map((z) => z.nombre);
      const opciones = mezclar([zona.nombre, ...distractores]);
      return { zona, opciones, correcta: opciones.indexOf(zona.nombre) };
    });
};

// Trivia compartida: la ficha de carrera y el juego de zonas renderizan el mismo bloque,
// con las mismas clases y el mismo feedback, para que no puedan divergir.
const estiloOpcionTrivia = (idx, elegida, correcta) => {
  const base =
    'f-ui text-left text-sm font-semibold rounded-none border px-3 sm:px-4 py-2.5 sm:py-3 transition-colors duration-300 active:duration-100';
  if (elegida === null) {
    return `${base} border-[#1c1d1f] bg-transparent text-[#1c1d1f] hover:bg-[#113bb0] hover:border-[#113bb0] hover:text-white active:bg-[#113bb0] active:border-[#113bb0] active:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113bb0]`;
  }
  if (idx === correcta) {
    return `${base} border-[#113bb0] bg-[#113bb0] text-white`;
  }
  if (idx === elegida) {
    return `${base} border-[#1c1d1f]/40 bg-transparent text-[#4d4d4d] line-through`;
  }
  return `${base} border-[#1c1d1f]/20 bg-transparent text-[#4d4d4d] opacity-60`;
};

const bloqueTrivia = ({ overline, pregunta, opciones, correcta, elegida, onResponder, fallo, detalle }) => (
  <div className="border-t border-[#1c1d1f]/15 pt-4 sm:pt-5">
    <h4 className="f-cn text-xs sm:text-sm uppercase tracking-widest mb-2 text-[#113bb0]">{overline}</h4>
    <p className="f-ui font-bold text-sm sm:text-base mb-3 text-[#1c1d1f]">{pregunta}</p>
    <div className="flex flex-col gap-2">
      {opciones.map((opcion, idx) => (
        <button
          key={`${opcion}-${idx}`}
          type="button"
          onClick={() => onResponder(idx)}
          disabled={elegida !== null}
          aria-pressed={elegida === idx}
          className={estiloOpcionTrivia(idx, elegida, correcta)}
        >
          {opcion}
        </button>
      ))}
    </div>
    <p className="f-ui text-sm mt-3" style={{ color: GRAY }} aria-live="polite">
      {elegida !== null && (
        <>
          <span className="font-bold" style={{ color: BLUE }}>
            {elegida === correcta ? '¡Correcto!' : fallo}
          </span>{' '}
          {detalle}
        </>
      )}
    </p>
  </div>
);

const mensajeResultado = (aciertos, total) => {
  const porcentaje = total > 0 ? aciertos / total : 0;
  if (porcentaje >= 0.75) return '¡Ya te conocés el predio de memoria!';
  if (porcentaje >= 0.4) return '¡Bien! Todavía te quedan rincones por descubrir.';
  return 'No pasa nada: vas a tener tiempo de sobra para recorrerlo.';
};

const NAV_BTN =
  'f-ui font-bold uppercase tracking-widest text-sm rounded-none border-2 border-white bg-transparent text-white ' +
  'px-6 md:px-8 py-3 md:py-4 inline-flex items-center gap-3 md:gap-4 transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const rise = (delay = 0) => ({ animationDelay: `${delay}ms` });

export default function App() {
  const [step, setStep] = useState(0);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [rondas, setRondas] = useState(() => armarRondas(zonasValidas));
  const [ronda, setRonda] = useState(0);
  const [respuestaZona, setRespuestaZona] = useState(null);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [fotoError, setFotoError] = useState(false);
  const [jugandoZonas, setJugandoZonas] = useState(false);
  const mainRef = useRef(null);
  const detailRef = useRef(null);
  const tarjetaZonaRef = useRef(null);
  const scrollJuegoRef = useRef(null);
  const feedbackZonaRef = useRef(null);
  const siguienteZonaRef = useRef(null);

  const current = STEPS[step];
  const rondaActual = rondas[ronda];

  const backgrounds = config.backgrounds.length > 0 ? config.backgrounds : [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000',
    'https://images.unsplash.com/photo-1519452331580-2646c0788647?q=80&w=2000',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000',
    'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2000',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000',
  ];

  // Fondos por id de paso: el juego de zonas usa el mismo fondo que Sociales.
  const fondos = {
    bienvenida: backgrounds[0],
    predio: backgrounds[1],
    sociales: backgrounds[2],
    carreras: backgrounds[3],
    contacto: backgrounds[4],
  };

  // Vuelve el juego al inicio: rondas, opciones, respuestas y aciertos.
  const reiniciarJuego = () => {
    setRondas(armarRondas(zonasValidas));
    setRonda(0);
    setRespuestaZona(null);
    setAciertos(0);
    setTerminado(false);
    setFotoError(false);
  };

  const avanzar = () => {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  // Entrar al juego reinicia las rondas para que cada partida sea distinta.
  const entrarAlJuego = () => {
    reiniciarJuego();
    setJugandoZonas(true);
  };

  // Salir del juego vuelve a la intro de Sociales y deja el juego listo para empezar de cero.
  // Solo lo usa el botón "Volver" del header: la tarjeta no tiene salida propia.
  const salirDelJuego = () => {
    setJugandoZonas(false);
    reiniciarJuego();
  };

  // Único camino desde Sociales: el juego. Si no hay zonas jugables, se avanza directo
  // al Aula para que el recorrido no quede bloqueado.
  const descubrirFacultad = () => {
    if (zonasValidas.length >= 2) {
      entrarAlJuego();
    } else {
      avanzar();
    }
  };

  // Terminar el juego es la única forma de pasar al Aula. Se limpia el juego para que
  // "Volver" desde Carreras muestre la intro de Sociales y no el resultado viejo.
  const irAlAula = () => {
    setJugandoZonas(false);
    reiniciarJuego();
    avanzar();
  };

  const retroceder = () => {
    // Estando en el juego, "Volver" del header vuelve a la intro de Sociales, no al paso anterior.
    if (current === 'sociales' && jugandoZonas) {
      salirDelJuego();
      return;
    }
    // Con una ficha abierta, el primer "Volver" la cierra; solo dentro de Carreras.
    if (current === 'carreras' && selectedCareerId) {
      setSelectedCareerId(null);
      setRespuesta(null);
      return;
    }
    if (step > 0) setStep((s) => s - 1);
  };

  const reiniciar = () => {
    setSelectedCareerId(null);
    setRespuesta(null);
    setJugandoZonas(false);
    reiniciarJuego();
    setStep(0);
  };

  const responderZona = (idx) => {
    if (respuestaZona !== null || !rondaActual) return;
    setRespuestaZona(idx);
    if (idx === rondaActual.correcta) setAciertos((a) => a + 1);
  };

  const siguienteRonda = () => {
    if (!rondaActual) return;
    if (ronda >= rondas.length - 1) {
      setTerminado(true);
      return;
    }
    setRespuestaZona(null);
    setFotoError(false);
    setRonda((r) => r + 1);
  };

  // Al cambiar de paso o entrar/salir del juego, el recorrido vuelve arriba.
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [step, jugandoZonas]);

  const selectedCareer = carreras.find((c) => c.id === selectedCareerId);

  useEffect(() => {
    if (!selectedCareer && mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [selectedCareer]);

  useEffect(() => {
    if (selectedCareer && detailRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      detailRef.current.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }, [selectedCareer]);

  // Cada ronda (y el resultado final) arranca con el scroll interno de la tarjeta arriba.
  useEffect(() => {
    if (scrollJuegoRef.current) scrollJuegoRef.current.scrollTop = 0;
  }, [ronda, jugandoZonas, terminado]);

  // Al responder, el foco pasa al botón de avance y el feedback queda a la vista.
  // El scroll es solo dentro de la tarjeta: nunca se mueve el <main>.
  useEffect(() => {
    if (respuestaZona === null) return;
    if (siguienteZonaRef.current) siguienteZonaRef.current.focus({ preventScroll: true });
    const cont = scrollJuegoRef.current;
    const feedback = feedbackZonaRef.current;
    if (!cont || !feedback) return;
    const contRect = cont.getBoundingClientRect();
    const fbRect = feedback.getBoundingClientRect();
    const fbBottom = fbRect.bottom - contRect.top + cont.scrollTop;
    const visibleBottom = cont.scrollTop + cont.clientHeight;
    if (fbBottom > visibleBottom) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      cont.scrollTo({
        top: fbBottom - cont.clientHeight + 12,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [respuestaZona]);

  // Precarga la foto de la ronda siguiente para que el cambio sea inmediato.
  useEffect(() => {
    if (!jugandoZonas || current !== 'sociales') return;
    const siguiente = rondas[ronda + 1];
    if (siguiente) {
      const img = new Image();
      img.src = siguiente.zona.imagen;
    }
  }, [jugandoZonas, current, ronda, rondas]);

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
      {STEPS.map((id, i) => (
        <div
          key={id}
          aria-hidden="true"
          className={`fixed inset-0 transition-opacity duration-1000 ${i === step ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            key={i === step ? `on-${step}` : `off-${i}`}
            src={fondos[id]}
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
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
        >
          <span className="f-cn text-sm tracking-widest px-2 py-1 bg-[#113bb0] text-white inline-block">
            {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
          </span>
          <div className="flex flex-1 gap-2 max-w-sm md:max-w-md">
            {STEPS.map((id, i) => (
              <div key={id} className="flex-1 h-[3px] bg-white/30">
                <div className={`h-full bg-white transition-all duration-700 ${i <= step ? 'w-full' : 'w-0'}`} />
              </div>
            ))}
          </div>
          <span className="f-ui text-xs font-bold uppercase tracking-widest hidden lg:block text-white/90">
            {STEP_LABELS[current]}
          </span>
        </div>
      </header>

      {/* CONTENIDO */}
      <main ref={mainRef} className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-5 md:px-16">
        <div key={step} className="w-full max-w-6xl mx-auto min-h-full flex items-center py-4 md:py-10">
          <div className="w-full">

          {/* BIENVENIDA */}
          {current === 'bienvenida' && (
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

          {/* PREDIO */}
          {current === 'predio' && (
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

          {/* SOCIALES (intro + juego "Adiviná la zona") */}
          {current === 'sociales' && (
            <div className="w-full max-w-4xl mx-auto">
              {!jugandoZonas && (
                <div className="text-center">
                  <p className="f-cn rise text-sm sm:text-base md:text-xl uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 md:mb-8 inline-block bg-[#113bb0] text-white px-3 py-1" style={rise(0)}>
                    Sociales
                  </p>
                  <h2 className="f-title rise text-4xl sm:text-5xl md:text-8xl uppercase leading-[1.05] sm:leading-[1.0] md:leading-[0.95] mb-4 md:mb-10" style={rise(100)}>
                    Facultad de<br />
                    <span className="bg-white text-[#113bb0] px-2 sm:px-4 py-0.5 inline-block leading-[1.15]">Ciencias Sociales</span>
                  </h2>
                  <p className="f-ui rise font-normal text-base sm:text-lg md:text-xl max-w-xl mb-6 md:mb-10 leading-relaxed mx-auto" style={rise(220)}>
                    Acá vas a encontrar carreras pensadas para transformar la realidad. ¿Entramos?
                  </p>
                  <div className="flex justify-center">
                    <button onClick={descubrirFacultad} className={`${NAV_BTN} rise`} style={rise(340)}>
                      Descubramos la facultad <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              )}

              {jugandoZonas && (
                <div className="w-full flex flex-col items-center">
                  <article
                    ref={tarjetaZonaRef}
                    className="fade flex flex-col bg-white text-[#1c1d1f] p-5 sm:p-6 md:p-8 border-t-4 border-[#113bb0] mx-auto w-full max-w-3xl max-h-[calc(100dvh-10rem)] md:max-h-[calc(100dvh-17.25rem)] overflow-hidden scroll-mt-4"
                  >
                    {!terminado && rondaActual && (
                      <>
                        <div className="shrink-0 mb-3">
                          <h3 className="f-cn text-sm uppercase tracking-[0.25em] text-[#113bb0]">
                            Ronda {ronda + 1} de {rondas.length}
                          </h3>
                        </div>

                        <div
                          ref={scrollJuegoRef}
                          className="min-h-0 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]"
                        >
                          {/* La foto va sin overlay ni filtro: acá hay que verla bien. */}
                          <div className="relative w-full aspect-[16/10] bg-[#1c1d1f] mb-4 overflow-hidden">
                            {fotoError ? (
                              <div
                                className="absolute inset-0 flex items-center justify-center bg-[#4d4d4d] text-white"
                                role="img"
                                aria-label="No se pudo cargar la foto de esta zona"
                              >
                                <i className="fa-regular fa-image text-3xl" aria-hidden="true"></i>
                              </div>
                            ) : (
                              <img
                                key={rondaActual.zona.id}
                                src={rondaActual.zona.imagen}
                                alt={rondaActual.zona.alt}
                                loading="eager"
                                decoding="async"
                                onError={() => setFotoError(true)}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            )}
                          </div>

                          <div ref={feedbackZonaRef}>
                            {bloqueTrivia({
                              overline: 'Trivia',
                              pregunta: rondaActual.zona.descripcion,
                              opciones: rondaActual.opciones,
                              correcta: rondaActual.correcta,
                              elegida: respuestaZona,
                              onResponder: responderZona,
                              fallo: `Casi. Era: ${rondaActual.zona.nombre}`,
                              detalle: rondaActual.zona.dato,
                            })}
                          </div>
                        </div>

                        <div className="flex items-center justify-end shrink-0 pt-3 sm:pt-4">
                          <button
                            ref={siguienteZonaRef}
                            type="button"
                            onClick={siguienteRonda}
                            disabled={respuestaZona === null}
                            className={`f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-[#113bb0] bg-transparent text-[#113bb0] px-3 sm:px-5 py-2 sm:py-3 inline-flex items-center gap-2 sm:gap-3 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113bb0] ${
                              respuestaZona === null
                                ? 'opacity-40 cursor-not-allowed'
                                : 'hover:bg-[#113bb0] hover:text-white active:bg-[#113bb0] active:text-white active:duration-100'
                            }`}
                          >
                            {ronda >= rondas.length - 1 ? 'Ver resultado' : 'Siguiente zona'}
                            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                          </button>
                        </div>
                      </>
                    )}

                    {terminado && (
                      <>
                        <div
                          ref={scrollJuegoRef}
                          className="min-h-0 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]"
                        >
                          <div className="text-center py-2">
                            <h3 className="f-cn text-sm uppercase tracking-[0.25em] mb-3 text-[#113bb0]">Resultado</h3>
                            <p className="f-title text-5xl md:text-6xl mb-4" style={{ color: BLUE }}>
                              {aciertos} / {rondas.length}
                            </p>
                            <p className="f-ui font-normal text-sm md:text-base leading-relaxed" style={{ color: GRAY }}>
                              {mensajeResultado(aciertos, rondas.length)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 shrink-0 pt-3 sm:pt-4">
                          <button
                            type="button"
                            onClick={reiniciarJuego}
                            className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-[#1c1d1f] bg-transparent text-[#1c1d1f] px-4 sm:px-5 py-3 inline-flex items-center justify-center gap-2 sm:gap-3 transition-colors duration-300 hover:bg-[#1c1d1f] hover:text-white active:bg-[#1c1d1f] active:text-white active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1d1f]"
                          >
                            <i className="fa-solid fa-rotate-left" aria-hidden="true"></i> Jugar de nuevo
                          </button>
                          <button
                            type="button"
                            onClick={irAlAula}
                            className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-[#113bb0] bg-transparent text-[#113bb0] px-4 sm:px-5 py-3 inline-flex items-center justify-center gap-2 sm:gap-3 transition-colors duration-300 hover:bg-[#113bb0] hover:text-white active:bg-[#113bb0] active:text-white active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113bb0]"
                          >
                            Ir al aula <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                          </button>
                        </div>
                      </>
                    )}
                  </article>
                </div>
              )}
            </div>
          )}

          {/* CARRERAS */}
          {current === 'carreras' && (
            <div className="flex flex-col gap-3 md:gap-6 w-full max-w-6xl mx-auto">
              {/* Con una carrera abierta no se muestra el encabezado del paso: así la ficha ocupa todo el alto disponible. */}
              {!selectedCareer && (
                <div className="text-center w-full">
                  <p className="f-cn rise text-sm sm:text-base md:text-xl uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2 md:mb-4 inline-block bg-[#113bb0] text-white px-3 py-1" style={rise(0)}>
                    El aula
                  </p>
                  <h2 className="f-title rise text-4xl sm:text-5xl md:text-7xl uppercase leading-[1.05] sm:leading-[1.0] md:leading-[0.95] mb-2 md:mb-3" style={rise(100)}>
                    ¡Llegaste<br />
                    al <span className="bg-white text-[#113bb0] px-2 sm:px-4 py-0.5 inline-block leading-[1.15]">aula</span>!
                  </h2>
                  {/* En mobile la instrucción queda solo para lectores de pantalla:
                      la lista de carreras se explica sola y así la pantalla no scrollea. */}
                  <p className="f-ui rise sr-only sm:not-sr-only font-normal text-base sm:text-lg" style={rise(200)}>
                    Seleccioná la carrera que más te interese.
                  </p>
                </div>
              )}

              {!selectedCareer && (
                <div className="w-full">
                  <div className="rise grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full max-w-3xl mx-auto" style={rise(300)}>
                    {carreras.map((carrera) => (
                      <button
                        key={carrera.id}
                        onClick={() => {
                          setSelectedCareerId(carrera.id);
                          setRespuesta(null);
                        }}
                        className="group w-full flex items-center gap-3 px-4 sm:px-5 py-3 border border-[#1c1d1f] rounded-none text-left transition-colors duration-300 bg-white text-[#1c1d1f] hover:bg-[#113bb0] hover:text-white active:bg-[#113bb0] active:text-white active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <i className="fa-regular fa-star transition-colors duration-300 text-[#1c1d1f] group-hover:text-white group-active:text-white" aria-hidden="true"></i>
                        <span className="f-ui font-bold uppercase text-xs sm:text-sm tracking-wide">{carrera.nombre}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedCareer && (
                <div className="w-full flex flex-col items-center">
                  <article
                    ref={detailRef}
                    key={selectedCareer.id}
                    className="fade flex flex-col bg-white text-[#1c1d1f] p-5 sm:p-6 md:p-8 border-t-4 border-[#113bb0] mx-auto w-full max-w-3xl max-h-[calc(100dvh-10rem)] md:max-h-[calc(100dvh-17.25rem)] overflow-hidden scroll-mt-4"
                  >
                    <div className="shrink-0">
                      <h3 className="f-title text-2xl sm:text-3xl md:text-4xl uppercase leading-tight mb-2 text-left">{selectedCareer.nombre}</h3>
                      <p className="f-ui text-sm mb-4 sm:mb-6 text-[#1c1d1f] text-left">{selectedCareer.titulos.join(' · ')}</p>
                    </div>
                    <div className="f-ui font-normal leading-relaxed mb-4 sm:mb-6 min-h-0 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]" style={{ color: GRAY }}>
                      {/* La etiqueta scrollea con el resumen: solo el nombre, los títulos y los botones quedan fijos. */}
                      <h4 className="f-cn text-xs sm:text-sm uppercase tracking-widest mb-2 text-[#113bb0]">
                        Perfil del egresado
                      </h4>
                      <p className="mb-5 sm:mb-6">{selectedCareer.resumen}</p>

                      <div className="mb-5 sm:mb-6">
                        <h4 className="f-cn text-xs sm:text-sm uppercase tracking-widest mb-2 text-[#113bb0]">
                          ¿Sabías que?
                        </h4>
                        <p>{selectedCareer.curiosidad}</p>
                      </div>

                      {bloqueTrivia({
                        overline: 'Trivia',
                        pregunta: selectedCareer.trivia.pregunta,
                        opciones: selectedCareer.trivia.opciones,
                        correcta: selectedCareer.trivia.correcta,
                        elegida: respuesta,
                        onResponder: setRespuesta,
                        fallo: 'Casi.',
                        detalle: selectedCareer.trivia.explicacion,
                      })}
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 shrink-0">
                      <button
                        onClick={() => {
                          setSelectedCareerId(null);
                          setRespuesta(null);
                        }}
                        className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-[#1c1d1f] bg-transparent text-[#1c1d1f] px-3 sm:px-5 py-2 sm:py-3 inline-flex items-center gap-2 sm:gap-3 transition-colors duration-300 hover:bg-[#1c1d1f] hover:text-white active:bg-[#1c1d1f] active:text-white active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1d1f]"
                      >
                        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i> Ver todas las carreras
                      </button>
                      <button
                        onClick={avanzar}
                        className="f-ui font-bold uppercase tracking-widest text-xs rounded-none border border-[#113bb0] bg-transparent text-[#113bb0] px-3 sm:px-5 py-2 sm:py-3 inline-flex items-center gap-2 sm:gap-3 transition-colors duration-300 hover:bg-[#113bb0] hover:text-white active:bg-[#113bb0] active:text-white active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113bb0]"
                      >
                        Siguiente paso <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                      </button>
                    </div>
                  </article>
                </div>
              )}
            </div>
          )}

          {/* CONTACTO */}
          {current === 'contacto' && (
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
                <span className="f-ui font-bold text-sm mb-2 flex items-center text-[#113bb0]">
                  Completar y enviar formulario
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

      {/* FOOTER */}
      {/* Banda de cierre, sin contenido: le da aire al pie para que la ficha no toque el borde de la pantalla. */}
      <footer aria-hidden="true" className="relative z-10 shrink-0 px-5 pb-4 md:px-16 md:pb-6">
        <div className="h-px w-full bg-white/20" />
      </footer>
    </div>
  );
}
