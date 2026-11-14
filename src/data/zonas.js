
// src/data/zonas.js
// VERSIÓN DEMO del juego "Adiviná la zona".
//
// Contenido provisional para poder mostrar el paso funcionando. Las pistas y los datos describen
// únicamente lo que se ve en cada foto (recortes de una foto aérea del predio). Antes de publicar
// de verdad, reemplazar por zonas, fotos y textos reales y validados por la Facultad.
//
// Campos de cada zona:
//   - id:          identificador único, en minúsculas y con guiones
//   - nombre:      nombre de la zona; es también la opción de respuesta (1 a 4 palabras)
//   - imagen:      ruta de la foto dentro de public/ (recomendado: 16:10, .jpg o .webp, menos de 250 KB)
//   - alt:         texto alternativo de la foto, SIN nombrar la zona
//   - descripcion: la pista (1 o 2 oraciones, sin nombrar la zona)
//   - dato:        dato curioso de 1 oración, que se muestra después de responder
//
// Una zona se considera completa si todos sus campos tienen texto y ninguno empieza con "COMPLETAR".
// Con menos de 2 zonas completas, el paso no aparece en el recorrido.
 
export const zonas = [
  {
    id: 'tanque',
    nombre: 'El tanque',
    imagen: '/img/zonas/tanque.jpg',
    alt: 'Fotografía aérea de una torre cilíndrica de color cobre rodeada de árboles',
    descripcion:
      'Una torre de color cobre que se destaca entre los árboles. Tiene unas letras gigantes escritas en vertical.',
    dato: 'Esas letras forman la sigla de la universidad: UNLZ.',
  },
  {
    id: 'canchas',
    nombre: 'Las canchas',
    imagen: '/img/zonas/canchas.jpg',
    alt: 'Fotografía aérea de canchas al aire libre y espacios verdes',
    descripcion:
      'Mucho verde y mucho aire libre: una cancha de piso azul, campos abiertos y árboles alrededor.',
    dato: 'Desde arriba se nota cuánto espacio verde tiene el predio.',
  },
  {
    id: 'edificio-sociales',
    nombre: 'El edificio de Sociales',
    imagen: '/img/zonas/edificio-sociales.jpg',
    alt: 'Fotografía aérea de la terraza de un edificio de paredes gris metálico con una cúpula en el centro',
    descripcion:
      'Desde arriba parece una nave gris: paredes metálicas y una cúpula en el centro del techo.',
    dato: 'En su entrada, sobre la fachada, está escrito el nombre de la Facultad.',
  },
  {
    id: 'edificio-ladrillo',
    nombre: 'El edificio de ladrillo',
    imagen: '/img/zonas/edificio-ladrillo.jpg',
    alt: 'Fotografía aérea de un edificio de paredes de ladrillo rojizo y techo metálico, rodeado de árboles',
    descripcion:
      'Paredes de ladrillo rojizo, ventanales oscuros y un techo metálico. Está rodeado de árboles y pasto.',
    dato: 'Los ladrillos a la vista lo hacen muy distinto de los edificios grises que lo rodean.',
  },
];
 