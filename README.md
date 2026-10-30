# Recorrido inmersivo UNLZ · Facultad de Ciencias Sociales

Recorrido virtual de 5 pasos para ingresantes de la Facultad de Ciencias Sociales de la Universidad Nacional de Lomas de Zamora. Una experiencia de pantalla única, con fondos fotográficos de los espacios reales, tipografías e identidad visual institucionales y navegación paso a paso hasta el formulario de contacto.

**Demo en producción:** [https://tour-virtual-unlz.netlify.app/](https://tour-virtual-unlz.netlify.app/)

## Sobre el proyecto

El recorrido acompaña a los futuros ingresantes por el predio, el edificio de la Facultad y su oferta académica, y termina invitándolos a dejar sus datos en un formulario para recibir información sobre planes de estudio e inscripción.

Está pensado para un público de 18 años, con prioridad en dispositivos móviles, y respeta el Manual de Identidad Visual oficial de la UNLZ.

## Funcionalidades

- **Recorrido en 5 pasos:** Bienvenida → Predio y mapa → Entrada a Sociales → Selección de carrera → Contacto.
- **Mapa interactivo:** Google Maps embebido, con enlace directo para abrirlo en la aplicación.
- **Oferta académica completa:** las 10 carreras de la Facultad, con sus títulos (Licenciatura, Profesorado) y el perfil del egresado/a.
- **Ficha con enganche:** cada carrera muestra el perfil del egresado, un dato cultural bajo "¿Sabías que?" y una trivia de opción múltiple con explicación, pensada para ingresantes.
- **Navegación clara:** botón "Volver", indicador de progreso (01 / 05) y avance paso a paso.
- **Formulario de contacto:** redirección a un Google Forms (nombre, apellido, institución educativa, carrera de interés y email), configurable sin tocar el código.
- **Responsive:** diseño optimizado para móvil y escritorio.

## Stack tecnológico

- [Vite](https://vitejs.dev/): bundler y servidor de desarrollo
- [React 19](https://react.dev/): interfaz
- [Tailwind CSS v4](https://tailwindcss.com/): estilos
- [Font Awesome 7 Free](https://fontawesome.com/): íconos (únicamente)
- [Poppins](https://fonts.google.com/specimen/Poppins): tipografía complementaria (interfaz y textos de lectura)
- [Archivo Black](https://fonts.google.com/specimen/Archivo+Black) y [Archivo Narrow](https://fonts.google.com/specimen/Archivo+Narrow): tipografías de títulos y etiquetas, servidas localmente con `@fontsource`
- [Netlify](https://www.netlify.com/): despliegue

## Estructura del proyecto

```text
/
├─ public/
│  ├─ img/        # Fondos fotográficos del recorrido
│  ├─ logos/      # Logos institucionales UNLZ
│  ├─ _redirects  # Configuración SPA para Netlify
│  └─ favicon.svg
├─ reference/
│  ├─ App.reference.jsx
│  └─ manual-identidad-visual-unlz.pdf
├─ src/
│  ├─ App.jsx           # Componente principal (recorrido por pasos)
│  ├─ index.css         # Estilos globales, tipografías y animaciones
│  ├─ main.jsx          # Punto de entrada
│  └─ data/
│     ├─ carreras.js    # Carreras, títulos, resumen, curiosidad y trivia
│     └─ config.js      # URLs (formulario, mapa), logos y fondos
├─ AGENTS.md
└─ design.md            # Sistema de diseño
```

Para actualizar contenidos sin modificar `App.jsx`:

- `src/data/carreras.js`: carreras, títulos, resumen, curiosidad y trivia.
- `src/data/config.js`: URL del formulario, enlaces de Google Maps, logos y fondos.

## Diseño / UX

- **Experiencia inmersiva:** pantalla completa a `100dvh`, sin scroll de página.
- **Fondos y overlays:** fotografías reales de los espacios, con velo negro y degradé azul institucional (`#113bb0`) para asegurar el contraste y la legibilidad.
- **Tipografía:** Archivo Black y Archivo Narrow para títulos y etiquetas, Poppins para interfaz y lectura, todas servidas con `@fontsource`.
- **Movimiento:** zoom lento (Ken Burns) en los fondos y animaciones de entrada escalonadas.
- **Componentes:** botones de navegación cuadrados, transparentes y con borde blanco que se invierten al pasar el mouse; botón final del formulario oscuro y en forma de pastilla; menú de carreras en lista vertical con ícono de estrella.
- **Sin sombras de texto:** no se usa `text-shadow` ni `drop-shadow`.
- **Accesibilidad:** foco visible, atributos ARIA, textos alternativos y soporte de `prefers-reduced-motion`.

El detalle completo está en [`design.md`](./design.md).

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación / Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/abrildmerched/tour-virtual-unlz.git
cd tour-virtual-unlz

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Vista previa del build
npm run preview
```

### Despliegue

El proyecto se despliega en Netlify:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Redirects:** `public/_redirects` (SPA)
