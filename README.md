# Recorrido inmersivo UNLZ · Facultad de Ciencias Sociales

Recorrido inmersivo de 5 pasos para ingresantes de la Facultad de Ciencias Sociales de la Universidad Nacional de Lomas de Zamora. Aplicación web de una sola pantalla con fondos fotográficos a pantalla completa, tipografías institucionales, presencia del azul UNLZ y navegación paso a paso hasta un formulario de Google Forms.

## Características

- **5 pasos**: Bienvenida → Predio + mapa → Entrada a Sociales → Selección de carrera → Contacto/Formulario
- **Vite + React 18 + Tailwind CSS v4**: Build rápido y estilos con utilidades
- **Tipografías institucionales**: Zurich (títulos) con fallback a Archivo Black/Narrow, Poppins (lectura e interfaz)
- **Font Awesome 7 Free**: Solo para íconos
- **Identidad visual UNLZ**: Velo azul, palabra clave resaltada, sobretítulos en bloque azul, franja lateral, progreso azul, tarjetas con borde superior azul
- **Carreras oficiales**: Datos en `src/data/carreras.js` (10 carreras con perfiles oficiales sin modificar)
- **100dvh**: Adaptado a viewport móvil (evita corte con barra del navegador)
- **Accesibilidad**: Foco visible, `alt` en imágenes, `aria-pressed`, `aria-disabled`, `prefers-reduced-motion`
- **Responsive**: Optimizado para 375px y 1440px

## Estructura

```text
/
├─ public/
│  ├─ fonts/      # ZurichExtraBlackBT.woff2, ZurichCnBT-Bold.woff2
│  ├─ img/        # Fondos del recorrido
│  └─ logos/      # Logos institucionales
├─ reference/
│  ├─ App.reference.jsx
│  └─ manual-identidad-visual-unlz.pdf
├─ src/
│  ├─ App.jsx
│  ├─ index.css
│  ├─ main.jsx
│  └─ data/
│     ├─ carreras.js
│     └─ config.js
├─ AGENTS.md
└─ design.md
```

## Configuración

Editar sin tocar `App.jsx`:

- **`src/data/config.js`**: `formUrl` (Google Forms), `mapsUrl`, `mapEmbedUrl`, rutas de logos y array de fondos
- **`src/data/carreras.js`**: Lista oficial de carreras (no reescribir perfiles)

## Desarrollo

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Despliegue en Netlify

1. Subir el repositorio a GitHub
2. En [Netlify](https://app.netlify.com/), conectar el repositorio
3. Configuración de build:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

## TODO pendientes

- [ ] Agregar URL del Google Form en `src/data/config.js` (`formUrl`)
- [ ] Reemplazar fotos placeholders en `public/img/` por fotos reales del predio/edificio/facultad (2000px, optimizadas)
- [ ] Agregar fuentes Zurich reales en `public/fonts/` (`ZurichExtraBlackBT.woff2`, `ZurichCnBT-Bold.woff2`) - hay fallback configurado

## Reglas de diseño

- Sin `text-shadow` ni `drop-shadow`
- Botones de navegación: `rounded-none`, transparentes, borde blanco, hover invertido, con flecha Font Awesome
- Botón final: oscuro `rounded-full`, precedido por "Completar y enviar formulario" en azul
- Overlay `bg-black/60` + velo azul degradado
- Font Awesome solo para íconos
- `#113bb0` no usado como texto sobre fondo oscuro
- Logos sin modificar/recolorear/deformar
