/* Contenido compartido de la web SECABA (ES/EN). Cada diseño lo pinta a su manera. */
(function () {
  var people = {
    research: [
      { n: "José Manuel Castro Jiménez", i: "Universidad de Jaén", f: { es: "Estratigrafía, biomarcadores, isótopos estables, eventos anóxicos e hipertermales", en: "Stratigraphy, biomarkers, stable isotopes, anoxic and hyperthermal events" }, o: "0000-0001-7710-9600" },
      { n: "Ginés A. de Gea Guillén", i: "Universidad de Jaén", f: { es: "Bioestratigrafía y ecoestratigrafía de foraminíferos y nanofósiles, estratigrafía isotópica", en: "Foraminifera and nannofossil bio- and ecostratigraphy, isotope stratigraphy" }, o: "0000-0001-7763-6443" },
      { n: "María Luisa Quijano López", i: "Universidad de Jaén", f: { es: "Biomarcadores, geoquímica elemental", en: "Biomarkers, elemental geochemistry" }, o: "0000-0002-7740-2708" },
      { n: "Pedro A. Ruiz Ortiz", i: "Universidad de Jaén", f: { es: "Estratigrafía, sedimentología, análisis de cuencas", en: "Stratigraphy, sedimentology, basin analysis" }, o: "0000-0003-0477-3978" },
      { n: "Cristina Sequero López", i: "Universidad Complutense de Madrid", f: { es: "Sedimentología, isótopos estables, biomarcadores", en: "Sedimentology, stable isotopes, biomarkers" }, o: "0000-0003-2449-5303" },
      { n: "Luis O’Dogherty Luy", i: "Universidad de Cádiz", f: { es: "Bioestratigrafía y ecoestratigrafía de radiolarios", en: "Radiolarian bio- and ecostratigraphy" }, o: "0000-0001-7229-2370" }
    ],
    work: [
      { n: "Richard D. Pancost", i: "University of Bristol", f: { es: "Biomarcadores", en: "Biomarkers" }, o: "0000-0003-0298-4026" },
      { n: "B. David A. Naafs", i: "University of Bristol", f: { es: "Biomarcadores, paleotemperaturas", en: "Biomarkers, palaeotemperatures" }, o: "0000-0001-5125-6928" },
      { n: "Claudia Sosa Montes de Oca", i: "University of Bristol", f: { es: "Biomarcadores", en: "Biomarkers" }, o: "0000-0003-4451-6458" },
      { n: "Lawrence Percival", i: "Vrije Universiteit Brussel", f: { es: "Geoquímica sedimentaria, mercurio", en: "Sedimentary geochemistry, mercury" }, o: "0000-0002-9377-1589" },
      { n: "Rafael Martínez-Rodríguez", i: "Universidad Complutense de Madrid", f: { es: "Astrocronología", en: "Astrochronology" }, o: "0000-0002-7249-4172" },
      { n: "Sandro Froehner", i: "Universidade Federal do Paraná", f: { es: "Biomarcadores", en: "Biomarkers" }, o: "0000-0003-1249-7512" },
      { n: "Josep A. Moreno-Bedmar", i: "UNAM, México", f: { es: "Ammonites", en: "Ammonites" }, o: "0000-0001-8426-2750" },
      { n: "Miguel Company Sempere", i: "Universidad de Granada", f: { es: "Ammonites", en: "Ammonites" }, o: "0000-0002-4944-8928" }
    ],
    collab: [
      { n: "Sietske Batenburg", i: "Universitat de Barcelona", f: { es: "Astrocronología", en: "Astrochronology" }, o: "0000-0002-4076-1248" },
      { n: "Marta Rodrigo Gámiz", i: "Universidad de Granada", f: { es: "Biomarcadores", en: "Biomarkers" }, o: "0000-0003-4111-0620" },
      { n: "Mathieu Martinez", i: "Université de Rennes", f: { es: "Astrocronología", en: "Astrochronology" }, o: "0000-0003-0741-2940" },
      { n: "Vicente López Sánchez-Vizcaíno", i: "Universidad de Jaén", f: { es: "Mineralogía", en: "Mineralogy" }, o: "0000-0003-0762-3692" },
      { n: "Helmut Weissert", i: "ETH Zürich", f: { es: "Paleoceanografía, paleoclima", en: "Palaeoceanography, palaeoclimate" } },
      { n: "Ian Jarvis", i: "Kingston University London", f: { es: "Estratigrafía isotópica", en: "Isotope stratigraphy" }, o: "0000-0003-3184-3097" },
      { n: "David Selby", i: "Durham University", f: { es: "Isótopos de osmio", en: "Osmium isotopes" } }
    ]
  };

  // x, y: posición aproximada sobre un esquema de la península (0–100)
  var sites = [
    { id: "cau", n: "Cau", img: null, x: 80, y: 62, tag: ["OAE 1a"], kind: { es: "Testigo de sondeo · Alicante", en: "Drill core · Alicante" }, d: { es: "Sondeo de 2015 con más de 150 m de testigo continuo de todo el Aptiense, duplicado en el intervalo del OAE 1a. Sección de referencia con estratigrafía isotópica y astrocronología publicadas.", en: "2015 borehole with more than 150 m of continuous core spanning the whole Aptian, duplicated across OAE 1a. A reference section with published isotope stratigraphy and astrochronology." } },
    { id: "carbonero", n: "Carbonero", img: null, exImg: "sec-carbonero.jpg", x: 52, y: 74, tag: ["OAE 1a"], kind: { es: "Sección · Subbético, Jaén", en: "Section · Subbetic, Jaén" }, d: { es: "Sucesión expandida del OAE 1a con afloramiento excepcional y niveles vulcanoclásticos intercalados. Se estudiará a muy alta resolución.", en: "Expanded OAE 1a succession with exceptional outcrop and interbedded volcaniclastic layers. To be studied at very high resolution." } },
    { id: "frontera", n: "La Frontera", img: null, exImg: "sec-frontera.jpg", x: 66, y: 72, tag: ["Taxy", "OAE 1a"], kind: { es: "Sección · Subbético", en: "Section · Subbetic" }, d: { es: "Registro del Episodio Taxy y del OAE 1a, con biomarcadores y nanofósiles ya estudiados.", en: "Records the Taxy Episode and OAE 1a, with biomarkers and nannofossils already studied." } },
    { id: "cavila", n: "Barranco de Cavila", img: null, exImg: "sec-cavila.jpg", x: 68, y: 68, tag: ["IFeNE", "Taxy"], kind: { es: "Sección · Subbético", en: "Section · Subbetic" }, d: { es: "Donde el equipo identificó la IFeNE y caracterizó la ISNE con curvas de δ13C y δ18O de alta resolución.", en: "Where the team identified the IFeNE and characterised the ISNE with high-resolution δ13C and δ18O curves." } },
    { id: "cortijo", n: "Cortijo del Hielo", img: null, exImg: "sec-cortijo.jpg", x: 60, y: 76, tag: ["Taxy"], kind: { es: "Sección · Subbético", en: "Section · Subbetic" }, d: { es: "Isótopos de C de baja resolución y bioestratigrafía precisa indican el Episodio Taxy.", en: "Low-resolution C isotopes and precise biostratigraphy point to the Taxy Episode." } },
    { id: "argos", n: "Río Argos-6", img: null, exImg: "sec-argos.jpg", x: 67, y: 64, tag: ["IFeNE"], kind: { es: "Sección · Subbético", en: "Section · Subbetic" }, d: { es: "Resultados preliminares indican la IFeNE, que sería así una perturbación al menos regional.", en: "Preliminary results point to the IFeNE, making it at least a regional perturbation." } },
    { id: "alcoraia", n: "L’Alcoraia", img: null, x: 82, y: 66, tag: ["IFeNE?", "Taxy"], kind: { es: "Sección · Prebético, Alicante", en: "Section · Prebetic, Alicante" }, d: { es: "Plataforma prebética donde probablemente se registran la IFeNE y el Taxy.", en: "Prebetic platform that probably records the IFeNE and Taxy." } },
    { id: "seguili", n: "Seguilí", img: null, x: 79, y: 60, tag: [], kind: { es: "Sección · Alicante", en: "Section · Alicante" }, d: { es: "Campaña de campo larga prevista para su muestreo.", en: "A long field campaign is planned to sample it." } },
    { id: "pui", n: "El Pui", img: null, x: 80, y: 18, tag: ["Taxy?", "OAE 1a"], kind: { es: "Sección · Lleida", en: "Section · Lleida" }, d: { es: "Sección expandida del Pirineo; campaña de campo larga prevista.", en: "Expanded Pyrenean section; a long field campaign is planned." } }
  ];

  // Cronograma: trimestres 1–12
  var plan = [
    { k: "campo", s: 1, e: 4, es: "Campo, muestreo y testigo de Cau", en: "Fieldwork, sampling and Cau core" },
    { k: "tiempo", s: 3, e: 8, es: "Modelo temporal: fósiles e isótopos de C y O", en: "Age model: fossils and C–O isotopes" },
    { k: "astro", s: 3, e: 8, es: "Astrocronología", en: "Astrochronology" },
    { k: "amb", s: 2, e: 8, es: "Paleoclima y paleoambiente", en: "Palaeoclimate and palaeoenvironment" },
    { k: "bio", s: 3, e: 8, es: "Comunidades bióticas", en: "Biotic communities" },
    { k: "volc", s: 4, e: 8, es: "Vulcanismo y meteorización: Hg, Os, Li", en: "Volcanism and weathering: Hg, Os, Li" },
    { k: "int", s: 3, e: 12, es: "Interpretación y síntesis", en: "Interpretation and synthesis" },
    { k: "pub", s: 5, e: 12, es: "Congresos, artículos y divulgación", en: "Conferences, papers and outreach" }
  ];
  var milestones = [
    { h: "H1", t: 4, es: "Primeras comunicaciones a congresos", en: "First conference presentations" },
    { h: "H2", t: 5, es: "Fin del muestreo", en: "Sampling completed" },
    { h: "H3", t: 8, es: "Primeros artículos enviados", en: "First papers submitted" },
    { h: "H4", t: 8, es: "Arranca la divulgación", en: "Outreach begins" },
    { h: "H5", t: 9, es: "Isótopos de C y O integrados", en: "C–O isotopes integrated" }
  ];

  var record = [
    { y: 1999, es: "Bioeventos del Aptiense en Cau", en: "Aptian bioevents at Cau" },
    { y: 2003, es: "Primera curva isotópica del OAE 1a en Cau", en: "First OAE 1a isotope curve at Cau" },
    { y: 2008, es: "Registro sedimentario del OAE 1a en Carbonero", en: "OAE 1a sedimentary record at Carbonero" },
    { y: 2012, es: "Primeros biomarcadores del OAE 1a (con Bristol)", en: "First OAE 1a biomarkers (with Bristol)" },
    { y: 2015, es: "Sondeo de Cau: más de 150 m de testigo", en: "Cau drilling: over 150 m of core" },
    { y: 2016, es: "Primera estimación cuantitativa del CO₂ durante el OAE 1a (Nature Geoscience)", en: "First quantitative CO₂ estimate for OAE 1a (Nature Geoscience)" },
    { y: 2019, es: "Biomarcadores, elementos traza e isótopos integrados en Carbonero", en: "Integrated biomarkers, trace elements and isotopes at Carbonero" },
    { y: 2020, es: "Modelo del ciclo del carbono: fuente metanogénica y volcánica", en: "Carbon-cycle model: methanogenic and volcanic sources" },
    { y: 2021, es: "Estratigrafía isotópica de referencia y osmio en Cau", en: "Reference isotope stratigraphy and osmium at Cau" },
    { y: 2022, es: "Siete especies nuevas de nanofósiles e identificación de la IFeNE", en: "Seven new nannofossil species and the IFeNE identified" },
    { y: 2024, es: "Astrocronología del sondeo de Cau", en: "Astrochronology of the Cau core" }
  ];

  var T = {
    es: {
      langName: "Español", other: "EN", otherLabel: "Read in English",
      nav: { intro: "Proyecto", episodes: "Episodios", goals: "Objetivos", methods: "Métodos", sites: "Lugares", plan: "Cronograma", team: "Equipo", news: "Noticias", data: "Datos abiertos", contact: "Contacto" },
      acronym: "SECABA",
      title: "Sucesión de episodios de cambio ambiental acelerado en el Barremiense superior y Aptiense inferior",
      subtitle: "Registro geoquímico, impacto biótico y factores de control",
      claim: "El clima del pasado como espejo del presente",
      lead: "Hace entre 122 y 118 millones de años, la Tierra encadenó varios episodios de calentamiento brusco que culminaron con el Evento Anóxico Oceánico 1a. Estudiamos cómo se sucedieron, qué los provocó y cómo respondió la vida marina, para entender mejor el cambio climático actual.",
      ref: "Proyecto PID2023-151264NB-I00",
      funder: "Proyectos de Generación de Conocimiento 2023 · Ministerio de Ciencia, Innovación y Universidades",
      host: "Universidad de Jaén · CEACTEMA",
      duration: "3 años",
      facts: [
        { v: "1000 → 2200", u: "ppm CO₂", d: "El CO₂ atmosférico se duplicó durante el OAE 1a (Naafs et al., 2016)" },
        { v: "+4–8", u: "°C", d: "Calentamiento estimado de la superficie del mar" },
        { v: "230 000", u: "años", d: "Duración del inicio del OAE 1a, con una primera fase de menos de 10 000 años" },
        { v: "150", u: "m", d: "Testigo de sondeo continuo de Cau, disponible en la Universidad de Jaén" }
      ],
      whyT: "Por qué estudiarlo",
      why: [
        "El clima de la Tierra ha oscilado entre periodos cálidos (greenhouse) y fríos (icehouse). Hoy vivimos un periodo frío al que la actividad humana está añadiendo CO₂ a un ritmo sin precedentes. Los modelos climáticos tienen incertidumbre, y el registro geológico guarda episodios del pasado que sirven como análogos.",
        "No todas las perturbaciones del ciclo del carbono acabaron en anoxia oceánica. Todos los eventos anóxicos (OAEs) son episodios de cambio ambiental, pero no todos los episodios de cambio ambiental (EECs) se convirtieron en OAEs. SECABA estudia esa sucesión."
      ],
      hypT: "Hipótesis",
      hyp: "Estos episodios forman un proceso general del Sistema Tierra en condiciones de invernadero extremo. Están formados por eventos cortos, unos ligados a pulsos volcánicos y otros a emisiones de metano, posiblemente modulados por ciclos orbitales.",
      novT: "Qué aporta de nuevo",
      nov: "Por primera vez se estudia el OAE 1a como una sucesión de eventos singulares, a ultra alta resolución en el pico negativo de δ13C elegido como base del Aptiense.",
      episodesT: "Tres episodios encadenados",
      episodes: [
        { k: "IFeNE", n: "Excursión Intra-Feraudianus", age: "Barremiense superior", d: "Excursión isotópica negativa bautizada por el propio equipo en 2022. Hallada en Barranco de Cavila y probablemente en Río Argos-6 y L’Alcoraia. ¿Es la fase inicial del Taxy o un episodio distinto?" },
        { k: "Taxy", n: "Episodio Taxy (ISNE)", age: "≈ 124,3–121,4 Ma", d: "Perturbación del carbono con niveles de black shales en torno al límite Barremiense/Aptiense. ¿Volcanismo temprano de Ontong Java o ciclos orbitales de gran excentricidad?" },
        { k: "OAE 1a", n: "Episodio Selli", age: "≈ 120 Ma · Aptiense inferior", d: "Uno de los mayores eventos anóxicos del Mesozoico: entrada masiva de carbono ligero, calentamiento, crisis de los nannocónidos y anoxia generalizada en los fondos marinos." }
      ],
      goalsT: "Cuatro grandes preguntas",
      goals: [
        { c: "OG1", q: "¿Cuánto duraron los cambios y a qué ritmo ocurrieron?", d: "Modelos temporales de alta resolución y correlación con otros registros del mundo." },
        { c: "OG2", q: "¿Qué cambió en el ambiente y cómo afectó a la vida?", d: "Temperatura, oxígeno, aportes terrígenos y productividad, y su efecto sobre ammonites, nanofósiles, foraminíferos y productores primarios." },
        { c: "OG3", q: "¿Qué los provocó?", d: "El papel del vulcanismo, las emisiones de metano y la meteorización en cada episodio." },
        { c: "OG4", q: "¿Hay un patrón común?", d: "Un modelo general del ciclo del carbono que relacione los episodios entre sí." }
      ],
      synth: "Y la pregunta de síntesis: ¿puede lo que aprendamos de estos episodios ayudar a entender cómo responderá el sistema climático actual al aumento del CO₂?",
      methodsT: "Cómo lo estudiamos",
      methods: [
        { k: "Fósiles", d: "Nanofósiles calcáreos, foraminíferos planctónicos, radiolarios y ammonites para datar y medir el impacto biótico." },
        { k: "δ13C · δ18O", d: "Isótopos estables de carbono y oxígeno sobre roca total y foraminíferos." },
        { k: "Biomarcadores", d: "Moléculas orgánicas fósiles analizadas por GC-MS: productividad, oxigenación y temperatura." },
        { k: "Hg · Os · Li", d: "Huellas químicas del vulcanismo y de la meteorización continental." },
        { k: "Astrocronología", d: "Ciclos orbitales registrados en las rocas para medir el tiempo en miles de años." },
        { k: "Elementos y TOC", d: "Elementos mayores y traza (µFRX, ICP-MS) y carbono orgánico total." },
        { k: "Mineralogía", d: "Arcillas y niveles volcánicos de Carbonero por difracción de rayos X." }
      ],
      sitesT: "Dónde trabajamos",
      sitesNote: "Posiciones aproximadas sobre un esquema.",
      planT: "Cronograma",
      planUnit: "T", years: ["Año 1", "Año 2", "Año 3"],
      milestonesT: "Hitos",
      recordT: "25 años de trabajo previo",
      teamT: "Equipo",
      teamGroups: { research: "Equipo de investigación", work: "Equipo de trabajo", collab: "Colaboradores" },
      newsT: "Noticias y divulgación",
      newsEmpty: "Aquí publicaremos avances, artículos y actividades.",
      outreach: [
        { k: "Semana de la Ciencia", d: "Fósiles e isótopos como indicadores del clima." },
        { k: "Café con Ciencia", d: "Cómo se estiman las paleotemperaturas y el CO₂ del pasado." },
        { k: "Noche de los Investigadores", d: "Talleres sobre el ciclo del carbono." },
        { k: "11F · Mujer y Niña en la Ciencia", d: "Las científicas del equipo cuentan su trabajo." },
        { k: "Talleres inclusivos", d: "Divulgación adaptada a públicos diversos." }
      ],
      dataT: "Ciencia abierta",
      data: "Datos FAIR con DOI en el repositorio RUJA, datos geoquímicos en EarthChem, conjuntos asociados a artículos en PANGAEA y muestras registradas en SESAR. Publicaciones en acceso abierto.",
      dataLink: "Plan de gestión de datos en RUJA",
      contactT: "Contacto",
      contactRole: "Contacto del proyecto",
      contactPlace: "Departamento de Geología · CEACTEMA · Universidad de Jaén · Campus Las Lagunillas, 23071 Jaén",
      copy: "Copiar", copied: "Copiado",
      fundingLine: "Proyecto PID2023-151264NB-I00 financiado por MICIU/AEI/10.13039/501100011033 [revisar fórmula exacta de la resolución].",
      datesTodo: "Fechas de inicio y fin pendientes",
      photoNote: "Las fotos de los lugares son de ejemplo, a la espera de las del proyecto.", exPhoto: "Foto de ejemplo",
      imgAlt: { portada: "Ladera de una sección estratigráfica con fósiles guía superpuestos", nivel: "Nivel oscuro rico en materia orgánica bajo capas de caliza, con un martillo como escala", carbonero: "Vista de la sección de Carbonero" }
    },
    en: {
      langName: "English", other: "ES", otherLabel: "Leer en español",
      nav: { intro: "Project", episodes: "Episodes", goals: "Goals", methods: "Methods", sites: "Sites", plan: "Timeline", team: "Team", news: "News", data: "Open data", contact: "Contact" },
      acronym: "SECABA",
      title: "Succession of episodes of accelerated environmental change in the Late Barremian and Early Aptian",
      subtitle: "Geochemical record, biotic impact and controlling factors",
      claim: "Past climate as a mirror of the present",
      lead: "Between 122 and 118 million years ago, the Earth went through a chain of abrupt warming episodes that culminated in Oceanic Anoxic Event 1a. We study how they unfolded, what triggered them and how marine life responded, to better understand today’s climate change.",
      ref: "Project PID2023-151264NB-I00",
      funder: "Knowledge Generation Projects 2023 · Spanish Ministry of Science, Innovation and Universities",
      host: "University of Jaén · CEACTEMA",
      duration: "3 years",
      facts: [
        { v: "1000 → 2200", u: "ppm CO₂", d: "Atmospheric CO₂ doubled during OAE 1a (Naafs et al., 2016)" },
        { v: "+4–8", u: "°C", d: "Estimated sea-surface warming" },
        { v: "230,000", u: "years", d: "Duration of the OAE 1a onset, with an initial phase shorter than 10,000 years" },
        { v: "150", u: "m", d: "Continuous Cau drill core, held at the University of Jaén" }
      ],
      whyT: "Why it matters",
      why: [
        "Earth’s climate has swung between warm (greenhouse) and cold (icehouse) states. We now live in a cold state to which human activity is adding CO₂ at an unprecedented rate. Climate models carry uncertainty, and the geological record preserves past episodes that act as analogues.",
        "Not every carbon-cycle perturbation ended in ocean anoxia. All anoxic events (OAEs) are episodes of environmental change, but not all episodes of environmental change (EECs) became OAEs. SECABA studies that succession."
      ],
      hypT: "Hypothesis",
      hyp: "These episodes form a general Earth-system process under extreme greenhouse conditions. They consist of short events, some linked to volcanic pulses and others to methane release, possibly paced by orbital cycles.",
      novT: "What is new",
      nov: "For the first time, OAE 1a is studied as a succession of distinct events, at ultra-high resolution across the negative δ13C peak chosen as the base of the Aptian.",
      episodesT: "Three linked episodes",
      episodes: [
        { k: "IFeNE", n: "Intra-Feraudianus Excursion", age: "Late Barremian", d: "A negative isotope excursion named by the team in 2022. Found at Barranco de Cavila and probably at Río Argos-6 and L’Alcoraia. Is it the onset of Taxy or a separate episode?" },
        { k: "Taxy", n: "Taxy Episode (ISNE)", age: "≈ 124.3–121.4 Ma", d: "A carbon perturbation with black-shale levels around the Barremian/Aptian boundary. Early Ontong Java volcanism or long-eccentricity orbital cycles?" },
        { k: "OAE 1a", n: "Selli Episode", age: "≈ 120 Ma · Early Aptian", d: "One of the largest anoxic events of the Mesozoic: massive input of light carbon, warming, the nannoconid crisis and widespread seafloor anoxia." }
      ],
      goalsT: "Four big questions",
      goals: [
        { c: "OG1", q: "How long did the changes last, and how fast were they?", d: "High-resolution age models and correlation with records worldwide." },
        { c: "OG2", q: "What changed in the environment, and how did life respond?", d: "Temperature, oxygen, terrigenous input and productivity, and their effect on ammonites, nannofossils, foraminifera and primary producers." },
        { c: "OG3", q: "What triggered them?", d: "The role of volcanism, methane release and weathering in each episode." },
        { c: "OG4", q: "Is there a common pattern?", d: "A general carbon-cycle model linking the episodes together." }
      ],
      synth: "And the synthesis question: can what we learn from these episodes help us understand how today’s climate system will respond to rising CO₂?",
      methodsT: "How we study it",
      methods: [
        { k: "Fossils", d: "Calcareous nannofossils, planktonic foraminifera, radiolarians and ammonites to date the rocks and measure biotic impact." },
        { k: "δ13C · δ18O", d: "Stable carbon and oxygen isotopes on bulk rock and foraminifera." },
        { k: "Biomarkers", d: "Fossil organic molecules analysed by GC-MS: productivity, oxygenation and temperature." },
        { k: "Hg · Os · Li", d: "Chemical fingerprints of volcanism and continental weathering." },
        { k: "Astrochronology", d: "Orbital cycles recorded in the rocks to measure time in thousands of years." },
        { k: "Elements & TOC", d: "Major and trace elements (µXRF, ICP-MS) and total organic carbon." },
        { k: "Mineralogy", d: "Clays and volcanic layers at Carbonero by X-ray diffraction." }
      ],
      sitesT: "Where we work",
      sitesNote: "Approximate positions on a sketch map.",
      planT: "Timeline",
      planUnit: "Q", years: ["Year 1", "Year 2", "Year 3"],
      milestonesT: "Milestones",
      recordT: "25 years of previous work",
      teamT: "Team",
      teamGroups: { research: "Research team", work: "Work team", collab: "Collaborators" },
      newsT: "News and outreach",
      newsEmpty: "Progress, papers and activities will be posted here.",
      outreach: [
        { k: "Science Week", d: "Fossils and isotopes as climate indicators." },
        { k: "Science Café", d: "How past temperatures and CO₂ are estimated." },
        { k: "Researchers’ Night", d: "Hands-on workshops on the carbon cycle." },
        { k: "Women and Girls in Science Day", d: "The team’s women scientists share their work." },
        { k: "Inclusive workshops", d: "Outreach adapted to diverse audiences." }
      ],
      dataT: "Open science",
      data: "FAIR data with DOIs in the RUJA repository, geochemical data in EarthChem, paper datasets in PANGAEA and samples registered in SESAR. Open-access publications.",
      dataLink: "Data management plan in RUJA",
      contactT: "Contact",
      contactRole: "Project contact",
      contactPlace: "Department of Geology · CEACTEMA · University of Jaén · Campus Las Lagunillas, 23071 Jaén, Spain",
      copy: "Copy", copied: "Copied",
      fundingLine: "Project PID2023-151264NB-I00 funded by MICIU/AEI/10.13039/501100011033 [check exact wording in the award].",
      datesTodo: "Start and end dates pending",
      photoNote: "Site photos are examples until the project’s own photos are available.", exPhoto: "Example photo",
      imgAlt: { portada: "Hillside of a stratigraphic section with index fossils overlaid", nivel: "Dark organic-rich layer below limestone beds, with a hammer for scale", carbonero: "View of the Carbonero section" }
    }
  };

  function getLang() {
    var h = (location.hash || "").replace("#", "");
    if (h === "en" || h === "es") return h;
    try { var s = localStorage.getItem("secaba-lang"); if (s === "en" || s === "es") return s; } catch (e) {}
    return (navigator.language || "es").slice(0, 2) === "en" ? "en" : "es";
  }
  function setLang(l) { try { localStorage.setItem("secaba-lang", l); } catch (e) {} document.documentElement.lang = l; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function copyBtn(btn, text, L) {
    btn.addEventListener("click", function () {
      try { navigator.clipboard.writeText(text).then(function () { btn.textContent = L.copied; setTimeout(function () { btn.textContent = L.copy; }, 1500); }, function () {}); } catch (e) {}
    });
  }

  // Figuras de la memoria científico-técnica
  var figs = {
    oae: { src: "img/fig-oae-modelo.jpg", w: 869, h: 735,
      es: { c: "Figura 1. Modelo genético de un evento anóxico oceánico: el vulcanismo y el metano calientan el clima, aumentan los nutrientes y el océano profundo se queda sin oxígeno. Jenkyns (2010).", a: "Diagrama de un evento anóxico oceánico con volcán, emisiones de CO₂ y metano, calentamiento, afloramiento de nutrientes y depósito de black shales" },
      en: { c: "Figure 1. Genetic model of an oceanic anoxic event: volcanism and methane warm the climate, nutrients increase and the deep ocean loses its oxygen. Jenkyns (2010).", a: "Diagram of an oceanic anoxic event with a volcano, CO₂ and methane release, warming, nutrient upwelling and black-shale deposition" } },
    eec: { src: "img/fig-eec-follmi.jpg", w: 1394, h: 481,
      es: { c: "Figura 2. Episodios de cambio ambiental del Barremiense–Aptiense, con los episodios Taxy y Selli (OAE 1a). Modificado de Föllmi (2012).", a: "Tabla estratigráfica del Barremiense–Aptiense con las curvas de δ13C y δ18O y los episodios Taxy y Selli" },
      en: { c: "Figure 2. Episodes of environmental change in the Barremian–Aptian, including the Taxy and Selli (OAE 1a) episodes. Modified from Föllmi (2012).", a: "Barremian–Aptian stratigraphic chart with δ13C and δ18O curves and the Taxy and Selli episodes" } },
    cau: { src: "img/fig-carbonero-cau.jpg", w: 1370, h: 768,
      es: { c: "Figura 3. Secciones expandidas del OAE 1a que estudiará el proyecto: Carbonero (Castro et al., 2019) y el sondeo de Cau (Martínez-Rodríguez et al., 2021).", a: "Curvas de δ13C, carbono orgánico y osmio en las secciones de Carbonero y Cau, con el intervalo del OAE 1a resaltado" },
      en: { c: "Figure 3. Expanded OAE 1a sections studied by the project: Carbonero (Castro et al., 2019) and the Cau core (Martínez-Rodríguez et al., 2021).", a: "δ13C, organic carbon and osmium curves at Carbonero and Cau, with the OAE 1a interval highlighted" } }
  };
  function figure(key, lang, cls) {
    var f = figs[key], t = f[lang];
    return '<figure class="sfig ' + (cls || "") + '" style="margin:0;display:grid;gap:10px"><div style="background:#fff;border-radius:6px;padding:clamp(8px,1.4vw,16px);overflow-x:auto"><img src="' + f.src + '" alt="' + esc(t.a) + '" width="' + f.w + '" height="' + f.h + '" loading="lazy" style="width:100%;height:auto;display:block;' + (f.w / f.h > 2 ? "min-width:640px" : "") + '"></div><figcaption style="font-size:.8rem;line-height:1.5;opacity:.75;max-width:80ch">' + esc(t.c) + "</figcaption></figure>";
  }
  function logos() {
    return '<div class="logos" style="display:flex;flex-wrap:wrap;align-items:center;gap:20px 28px;background:#fff;border-radius:8px;padding:14px 18px;width:fit-content;max-width:100%">' +
      '<img src="img/logo-micin.jpg" alt="Gobierno de España · Ministerio de Ciencia, Innovación y Universidades" width="1200" height="335" style="height:48px;width:auto">' +
      '<img src="img/logo-aei.jpg" alt="Agencia Estatal de Investigación" width="260" height="364" style="height:56px;width:auto">' +
      '<img src="img/logo-ue.jpg" alt="Cofinanciado por la Unión Europea" width="80" height="74" style="height:48px;width:auto">' +
      "</div>";
  }

  // Crédito de desarrollo. El correo no está en texto plano: se monta solo cuando una persona pulsa el botón.
  var _k = [116, 118, 106, 53, 119, 119, 104, 52, 122, 127, 119, 71, 118, 121, 123, 122, 104, 106, 118, 121, 104, 125, 115, 104];
  function credit(lang) {
    var es = lang !== "en";
    var mono = 'font-family:IBM Plex Mono,ui-monospace,Menlo,monospace';
    return '<div class="pxs" id="pxs" style="scroll-margin-top:120px;margin-top:14px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:20px 32px;padding:clamp(20px,3vw,32px);border:1px solid color-mix(in srgb,currentColor 28%,transparent);border-radius:20px">' +
      '<div style="display:grid;gap:6px;min-width:0;max-width:60ch">' +
        '<span style="' + mono + ';font-size:.74rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;opacity:.75">' + (es ? "¿Te gusta esta web?" : "Like this website?") + "</span>" +
        '<span style="font-size:clamp(1.35rem,2.8vw,2rem);font-weight:700;line-height:1.15;opacity:1">' + (es ? "Diseñada y desarrollada por <b>PXS</b>" : "Designed and built by <b>PXS</b>") + "</span>" +
        '<span style="font-size:.98rem;line-height:1.5;opacity:.82">' + (es ? "Hacemos webs a medida para proyectos de investigación, grupos y empresas. Pide la tuya." : "We build custom websites for research projects, groups and companies. Ask for yours.") + "</span>" +
      "</div>" +
      '<div id="pxs-contact" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;font-size:1.05rem">' +
        '<button type="button" id="pxs-reveal" style="font-family:inherit;font-size:1rem;font-weight:600;line-height:1;padding:15px 24px;border-radius:999px;border:2px solid currentColor;background:transparent;color:inherit;cursor:pointer;white-space:nowrap">' +
        (es ? "Quiero una web así →" : "I want a website like this →") + "</button>" +
      "</div></div>";
  }
  function bindCredit(lang) {
    var b = document.getElementById("pxs-reveal");
    if (!b) return;
    b.addEventListener("click", function () {
      var es = lang !== "en";
      var m = _k.slice().reverse().map(function (n) { return String.fromCharCode(n - 7); }).join("");
      var box = document.getElementById("pxs-contact");
      box.textContent = "";
      var lab = document.createElement("span"); lab.textContent = es ? "Escríbenos a" : "Write to us at"; lab.style.opacity = ".8";
      var a = document.createElement("a");
      a.href = "mai" + "lto:" + m + "?subject=" + encodeURIComponent(es ? "Quiero una web como la de SECABA" : "I want a website like SECABA's");
      a.textContent = m;
      a.style.cssText = "color:inherit;font-weight:700;font-size:clamp(1.05rem,2vw,1.3rem);text-underline-offset:4px;overflow-wrap:anywhere";
      box.appendChild(lab); box.appendChild(a);
      a.focus();
    });
  }

  window.SECABA = { T: T, credit: credit, bindCredit: bindCredit, figs: figs, figure: figure, logos: logos, people: people, sites: sites, plan: plan, milestones: milestones, record: record, email: "jmcastro@ujaen.es", contact: "José Manuel Castro Jiménez", ruja: "https://ruja.ujaen.es/handle/10953/817", getLang: getLang, setLang: setLang, esc: esc, copyBtn: copyBtn };
})();
