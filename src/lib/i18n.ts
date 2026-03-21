import { CONTACT_EMAIL, CONTACT_SUBJECTS, SITE_NAME, createMailto } from "@/lib/site";

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
      cta: "Hablar sobre tu flujo",
      closeMenu: "Cerrar menú",
      openMenu: "Abrir menú",
      brandAriaLabel: `Ir al inicio de ${SITE_NAME}`,
    },
    footer: {
      tagline:
        "Sistemas de machine learning orientados a producción para equipos que necesitan una ruta creíble hacia la automatización.",
      navigateTitle: "Navegar",
      demosLabel: "Demos",
      contactTitle: "Contacto",
      contactIntro:
        "Trae un flujo de trabajo, el cuello de botella actual y cómo evaluarías un piloto.",
      contactSupport:
        "Te ayudamos a aclarar viabilidad, alcance del piloto y ajuste a producción.",
      pilotTitle: "Inicia tu piloto",
      pilotSummary:
        "Empieza con una revisión de flujo antes de comprometerte con una implementación mayor.",
      cta: "Hablar sobre tu flujo",
      bottomLine:
        "Enfoca la primera conversación en un flujo, una métrica de éxito y una decisión de piloto.",
      demoCta: "Ver demo en vivo",
    },
    home: {
      hero: {
        badge: "Entrega de ML orientada al operador",
        title:
          "Servicios de machine learning para empresas que reducen trabajo manual,",
        titleAccent: "disminuyen riesgo y salen rápido a producción.",
        typewriter: [
          "Automatización de captura y revisión documental",
          "Pronóstico y detección de anomalías",
          "Control de calidad con visión por computadora",
          "Búsqueda interna y copilotos para operadores",
        ],
        body:
          "Ayudamos a equipos de México y Latinoamérica a convertir cuellos de botella operativos y datos reales en sistemas productivos, con alcance viable y una ruta de piloto que el equipo pueda sostener.",
        primaryCta: "Hablar sobre tu flujo",
        secondaryCta: "Ver demos en vivo",
        secondaryHref: demoSlugs.computerVision,
        outcomes: [
          "Automatiza revisiones repetitivas y tareas de enrutamiento",
          "Detecta anomalías, riesgos y cambios de demanda antes",
          "Lanza un piloto con enfoque operativo, no un experimento eterno",
        ],
      },
      services: {
        badge: "Donde los equipos ven valor primero",
        title: "Casos de uso creados para",
        titleAccent: "apalancamiento operativo",
        body:
          "Nos enfocamos en flujos donde la revisión manual, las decisiones inconsistentes y las señales tardías están frenando al equipo.",
        cta: "Hablar sobre tu flujo",
        cards: [
          {
            slug: "computerVision",
            title: "Visión por computadora",
            description:
              "Automatiza inspección, captura documental y QA visual sin aumentar la revisión manual.",
            features: [
              "Controles de calidad",
              "Manejo de excepciones visuales",
              "Extracción documental",
            ],
            metric: "Ideal para revisiones operativas",
          },
          {
            slug: "nlp",
            title: "Procesamiento de lenguaje natural",
            description:
              "Convierte bandejas de entrada, documentos y conocimiento interno en flujos de búsqueda, triage y acción.",
            features: [
              "Triage de entrada",
              "Búsqueda y recuperación",
              "Copilotos para operadores",
            ],
            metric: "Ideal para equipos intensivos en texto",
          },
          {
            slug: "deepLearning",
            title: "Deep learning",
            description:
              "Construye modelos específicos cuando las herramientas genéricas no alcanzan el flujo o la precisión requerida.",
            features: [
              "Modelado a medida",
              "Diseño de evaluación",
              "Restricciones de despliegue desde el inicio",
            ],
            metric: "Ideal para casos límite",
          },
          {
            slug: "predictiveAnalytics",
            title: "Analítica predictiva",
            description:
              "Pronostica demanda, detecta anomalías y entrega señales tempranas antes de que los problemas cuesten.",
            features: [
              "Pronóstico",
              "Detección de anomalías",
              "Soporte a decisiones",
            ],
            metric: "Ideal para equipos de planeación",
          },
        ],
        exploreCta: "Explorar demo",
      },
      about: {
        badge: "Cómo ejecutamos proyectos",
        title: "Profundidad técnica con un",
        titleAccent: "modelo de entrega confiable para operaciones",
        body:
          "No tratamos proyectos de IA como I+D abierto. El trabajo es identificar un flujo que valga la pena, definir el piloto y hacer explícitas las decisiones operativas.",
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
            description: "Seguridad, latencia, transferencias entre etapas y soporte se consideran desde el inicio.",
          },
          {
            value: "4",
            label: "Adopción del operador",
            description: "Diseñamos salidas alrededor de cómo decide y trabaja el equipo.",
          },
        ],
        practiceTitle: "Lo que eso significa en la práctica",
        practiceBody: [
          "Acotamos alrededor de una decisión de negocio o un flujo manual, no de la novedad del modelo. Eso mantiene el trabajo medible y evita que la adopción se estanque.",
          "También diseñamos transferencias entre etapas, manejo de excepciones y propiedad del equipo para que el sistema sobreviva después del piloto.",
        ],
        principlesTitle: "Principios de entrega",
        principles: [
          {
            title: "Economía del flujo",
            description:
              "Priorizamos cuellos de botella con suficiente volumen, costo o riesgo para justificar automatización.",
          },
          {
            title: "Producción por defecto",
            description:
              "La ruta de integración, los respaldos operativos y el modelo operativo forman parte de la primera conversación.",
          },
          {
            title: "Evidencia sobre hype",
            description:
              "Definimos criterios de evaluación desde temprano para juzgar el piloto con resultados reales.",
          },
          {
            title: "Gestión del cambio",
            description:
              "Diseñamos para las personas dentro del ciclo, no solo para el modelo aislado.",
          },
        ],
        cta: "Hablar sobre tu flujo",
      },
      contact: {
        badge: "Revisión de flujo",
        title: "Empieza con una",
        titleAccent: "revisión de flujo clara",
        body:
          "La meta es decidir si un piloto se justifica, cuál debe ser el primer flujo y qué podría bloquear su adopción en producción.",
        methods: [
          {
            title: "Envía tu flujo por correo",
            description: "Comparte el proceso, los bloqueos y los sistemas involucrados.",
            contact: CONTACT_EMAIL,
            action: "Enviar correo",
            href: createMailto(CONTACT_SUBJECTS.revisionDeFlujo),
          },
          {
            title: "Abre la conversación",
            description:
              "Usa el CTA principal si quieres empezar por el flujo, el alcance y las restricciones.",
            contact: "Empieza por el flujo con más fricción",
            action: "Ir al CTA",
            href: "#contact-cta",
          },
          {
            title: "Revisa un demo funcional",
            description:
              "Ve los patrones de interacción antes de planear el piloto.",
            contact: "Explora un caso de uso en vivo",
            action: "Ver demo",
            href: demoSlugs.computerVision,
          },
        ],
        checklistTitle: "Qué traer a la conversación",
        checklist: [
          "El flujo que quieres mejorar",
          "Los sistemas o documentos involucrados",
          "Dónde hoy siguen interviniendo personas",
          "Cómo evaluarías un piloto exitoso",
        ],
        ctaCardTitle: "Abre una revisión de flujo",
        ctaCardBody:
          "Comparte un flujo, una restricción y la definición de éxito del piloto. La primera conversación debe dejar claro si vale la pena avanzar.",
        ctaPrimary: `Enviar correo a ${SITE_NAME}`,
        ctaSecondary: "Ver hub de demos",
      },
      metadata: {
        title: "Servicios de machine learning para empresas en México",
        description:
          "Servicios de machine learning para empresas en México y Latinoamérica, enfocados en automatización operativa, visión por computadora, inteligencia documental y pilotos viables.",
        keywords: [
          "servicios de machine learning en México",
          "agencia de machine learning en México",
          "automatización con IA para operaciones",
          "visión por computadora para empresas",
          "inteligencia documental con IA",
        ],
      },
    },
    demos: {
      badge: "Flujos en vivo, no demos genéricos de IA",
      title:
        "Demos de IA aplicada para casos de uso operativos reales",
      body:
        "Explora casos de uso de IA aplicada antes de definir un piloto: aquí puedes revisar patrones de interacción para visión por computadora, inteligencia documental, modelado a medida y analítica predictiva.",
      primaryCta: "Hablar sobre tu flujo",
      secondaryCta: "Volver a servicios",
      cards: [
        {
          title: "Visión por computadora",
          href: demoSlugs.computerVision,
          description: "Inspección, captura documental y manejo de excepciones visuales.",
        },
        {
          title: "Inteligencia documental",
          href: demoSlugs.nlp,
          description: "Búsqueda, triage y soporte fundamentado para equipos intensivos en documentos.",
        },
        {
          title: "Modelado a medida",
          href: demoSlugs.deepLearning,
          description: "Cuando el flujo es demasiado específico para herramientas genéricas.",
        },
        {
          title: "Analítica predictiva",
          href: demoSlugs.predictiveAnalytics,
          description: "Pronóstico y detección de anomalías para planeación y respuesta al riesgo.",
        },
      ],
      exploreCta: "Explorar demo",
      metadata: {
        title: "Demos de IA aplicada para operaciones en México",
        description:
          "Explora casos de uso y demos de IA aplicada para operaciones en México: visión por computadora, inteligencia documental, pronóstico y modelado a medida.",
        keywords: [
          "demos de IA aplicada",
          "demos de inteligencia artificial en México",
          "casos de uso de IA para operaciones",
          "visión por computadora para operaciones",
          "inteligencia documental para empresas",
          "analítica predictiva para operaciones",
        ],
      },
    },
    demoTemplate: {
      backToServices: "Volver a servicios",
      helpsTitle: "Dónde ayuda este demo",
      helpsBody:
        "Usa el encuadre del flujo para decidir si vale la pena acotar un piloto.",
      reviewTitle: "Qué traer a la conversación",
      reviewBody:
        "La primera conversación útil habla del flujo, no de la marca del modelo.",
      liveDemoBadge: "Demo en vivo",
      liveDemoTitle:
        "Prueba el patrón de interacción antes de planear el piloto",
      architectureTitle: "Cómo está estructurado el sistema",
      architectureAccent: "detrás del demo",
      challengesTitle: "Riesgos, límites y decisiones técnicas",
      fitTitle: "Buen ajuste",
      fitBody: "Escenarios donde este enfoque suele tener mejor probabilidad de éxito.",
      notFitTitle: "Mal ajuste",
      notFitBody: "Casos donde conviene redefinir el problema antes de construir.",
      ctaTitle: "Lleva un flujo concreto a la conversación inicial",
      ctaBody:
        "Si el demo se parece a una operación real de tu equipo, la siguiente conversación debe enfocarse en alcance, evaluación y restricciones de implementación.",
    },
    demoWrapper: {
      parameters: "Parámetros del modelo",
      confidence: "Umbral de confianza",
      batchSize: "Tamaño de lote",
      modelVersion: "Versión del modelo",
      computing: "Calculando...",
      runDemo: "Ejecutar demo",
      detailTitle: "Ver explicación detallada",
      shareTitle: "Compartir demo",
      result: "Demo completado con {accuracy}% de precisión",
      errorFallback: "Ocurrió un error",
    },
    metadata: {
      siteName: SITE_NAME,
      description:
        "Sistemas de machine learning orientados a producción para automatización operativa y pilotos viables en México.",
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
      cta: "Talk Through Your Workflow",
      closeMenu: "Close menu",
      openMenu: "Open menu",
      brandAriaLabel: `Go to ${SITE_NAME} homepage`,
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
        "Start with a workflow review before committing to a larger implementation.",
      cta: "Talk Through Your Workflow",
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
        primaryCta: "Talk Through Your Workflow",
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
        cta: "Talk Through Your Workflow",
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
        cta: "Talk Through Your Workflow",
      },
      contact: {
        badge: "Workflow review",
        title: "Start with a",
        titleAccent: "clear workflow review",
        body:
          "The goal is to decide whether a pilot is justified, what the first workflow should be, and what could block production use.",
        methods: [
          {
            title: "Email Your Workflow",
            description: "Share the process, blockers, and systems involved.",
            contact: CONTACT_EMAIL,
            action: "Send Email",
            href: createMailto(CONTACT_SUBJECTS.workflowReview),
          },
          {
            title: "Start the Conversation",
            description: "Use the primary CTA if you want to start with scope, workflow friction, and delivery constraints.",
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
        checklistTitle: "What to bring to the conversation",
        checklist: [
          "The workflow you want to improve",
          "The systems or documents involved",
          "Where humans still intervene today",
          "How you would judge a pilot as successful",
        ],
        ctaCardTitle: "Start a workflow review",
        ctaCardBody:
          "Share one workflow, one constraint, and what success would look like. The first conversation should make the next decision obvious.",
        ctaPrimary: `Email ${SITE_NAME}`,
        ctaSecondary: "View demos hub",
      },
      metadata: {
        title: "Production-minded machine learning systems",
        description:
          "Production-minded machine learning systems for workflow automation, forecasting, and credible pilots across North America and Latin America.",
        keywords: [
          "machine learning services",
          "workflow automation ai",
          "computer vision services",
          "document intelligence solutions",
          "predictive analytics consulting",
        ],
      },
    },
    demos: {
      badge: "Live workflows, not generic AI demos",
      title: "Machine learning demos for real operational workflows",
      body:
        "Explore the workflow first, test the interaction pattern second, and use the workflow review CTA when a pilot starts to look justified.",
      primaryCta: "Talk Through Your Workflow",
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
        keywords: [
          "machine learning demos",
          "computer vision demo",
          "document intelligence demo",
          "predictive analytics demo",
          "custom ai model demo",
        ],
      },
    },
    demoTemplate: {
      backToServices: "Back to Services",
      helpsTitle: "Where this demo helps",
      helpsBody: "Use the workflow framing to decide if a pilot is worth scoping.",
      reviewTitle: "What to bring to the conversation",
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
      ctaTitle: "Bring one concrete workflow to the first conversation",
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
      siteName: SITE_NAME,
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
