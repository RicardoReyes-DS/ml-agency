export type Locale = "es" | "en";

export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

const demoSlugs = {
  computerVision: "/demos/computer-vision",
  nlp: "/demos/nlp",
  deepLearning: "/demos/deep-learning",
  predictiveAnalytics: "/demos/predictive-analytics",
} as const;

const dictionary = {
  es: {
    localeLabel: "Español",
    languageSwitcherLabel: "Cambiar idioma",
    navbar: {
      links: [
        { label: "Inicio", key: "home" },
        { label: "Servicios", key: "services" },
        { label: "Proceso", key: "about" },
        { label: "Contacto", key: "contact" },
      ],
      cta: "Agendar revision tecnica",
      closeMenu: "Cerrar menu",
      openMenu: "Abrir menu",
      brandAriaLabel: "Ir al inicio de ML Agency",
    },
    footer: {
      tagline:
        "Sistemas de machine learning orientados a produccion para equipos que necesitan una ruta creible hacia la automatizacion.",
      navigateTitle: "Navegar",
      demosLabel: "Demos",
      contactTitle: "Contacto",
      contactIntro:
        "Trae un flujo de trabajo, el cuello de botella actual y como evaluarias un piloto.",
      contactSupport:
        "Te ayudamos a aclarar viabilidad, alcance del piloto y ajuste a produccion.",
      pilotTitle: "Inicia tu piloto",
      pilotSummary:
        "Empieza con una revision tecnica antes de comprometerte con una implementacion mayor.",
      cta: "Agendar revision tecnica",
      bottomLine:
        "Enfoca la primera conversacion en un flujo, una metrica de exito y una decision de piloto.",
      demoCta: "Ver demo en vivo",
    },
    home: {
      hero: {
        badge: "Entrega de ML orientada al operador",
        title:
          "Sistemas de machine learning que reducen trabajo manual,",
        titleAccent: "disminuyen riesgo y salen rapido a produccion.",
        typewriter: [
          "Automatizacion de captura y revision documental",
          "Pronostico y deteccion de anomalias",
          "Control de calidad con vision por computadora",
          "Busqueda interna y copilotos para operadores",
        ],
        body:
          "Ayudamos a equipos de Mexico y Latinoamerica a convertir cuellos de botella operativos y datos reales en sistemas productivos con alcance viable y una ruta de piloto que el equipo puede sostener.",
        primaryCta: "Agendar revision tecnica",
        secondaryCta: "Ver demos en vivo",
        secondaryHref: demoSlugs.computerVision,
        outcomes: [
          "Automatiza revisiones repetitivas y tareas de enrutamiento",
          "Detecta anomalias, riesgos y cambios de demanda antes",
          "Lanza un piloto con enfoque operativo, no un experimento eterno",
        ],
      },
      services: {
        badge: "Donde los equipos ven valor primero",
        title: "Casos de uso creados para",
        titleAccent: "apalancamiento operativo",
        body:
          "Nos enfocamos en flujos donde la revision manual, las decisiones inconsistentes y las senales tardias estan frenando al equipo.",
        cta: "Agendar revision tecnica",
        cards: [
          {
            slug: "computerVision",
            title: "Vision por computadora",
            description:
              "Automatiza inspeccion, captura documental y QA visual sin aumentar revision manual.",
            features: [
              "Controles de calidad",
              "Manejo de excepciones visuales",
              "Extraccion documental",
            ],
            metric: "Ideal para revisiones operativas",
          },
          {
            slug: "nlp",
            title: "Procesamiento de lenguaje natural",
            description:
              "Convierte inboxes, documentos y conocimiento interno en flujos de busqueda, triage y accion.",
            features: [
              "Triage de intake",
              "Busqueda y retrieval",
              "Copilotos para operadores",
            ],
            metric: "Ideal para equipos intensivos en texto",
          },
          {
            slug: "deepLearning",
            title: "Deep learning",
            description:
              "Construye modelos especificos cuando las herramientas genericas no alcanzan el flujo o la precision requerida.",
            features: [
              "Modelado a medida",
              "Diseno de evaluacion",
              "Restricciones de despliegue desde el inicio",
            ],
            metric: "Ideal para casos limite",
          },
          {
            slug: "predictiveAnalytics",
            title: "Analitica predictiva",
            description:
              "Pronostica demanda, detecta anomalias y entrega senales tempranas antes de que los problemas cuesten.",
            features: [
              "Pronostico",
              "Deteccion de anomalias",
              "Soporte a decisiones",
            ],
            metric: "Ideal para equipos de planeacion",
          },
        ],
        exploreCta: "Explorar demo",
      },
      about: {
        badge: "Como ejecutamos proyectos",
        title: "Profundidad tecnica con un",
        titleAccent: "modelo de entrega confiable para operaciones",
        body:
          "No tratamos proyectos de IA como I+D abierto. El trabajo es identificar un flujo que valga la pena, definir el piloto y hacer explicitas las decisiones operativas.",
        achievements: [
          {
            value: "1",
            label: "Flujo primero",
            description: "Partimos del dolor operativo y del impacto de negocio.",
          },
          {
            value: "2",
            label: "Alcance de piloto",
            description: "Definimos una prueba acotada antes de escalar.",
          },
          {
            value: "3",
            label: "Restricciones reales",
            description: "Seguridad, latencia, handoffs y soporte se consideran desde el inicio.",
          },
          {
            value: "4",
            label: "Adopcion del operador",
            description: "Diseñamos salidas alrededor de como decide y trabaja el equipo.",
          },
        ],
        practiceTitle: "Lo que eso significa en la practica",
        practiceBody: [
          "Acotamos alrededor de una decision de negocio o un flujo manual, no de la novedad del modelo. Eso mantiene el trabajo medible y evita que la adopcion se estanque.",
          "Tambien diseñamos handoffs, manejo de excepciones y propiedad del equipo para que el sistema sobreviva despues del piloto.",
        ],
        principlesTitle: "Principios de entrega",
        principles: [
          {
            title: "Economia del flujo",
            description:
              "Priorizamos cuellos de botella con suficiente volumen, costo o riesgo para justificar automatizacion.",
          },
          {
            title: "Produccion por defecto",
            description:
              "La ruta de integracion, los fallback y el modelo operativo forman parte de la primera conversacion.",
          },
          {
            title: "Evidencia sobre hype",
            description:
              "Definimos criterios de evaluacion temprano para juzgar el piloto con resultados reales.",
          },
          {
            title: "Gestion del cambio",
            description:
              "Diseñamos para las personas dentro del ciclo, no solo para el modelo aislado.",
          },
        ],
        cta: "Agendar revision tecnica",
      },
      contact: {
        badge: "Revision tecnica",
        title: "Empieza con una",
        titleAccent: "revision tecnica clara",
        body:
          "La meta es decidir si un piloto se justifica, cual debe ser el primer flujo y que podria bloquear el uso en produccion.",
        methods: [
          {
            title: "Envia tu flujo por correo",
            description: "Comparte el proceso, los bloqueos y los sistemas involucrados.",
            contact: "hello@ml-agency.com",
            action: "Enviar correo",
            href: "mailto:hello@ml-agency.com?subject=Revision%20tecnica",
          },
          {
            title: "Agenda una llamada tecnica",
            description:
              "Usa el CTA de contacto si quieres una conversacion enfocada en alcance.",
            contact: "Empieza por el flujo con mas friccion",
            action: "Ir al CTA",
            href: "#contact-cta",
          },
          {
            title: "Revisa un demo funcional",
            description:
              "Ve los patrones de interaccion antes de planear el piloto.",
            contact: "Explora un caso de uso en vivo",
            action: "Ver demo",
            href: demoSlugs.computerVision,
          },
        ],
        checklistTitle: "Que traer a la revision",
        checklist: [
          "El flujo que quieres mejorar",
          "Los sistemas o documentos involucrados",
          "Donde hoy siguen interviniendo personas",
          "Como evaluarias un piloto exitoso",
        ],
        ctaCardTitle: "Agenda una revision tecnica",
        ctaCardBody:
          "Comparte un flujo, una restriccion y la definicion de exito del piloto. La primera conversacion debe dejar claro si vale la pena avanzar.",
        ctaPrimary: "Enviar correo a ML Agency",
        ctaSecondary: "Ver hub de demos",
      },
      metadata: {
        title: "ML Agency | Sistemas de machine learning para operaciones",
        description:
          "Sistemas de machine learning orientados a produccion para automatizar revisiones, mejorar pronosticos y lanzar pilotos viables en Mexico y Latinoamerica.",
      },
    },
    demos: {
      badge: "Flujos en vivo, no demos genericos de IA",
      title:
        "Demos de machine learning para flujos operativos reales",
      body:
        "Primero explora el flujo, despues prueba el patron de interaccion y usa la revision tecnica cuando el piloto empiece a verse viable.",
      primaryCta: "Agendar revision tecnica",
      secondaryCta: "Volver a servicios",
      cards: [
        {
          title: "Vision por computadora",
          href: demoSlugs.computerVision,
          description: "Inspeccion, captura documental y manejo de excepciones visuales.",
        },
        {
          title: "Inteligencia documental",
          href: demoSlugs.nlp,
          description: "Busqueda, triage y soporte fundamentado para equipos intensivos en documentos.",
        },
        {
          title: "Modelado a medida",
          href: demoSlugs.deepLearning,
          description: "Cuando el flujo es demasiado especifico para herramientas genericas.",
        },
        {
          title: "Analitica predictiva",
          href: demoSlugs.predictiveAnalytics,
          description: "Pronostico y deteccion de anomalias para planeacion y respuesta al riesgo.",
        },
      ],
      exploreCta: "Explorar demo",
      metadata: {
        title: "Demos de machine learning | Casos de uso operativos",
        description:
          "Explora demos de machine learning orientados a inspeccion, inteligencia documental, pronostico y modelado especifico.",
      },
    },
    demoTemplate: {
      backToServices: "Volver a servicios",
      helpsTitle: "Donde ayuda este demo",
      helpsBody:
        "Usa el encuadre del flujo para decidir si vale la pena acotar un piloto.",
      reviewTitle: "Que traer a la revision",
      reviewBody:
        "La primera conversacion util habla del flujo, no de la marca del modelo.",
      liveDemoBadge: "Demo en vivo",
      liveDemoTitle:
        "Prueba el patron de interaccion antes de planear el piloto",
      architectureTitle: "Como esta estructurado el sistema",
      architectureAccent: "detras del demo",
      challengesTitle: "Riesgos, limites y decisiones tecnicas",
      fitTitle: "Buen ajuste",
      fitBody: "Escenarios donde este enfoque suele tener mejor probabilidad de exito.",
      notFitTitle: "Mal ajuste",
      notFitBody: "Casos donde conviene redefinir el problema antes de construir.",
      ctaTitle: "Lleva un flujo concreto a la revision tecnica",
      ctaBody:
        "Si el demo se parece a una operacion real de tu equipo, la siguiente conversacion debe enfocarse en alcance, evaluacion y restricciones de implementacion.",
    },
    demoWrapper: {
      parameters: "Parametros del modelo",
      confidence: "Umbral de confianza",
      batchSize: "Tamano de lote",
      modelVersion: "Version del modelo",
      computing: "Calculando...",
      runDemo: "Ejecutar demo",
      detailTitle: "Ver explicacion detallada",
      shareTitle: "Compartir demo",
      result: "Demo completado con {accuracy}% de precision",
      errorFallback: "Ocurrio un error",
    },
    metadata: {
      siteName: "ML Agency",
      description:
        "Sistemas de machine learning orientados a produccion para automatizacion operativa y pilotos viables.",
      ogLocale: "es_MX",
    },
  },
  en: {
    localeLabel: "English",
    languageSwitcherLabel: "Change language",
    navbar: {
      links: [
        { label: "Home", key: "home" },
        { label: "Services", key: "services" },
        { label: "Process", key: "about" },
        { label: "Contact", key: "contact" },
      ],
      cta: "Book Technical Review",
      closeMenu: "Close menu",
      openMenu: "Open menu",
      brandAriaLabel: "Go to ML Agency homepage",
    },
    footer: {
      tagline:
        "Production-minded machine learning systems for teams that need a credible path to automation.",
      navigateTitle: "Navigate",
      demosLabel: "Demos",
      contactTitle: "Contact",
      contactIntro:
        "Bring one workflow, the current bottleneck, and how you would judge a pilot.",
      contactSupport:
        "We help clarify feasibility, pilot scope, and production fit.",
      pilotTitle: "Start Your Pilot",
      pilotSummary:
        "Start with a technical review before committing to a larger implementation.",
      cta: "Book Technical Review",
      bottomLine:
        "Focus the first conversation on one workflow, one success metric, and one pilot decision.",
      demoCta: "See Live Demo",
    },
    home: {
      hero: {
        badge: "Operator-first ML delivery",
        title: "Machine learning systems that cut manual work,",
        titleAccent: "reduce risk, and ship fast.",
        typewriter: [
          "Document intake and review automation",
          "Forecasting and anomaly detection",
          "Computer vision quality checks",
          "Internal search and operator copilots",
        ],
        body:
          "We help teams across North America and Latin America turn workflow bottlenecks and operational data into production systems with realistic scope and a pilot path the team can actually support.",
        primaryCta: "Book Technical Review",
        secondaryCta: "See Live Demos",
        secondaryHref: demoSlugs.computerVision,
        outcomes: [
          "Automate repetitive reviews and routing work",
          "Surface anomalies, risks, and forecast shifts earlier",
          "Ship a production-minded pilot without a research detour",
        ],
      },
      services: {
        badge: "Where teams see value first",
        title: "Use cases built for",
        titleAccent: "operational leverage",
        body:
          "We focus on workflows where manual review, inconsistent decisions, and delayed signals are slowing the team down.",
        cta: "Book Technical Review",
        cards: [
          {
            slug: "computerVision",
            title: "Computer Vision",
            description:
              "Automate inspection, document capture, and visual QA without adding more manual review.",
            features: [
              "Quality checks",
              "Visual exception handling",
              "Document extraction",
            ],
            metric: "Best for ops-heavy reviews",
          },
          {
            slug: "nlp",
            title: "Natural Language Processing",
            description:
              "Turn inboxes, documents, and internal knowledge into searchable, triaged, action-ready workflows.",
            features: [
              "Intake triage",
              "Search and retrieval",
              "Operator copilots",
            ],
            metric: "Best for text-heavy teams",
          },
          {
            slug: "deepLearning",
            title: "Deep Learning",
            description:
              "Build domain-specific models when off-the-shelf tooling is not enough for the workflow or accuracy target.",
            features: [
              "Custom modeling",
              "Evaluation design",
              "Deployment constraints upfront",
            ],
            metric: "Best for edge cases",
          },
          {
            slug: "predictiveAnalytics",
            title: "Predictive Analytics",
            description:
              "Forecast demand, detect anomalies, and give operators earlier signals before issues become expensive.",
            features: [
              "Forecasting",
              "Anomaly detection",
              "Decision support",
            ],
            metric: "Best for planning teams",
          },
        ],
        exploreCta: "Explore demo",
      },
      about: {
        badge: "How we run engagements",
        title: "Technical depth with a",
        titleAccent: "delivery model operators can trust",
        body:
          "We do not treat AI projects like open-ended R&D. The job is to identify one workflow worth improving, define the pilot, and make the operational tradeoffs explicit.",
        achievements: [
          {
            value: "1",
            label: "Workflow First",
            description: "We start with operator pain and business impact.",
          },
          {
            value: "2",
            label: "Pilot Scope",
            description: "We define a small proof path before scaling.",
          },
          {
            value: "3",
            label: "Production Constraints",
            description: "Security, latency, handoffs, and support are designed in early.",
          },
          {
            value: "4",
            label: "Operator Adoption",
            description: "We shape outputs around how teams actually decide and work.",
          },
        ],
        practiceTitle: "What that means in practice",
        practiceBody: [
          "We scope around a business decision or manual workflow, not around model novelty. That keeps the work measurable and keeps adoption from stalling.",
          "We also design around handoffs, exception handling, and team ownership so the system can survive after the pilot phase.",
        ],
        principlesTitle: "Delivery principles",
        principles: [
          {
            title: "Workflow Economics",
            description:
              "We prioritize bottlenecks with enough volume, cost, or risk to justify automation.",
          },
          {
            title: "Production by Default",
            description:
              "The integration path, fallback states, and operating model are part of the first conversation.",
          },
          {
            title: "Evidence Over Hype",
            description:
              "We define evaluation criteria early so a pilot can be judged against real outcomes.",
          },
          {
            title: "Change Management",
            description:
              "We design for the humans in the loop, not just the model in isolation.",
          },
        ],
        cta: "Book Technical Review",
      },
      contact: {
        badge: "Technical review",
        title: "Start with a",
        titleAccent: "clear technical review",
        body:
          "The goal is to decide whether a pilot is justified, what the first workflow should be, and what could block production use.",
        methods: [
          {
            title: "Email Your Workflow",
            description: "Share the process, blockers, and systems involved.",
            contact: "hello@ml-agency.com",
            action: "Send Email",
            href: "mailto:hello@ml-agency.com?subject=Technical%20Review",
          },
          {
            title: "Book a Technical Call",
            description: "Use the contact CTA if you want a scoped review conversation.",
            contact: "Start with your highest-friction workflow",
            action: "Jump to CTA",
            href: "#contact-cta",
          },
          {
            title: "Review a Working Demo",
            description: "See the interaction patterns before planning a pilot.",
            contact: "Explore a live use case",
            action: "See Demo",
            href: demoSlugs.computerVision,
          },
        ],
        checklistTitle: "What to bring to the review",
        checklist: [
          "The workflow you want to improve",
          "The systems or documents involved",
          "Where humans still intervene today",
          "How you would judge a pilot as successful",
        ],
        ctaCardTitle: "Book a technical review",
        ctaCardBody:
          "Share one workflow, one constraint, and what success would look like. The first conversation should make the next decision obvious.",
        ctaPrimary: "Email ML Agency",
        ctaSecondary: "View demos hub",
      },
      metadata: {
        title: "ML Agency | Production-minded machine learning systems",
        description:
          "Production-minded machine learning systems for workflow automation, forecasting, and credible pilots across North America and Latin America.",
      },
    },
    demos: {
      badge: "Live workflows, not generic AI demos",
      title: "Machine learning demos for real operational workflows",
      body:
        "Explore the workflow first, test the interaction pattern second, and use the technical review CTA when a pilot starts to look justified.",
      primaryCta: "Book Technical Review",
      secondaryCta: "Back to Services",
      cards: [
        {
          title: "Computer Vision",
          href: demoSlugs.computerVision,
          description: "Inspection, document capture, and visual exception handling.",
        },
        {
          title: "Document Intelligence",
          href: demoSlugs.nlp,
          description: "Search, triage, and grounded operator support for document-heavy teams.",
        },
        {
          title: "Custom Modeling",
          href: demoSlugs.deepLearning,
          description: "When the workflow is too specific for off-the-shelf tools.",
        },
        {
          title: "Predictive Analytics",
          href: demoSlugs.predictiveAnalytics,
          description: "Forecasting and anomaly detection for planning and risk response.",
        },
      ],
      exploreCta: "Explore demo",
      metadata: {
        title: "Machine learning demos | Workflow-led use cases",
        description:
          "Explore machine learning demos framed around inspection, document intelligence, forecasting, and custom-model workflows.",
      },
    },
    demoTemplate: {
      backToServices: "Back to Services",
      helpsTitle: "Where this demo helps",
      helpsBody: "Use the workflow framing to decide if a pilot is worth scoping.",
      reviewTitle: "What to bring to a review",
      reviewBody:
        "A useful first conversation is about the workflow, not the model brand.",
      liveDemoBadge: "Live demo",
      liveDemoTitle: "Test the interaction pattern before planning the pilot",
      architectureTitle: "How the system is",
      architectureAccent: "structured behind the demo",
      challengesTitle: "Risks, limits, and technical choices",
      fitTitle: "Best fit",
      fitBody: "Scenarios where this approach usually has the highest chance of success.",
      notFitTitle: "Not a fit",
      notFitBody: "Cases where the problem should be reframed before building.",
      ctaTitle: "Bring one concrete workflow to the technical review",
      ctaBody:
        "If the demo resembles a real operation inside your team, the next conversation should focus on scope, evaluation, and implementation constraints.",
    },
    demoWrapper: {
      parameters: "Model Parameters",
      confidence: "Confidence Threshold",
      batchSize: "Batch Size",
      modelVersion: "Model Version",
      computing: "Computing...",
      runDemo: "Run Demo",
      detailTitle: "View detailed explanation",
      shareTitle: "Share demo",
      result: "Demo completed with {accuracy}% accuracy",
      errorFallback: "An error occurred",
    },
    metadata: {
      siteName: "ML Agency",
      description:
        "Production-minded machine learning systems for workflow automation and credible pilots.",
      ogLocale: "en_US",
    },
  },
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const [, maybeLocale] = pathname.split("/");
  const candidate = maybeLocale ?? "";
  return isLocale(candidate) ? candidate : defaultLocale;
}

export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/");
  if (isLocale(segments[1] ?? "")) {
    const stripped = `/${segments.slice(2).join("/")}`.replace(/\/+/g, "/");
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "") || "/";
  }
  return pathname || "/";
}

export function localizeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/")) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  const normalized = href.startsWith(`/${locale}`) ? href : `/${locale}${href}`;
  return normalized.replace(/\/+/g, "/");
}

export function switchLocaleInPathname(pathname: string, locale: Locale): string {
  const stripped = stripLocaleFromPathname(pathname);
  return stripped === "/" ? `/${locale}` : `/${locale}${stripped}`;
}

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}

export function formatLocalizedCopy(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}
