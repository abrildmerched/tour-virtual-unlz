# Sistema de diseño v2 · Recorrido inmersivo UNLZ (Ciencias Sociales)

Fuente de verdad visual del proyecto. Si algo de este archivo contradice a `reference/App.reference.jsx`, manda este archivo. Si contradice al Manual de Identidad Visual de la UNLZ, manda el Manual.

## 1. Tipografías

| Uso | Fuente | Peso | Clase utilitaria |
|---|---|---|---|
| Títulos pesados | Archivo Black | 400 (único peso) | `.f-title` |
| Etiquetas y sobretítulos (condensada) | Archivo Narrow | Bold 700 | `.f-cn` |
| Subtítulos, lectura e interfaz (botones, labels) | Poppins | Regular 400 / Bold 700 | `.f-ui` |
| Íconos | Font Awesome 7 Free | Solid 900 / Regular 400 | `<i class="fa-…">` |

Reglas:
- Archivo Black y Archivo Narrow se importan desde `@fontsource` en `src/index.css`. No se usan fuentes licenciadas, archivos locales en `public/fonts/` ni CDN externos de tipografías. Nunca dejar que caiga a una serif.
- Archivo Black tiene un solo peso: `.f-title` declara `font-weight: 900` y el navegador lo resuelve con ese único archivo. No agregar variantes ni fuentes nuevas.
- Font Awesome **solo** para íconos (flechas, estrellas, marcadores). Nunca para renderizar texto.
- Títulos en mayúsculas, interlineado ajustado (`leading-[0.95]` a `leading-[1.05]` según breakpoint).
- Cero sombras en textos: prohibido `text-shadow`, `drop-shadow` y `filter: drop-shadow`.

## 2. Color

| Token | Valor | Uso |
|---|---|---|
| `--azul` | `#113bb0` | Color de marca (Pantone 2945 C; en el Manual: C94 M75 Y0 K0) |
| `--gris` | `#4d4d4d` | Texto de lectura sobre blanco, hover de la pastilla final |
| `--tinta` | `#1c1d1f` | Texto sobre tarjetas blancas, botón pastilla, bordes finos |
| `--blanco` | `#ffffff` | Texto sobre fondo, tarjetas de detalle |

Nota: el PDF del Manual se ve más saturado que `#113bb0`. Se usa `#113bb0` por indicación del equipo; confirmar el valor exacto con comunicacion@unlz.edu.ar.

Contraste: el azul `#113bb0` **nunca** se usa como color de texto sobre fondo oscuro (no se lee). Sobre blanco sí; sobre foto, el azul va como bloque sólido con texto blanco.

## 3. Presencia del azul (cómo se ve la marca)

Las fotos con overlay negro solas se sienten ajenas a la identidad. El azul entra así, siempre sin romper el contraste:

1. **Velo azul de base:** además del overlay negro, una capa de degradé azul desde abajo.
   ```jsx
   <div className="absolute inset-0 bg-black/60" />
   <div className="absolute inset-0 bg-gradient-to-t from-[#113bb0]/80 via-[#113bb0]/25 to-transparent" />
   ```
2. **Palabra clave resaltada** (recurso del Manual, "COMUNIDAD"): en cada título principal, una palabra va en un bloque blanco con texto `#113bb0`.
   ```jsx
   <span className="bg-white text-[#113bb0] px-3 inline-block">acá</span>
   ```
   Máximo una palabra por título.
3. **Sobretítulo en bloque azul:** la línea `.f-cn` ("El predio", "Sociales", "El aula", "Animarse") va en `bg-[#113bb0] text-white px-3 py-1 inline-block`.
4. **Progreso:** el tramo del paso actual en blanco pleno, los completados en blanco, los pendientes `bg-white/30`; el contador "01 / 05" dentro de un bloque azul, siempre derivado de la cantidad de pasos.
5. **Tarjetas blancas** (mapa, juego de zonas, detalle de carrera, formulario): borde superior `border-t-4 border-[#113bb0]`; sobretítulos de tarjeta en `text-[#113bb0]`.
6. **Menú de carreras:** hover en `bg-[#113bb0] text-white` (antes era tinta), con la estrella invertida a blanco.

La franja lateral azul de 8 px quedó retirada: no se implementa.

## 4. Fondos

Imágenes a pantalla completa, en secuencia, de los espacios reales:
1. Entrada principal del predio
2. Predio / campus
3. Entrada a la Facultad de Ciencias Sociales
4. Aula o biblioteca
5. Cierre (graduación o comunidad)

- Capas apiladas con fundido cruzado (`duration-1000`) y zoom lento (Ken Burns, 18 s, escala 1 → 1.12).
- Overlay obligatorio `bg-black/60` sobre todas las imágenes, más el velo azul del punto 3.
- El juego "Adiviná la zona" vive dentro del paso Sociales y usa el mismo fondo de ese paso: no tiene fondo propio.
- Fotos reales en `public/img/`, 2000 px de ancho, `.webp` o `.jpg` optimizado.
- Con `prefers-reduced-motion` se desactivan zoom y animaciones.

## 5. Componentes

**Botón de navegación** (Iniciar, Continuar, Entrar, Volver): `rounded-none`, fondo transparente, `border-2 border-white`, texto blanco Poppins Bold en mayúsculas con tracking amplio. Hover: invierte (fondo blanco, texto negro). Siempre lleva una flecha Font Awesome; nunca textos conversacionales tipo "seguí caminando".

**Feedback al presionar (mobile):** donde el diseño resuelve con `hover:`, el botón agrega un `active:` equivalente para que el toque se sienta: los ítems del menú de carreras, las opciones de la trivia y los botones de la ficha pasan al color de hover mientras se mantienen apretados, con `active:duration-100` para que la respuesta sea inmediata (el hover de escritorio sigue en 300 ms). Los colores de la variante azul van por clase (`border-[#113bb0] text-[#113bb0]`), nunca por `style` inline: un `color` inline le gana a `hover:text-white` y deja el texto azul sobre fondo azul.

**Botón dentro de tarjeta blanca:** mismo patrón con `border-[#1c1d1f]` / texto tinta; hover invierte a tinta + blanco. Variante de avance: `border-[#113bb0] text-[#113bb0]`, hover relleno azul.

**Menú de carreras (paso de carreras):** grilla de una columna en mobile y dos desde `sm`, `gap-2` / `gap-3`, ítems con `py-3`, fondo blanco, borde fino `border border-[#1c1d1f]`, `rounded-none`. Estrella `fa-regular fa-star` a la izquierda; en hover todo el ítem pasa a azul con texto y estrella blancos. Se muestran las 10 carreras siempre, sin botón "Ver más"; si no entran en pantalla, scrollea el contenedor del recorrido. En mobile la bajada "Seleccioná la carrera que más te interese" queda `sr-only` (visible desde `sm`) para que las 10 carreras entren sin scroll en 375 × 812: la lista se explica sola y el título del paso ya dice dónde estamos. Por debajo de ~740 px de alto el `main` vuelve a scrollear: ese sigue siendo el fallback, no se achican ítems ni tipografía.

**Tarjeta de detalle de carrera:** blanca sólida `#ffffff`, `border-t-4` azul, título `.f-title`, cuerpo Poppins Regular `#4d4d4d`. Aparece al hacer clic, debajo de la lista. Orden fijo del contenido:

1. Nombre de la carrera (`.f-title`) y debajo los `titulos` unidos con `·`. Ambos quedan fijos.
2. Etiqueta "Perfil del egresado" en `.f-cn` azul, y el `resumen` debajo. La etiqueta scrollea con el cuerpo, no queda fija.
3. Etiqueta "¿Sabías que?" en `.f-cn` azul, y la `curiosidad` debajo.
4. Trivia: etiqueta "Trivia" en `.f-cn` azul, la pregunta en Poppins Bold tinta, las opciones como botones de ancho completo (`rounded-none`, borde `#1c1d1f`, hover azul) y, al responder, la `explicacion` debajo.

Cada etiqueta de sección usa `.f-cn` azul y `tracking-widest` (el mismo de los botones), sin íconos: el rótulo azul alcanza para separar los bloques y los tres íconos que tenía antes (`fa-user-graduate`, `fa-lightbulb`, `fa-circle-question`) se retiraron para no sumar ruido decorativo. El sobretítulo del paso conserva `tracking-[0.25em]`. La curiosidad lleva un `border-t` sutil para separarla del resumen.

Todos los títulos de la ficha van alineados a la izquierda: el nombre, la línea de `titulos` y las tres etiquetas de sección. No se centran: la ficha sigue la composición alineada a la izquierda del resto del recorrido.

Con una carrera abierta se oculta el título del paso ("¡Llegaste al aula!") y la línea "Seleccioná la carrera que más te interese": la ficha gana alto y su scroll interno no compite con el encabezado.

Alto máximo `calc(100dvh - 10rem)` en mobile y `calc(100dvh - 17.25rem)` desde `md`: el nombre, los títulos y los botones de acción quedan fijos, y la etiqueta "Perfil del egresado" más el bloque central (resumen + curiosidad + trivia) scrollean internamente (`overflow-y-auto` + `overscroll-contain`). Esos valores dependen del alto del header (108 px / 172 px), del footer (17 px / 25 px) y del `py` del wrapper (`py-4` / `md:py-10`): si cambia cualquiera de los tres, hay que volver a medir. Entra con `fade` (solo opacidad, sin desplazamiento) para no desalinear el `scrollIntoView`.

**Estados de la trivia:** sin responder, las tres opciones son neutras (borde tinta, fondo transparente, hover azul con texto blanco). Después de responder: la correcta queda en azul con texto blanco, la elegida incorrecta queda tachada en gris, las demás bajan a `opacity-60`, y todas quedan `disabled`. La explicación aparece en Poppins Regular `#4d4d4d` con la primera palabra azul ("¡Correcto!" o "Casi."), dentro de un `aria-live="polite"`.

**Tarjeta de zona (juego "Adiviná la zona", dentro del paso Sociales):** no es un paso propio. La intro de Sociales tiene un único botón, "Descubramos la facultad" (botón de navegación, con ícono `fa-arrow-right`), que abre el juego cuando hay 2 o más zonas válidas y, si no las hay, avanza directo al Aula. Al abrirlo, la tarjeta reemplaza al título y al texto de la intro —igual que la ficha de carrera— y usa el mismo marco: blanca sólida `#ffffff`, `border-t-4` azul, `rounded-none`, `p-5 sm:p-6 md:p-8`, ancho `max-w-3xl` y alto máximo `calc(100dvh - 10rem)` en mobile / `calc(100dvh - 17.25rem)` desde `md`.

Con el juego abierto el título grande del paso no se muestra: no hay nada que tape ni puede quedar visible solo la última palabra. La tarjeta es `flex flex-col` con `overflow-hidden`; el contenido central scrollea por dentro (`min-h-0 overflow-y-auto overscroll-contain`) y los botones quedan fijos abajo (`shrink-0`). Al responder nunca se mueve el scroll del `main`: el feedback se busca solo dentro de la tarjeta, respetando `prefers-reduced-motion`.

1. Overline "Ronda 1 de N" en `.f-cn` azul, mayúsculas con `tracking-[0.25em]`, fijo arriba.
2. Foto de la zona **sin overlay ni filtro** (acá la foto es la pregunta): `aspect-[16/10]`, `object-cover`, ancho completo de la tarjeta, `bg-[#1c1d1f]` mientras carga y `alt` tomado de `zona.alt`. Si la imagen falla, el mismo bloque se rellena de `#4d4d4d` con un `fa-regular fa-image` blanco centrado, sin cambiar el alto.
3. Trivia: **el mismo bloque que la ficha de carrera**, renderizado por el helper `bloqueTrivia` de `App.jsx` para que no puedan divergir: etiqueta "Trivia" en `.f-cn` azul con `border-t`, pregunta en Poppins Bold tinta (en zonas la pregunta es la `descripcion` de la zona, que hace de pista) y las opciones como botones de ancho completo con `rounded-none`, borde fino `#1c1d1f` y texto Poppins Bold sin mayúsculas forzadas, sin íconos de círculo, check ni cruz.
4. Estados de respuesta: idénticos a los de la trivia de carrera (ver "Estados de la trivia"). No hay rojo ni verde, ni estilos propios de zonas.
5. Feedback debajo de las opciones, dentro de un `aria-live="polite"` y con el mismo formato que la explicación de la trivia de carrera: párrafo Poppins Regular `#4d4d4d` que arranca con "¡Correcto!" (o "Casi. Era: {nombre}") en Poppins Bold azul, seguido del `zona.dato`. El estado se entiende por el texto, no solo por el color.
6. Botón fijo abajo, alineado a la derecha: "Siguiente zona" / "Ver resultado" (borde y texto `#113bb0`, hover relleno azul), deshabilitado hasta responder. Al responder, el foco pasa a este botón. La tarjeta no tiene botón para salir: solo el "Volver" del header devuelve a la intro de Sociales.

**Resultado final del juego (misma tarjeta):** "Resultado" en `.f-cn` azul, el puntaje `{aciertos} / {total}` en `.f-title` azul grande y un mensaje según el porcentaje (75 % o más, entre 40 % y 75 %, menos de 40 %). Dos botones: "Jugar de nuevo" (borde tinta, `fa-rotate-left`, vuelve a mezclar rondas y opciones) e "Ir al aula" (variante azul, `fa-arrow-right`). "Ir al aula" es la única forma de pasar a Carreras: cierra el juego y avanza el wizard. El "Volver" del header, en cambio, devuelve a la intro de Sociales.

**Botón final del formulario (paso de contacto):** pastilla `rounded-full`, fondo `#1c1d1f`, texto blanco, hover `#4d4d4d`. Precedido por el texto azul "Completar y enviar formulario", todo dentro de tarjeta blanca.

**Logos:** `LOGO-CENTRADO-BLANCO-retina-mobile.webp` arriba a la derecha en todos los pasos (alto 56–64 px). `logo_azu_chicol.fw_.png` solo en el paso 2, sobre un recuadro blanco con `p-3`. No se deforman, recolorean ni se les agregan efectos. Respetar el área de resguardo (3X) y el tamaño mínimo digital (42,5 px). No usar el isotipo sin el texto.

## 6. Layout y movimiento

- Composición asimétrica alineada a la izquierda, con título de un lado y tarjeta blanca del otro (`md:grid-cols-2`). En mobile se apila con el título arriba.
- Contenedor principal `100dvh` (no `h-screen`: en celulares se corta con la barra del navegador).
- Estructura vertical `header` → `main` (único con scroll) → `footer`. El footer es una banda fija sin contenido: un hairline `h-px bg-white/20` con `pb-4` / `md:pb-6`, `aria-hidden="true"`, presente en todos los pasos. No lleva textos ni enlaces.
- Entradas con `rise` escalonado (delay de 0 a ~420 ms). Se vuelve a disparar en cada paso con `key={step}`.
- Foco visible en todos los controles: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white` (o tinta dentro de tarjetas blancas).

## 7. Tono de los textos

Español rioplatense, voseo, directo y cálido: "Seleccioná", "Dejanos tus datos", "¿Entramos?". Sin tecnicismos ni frases largas. Público: ingresantes de 18 años.
