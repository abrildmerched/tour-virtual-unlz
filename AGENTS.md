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
- Vite + React 18 (JavaScript, sin TypeScript)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Font Awesome 7 Free (`@fortawesome/fontawesome-free`; si no hay v7 disponible, usar el CSS oficial por CDN y avisar)
- Poppins vía `@fontsource/poppins` (400 y 700)
- Zurich: archivos locales en `public/fonts/` con `@font-face`; fallback Archivo Black / Archivo Narrow (`@fontsource`)
- Sin librerías de UI, de animación ni de estado. Alcanza con `useState` y CSS.

## Estructura de archivos
```
/
├─ AGENTS.md
├─ design.md
├─ reference/
│  ├─ App.reference.jsx
│  └─ manual-identidad-visual-unlz.pdf
├─ public/
│  ├─ fonts/            (ZurichExtraBlackBT.woff2, ZurichCnBT-Bold.woff2)
│  ├─ img/              (fondos del recorrido)
│  └─ logos/            (LOGO-CENTRADO-BLANCO-retina-mobile.webp, logo_azu_chicol.fw_.png)
└─ src/
   ├─ main.jsx
   ├─ index.css         (Tailwind, @font-face, .f-title/.f-cn/.f-ui, keyframes)
   ├─ App.jsx           (todo el wizard en un solo componente; NO dividir en componentes todavía)
   └─ data/
      ├─ carreras.js    (lista de carreras: se edita sin tocar App.jsx)
      └─ config.js      (URLs: formulario, Google Maps, embed del mapa)
```

## Reglas innegociables
- Cero sombras en textos: nada de `text-shadow` ni `drop-shadow`.
- Botones de navegación: `rounded-none`, fondo transparente, borde blanco, hover invertido. Con flecha Font Awesome.
- Botón final del formulario: oscuro `rounded-full`, precedido por el texto azul "Completar y enviar formulario".
- Overlay `bg-black/60` sobre todos los fondos, más el velo azul de `design.md` §3.
- Font Awesome solo para íconos, nunca para texto.
- No usar el azul `#113bb0` como color de texto sobre fondo oscuro.
- No modificar, recolorear ni deformar los logos.

## Datos que NO se inventan
- **Carreras:** la lista oficial (10 carreras con sus títulos y perfiles) ya viene cargada en `src/data/carreras.js`. No agregar carreras, no reescribir ni resumir los textos de `perfil` y no inventar planes de estudio, duraciones ni salidas laborales. Para sumar o cambiar una carrera se edita solo ese archivo.
- **Perfiles largos:** los perfiles tienen entre 1 y 9 párrafos. En la tarjeta blanca se muestra el primer párrafo y un botón "Ver perfil completo" (cuadrado, con `fa-chevron-down`) que despliega el resto dentro de un contenedor con `max-h` y `overflow-y-auto`. Debajo del título de la tarjeta se muestran los `titulos` (ej. "Licenciatura · Profesorado"). Cada carrera se trata como una sola oferta con un único perfil que abarca todos sus títulos; no hay perfiles separados por título (técnico, licenciado, profesor).
- **Menú con 10 carreras:** la lista vertical usa ítems compactos (`py-3`) dentro de un contenedor con `max-h` y `overflow-y-auto` para que entre en `100dvh` a 375 px y a 1440 px. En mobile, la tarjeta de detalle se muestra debajo de la lista.
- **Google Form:** la URL vive en `config.js` (`formUrl`). El equipo la va a crear. Si está vacía, el botón se muestra con `aria-disabled="true"` y se loguea un `console.warn`. No inventar una URL.
- **Fotos reales:** si faltan en `public/img/`, usar los placeholders del prototipo y dejar un `// TODO: foto real` en `config.js`.

Formato de `carreras.js`:
```js
export const carreras = [
  {
    id: 'periodismo',
    nombre: 'Periodismo',
    titulos: ['Tecnicatura', 'Licenciatura'],
    perfil: ['párrafo 1', 'párrafo 2'], // un string por párrafo
  },
];
```

## Comandos
- `npm install`
- `npm run dev`: desarrollo
- `npm run build`: compila; debe terminar sin errores ni warnings
- `npm run preview`: prueba el build

## Cómo trabajar
- Hacer cambios pequeños y verificables. Después de cada tanda, correr `npm run build`.
- No hacer commits ni push salvo que se pida.
- No agregar dependencias que no estén en la sección Stack sin preguntar.
- Si algo del pedido contradice `design.md` o el Manual, frenar y avisar en lugar de elegir en silencio.
- Textos de interfaz en español rioplatense (voseo). Comentarios del código en español.

## Definición de terminado
- [ ] Los 5 pasos funcionan y se puede volver atrás (incluso desde la tarjeta de detalle).
- [ ] El azul de marca se ve en cada paso (velo, palabra resaltada, sobretítulo, franja, tarjetas).
- [ ] Zurich y Poppins aplicadas según `design.md` §1 (con fallback visible si faltan los archivos Zurich).
- [ ] Se ve bien a 375 px de ancho y a 1440 px. Contenedor en `100dvh`, sin scroll horizontal.
- [ ] Contraste legible sobre todas las fotos; foco visible en todos los controles; `alt` en imágenes.
- [ ] `prefers-reduced-motion` desactiva las animaciones.
- [ ] `carreras.js` y `config.js` se pueden editar sin tocar `App.jsx`.
- [ ] `npm run build` sin errores.
