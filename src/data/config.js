// src/data/config.js
// URLs del recorrido inmersivo UNLZ
// Si faltan fotos en public/img/, usar placeholders del prototipo y dejar // TODO: foto real
// formUrl vacío => el botón queda con aria-disabled="true" y se loguea un console.warn

export const config = {
  formUrl: '', // TODO: agregar URL del Google Form cuando esté lista
  mapsUrl: 'https://maps.app.goo.gl/6PjVvx19rHHq2TaSA',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Universidad+Nacional+de+Lomas+de+Zamora&output=embed',
  logos: {
    whiteCentered: '/logos/LOGO CENTRADO BLANCO - DIGITAL-01.png',
    azulChico: '/logos/LOGO CENTRADO AZUL - DIGITAL-01.png',
  },
  // TODO: foto real - usar las imágenes disponibles en public/img/ como placeholders
  backgrounds: [
    '/img/img1.jpg',
    '/img/img2.jpg',
    '/img/img3.jpg',
    '/img/img4.jpg',
    '/img/img5.jpg',
  ],
};
