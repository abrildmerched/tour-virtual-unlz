# AGENTS.md · Recorrido inmersivo UNLZ (Facultad de Ciencias Sociales)

## Qué es este proyecto
Un recorrido inmersivo de 5 pasos para ingresantes (18 años) de la Facultad de Ciencias Sociales de la Universidad Nacional de Lomas de Zamora. Es una web de una sola pantalla que avanza por pasos con fondos fotográficos a pantalla completa. Termina llevando a un formulario de Google Forms.

Pasos:
0. Bienvenida
1. Predio + mapa interactivo (con enlace a Google Maps)
2. Entrada al edificio de Sociales
3. Selección de carrera (la tarjeta de detalle blanca aparece al hacer clic)
4. Contacto: botón al Google Form

## Archivos de referencia (leer antes de escribir código)
1. `design.md`: sistema de diseño. Es la fuente de verdad visual.
2. `reference/App.reference.jsx`: prototipo aprobado del visual. Replicar su estructura, animaciones y composición, aplicando los cambios de azul de `design.md` §3.
3. `reference/manual-identidad-visual-unlz.pdf`: Manual oficial de marca. Manda sobre cualquier decisión de marca.

## Stack
- Vite 8 + React 19 (JavaScript, sin TypeScript)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Font Awesome 7 Free (`@fortawesome/fontawesome-free`, instalado por npm; se importa en `src/main.jsx`)
- Poppins vía `@fontsource/poppins` (400 y 700)
- Archivo Black y Archivo Narrow vía `@fontsource` para títulos y etiquetas. Son las tipografías definitivas: Zurich no se incorpora.
- Sin librerías de UI, de animación ni de estado. Alcanza con `useState`, `useRef`, `useEffect` y CSS.

Nota de tipografías: las tipografías definitivas son Archivo Black (`.f-title`), Archivo Narrow (`.f-cn`) y Poppins (`.f-ui`), todas vía `@fontsource`. No hay fuentes licenciadas ni `@font-face` propios. No agregar fuentes nuevas.

## Estructura de archivos
```
/
├─ AGENTS.md
├─ design.md
├─ reference/
│  ├─ App.reference.jsx
│  └─ manual-identidad-visual-unlz.pdf
├─ public/
│  ├─ img/              (img1.jpg … img9.jpg; config.js usa img1 a img5)
│  ├─ logos/            (4 PNG "LOGO CENTRADO … - DIGITAL-01.png"; el header usa el blanco)
│  ├─ favicon.svg       (ícono del sitio)
│  ├─ icons.svg         (sprite auxiliar, hoy sin uso)
│  └─ _redirects        (SPA en Netlify)
└─ src/
   ├─ main.jsx
   ├─ index.css         (Tailwind, tipografías, .f-title/.f-cn/.f-ui, keyframes)
   ├─ App.jsx           (todo el wizard en un solo componente; NO dividir en componentes todavía)
   └─ data/
      ├─ carreras.js    (lista de carreras: se edita sin tocar App.jsx)
      └─ config.js      (URLs: formulario, Google Maps, embed del mapa)
```

## Reglas innegociables
- Cero sombras en textos: nada de `text-shadow` ni `drop-shadow`.
- Botones de navegación: `rounded-none`, fondo transparente, borde blanco, hover invertido. Con flecha Font Awesome.
- Botón final del formulario: oscuro `rounded-full`, precedido por el texto azul "Completar y enviar formulario".
- Overlay `bg-black/60` sobre todos los fondos, más el velo azul de `design.md` §3. La franja lateral azul de `design.md` §3.4 está retirada: no se implementa.
- Font Awesome solo para íconos, nunca para texto.
- No usar el azul `#113bb0` como color de texto sobre fondo oscuro.
- No modificar, recolorear ni deformar los logos.
- Tarjeta de detalle de carrera: alto máximo atado al viewport. Nombre, títulos y los botones de acción no se mueven; solo el contenido central (etiqueta "Perfil del egresado", resumen, curiosidad y trivia) scrollea. No volver a la tarjeta de alto libre, que hacía que cada carrera cayera en una posición distinta.

## Datos que NO se inventan
- **Carreras:** la lista oficial (10 carreras) ya viene cargada en `src/data/carreras.js`. No agregar carreras, no reescribir ni resumir los textos de `resumen`, `curiosidad` y `trivia`, y no inventar planes de estudio, duraciones ni salidas laborales. Para sumar o cambiar una carrera se edita solo ese archivo.
- **Contenido de la tarjeta:** cada carrera tiene `resumen` (2 oraciones, lenguaje simple), `curiosidad` (dato cultural corto) y `trivia` (`pregunta`, `opciones`, `correcta` = índice, `explicacion`). La tarjeta muestra, en este orden y siempre: el `resumen` bajo "Perfil del egresado", la `curiosidad` bajo "¿Sabías que?" y la `trivia` al final. Debajo del nombre se muestran los `titulos` (ej. "Licenciatura · Profesorado"). Cada carrera se trata como una sola oferta: no hay perfiles separados por título. Los datos curiosos y las trivias hay que validarlos con la Facultad antes de publicar.
- **Trivia:** una sola respuesta por carrera y sin reintento. Al responder, la opción correcta se marca en azul, la elegida mal queda tachada, las demás se atenúan, y aparece la `explicacion`. La respuesta se resetea al cambiar de carrera o al cerrar la tarjeta. Es un recurso de enganche para ingresantes, no una evaluación: no se guarda ni se envía.
- **Menú con 10 carreras:** se muestran siempre las 10, sin botón "Ver más": una columna en mobile y dos desde `sm`. Los ítems mantienen `py-3` y `gap-2`; si no entran en pantalla, scrollea el `main` del recorrido (no hay contenedor con scroll propio). No amontonar ítems ni achicar la tipografía para que entren. En mobile, la tarjeta de detalle se muestra debajo de la lista.
- **Google Form:** la URL ya está cargada en `config.js` (`formUrl`). Si se vacía, el botón queda con `aria-disabled="true"`, no navega y se loguea un `console.warn`. No inventar otra URL.
- **Fotos reales:** hay 9 fotos en `public/img/` y `config.js` usa `img1` a `img5`. Para cambiar una foto se edita solo `config.js`. Si falta una imagen, usar un placeholder y dejar un `// TODO: foto real`.

Formato de `carreras.js`:
```js
export const carreras = [
  {
    id: 'periodismo',
    nombre: 'Periodismo',
    titulos: ['Licenciatura', 'Profesorado'],
    resumen: 'Dos oraciones sobre qué se estudia y dónde se puede trabajar.',
    curiosidad: 'Un dato cultural corto, con el comentario // fuente arriba.',
    trivia: {
      pregunta: '¿...?',
      opciones: ['opción A', 'opción B', 'opción C'],
      correcta: 0, // índice de la opción correcta
      explicacion: 'Cierre breve que explica la respuesta.',
    },
  },
];
```

## Comandos
- `npm install`
- `npm run dev`: desarrollo
- `npm run build`: compila; debe terminar sin errores ni warnings
- `npm run lint`: oxlint
- `npm run preview`: prueba el build

## Cómo trabajar
- Hacer cambios pequeños y verificables. Después de cada tanda, correr `npm run build`.
- No hacer commits ni push salvo que se pida.
- No agregar dependencias que no estén en la sección Stack sin preguntar.
- Si algo del pedido contradice `design.md` o el Manual, frenar y avisar en lugar de elegir en silencio.
- Textos de interfaz en español rioplatense (voseo). Comentarios del código en español.

## Definición de terminado
- [ ] Los 5 pasos funcionan y se puede volver atrás (incluso desde la tarjeta de detalle).
- [ ] El azul de marca se ve en cada paso (velo, palabra resaltada, sobretítulo, contador, tarjetas).
- [ ] Archivo Black y Poppins aplicadas según `design.md` §1 (sin fuentes nuevas).
- [ ] Se ve bien a 375 px de ancho y a 1440 px. Contenedor en `100dvh`, sin scroll horizontal.
- [ ] Contraste legible sobre todas las fotos; foco visible en todos los controles; `alt` en imágenes.
- [ ] `prefers-reduced-motion` desactiva las animaciones.
- [ ] `carreras.js` y `config.js` se pueden editar sin tocar `App.jsx`.
- [ ] `npm run build` sin errores.
