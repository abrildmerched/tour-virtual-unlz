// src/data/carreras.js
// Oferta de la Facultad de Ciencias Sociales (UNLZ).
//
// Versión breve para ingresantes. Cada carrera tiene:
//   - titulos:    títulos que se muestran en la tarjeta (ej. "Licenciatura · Profesorado")
//   - resumen:    qué vas a aprender y en qué podés trabajar (2 oraciones, lenguaje simple)
//   - curiosidad: un dato curioso cultural, corto
//   - trivia:     una pregunta de opción múltiple (pregunta, opciones, correcta = índice, explicacion)
//
// Los resúmenes se basan en los perfiles de egresado/a institucionales, simplificados sin agregar
// contenido nuevo. Validar con la Facultad antes de publicar.
// Los comentarios "fuente" indican de dónde sale cada dato curioso, para poder revisarlos.

export const carreras = [
  {
    id: 'ciencias-de-la-educacion',
    nombre: 'Ciencias de la Educación',
    titulos: ['Licenciatura', 'Profesorado'],
    resumen:
      'Aprendés a pensar cómo se enseña y cómo se aprende. Podés trabajar en escuelas y en la comunidad, diseñando proyectos educativos, asesorando e investigando.',
    // fuente: Abbott Elementary (serie sobre docentes de una escuela pública); Emmys 2022 (Quinta Brunson, guion)
    curiosidad:
      'Abbott Elementary, la serie sobre docentes de una escuela pública, ganó premios Emmy en 2022.',
    trivia: {
      pregunta: '¿Hasta qué nivel es obligatoria la escuela en Argentina?',
      opciones: ['Primaria', 'Secundaria', 'Universidad'],
      correcta: 1,
      explicacion: 'La escuela es obligatoria hasta terminar el secundario. ¡Vos ya lo lograste!',
    },
  },
  {
    id: 'comunicacion-social',
    nombre: 'Comunicación Social',
    titulos: ['Licenciatura', 'Profesorado'],
    resumen:
      'Estudiás cómo se comunican las personas, los medios y las organizaciones. Aprendés a planificar campañas, producir mensajes e investigar cómo impactan en la sociedad.',
    // fuente: Mariana Enriquez, Lic. en Comunicación Social (UNLP) según escritores.org; nominada al International Booker Prize (La Capital MdP)
    curiosidad:
      'Mariana Enriquez, la escritora argentina de terror nominada al International Booker Prize, es Licenciada en Comunicación Social.',
    trivia: {
      pregunta: '¿En qué década se hizo la primera transmisión de radio en Argentina?',
      opciones: ['1920', '1950', '1980'],
      correcta: 0,
      explicacion: 'Fue en 1920, ¡hace más de 100 años!',
    },
  },
  {
    id: 'letras',
    nombre: 'Letras',
    titulos: ['Licenciatura', 'Profesorado'],
    resumen:
      'Estudiás literatura y lenguaje: cómo se escriben, se leen y se interpretan los textos. Te especializás en literatura argentina y latinoamericana, y aprendés a investigarla.',
    // fuente: J. R. R. Tolkien fue profesor de lengua y literatura inglesa en la Universidad de Oxford
    curiosidad:
      'J. R. R. Tolkien, el creador de El Señor de los Anillos, era profesor de lengua y literatura en la Universidad de Oxford.',
    trivia: {
      pregunta: '¿Quién escribió el Martín Fierro?',
      opciones: ['José Hernández', 'Jorge Luis Borges', 'Domingo F. Sarmiento'],
      correcta: 0,
      explicacion: 'José Hernández lo publicó en 1872. Es uno de los grandes clásicos argentinos.',
    },
  },
  {
    id: 'ninez-adolescencia-y-familia',
    nombre: 'Niñez, Adolescencia y Familia',
    titulos: ['Tecnicatura'],
    resumen:
      'Te formás para acompañar a chicos, chicas, adolescentes y a sus familias. Aprendés a observar, a planificar actividades y a orientar sobre sus derechos y obligaciones.',
    // fuente: Mafalda, de Quino, comenzó a publicarse en 1964 (aniversario 60 años en 2024)
    curiosidad:
      'Mafalda, la nena creada por Quino que no para de hacer preguntas, empezó a publicarse en 1964 y sigue siendo un ícono.',
    trivia: {
      pregunta: '¿En qué mes se celebra el Día de las Infancias en Argentina?',
      opciones: ['Abril', 'Agosto', 'Diciembre'],
      correcta: 1,
      explicacion: 'Se celebra el tercer domingo de agosto.',
    },
  },
  {
    id: 'periodismo',
    nombre: 'Periodismo',
    titulos: ['Tecnicatura', 'Licenciatura'],
    resumen:
      'Aprendés a buscar, verificar y contar noticias en radio, TV, medios digitales y redes. Trabajás con la entrevista, la investigación y los lenguajes escrito y audiovisual.',
    // fuente: Clark Kent (Superman) es periodista del Daily Planet; Peter Parker (Spider-Man) es fotógrafo del Daily Bugle
    curiosidad:
      'Clark Kent (Superman) es periodista y Peter Parker (Spider-Man) es fotógrafo de un diario. ¡Hasta los superhéroes trabajan en medios!',
    trivia: {
      pregunta: 'Antes de publicar una noticia, un buen periodista siempre...',
      opciones: [
        'Verifica la información en más de una fuente',
        'Publica lo que dice la primera fuente',
        'Espera a que se haga viral',
      ],
      correcta: 0,
      explicacion: 'Chequear las fuentes es la base del buen periodismo.',
    },
  },
  {
    id: 'psicopedagogia',
    nombre: 'Psicopedagogía',
    titulos: ['Licenciatura', 'Profesorado'],
    resumen:
      'Estudiás cómo aprenden las personas y cómo acompañar a quienes necesitan apoyo para aprender. Trabajás en escuelas, centros de salud y organizaciones sociales, en equipo con otros profesionales.',
    // fuente: Percy Jackson tiene dislexia y TDAH; Rick Riordan lo creó pensando en su hijo (rickriordan.com, Romper)
    curiosidad:
      'Percy Jackson, el héroe de la saga de libros y series, tiene dislexia y TDAH. Su autor, Rick Riordan, lo imaginó para su hijo, que tenía dificultades de aprendizaje.',
    trivia: {
      pregunta: '¿Con qué temas trabaja un/a psicopedagogo/a?',
      opciones: [
        'Con el aprendizaje y sus dificultades',
        'Con la construcción de edificios',
        'Con el cálculo de impuestos',
      ],
      correcta: 0,
      explicacion: 'Acompaña a las personas en su manera de aprender, sobre todo cuando aprender cuesta más.',
    },
  },
  {
    id: 'publicidad',
    nombre: 'Publicidad',
    titulos: ['Tecnicatura', 'Licenciatura'],
    resumen:
      'Aprendés a crear, planificar y evaluar campañas para instituciones y organizaciones. Entendés qué motiva a las personas y cómo comunicar una idea.',
    // fuente: Gustavo Cerati estudió Publicidad (Universidad del Salvador) y no terminó la carrera por Soda Stereo (copyestandar.com)
    curiosidad:
      'Gustavo Cerati, el líder de Soda Stereo, estudió Publicidad antes de dedicarse de lleno a la música.',
    trivia: {
      pregunta: '¿Cómo se llama la frase corta y pegadiza que resume una marca?',
      opciones: ['Eslogan', 'Algoritmo', 'Balance'],
      correcta: 0,
      explicacion: 'El eslogan es la frase que acompaña a una marca o campaña.',
    },
  },
  {
    id: 'relaciones-laborales',
    nombre: 'Relaciones Laborales',
    titulos: ['Tecnicatura', 'Licenciatura'],
    resumen:
      'Aprendés a gestionar el trabajo de las personas en una organización: selección de personal, capacitación, condiciones de trabajo y resolución de conflictos, siempre dentro del marco legal.',
    // fuente: Toby Flenderson, personaje de Recursos Humanos en The Office (Dunder Mifflin)
    curiosidad:
      'En la serie The Office, Toby trabaja en Recursos Humanos, el área que se ocupa de las personas de la empresa. ¡Aunque su jefe no lo soporta!',
    trivia: {
      pregunta: '¿Cuántas horas diarias es, en general, la jornada laboral máxima en Argentina?',
      opciones: ['6 horas', '8 horas', '10 horas'],
      correcta: 1,
      explicacion: 'La jornada máxima habitual es de 8 horas diarias.',
    },
  },
  {
    id: 'relaciones-publicas',
    nombre: 'Relaciones Públicas',
    titulos: ['Tecnicatura', 'Licenciatura'],
    resumen:
      'Trabajás en cómo se ven y se comunican las organizaciones. Construís su imagen, cuidás el vínculo con sus públicos y diseñás estrategias de comunicación y promoción.',
    // fuente: Samantha Jones, personaje de Sex and the City, trabaja en relaciones públicas (Dazed; Wikipedia)
    curiosidad:
      'Samantha Jones, de la serie Sex and the City, trabaja en Relaciones Públicas: arma campañas y eventos para sus clientes.',
    trivia: {
      pregunta: '¿Cómo se llama el evento donde una organización le da información a los periodistas?',
      opciones: ['Conferencia de prensa', 'Maratón', 'Feria de ciencias'],
      correcta: 0,
      explicacion: 'En una conferencia de prensa, la organización comunica algo y responde preguntas de los medios.',
    },
  },
  {
    id: 'trabajo-social',
    nombre: 'Trabajo Social',
    titulos: ['Licenciatura'],
    resumen:
      'Aprendés a analizar los problemas sociales e intervenir para mejorar la vida de personas, familias y comunidades. Participás en el diseño y la gestión de políticas, programas y proyectos sociales.',
    // fuente: Jane Addams, pionera del Trabajo Social, Premio Nobel de la Paz 1931 (Britannica, IFSW)
    curiosidad:
      'Jane Addams, pionera del Trabajo Social, recibió el Premio Nobel de la Paz en 1931.',
    trivia: {
      pregunta: '¿En qué fecha se celebra el Día de los Derechos Humanos?',
      opciones: ['1 de mayo', '10 de diciembre', '25 de diciembre'],
      correcta: 1,
      explicacion: 'El 10 de diciembre de 1948 se aprobó la Declaración Universal de los Derechos Humanos.',
    },
  },
];
