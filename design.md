# Sistema de diseño v2 · Recorrido inmersivo UNLZ (Ciencias Sociales)

Fuente de verdad visual del proyecto. Si algo de este archivo contradice a `reference/App.reference.jsx`, manda este archivo. Si contradice al Manual de Identidad Visual de la UNLZ, manda el Manual.

## 1. Tipografías

| Uso | Fuente | Peso | Clase utilitaria |
|---|---|---|---|
| Títulos pesados | Zurich Extra Black BT | 900 | `.f-title` |
| Etiquetas y sobretítulos (condensada) | Zurich Cn BT | Bold 700 | `.f-cn` |
| Subtítulos, lectura e interfaz (botones, labels) | Poppins | Regular 400 / Bold 700 | `.f-ui` |
| Íconos | Font Awesome 7 Free | Solid 900 / Regular 400 | `<i class="fa-…">` |

Reglas:
- Zurich es licenciada: los archivos van en `public/fonts/` (`ZurichExtraBlackBT.woff2`, `ZurichCnBT-Bold.woff2`). Mientras falten, el fallback es Archivo Black / Archivo Narrow Bold (`@fontsource`). Nunca dejar que caiga a una serif.
- Font Awesome **solo** para íconos (flechas, estrellas, marcadores). Nunca para renderizar texto.
- Títulos en mayúsculas, interlineado ajustado (`leading-[0.9]` a `leading-[0.95]`).
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
3. **Sobretítulo en bloque azul:** la línea `.f-cn` ("Paso 01 · El predio") va en `bg-[#113bb0] text-white px-3 py-1 inline-block`.
4. **Franja lateral:** barra vertical fija de 8 px, `bg-[#113bb0]`, en el borde izquierdo de la pantalla, a toda la altura.
5. **Progreso:** el tramo del paso actual en blanco pleno, los completados en blanco, los pendientes `bg-white/30`; el contador "01 / 05" dentro de un bloque azul.
6. **Tarjetas blancas** (mapa, detalle de carrera, formulario): borde superior `border-t-4 border-[#113bb0]`; sobretítulos de tarjeta en `text-[#113bb0]`.
7. **Menú de carreras:** hover y ítem seleccionado en `bg-[#113bb0] text-white` (antes era tinta), con la estrella invertida a blanco.

## 4. Fondos

Imágenes a pantalla completa, en secuencia, de los espacios reales:
1. Entrada principal del predio
2. Predio / campus
3. Entrada a la Facultad de Ciencias Sociales
4. Aula o biblioteca
5. Cierre (graduación o comunidad)

- Capas apiladas con fundido cruzado (`duration-1000`) y zoom lento (Ken Burns, 18 s, escala 1 → 1.12).
- Overlay obligatorio `bg-black/60` sobre todas las imágenes, más el velo azul del punto 3.
- Fotos reales en `public/img/`, 2000 px de ancho, `.webp` o `.jpg` optimizado.
- Con `prefers-reduced-motion` se desactivan zoom y animaciones.

## 5. Componentes

**Botón de navegación** (Iniciar, Continuar, Entrar, Volver): `rounded-none`, fondo transparente, `border-2 border-white`, texto blanco Poppins Bold en mayúsculas con tracking amplio. Hover: invierte (fondo blanco, texto negro). Siempre lleva una flecha Font Awesome; nunca textos conversacionales tipo "seguí caminando".

**Botón dentro de tarjeta blanca:** mismo patrón con `border-[#1c1d1f]` / texto tinta; hover invierte a tinta + blanco. Variante de avance: `border-[#113bb0] text-[#113bb0]`, hover relleno azul.

**Menú de carreras (paso 3):** lista vertical, ítems apilados con `-mt-px`, fondo blanco, borde fino `border border-[#1c1d1f]`, `rounded-none`. Estrella `fa-regular fa-star` a la izquierda; en hover/selección todo el ítem pasa a azul con texto y estrella blancos.

**Tarjeta de detalle de carrera:** blanca sólida `#ffffff`, `border-t-4` azul, título `.f-title`, subtítulo "Perfil del graduado" en `.f-cn` azul, cuerpo Poppins Regular `#4d4d4d`. Aparece al hacer clic, al costado de la lista (en mobile, debajo).

**Botón final del formulario (paso 4):** pastilla `rounded-full`, fondo `#1c1d1f`, texto blanco, hover `#4d4d4d`. Precedido por el texto azul "Completar y enviar formulario" + `fa-chevron-down`, todo dentro de tarjeta blanca.

**Logos:** `LOGO-CENTRADO-BLANCO-retina-mobile.webp` arriba a la derecha en todos los pasos (alto 56–64 px). `logo_azu_chicol.fw_.png` solo en el paso 2, sobre un recuadro blanco con `p-3`. No se deforman, recolorean ni se les agregan efectos. Respetar el área de resguardo (3X) y el tamaño mínimo digital (42,5 px). No usar el isotipo sin el texto.

## 6. Layout y movimiento

- Composición asimétrica alineada a la izquierda, con título de un lado y tarjeta blanca del otro (`md:grid-cols-2`). En mobile se apila con el título arriba.
- Contenedor principal `100dvh` (no `h-screen`: en celulares se corta con la barra del navegador).
- Entradas con `rise` escalonado (delay de 0 a ~420 ms). Se vuelve a disparar en cada paso con `key={step}`.
- Foco visible en todos los controles: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white` (o tinta dentro de tarjetas blancas).

## 7. Tono de los textos

Español rioplatense, voseo, directo y cálido: "Seleccioná", "Dejanos tus datos", "¿Entramos?". Sin tecnicismos ni frases largas. Público: ingresantes de 18 años.
