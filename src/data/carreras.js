// src/data/carreras.js
// Oferta de la Facultad de Ciencias Sociales (UNLZ).
// Cada carrera se trata como una sola oferta con un único perfil de egresado/a que abarca todos sus títulos.
// `titulos` lista los títulos que se muestran en la tarjeta (ej. "Licenciatura · Profesorado").
// Los textos de `perfil` fueron reelaborados en párrafos a partir de los perfiles institucionales,
// con revisión de redacción y sin agregar contenido nuevo. Validar con la Facultad antes de publicar.
// Cada elemento del array `perfil` es un párrafo. El primero se muestra siempre; el resto, al expandir.
 
export const carreras = [
  {
    id: 'ciencias-de-la-educacion',
    nombre: 'Ciencias de la Educación',
    titulos: ['Licenciatura', 'Profesorado'],
    perfil: [
      'El/la egresado/a de Ciencias de la Educación de la Universidad Nacional de Lomas de Zamora, ya sea con el título de Licenciado/a o de Profesor/a, es un/a profesional cuya red conceptual y valorativa se funda en las Ciencias Sociales y en sus trabajos de campo.',
      'Esta formación le permite aportar un marco teórico a las acciones de transformación que se desarrollan en el ámbito educativo, tanto en el sistema escolar como en la comunidad, a través de técnicas específicas de trabajo: estrategias de enseñanza, asesoramiento, administración de proyectos e investigación de la realidad. Asimismo, lo/la habilita para comprometerse con la elaboración de conceptualizaciones acerca de nuestra realidad educativa, nacional y latinoamericana.',
      'Conoce la naturaleza de los procesos humanos y sociales y, por ello, acepta que no siempre verá los resultados de su acción. Confía, en cambio, en que la formación que brinda a sus estudiantes les permitirá sumarse a la tarea.',
    ],
  },
  {
    id: 'comunicacion-social',
    nombre: 'Comunicación Social',
    titulos: ['Licenciatura', 'Profesorado'],
    perfil: [
      'El/la egresado/a de Comunicación Social, ya sea con el título de Licenciado/a o de Profesor/a, es un/a graduado/a universitario/a con sólida formación teórica, metodológica y técnica, que le permite diseñar, implementar y evaluar propuestas en el campo de las comunicaciones, así como analizar su impacto en el contexto político, social, cultural y económico. A partir de ello, está en condiciones de identificar, analizar y evaluar críticamente las problemáticas de las prácticas comunicacionales en los diferentes ámbitos.',
      'Se trata de un/a profesional capacitado/a para dirigir, asesorar, colaborar, organizar y planificar todos los medios de Comunicación Social. Sus conocimientos teóricos e instrumentales le permiten, asimismo, dirigir, asesorar, organizar, planificar y realizar campañas de prensa, publicitarias, comunicativas e informativas de todo orden temático, o colaborar en ellas.',
      'Está en condiciones de investigar, clasificar, archivar y editar todo tipo de mensajes o discursos de medios, personas, grupos e instituciones; de elaborar diagnósticos comunicacionales sobre ellos y de reformarlos o crear otros nuevos.',
      'Cuenta, además, con la capacidad de identificar y comprender las variables, procesos y dinámicas involucrados en la problemática del conocimiento individual y social, con el objeto de contextualizar y orientar propuestas comunicacionales hacia el logro de crecientes niveles de pertinencia, calidad y democratización de la comunicación masiva, en una dinámica de articulación político-instrumental.',
      'Comprende los actuales escenarios económico, social, político y cultural, tanto a nivel nacional como local, lo que le permite orientar adecuadamente la aplicación de desarrollos comunicacionales en los diferentes ámbitos del campo de la Comunicación y contextualizar su producción, adaptación, transferencia e implementación. Posee, asimismo, conocimientos teóricos, metodológicos y técnicos de investigación social y de investigación en el área de la comunicación, con el objeto de aportar nuevos enfoques de carácter político, cultural y comunicacional para la reorientación de los procesos de comunicación masiva involucrados y para la resolución de los problemas que se plantean en organizaciones, instituciones y empresas vinculadas a la comunicación y a su relación con la comunidad.',
      'Conoce los procesos de formulación, diseño e implementación de la política comunicacional y de sus marcos normativos, de modo que puede intervenir operativamente a través del planeamiento comunicacional institucional, de conformidad con las singularidades propias de cada realidad.',
      'Finalmente, posee una actitud abierta, crítica y reflexiva que le posibilita desempeñar su rol en ámbitos públicos y privados, en un contexto de participación e intercambio de formación y experiencias. De este modo, contribuye al logro de crecientes niveles de calidad en el área de la comunicación, al proceso de transformación y, en consecuencia, a la democratización de la sociedad.',
    ],
  },
  {
    id: 'letras',
    nombre: 'Letras',
    titulos: ['Licenciatura', 'Profesorado'],
    perfil: [
      'El/la egresado/a de Letras, ya sea con el título de Licenciado/a o de Profesor/a, será un/a profesional-operador/a de las letras, con capacidad para investigar en las áreas de Teoría y Crítica Literarias, Lingüística y Literatura Latinoamericana y Argentina.',
      'Posee capacidad para efectuar prácticas de análisis y para manejar las corrientes teóricas relacionadas con el fenómeno literario y con la problemática del lenguaje. Cuenta, además, con un conocimiento del más alto nivel científico acerca de la producción, circulación y recepción de la literatura latinoamericana y argentina.',
      'Se caracteriza por su apertura y su disposición crítica frente a las constantes transformaciones del mundo actual, y por su interés en participar en trabajos interdisciplinarios. Mantiene, asimismo, un respeto irrestricto por la libertad de pensamiento y por la libertad de creación estética.',
    ],
  },
  {
    id: 'ninez-adolescencia-y-familia',
    nombre: 'Niñez, Adolescencia y Familia',
    titulos: ['Tecnicatura'],
    perfil: [
      'El/la Técnico/a en Niñez, Adolescencia y Familia de la Universidad Nacional de Lomas de Zamora es un/a graduado/a capaz de analizar las variables sociales, políticas y económicas que intervienen en la problemática de ese campo. Está capacitado/a para desarrollar una adecuada labor técnico-instrumental, basada en las disciplinas que operan como soporte para el abordaje de la temática.',
      'Es capaz de facilitar la adquisición de nuevas pautas estables de conducta que posibiliten a niños, niñas, adolescentes y a sus familias el mejoramiento de sus condiciones de vida. Posee, además, formación metodológica y técnica para desempeñarse eficazmente en la planificación y coordinación de las actividades cotidianas de niños, niñas y adolescentes.',
      'Aplica técnicas de observación a fin de obtener y transmitir lo observado, elemento primordial para la acción, y orienta a niños, niñas, adolescentes y familias en relación con los derechos que los asisten, así como con sus obligaciones.',
      'Su desempeño se sostiene en una actitud de compromiso responsable y solidaria para con los sujetos, las instituciones y la comunidad, a fin de ejercer adecuadamente su rol.',
    ],
  },
  {
    id: 'periodismo',
    nombre: 'Periodismo',
    titulos: ['Tecnicatura', 'Licenciatura'],
    perfil: [
      'El/la egresado/a de Periodismo de la Universidad Nacional de Lomas de Zamora, ya sea con el título de Técnico/a Universitario/a o de Licenciado/a, es un/a graduado/a universitario/a con sólida formación técnica, capacitado/a para intervenir en el área de las comunicaciones y, a partir de ello, proponer, diseñar e implementar propuestas pertinentes en el campo del periodismo.',
      'Posee sólida formación instrumental en el campo de la comunicación social, el periodismo, el manejo de la noticia y la opinión pública. Domina los lenguajes audiovisuales y escritos y conoce en profundidad la metodología de cada medio, lo que le permite producir mensajes escritos, audiovisuales y multimedia.',
      'Es un/a profesional formado/a en las nuevas tecnologías de la comunicación, con capacidad para ejercer el periodismo en todos los soportes digitales. Posee formación para colaborar en la edición, la publicación y la difusión de información en los diversos medios de comunicación, teniendo en cuenta los factores externos que inciden en el producto informativo.',
      'Está capacitado/a, además, para colaborar en la organización y planificación de campañas de información, divulgación y difusión de noticias, y puede desempeñarse en la investigación periodística, la entrevista, la radio, la televisión e internet.',
    ],
  },
  {
    id: 'psicopedagogia',
    nombre: 'Psicopedagogía',
    titulos: ['Licenciatura', 'Profesorado'],
    perfil: [
      'El/la egresado/a de Psicopedagogía, ya sea con el título de Licenciado/a o de Profesor/a, posee conocimientos pedagógicos y psicológicos que le permiten analizar, evaluar y desarrollar procesos educativos, tanto en relación con su fundamentación teórica y epistemológica como en su implementación personal e institucional, en ámbitos educativos, instituciones de salud y organizaciones sociales.',
      'Cuenta con conocimientos de las neurociencias, de la psicología genética y de la pedagogía especial que le permiten responder a las consultas de instituciones o de personas relacionadas con las necesidades educativas especiales, así como implementar acciones que favorezcan su buena integración social.',
      'Posee, además, una sólida formación en distintas áreas del conocimiento (pedagógica, psicológica, sociológica, psicopedagógica, metodológica y de la salud) que le permite tener una visión multidimensional del sujeto en situación de aprendizaje y lo/la habilita para integrar equipos interdisciplinarios de investigación, a fin de abordar las diversas problemáticas propias de su campo de intervención.',
    ],
  },
  {
    id: 'publicidad',
    nombre: 'Publicidad',
    titulos: ['Tecnicatura', 'Licenciatura'],
    perfil: [
      'El/la egresado/a de Publicidad, ya sea con el título de Técnico/a Universitario/a o de Licenciado/a, es un/a profesional que posee conocimientos que le permiten colaborar en diferentes niveles de las organizaciones y aportar elementos teóricos y técnicos en el marco de los objetivos generales de la comunicación institucional.',
      'Comprende los fundamentos psicológicos y sociales en que se basan las relaciones interhumanas, así como las bases científicas de la organización humana, considerando las aspiraciones, motivaciones, sentimientos y demás factores que constituyen la esencia de la persona humana. Ello le permite realizar una tarea de integración óptima.',
      'Está capacitado/a para programar, implementar, evaluar y auditar campañas publicitarias de todo tipo de instituciones, y para asesorar a los poderes públicos en lo referido a la legislación y reglamentación de las actividades del ámbito publicitario y de la comunicación.',
      'Comprende los actuales escenarios económico, social, político y cultural, a nivel nacional y local, con el propósito de orientar adecuadamente la aplicación de procesos de innovación publicitaria.',
      'Posee, finalmente, una actitud abierta, crítica y reflexiva respecto de la convivencia democrática, el respeto por la diversidad, el desarrollo y la justicia social, que converge en la comprensión de la realidad social como una compleja construcción, a partir de la cual considera los procesos comunicacionales.',
    ],
  },
  {
    id: 'relaciones-laborales',
    nombre: 'Relaciones Laborales',
    titulos: ['Tecnicatura', 'Licenciatura'],
    perfil: [
      'El/la egresado/a de Relaciones Laborales, ya sea con el título de Técnico/a Universitario/a o de Licenciado/a, posee capacidad para desempeñarse profesionalmente colaborando en la resolución de situaciones de organización y administración del personal, y asistiendo en los procesos de selección, formación y capacitación, de acuerdo con los propósitos de la organización y dentro de los marcos legales que encuadran las políticas laborales.',
      'Posee formación específica sobre estrategias metodológicas y técnicas apropiadas, que le permite reconocer los medios de comunicación más adecuados para colaborar en propuestas de implementación y cambio en el empleo, según las necesidades comunicativas internas y externas de la organización.',
      'Cuenta con formación técnica para implementar estrategias de intervención que le permiten participar en el diagnóstico de problemas y conflictos, con el fin de optimizar los modos de administración y las relaciones laborales entre el personal, así como las condiciones de trabajo, en todo tipo de organizaciones.',
      'Es capaz, asimismo, de participar en los procedimientos vinculados con la selección de personal, la evaluación de tareas y funciones y sus respectivas remuneraciones, a partir de una formación específica relacionada con los perfiles profesionales y con los programas diseñados para la conformación de equipos de trabajo, de acuerdo con los propósitos y fines de las instituciones.',
    ],
  },
  {
    id: 'relaciones-publicas',
    nombre: 'Relaciones Públicas',
    titulos: ['Tecnicatura', 'Licenciatura'],
    perfil: [
      'El/la egresado/a de Relaciones Públicas de la Universidad Nacional de Lomas de Zamora, ya sea con el título de Técnico/a Universitario/a o de Licenciado/a, es un/a graduado/a universitario/a con sólida formación teórica, metodológica y técnica en el campo de las relaciones comunicacionales, humanas e institucionales, que puede participar en los procesos de construcción de imagen y en la optimización de las relaciones de una organización con sus públicos internos y externos.',
      'Posee capacidad para desempeñarse profesionalmente colaborando en la resolución de situaciones de gestión institucional y asistiendo en el proceso de gestión de la identidad y la imagen de una organización, definiendo estrategias y diseñando políticas de promoción y publicidad.',
      'Conoce los sistemas comunicacionales y de gestión, lo cual le permite colaborar en diferentes niveles de las organizaciones y aportar elementos teóricos y metodológicos en el marco de los objetivos generales de la comunicación institucional.',
      'Posee formación específica sobre estrategias metodológicas y técnicas apropiadas para desempeñarse en el campo de la opinión pública, la imagen, las organizaciones y la cultura corporativa. Esta formación le permite reconocer los medios de comunicación más adecuados para satisfacer las necesidades comunicativas de la organización y sus públicos, incluidas las derivadas de las nuevas tecnologías.',
      'Es capaz de aplicar las técnicas comunicacionales a fin de aumentar el grado de efectividad de las interrelaciones en los distintos ámbitos institucionales. Comprende, además, los actuales escenarios económico, social, político y cultural, a nivel nacional y local, con el propósito de optimizar las comunicaciones internas y externas de todo tipo de instituciones y sus públicos.',
      'Posee formación técnica para diseñar e implementar estrategias de intervención que permitan diagnosticar, analizar y gestionar el complejo comunicacional en distintas organizaciones.',
    ],
  },
  {
    id: 'trabajo-social',
    nombre: 'Trabajo Social',
    titulos: ['Licenciatura'],
    perfil: [
      'El/la Licenciado/a en Trabajo Social es un/a graduado/a universitario/a con sólida formación teórica, metodológica y técnica en las Ciencias Sociales, lo cual le posibilita identificar, analizar y evaluar críticamente las configuraciones, procesos y dinamismos sociales en las dimensiones comunitaria, institucional, familiar, grupal e individual y, consecuentemente, participar en la definición y gestión de las políticas sociales, así como diagnosticar, diseñar, ejecutar y evaluar las modalidades de intervención en cada campo de aplicación.',
      'Posee capacidad para analizar la evolución de la relación entre el Estado y la sociedad y, en ella, la definición, planificación y gestión de las políticas sociales, a los efectos de identificar las variables que inciden en la conformación de los nuevos escenarios. Es capaz, asimismo, de comprender los paradigmas interpretativos de las configuraciones económica, social, política y cultural y sus impactos en las dimensiones del campo social, lo cual le posibilita contextualizar la indagación y la delimitación de las situaciones problemáticas que derivarán en objeto de intervención.',
      'Conoce los procesos de formulación, ejecución y evaluación de las políticas sociales y su operacionalización, con el objeto de participar, desde su rol, tanto en la definición de dichas políticas como en el diseño y la gestión de planes, programas y proyectos sociales.',
      'Posee conocimientos teóricos, metodológicos y técnicos para intervenir, desde su rol profesional, en las etapas de diagnóstico, pronóstico, ejecución, monitoreo y evaluación de situaciones problemáticas en las dimensiones comunitaria, institucional, familiar, grupal e individual. Está capacitado/a, además, para integrar equipos de investigación social con la finalidad de aportar tanto a la evolución disciplinar del Trabajo Social como al abordaje de los diagnósticos situacionales de las diversas problemáticas y, en base a ello, diseñar e implementar estrategias de intervención orientadas al logro de crecientes niveles de resolución de las mismas.',
      'Posee conocimientos jurídicos acerca de los principales aspectos normativos involucrados en las situaciones problemáticas a tratar, con el propósito de ampliar la perspectiva para el abordaje profesional y, en los casos que corresponda, realizar las derivaciones que se consideren pertinentes.',
      'Cuenta con una actitud crítica y reflexiva que le posibilita desempeñar su rol en equipos interdisciplinarios, desde una perspectiva participativa y de concertación política y técnica, con el propósito de aportar a la construcción de un abordaje profesional de carácter integral.',
      'Ha desarrollado, por último, una actitud comprometida y responsable con su campo profesional, que le permite incorporar la dimensión ética en el desempeño de su rol, considerando las tensiones existentes entre los valores y los intereses presentes en cada toma de decisión.',
    ],
  },
];
 