import {
  Eye,
  MessageSquare,
  Brain,
  TrendingUp,
  Database,
  Layers,
  Target,
  Cpu,
  Code,
  Zap,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { CONTACT_SUBJECTS, createMailto } from "@/lib/site";

export interface DemoMetric {
  label: string;
  value: string;
  description: string;
}

export interface ArchitectureComponent {
  title: string;
  description: string;
  icon: string; // Icon name identifier
  details: string[];
}

export interface TechnicalChallenge {
  challenge: string;
  solution: string;
  impact: string;
}

export interface PipelineStage {
  stage: string;
  icon: string; // Icon name identifier
  description: string;
  technologies: string[];
}

export interface DemoContent {
  // Hero section
  title: string;
  subtitle: string;
  badge: string;
  badgeIcon: string; // Icon name identifier
  workflowTitle: string;
  workflowSummary: string;
  problemStatement: string;
  outcomes: string[];
  bestFit: string[];
  notFit: string[];
  reviewChecklist: string[];
  primaryCtaHref: string;
  secondaryCtaHref: string;

  // Metrics
  metrics: DemoMetric[];

  // Interactive demo
  demoId: string;
  demoTitle: string;
  demoDescription: string;
  demoCategory: 'computer-vision' | 'nlp' | 'predictive' | 'deep-learning';
  demoTechnologies: string[];

  // Architecture
  architectureTitle: string;
  architectureSubtitle: string;
  architectureComponents: ArchitectureComponent[];

  // Challenges & Solutions
  challengesTitle: string;
  challengesSubtitle: string;
  challenges: TechnicalChallenge[];

  // Implementation (optional - some demos might have different structures)
  implementationTitle?: string;
  pipelineStages?: PipelineStage[];
  trainingPhases?: Array<{
    phase: string;
    duration: string;
    description: string;
    techniques: string[];
  }>;

  // Call to action
  ctaTitle: string;
  ctaSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryCtaIcon: string; // Icon name identifier
}

// Icon map moved outside to avoid recreation
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Eye,
  MessageSquare,
  Brain,
  TrendingUp,
  Database,
  Layers,
  Target,
  Cpu,
  Code,
  Zap,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
};

// Helper function to get icon component by name
export function getIconComponent(iconName: string) {
  return iconMap[iconName] || Eye; // Default to Eye if not found
}

// Computer Vision Demo Data
export const computerVisionDemo: DemoContent = {
  title: "Object Detection Interface",
  subtitle: "Interactive object detection powered by COCO-SSD. Identify 80+ classes of objects in uploaded images with instant feedback.",
  badge: "Computer Vision",
  badgeIcon: "Eye",
  workflowTitle: "Computer vision for inspection, capture, and exception review",
  workflowSummary: "Use computer vision where operators are still manually inspecting images, validating documents, or reviewing visual exceptions that slow throughput.",
  problemStatement: "This is most useful when the team has a repeatable visual workflow, enough examples to evaluate quality, and a clear handoff path when the model is uncertain.",
  outcomes: [
    "Reduce manual image or document review volume",
    "Surface edge cases for human review instead of checking every item",
    "Speed up quality checks and visual exception handling",
  ],
  bestFit: [
    "Inspection queues with recurring visual patterns",
    "Document capture or intake with image-based verification",
    "Teams that can define confidence thresholds and fallback rules",
  ],
  notFit: [
    "One-off visual tasks with no repeat volume",
    "Workflows with no labeled examples or review baseline",
    "Projects expecting full autonomy on day one",
  ],
  reviewChecklist: [
    "Sample images or documents from the real workflow",
    "Current review rules or escalation logic",
    "Tolerance for false positives and false negatives",
  ],
  primaryCtaHref: createMailto(CONTACT_SUBJECTS.computerVision),
  secondaryCtaHref: "/demos",

  metrics: [
    { label: "Workflow", value: "Inspection", description: "Visual review and exception handling" },
    { label: "Pilot Shape", value: "Narrow", description: "Start with one document or image flow" },
    { label: "Human Role", value: "In Loop", description: "Review uncertain results before action" },
    { label: "Demo Type", value: "Live", description: "Interactive object detection experience" },
  ],

  demoId: "computer-vision",
  demoTitle: "Interactive Object Detection",
  demoDescription: "Upload any image to instantly detect and classify objects. Visualizes bounding boxes and confidence scores for 80+ standard categories.",
  demoCategory: "computer-vision",
  demoTechnologies: ["COCO-SSD", "TensorFlow.js", "Server Actions", "React"],

  architectureTitle: "System Architecture",
  architectureSubtitle: "Built on the Single Shot MultiBox Detector (SSD) architecture",
  architectureComponents: [
    {
      title: "Image Preprocessing",
      description: "Client-side optimization and normalization",
      icon: "Database",
      details: [
        "Automatic image resizing",
        "Format validation & conversion",
        "Tensor normalization (0-1 range)",
        "Batch dimension expansion"
      ]
    },
    {
      title: "MobileNet Backbone",
      description: "Efficient feature extraction network",
      icon: "Layers",
      details: [
        "Depthwise separable convolutions",
        "Inverted residual blocks",
        "Linear bottlenecks",
        "Low-latency execution"
      ]
    },
    {
      title: "SSD Detection Head",
      description: "Single Shot MultiBox Detector",
      icon: "Target",
      details: [
        "Multi-scale feature maps",
        "Anchor box generation",
        "Class probability prediction",
        "Bounding box regression"
      ]
    },
    {
      title: "Post-Processing",
      description: "Result filtering and formatting",
      icon: "Cpu",
      details: [
        "Non-Maximum Suppression (NMS)",
        "Confidence threshold filtering",
        "Coordinate rescaling",
        "JSON result serialization"
      ]
    }
  ],

  challengesTitle: "Engineering Challenges",
  challengesSubtitle: "Optimizing computer vision for web deployment",
  challenges: [
    {
      challenge: "Inference Latency",
      solution: "Server-side TensorFlow execution",
      impact: "Fast, consistent response times"
    },
    {
      challenge: "Model Size vs Accuracy",
      solution: "MobileNet V2 architecture",
      impact: "Good balance of speed and precision"
    },
    {
      challenge: "Input Variation",
      solution: "Robust image preprocessing pipeline",
      impact: "Handles diverse resolutions and formats"
    },
    {
      challenge: "Result Visualization",
      solution: "Responsive bounding box overlay system",
      impact: "Accurate mapping across device sizes"
    }
  ],

  implementationTitle: "Processing Pipeline",
  pipelineStages: [
    {
      stage: "User Upload",
      icon: "Database",
      description: "Secure file handling",
      technologies: ["React Dropzone", "Client-side Preview", "File Validation"]
    },
    {
      stage: "Server Action",
      icon: "Code",
      description: "Request processing",
      technologies: ["Next.js Server Actions", "FormData Handling", "Error Management"]
    },
    {
      stage: "Model Inference",
      icon: "Brain",
      description: "Object detection",
      technologies: ["TensorFlow.js Node", "COCO-SSD Model", "Tensor Operations"]
    },
    {
      stage: "Response Rendering",
      icon: "Zap",
      description: "Visual feedback",
      technologies: ["Framer Motion", "Canvas/CSS Overlay", "Statistical Summary"]
    }
  ],

  ctaTitle: "Integrate Vision Capabilities",
  ctaSubtitle: "Add powerful object detection to your applications. From automated tagging to visual search, we build scalable computer vision solutions.",
  primaryCta: "Talk Through Your Workflow",
  secondaryCta: "See All Demos",
  secondaryCtaIcon: "Code"
};

// NLP Demo Data
export const nlpDemo: DemoContent = {
  title: "RAG Document Analysis",
  subtitle: "Production-grade RAG system. Upload documents to query content using Gemini 2.5 Pro. No training required.",
  badge: "NLP Production",
  badgeIcon: "MessageSquare",
  workflowTitle: "Document intelligence for triage, search, and operator support",
  workflowSummary: "Use NLP when teams are spending too much time searching through documents, answering the same questions, or routing text-heavy work manually.",
  problemStatement: "The value comes from grounded retrieval and clear operator workflows, not from dropping an LLM into the stack without context boundaries.",
  outcomes: [
    "Reduce time spent searching through PDFs, DOCX files, or policy docs",
    "Improve intake triage and internal answer quality",
    "Give operators a faster path to evidence-backed responses",
  ],
  bestFit: [
    "Internal knowledge or document-heavy workflows",
    "Teams that need grounded answers instead of generic chat",
    "Review flows with repeat questions and repeat source material",
  ],
  notFit: [
    "Use cases with no clear source documents",
    "High-stakes answers without a human validation step",
    "Workflows that require a full enterprise search platform on day one",
  ],
  reviewChecklist: [
    "Representative documents from the current workflow",
    "The questions teams ask most often",
    "Rules for citation, escalation, or human approval",
  ],
  primaryCtaHref: createMailto(CONTACT_SUBJECTS.documentIntelligence),
  secondaryCtaHref: "/demos",

  metrics: [
    { label: "Workflow", value: "Document QA", description: "Search, triage, and answer assistance" },
    { label: "Input", value: "PDF + DOCX", description: "Grounded against uploaded files" },
    { label: "Human Role", value: "Reviewer", description: "Operators validate before action" },
    { label: "Demo Type", value: "Live", description: "Interactive RAG experience" },
  ],

  demoId: "nlp-analysis",
  demoTitle: "Production RAG Interface",
  demoDescription: "Instructions: 1. Drag & drop a PDF or DOCX file (max 10MB). 2. Wait for text extraction. 3. Ask specific questions about the content.\n\nTechnical Note: Uses Next.js Server Actions to process files securely in memory. No data is persisted. Context is injected dynamically into Gemini 2.5 Pro for grounded responses.",
  demoCategory: "nlp",
  demoTechnologies: ["Gemini 2.5 Pro", "Vertex AI", "Next.js 14", "React Server Actions"],

  architectureTitle: "RAG Pipeline Architecture",
  architectureSubtitle: "How we process and retrieve information without vector DBs (for single doc)",
  architectureComponents: [
    {
      title: "Ingestion Layer",
      description: "File parsing and normalization",
      icon: "Database",
      details: [
        "pdf-parse for PDF extraction",
        "mammoth for DOCX conversion",
        "In-memory buffer processing",
        "Whitespace normalization"
      ]
    },
    {
      title: "Context Injection",
      description: "Dynamic prompt engineering",
      icon: "Layers",
      details: [
        "Full-text context window insertion",
        "System instruction priming",
        "Role-based history management",
        "Token usage optimization"
      ]
    },
    {
      title: "Gemini 2.5 Pro",
      description: "Reasoning engine",
      icon: "Brain",
      details: [
        "2M token context window",
        "Multimodal capabilities",
        "Native reasoning on long text",
        "Low-latency generation"
      ]
    },
    {
      title: "Server Actions",
      description: "Secure transport layer",
      icon: "Cpu",
      details: [
        "Direct client-to-cloud communication",
        "Type-safe interfaces",
        "Streaming response handling",
        "Error boundary management"
      ]
    }
  ],

  challengesTitle: "Production Challenges",
  challengesSubtitle: "Optimizing RAG for real-world use",
  challenges: [
    {
      challenge: "File Format Variance",
      solution: "Multi-library parsing strategy",
      impact: "Reliable extraction from dirty PDFs"
    },
    {
      challenge: "Context Limits",
      solution: "Gemini 2.5 Pro's extended window",
      impact: "No need for chunking/vector DB for <2M tokens"
    },
    {
      challenge: "Latency",
      solution: "Vertex AI streaming API",
      impact: "Reduced round-trip overhead"
    },
    {
      challenge: "Data Privacy",
      solution: "Ephemeral processing",
      impact: "Zero data retention on server"
    }
  ],

  implementationTitle: "Processing Workflow",
  pipelineStages: [
    {
      stage: "Upload & Validation",
      icon: "Database",
      description: "Client-side checks",
      technologies: ["React Dropzone", "MIME type validation", "Size limits (10MB)"]
    },
    {
      stage: "Text Extraction",
      icon: "Code",
      description: "Server-side parsing",
      technologies: ["Buffer conversion", "pdf-parse", "mammoth"]
    },
    {
      stage: "Context Construction",
      icon: "Layers",
      description: "Prompt assembly",
      technologies: ["Template interpolation", "History formatting"]
    },
    {
      stage: "LLM Inference",
      icon: "Zap",
      description: "Answer generation",
      technologies: ["Vertex AI SDK", "Gemini 2.5 Pro"]
    }
  ],

  ctaTitle: "Deploy Your RAG System",
  ctaSubtitle: "Stop searching, start finding. Integrate document intelligence into your workflow today.",
  primaryCta: "Talk Through Your Workflow",
  secondaryCta: "See All Demos",
  secondaryCtaIcon: "Code"
};

// Deep Learning Demo Data
export const deepLearningDemo: DemoContent = {
  title: "Neural Architecture Design",
  subtitle: "Design and train custom deep learning models. Visual tools for architecture search and optimization.",
  badge: "Deep Learning",
  badgeIcon: "Brain",
  workflowTitle: "Custom models when the workflow is too specific for off-the-shelf tools",
  workflowSummary: "Deep learning belongs later in the sales story: after the team has confirmed the workflow matters, the data exists, and packaged tools are not enough.",
  problemStatement: "This page should help buyers understand when custom modeling is justified, what complexity it adds, and how to keep the first build narrowly scoped.",
  outcomes: [
    "Model around domain-specific accuracy constraints",
    "Handle edge cases generic tooling misses",
    "Design evaluation and deployment constraints before training starts",
  ],
  bestFit: [
    "A proven workflow with meaningful operational leverage",
    "Existing data and a measurable quality target",
    "A clear reason off-the-shelf models are not sufficient",
  ],
  notFit: [
    "Exploratory AI interest with no workflow owner",
    "No labeled data or no evaluation baseline",
    "Teams looking for fast wins that a narrower automation pilot could deliver",
  ],
  reviewChecklist: [
    "Why current models or vendors are insufficient",
    "What quality threshold would justify a pilot",
    "What inference, latency, or governance constraints matter",
  ],
  primaryCtaHref: createMailto(CONTACT_SUBJECTS.customModeling),
  secondaryCtaHref: "/demos",

  metrics: [
    { label: "Workflow", value: "Custom Fit", description: "For domain-specific accuracy demands" },
    { label: "Project Shape", value: "Scoped", description: "Start after workflow and data are validated" },
    { label: "Primary Risk", value: "Complexity", description: "Modeling adds cost and operational overhead" },
    { label: "Demo Type", value: "Concept", description: "Architecture and training exploration" },
  ],

  demoId: "deep-learning",
  demoTitle: "Neural Architecture Explorer",
  demoDescription: "Custom deep learning model design and real-time training visualization.",
  demoCategory: "deep-learning",
  demoTechnologies: ["PyTorch", "CUDA", "TensorBoard"],

  architectureTitle: "Neural Architecture Layers",
  architectureSubtitle: "Building blocks of the deep learning system",
  architectureComponents: [
    {
      title: "Input Layer",
      description: "Data preprocessing and normalization",
      icon: "Database",
      details: [
        "Batch normalization (mean=0, std=1)",
        "Data augmentation pipelines",
        "Feature scaling and encoding",
        "Dropout regularization (0.2)"
      ]
    },
    {
      title: "Convolutional Blocks",
      description: "ResNet-style residual connections",
      icon: "Layers",
      details: [
        "3x3 convolutions with stride 1",
        "Batch normalization + ReLU",
        "1x1 bottleneck reductions",
        "Skip connections for gradient flow"
      ]
    },
    {
      title: "Attention Mechanism",
      description: "Multi-head self-attention",
      icon: "Brain",
      details: [
        "Scaled dot-product attention",
        "8 attention heads parallel processing",
        "Positional encoding addition",
        "Layer normalization + residual"
      ]
    },
    {
      title: "Output Layer",
      description: "Task-specific heads",
      icon: "Target",
      details: [
        "Global average pooling",
        "Fully connected classification",
        "Softmax probability distribution",
        "Confidence thresholding"
      ]
    }
  ],

  challengesTitle: "Technical Solutions",
  challengesSubtitle: "Solving common deep learning challenges",
  challenges: [
    {
      challenge: "Vanishing Gradients",
      solution: "Residual connections and batch normalization",
      impact: "Enabled training of 100+ layer networks"
    },
    {
      challenge: "Overfitting Prevention",
      solution: "Multi-stage regularization techniques",
      impact: "Consistent performance on unseen data"
    },
    {
      challenge: "Computational Scalability",
      solution: "Mixed precision training and gradient accumulation",
      impact: "4x faster training"
    },
    {
      challenge: "Model Interpretability",
      solution: "Attention visualization and feature attribution",
      impact: "Clear understanding of model decisions"
    }
  ],

  implementationTitle: "Training Pipeline",
  trainingPhases: [
    {
      phase: "Data Preparation",
      duration: "15%",
      description: "Dataset curation and preprocessing",
      techniques: ["Data normalization", "Augmentation", "Class balancing", "Cross-validation splits"]
    },
    {
      phase: "Architecture Design",
      duration: "20%",
      description: "Network design and hyperparameter optimization",
      techniques: ["Grid search", "Random search", "Bayesian optimization", "Neural architecture search"]
    },
    {
      phase: "Training Execution",
      duration: "50%",
      description: "Distributed training with monitoring",
      techniques: ["Multi-GPU training", "Gradient checkpointing", "Learning rate scheduling", "Model checkpointing"]
    },
    {
      phase: "Model Optimization",
      duration: "15%",
      description: "Post-training quantization and deployment",
      techniques: ["Model pruning", "Quantization", "Knowledge distillation", "ONNX conversion"]
    }
  ],

  ctaTitle: "Build Custom Models",
  ctaSubtitle: "Design, train, and deploy custom deep learning models that solve your unique business challenges.",
  primaryCta: "Talk Through Your Workflow",
  secondaryCta: "See All Demos",
  secondaryCtaIcon: "Layers"
};

// Predictive Analytics Demo Data
export const predictiveAnalyticsDemo: DemoContent = {
  title: "Predictive Analytics System",
  subtitle: "Real-time forecasting and anomaly detection for time-series data.",
  badge: "Predictive Analytics",
  badgeIcon: "TrendingUp",
  workflowTitle: "Forecasting and anomaly detection for planning and risk response",
  workflowSummary: "Use predictive analytics when teams need earlier signals for demand shifts, failures, or operational anomalies, not just prettier dashboards.",
  problemStatement: "The best pilots focus on one decision window, one planning workflow, and one action the team can take when the model flags risk.",
  outcomes: [
    "Give teams earlier warning before expensive issues materialize",
    "Improve planning with clearer forecast signals",
    "Route anomaly review to operators before the problem expands",
  ],
  bestFit: [
    "Recurring operational decisions with historical data",
    "Teams that already react to trends or anomalies manually",
    "A workflow where better timing changes outcomes",
  ],
  notFit: [
    "No stable historical data or no business action tied to the forecast",
    "Requests for long-range forecasting without clear operational use",
    "Projects that only want another dashboard layer",
  ],
  reviewChecklist: [
    "Historical data used in the current planning process",
    "The decision window that matters most",
    "What operators do today when they spot an issue",
  ],
  primaryCtaHref: createMailto(CONTACT_SUBJECTS.predictiveAnalytics),
  secondaryCtaHref: "/demos",

  metrics: [
    { label: "Workflow", value: "Planning", description: "Forecasting and anomaly-driven decisions" },
    { label: "Pilot Shape", value: "One Window", description: "Focus on one planning or maintenance motion" },
    { label: "Human Role", value: "Decision Maker", description: "Operators act on signals, not raw scores" },
    { label: "Demo Type", value: "Concept", description: "Illustrates prediction and alerting patterns" },
  ],

  demoId: "predictive-analytics",
  demoTitle: "Predictive Maintenance Engine",
  demoDescription: "Predicts equipment failures before they occur.",
  demoCategory: "predictive",
  demoTechnologies: ["Scikit-learn", "Time Series", "AWS"],

  architectureTitle: "Forecasting Algorithms",
  architectureSubtitle: "Mathematical foundations of the predictive models",
  architectureComponents: [
    {
      title: "ARIMA/SARIMA",
      description: "Statistical forecasting with seasonal decomposition",
      icon: "BarChart3",
      details: [
        "Auto-regressive integrated moving average",
        "Seasonal trend decomposition",
        "Differencing for stationarity",
        "ACF/PACF analysis for parameters"
      ]
    },
    {
      title: "Prophet Framework",
      description: "Additive regression model",
      icon: "TrendingUp",
      details: [
        "Trend + seasonality + holidays",
        "Automatic change point detection",
        "Bayesian inference for uncertainty",
        "Multiple seasonality handling"
      ]
    },
    {
      title: "LSTM Networks",
      description: "Deep learning for sequential patterns",
      icon: "Activity",
      details: [
        "Long short-term memory cells",
        "Sequence-to-sequence prediction",
        "Attention mechanisms",
        "Multi-variate input handling"
      ]
    },
    {
      title: "Gradient Boosting",
      description: "Ensemble learning for regression",
      icon: "Target",
      details: [
        "XGBoost/LightGBM implementation",
        "Feature importance analysis",
        "Early stopping optimization",
        "Cross-validation tuning"
      ]
    }
  ],

  challengesTitle: "Innovation Challenges",
  challengesSubtitle: "Solving challenges in predictive modeling",
  challenges: [
    {
      challenge: "Data Quality Issues",
      solution: "Multi-stage preprocessing with anomaly detection",
      impact: "95% reduction in errors"
    },
    {
      challenge: "Concept Drift",
      solution: "Online learning with adaptive model updates",
      impact: "Maintained accuracy over time"
    },
    {
      challenge: "Cold Start Problem",
      solution: "Transfer learning from similar domains",
      impact: "Immediate predictions"
    },
    {
      challenge: "Uncertainty Quantification",
      solution: "Ensemble methods and confidence intervals",
      impact: "Actionable uncertainty estimates"
    }
  ],

  implementationTitle: "Production Architecture",
  pipelineStages: [
    {
      stage: "Data Ingestion",
      icon: "Database",
      description: "Real-time data collection",
      technologies: ["Apache Kafka", "AWS Kinesis", "Time-series DB"]
    },
    {
      stage: "Feature Engineering",
      icon: "Code",
      description: "Automated feature extraction",
      technologies: ["Pandas", "Featuretools", "Custom ETL"]
    },
    {
      stage: "Model Training",
      icon: "Cpu",
      description: "Distributed training",
      technologies: ["MLflow", "Optuna", "Distributed computing"]
    },
    {
      stage: "Prediction Serving",
      icon: "Zap",
      description: "Low-latency inference",
      technologies: ["FastAPI", "Redis", "Prometheus"]
    }
  ],

  ctaTitle: "Start Forecasting",
  ctaSubtitle: "Anticipate trends and prevent failures with predictive models.",
  primaryCta: "Talk Through Your Workflow",
  secondaryCta: "See All Demos",
  secondaryCtaIcon: "Clock"
};

export type DemoKey =
  | "computerVision"
  | "nlp"
  | "deepLearning"
  | "predictiveAnalytics";

type DemoContentOverrides = Partial<DemoContent> & {
  metrics?: DemoMetric[];
  outcomes?: string[];
  bestFit?: string[];
  notFit?: string[];
  reviewChecklist?: string[];
};

const demoMap: Record<DemoKey, DemoContent> = {
  computerVision: computerVisionDemo,
  nlp: nlpDemo,
  deepLearning: deepLearningDemo,
  predictiveAnalytics: predictiveAnalyticsDemo,
};

const localizedDemoOverrides: Record<"es" | "en", Partial<Record<DemoKey, DemoContentOverrides>>> = {
  es: {
    computerVision: {
      title: "Interfaz de deteccion de objetos",
      subtitle:
        "Deteccion interactiva de objetos con COCO-SSD. Identifica 80+ clases en imagenes cargadas con retroalimentacion inmediata.",
      badge: "Vision por computadora",
      workflowTitle: "Vision por computadora para inspeccion, captura y revision de excepciones",
      workflowSummary:
        "Usa vision por computadora donde los operadores aun inspeccionan imagenes, validan documentos o revisan excepciones visuales que frenan el throughput.",
      problemStatement:
        "Esto funciona mejor cuando el equipo tiene un flujo visual repetible, suficientes ejemplos para evaluar calidad y una ruta clara de handoff cuando el modelo tiene baja confianza.",
      outcomes: [
        "Reducir volumen de revision manual de imagenes o documentos",
        "Escalar solo casos borde a revision humana en vez de revisar todo",
        "Acelerar controles de calidad y manejo de excepciones visuales",
      ],
      bestFit: [
        "Colas de inspeccion con patrones visuales recurrentes",
        "Captura documental o intake con verificacion basada en imagen",
        "Equipos que pueden definir umbrales de confianza y reglas de fallback",
      ],
      notFit: [
        "Tareas visuales aisladas sin volumen recurrente",
        "Flujos sin ejemplos etiquetados ni linea base de revision",
        "Proyectos que esperan autonomia total desde el dia uno",
      ],
      reviewChecklist: [
        "Imagenes o documentos reales del flujo",
        "Reglas actuales de revision o escalamiento",
        "Tolerancia a falsos positivos y falsos negativos",
      ],
      metrics: [
        { label: "Flujo", value: "Inspeccion", description: "Revision visual y manejo de excepciones" },
        { label: "Piloto", value: "Acotado", description: "Empieza con un solo flujo documental o visual" },
        { label: "Humano", value: "En ciclo", description: "Revisa resultados inciertos antes de actuar" },
        { label: "Demo", value: "En vivo", description: "Experiencia interactiva de deteccion de objetos" },
      ],
      demoDescription:
        "Sube una imagen y prueba un patron de deteccion de objetos para inspeccion visual y excepciones operativas.",
      architectureTitle: "Arquitectura del sistema",
      architectureSubtitle:
        "Arquitectura pensada para deteccion visual con restricciones reales de interfaz y despliegue.",
      architectureComponents: [
        {
          title: "Preprocessing de imagen",
          description: "Optimizacion y normalizacion en el cliente",
          icon: "Database",
          details: [
            "Redimensionado automatico de imagen",
            "Validacion y conversion de formato",
            "Normalizacion de tensor (rango 0-1)",
            "Expansion de dimension de batch",
          ],
        },
        {
          title: "Backbone MobileNet",
          description: "Red eficiente para extraccion de features",
          icon: "Layers",
          details: [
            "Depthwise separable convolutions",
            "Inverted residual blocks",
            "Linear bottlenecks",
            "Ejecucion de baja latencia",
          ],
        },
        {
          title: "Cabezal SSD",
          description: "Single Shot MultiBox Detector",
          icon: "Target",
          details: [
            "Multi-scale feature maps",
            "Generacion de anchor boxes",
            "Prediccion de probabilidades por clase",
            "Bounding box regression",
          ],
        },
        {
          title: "Post-processing",
          description: "Filtrado y formateo de resultados",
          icon: "Cpu",
          details: [
            "Non-Maximum Suppression (NMS)",
            "Filtrado por confidence threshold",
            "Reescalado de coordenadas",
            "Serializacion de resultados en JSON",
          ],
        },
      ],
      challengesTitle: "Retos de implementacion",
      challengesSubtitle: "Compensaciones tipicas al llevar vision por computadora a un flujo real",
      challenges: [
        {
          challenge: "Latencia de inference",
          solution: "Ejecucion de TensorFlow del lado del servidor",
          impact: "Tiempos de respuesta rapidos y consistentes",
        },
        {
          challenge: "Tamano del modelo vs accuracy",
          solution: "Arquitectura MobileNet V2",
          impact: "Buen balance entre velocidad y precision",
        },
        {
          challenge: "Variacion en los inputs",
          solution: "Pipeline robusto de preprocessing de imagen",
          impact: "Maneja resoluciones y formatos diversos",
        },
        {
          challenge: "Visualizacion de resultados",
          solution: "Sistema responsivo de overlays para bounding boxes",
          impact: "Mapeo preciso en distintos tamanos de pantalla",
        },
      ],
      implementationTitle: "Pipeline operativo",
      ctaTitle: "Empieza una revision para vision por computadora",
      ctaSubtitle: "Revisa datos, tolerancias y handoffs antes de escalar un build.",
      primaryCta: "Hablar sobre tu flujo",
      secondaryCta: "Ver todos los demos",
    },
    nlp: {
      title: "Analisis documental con RAG",
      subtitle:
        "Sistema RAG orientado a produccion. Carga documentos para consultar su contenido con Gemini 2.5 Pro, sin entrenamiento adicional.",
      badge: "Procesamiento de lenguaje natural",
      workflowTitle: "Inteligencia documental para triage, busqueda y soporte al operador",
      workflowSummary:
        "Aplica NLP cuando el equipo navega demasiados documentos, correos o conocimiento interno antes de decidir o responder.",
      problemStatement:
        "Es mas util cuando existen fuentes documentales claras, preguntas recurrentes y necesidad de respuestas trazables en lugar de texto inventado.",
      outcomes: [
        "Reducir tiempo de busqueda y lectura manual",
        "Ordenar intake o triage segun contexto del documento",
        "Dar soporte al operador con respuestas fundamentadas",
      ],
      bestFit: [
        "Equipos con volumen alto de documentos o tickets",
        "Casos donde importa citar la fuente de respuesta",
        "Flujos donde el humano sigue decidiendo pero con mejor contexto",
      ],
      notFit: [
        "Base documental desordenada o sin permisos definidos",
        "Casos que exigen respuestas sin fuente verificable",
        "Expectativa de reemplazar criterio humano complejo de inmediato",
      ],
      reviewChecklist: [
        "Tipos de documento o fuentes involucradas",
        "Preguntas recurrentes o decisiones que hoy toman personas",
        "Restricciones de privacidad, permisos o trazabilidad",
      ],
      metrics: [
        { label: "Flujo", value: "Triage", description: "Busqueda, lectura y soporte fundamentado" },
        { label: "Piloto", value: "Acotado", description: "Empieza con un corpus o proceso especifico" },
        { label: "Humano", value: "Supervisa", description: "El operador valida respuestas y acciones" },
        { label: "Demo", value: "RAG", description: "Chat con contexto documental cargado" },
      ],
      demoDescription:
        "Carga un documento y prueba una experiencia RAG enfocada en preguntas trazables y soporte operativo.",
      architectureTitle: "Arquitectura del pipeline RAG",
      architectureSubtitle:
        "Pipeline de recuperacion y respuesta pensado para mantener contexto, trazabilidad y control humano.",
      architectureComponents: [
        {
          title: "Capa de ingestion",
          description: "Parsing y normalizacion de archivos",
          icon: "Database",
          details: [
            "pdf-parse para extraccion de PDF",
            "mammoth para conversion de DOCX",
            "Procesamiento en memoria con buffers",
            "Normalizacion de espacios en blanco",
          ],
        },
        {
          title: "Context injection",
          description: "Prompt engineering dinamico",
          icon: "Layers",
          details: [
            "Insercion del contexto completo en la window",
            "System instruction priming",
            "Manejo del historial por roles",
            "Optimizacion de uso de tokens",
          ],
        },
        {
          title: "Gemini 2.5 Pro",
          description: "Motor de razonamiento",
          icon: "Brain",
          details: [
            "Context window de 2M tokens",
            "Capacidades multimodales",
            "Reasoning nativo sobre texto largo",
            "Generacion de baja latencia",
          ],
        },
        {
          title: "Server Actions",
          description: "Capa segura de transporte",
          icon: "Cpu",
          details: [
            "Comunicacion directa entre cliente y cloud",
            "Interfaces type-safe",
            "Manejo de respuestas en streaming",
            "Error boundary management",
          ],
        },
      ],
      challengesTitle: "Retos de implementacion",
      challengesSubtitle: "Decisiones tecnicas para retrieval, grounding y seguridad del contexto",
      challenges: [
        {
          challenge: "Variacion en formatos de archivo",
          solution: "Estrategia de parsing con multiples librerias",
          impact: "Extraccion confiable incluso desde PDFs complejos",
        },
        {
          challenge: "Limites de contexto",
          solution: "Context window extendida de Gemini 2.5 Pro",
          impact: "Evita chunking o vector DB en documentos menores a 2M tokens",
        },
        {
          challenge: "Latencia",
          solution: "Streaming API de Vertex AI",
          impact: "Reduce overhead de ida y vuelta",
        },
        {
          challenge: "Privacidad de datos",
          solution: "Procesamiento efimero",
          impact: "Cero retencion de datos en el servidor",
        },
      ],
      implementationTitle: "Pipeline de implementacion",
      demoTitle: "Interfaz RAG orientada a produccion",
      ctaTitle: "Evalua un piloto de inteligencia documental",
      ctaSubtitle: "Empieza con un corpus claro, preguntas repetitivas y criterios de confianza.",
      primaryCta: "Hablar sobre tu flujo",
      secondaryCta: "Ver todos los demos",
    },
    deepLearning: {
      title: "Diseno de arquitectura neuronal",
      subtitle:
        "Disena y entrena modelos de Deep Learning a medida. Herramientas visuales para explorar arquitecturas y optimizacion.",
      badge: "Deep learning",
      workflowTitle: "Modelado a medida para flujos donde lo generico no alcanza",
      workflowSummary:
        "Considera deep learning a medida cuando el flujo tiene patrones demasiado especificos para herramientas listas para usar y el impacto justifica el esfuerzo.",
      problemStatement:
        "Esto vale la pena cuando hay datos suficientes, una metrica clara de exito y una razon economica para superar soluciones estandar.",
      outcomes: [
        "Capturar senales especificas del dominio que un modelo generico no resuelve",
        "Disenar evaluacion y entrenamiento alrededor de una tarea concreta",
        "Alinear la arquitectura del modelo con restricciones reales de despliegue",
      ],
      bestFit: [
        "Problemas con estructura o contexto muy especifico del dominio",
        "Equipos con datos propios y criterio claro de calidad",
        "Casos donde una mejora de precision cambia una decision operativa",
      ],
      notFit: [
        "Problemas que una API generica ya resuelve suficientemente",
        "Equipos sin datos, labels ni responsable operativo",
        "Proyectos sin una ganancia clara frente a soluciones mas simples",
      ],
      reviewChecklist: [
        "Datos historicos y etiquetas disponibles",
        "Decision operativa que el modelo debe mejorar",
        "Restricciones de latencia, costo y mantenimiento",
      ],
      metrics: [
        { label: "Flujo", value: "Custom Fit", description: "Para necesidades de accuracy especificas del dominio" },
        { label: "Proyecto", value: "Acotado", description: "Empieza despues de validar flujo y datos" },
        { label: "Riesgo principal", value: "Complejidad", description: "El modelado agrega costo y carga operativa" },
        { label: "Tipo de demo", value: "Concepto", description: "Explora arquitectura y entrenamiento" },
      ],
      demoTitle: "Explorador de arquitecturas neuronales",
      demoDescription: "Diseno de modelos de Deep Learning y visualizacion del entrenamiento en tiempo real.",
      architectureTitle: "Capas de la arquitectura neuronal",
      architectureSubtitle: "Bloques de construccion del sistema de Deep Learning",
      architectureComponents: [
        {
          title: "Input layer",
          description: "Preprocessing y normalizacion de datos",
          icon: "Database",
          details: [
            "Batch normalization (mean=0, std=1)",
            "Pipelines de data augmentation",
            "Feature scaling y encoding",
            "Dropout regularization (0.2)",
          ],
        },
        {
          title: "Convolutional blocks",
          description: "Residual connections estilo ResNet",
          icon: "Layers",
          details: [
            "Convoluciones 3x3 con stride 1",
            "Batch normalization + ReLU",
            "Reducciones 1x1 tipo bottleneck",
            "Skip connections para gradient flow",
          ],
        },
        {
          title: "Attention mechanism",
          description: "Multi-head self-attention",
          icon: "Brain",
          details: [
            "Scaled dot-product attention",
            "8 attention heads en paralelo",
            "Adicion de positional encoding",
            "Layer normalization + residual",
          ],
        },
        {
          title: "Output layer",
          description: "Heads especificos por tarea",
          icon: "Target",
          details: [
            "Global average pooling",
            "Clasificacion fully connected",
            "Softmax probability distribution",
            "Aplicacion de confidence threshold",
          ],
        },
      ],
      challengesTitle: "Soluciones tecnicas",
      challengesSubtitle: "Como resolver retos comunes en Deep Learning",
      challenges: [
        {
          challenge: "Vanishing gradients",
          solution: "Residual connections y batch normalization",
          impact: "Permite entrenar redes de 100+ capas",
        },
        {
          challenge: "Prevencion de overfitting",
          solution: "Tecnicas de regularizacion en multiples etapas",
          impact: "Rendimiento consistente en datos no vistos",
        },
        {
          challenge: "Escalabilidad computacional",
          solution: "Mixed precision training y gradient accumulation",
          impact: "Entrenamiento hasta 4x mas rapido",
        },
        {
          challenge: "Interpretabilidad del modelo",
          solution: "Visualizacion de attention y feature attribution",
          impact: "Mayor claridad sobre las decisiones del modelo",
        },
      ],
      ctaTitle: "Determina si un modelo a medida esta justificado",
      ctaSubtitle: "Antes de entrenar, valida datos, criterio de exito y costo operacional.",
      primaryCta: "Hablar sobre tu flujo",
      secondaryCta: "Ver todos los demos",
    },
    predictiveAnalytics: {
      title: "Sistema de Predictive Analytics",
      subtitle: "Forecasting en tiempo real y deteccion de anomalias para series temporales.",
      badge: "Analitica predictiva",
      workflowTitle: "Pronostico y deteccion de anomalias para respuesta operativa temprana",
      workflowSummary:
        "Usa analitica predictiva cuando el equipo necesita anticipar demanda, riesgo o fallas antes de que el problema sea caro.",
      problemStatement:
        "Funciona mejor cuando hay historico util, una accion definida ante la alerta y una ventana de tiempo donde predecir temprano realmente cambia la operacion.",
      outcomes: [
        "Anticipar cambios de demanda o carga de trabajo",
        "Detectar anomalias antes de que se conviertan en incidentes costosos",
        "Dar senales tempranas para planeacion y respuesta",
      ],
      bestFit: [
        "Procesos con historico y patron temporal util",
        "Equipos que pueden actuar sobre alertas o pronosticos",
        "Casos donde una mejor anticipacion reduce costo o riesgo",
      ],
      notFit: [
        "Series sin suficiente historia o con senal muy debil",
        "Organizaciones que no actuaran distinto aunque haya prediccion",
        "Problemas sin definicion clara de horizonte o umbral de alerta",
      ],
      reviewChecklist: [
        "Fuente y frecuencia de los datos historicos",
        "Decision operativa gatillada por la prediccion",
        "Horizonte util y tolerancia al error",
      ],
      metrics: [
        { label: "Flujo", value: "Planeacion", description: "Pronostico y respuesta a anomalias" },
        { label: "Piloto", value: "Acotado", description: "Empieza con un indicador y un horizonte" },
        { label: "Humano", value: "Decide", description: "El equipo valida y actua sobre la senal" },
        { label: "Demo", value: "Analitica", description: "Patron interactivo de prediccion" },
      ],
      demoTitle: "Motor de predictive maintenance",
      demoDescription: "Predice fallas en equipos antes de que ocurran.",
      architectureTitle: "Algoritmos de forecasting",
      architectureSubtitle: "Fundamentos matematicos de los modelos predictivos",
      architectureComponents: [
        {
          title: "ARIMA/SARIMA",
          description: "Forecasting estadistico con seasonal decomposition",
          icon: "BarChart3",
          details: [
            "Auto-regressive integrated moving average",
            "Seasonal trend decomposition",
            "Differencing para stationarity",
            "Analisis ACF/PACF para parametros",
          ],
        },
        {
          title: "Prophet Framework",
          description: "Modelo aditivo de regresion",
          icon: "TrendingUp",
          details: [
            "Trend + seasonality + holidays",
            "Deteccion automatica de change points",
            "Bayesian inference para incertidumbre",
            "Manejo de multiple seasonality",
          ],
        },
        {
          title: "LSTM Networks",
          description: "Deep Learning para patrones secuenciales",
          icon: "Activity",
          details: [
            "Long short-term memory cells",
            "Prediccion sequence-to-sequence",
            "Attention mechanisms",
            "Manejo de input multivariable",
          ],
        },
        {
          title: "Gradient Boosting",
          description: "Ensemble learning para regresion",
          icon: "Target",
          details: [
            "Implementacion con XGBoost/LightGBM",
            "Analisis de feature importance",
            "Optimizacion con early stopping",
            "Cross-validation tuning",
          ],
        },
      ],
      challengesTitle: "Retos de implementacion",
      challengesSubtitle: "Como resolver retos comunes en modelado predictivo",
      challenges: [
        {
          challenge: "Problemas de calidad de datos",
          solution: "Preprocessing en multiples etapas con deteccion de anomalias",
          impact: "Reduce errores y ruido antes del entrenamiento",
        },
        {
          challenge: "Concept drift",
          solution: "Online learning con actualizaciones adaptativas",
          impact: "Mantiene la calidad del modelo a lo largo del tiempo",
        },
        {
          challenge: "Cold start problem",
          solution: "Transfer learning desde dominios similares",
          impact: "Permite generar predicciones utiles desde fases tempranas",
        },
        {
          challenge: "Uncertainty quantification",
          solution: "Ensemble methods e intervalos de confianza",
          impact: "Entrega estimaciones accionables de incertidumbre",
        },
      ],
      ctaTitle: "Valida un piloto de Predictive Analytics",
      ctaSubtitle: "Define horizonte, accion operativa y tolerancia al error antes de construir.",
      primaryCta: "Hablar sobre tu flujo",
      secondaryCta: "Ver todos los demos",
    },
  },
  en: {},
} as const;

export function getLocalizedDemoContent(locale: "es" | "en", key: DemoKey): DemoContent {
  const base = demoMap[key];
  const overrides = localizedDemoOverrides[locale][key] ?? {};

  return {
    ...base,
    ...overrides,
    metrics: "metrics" in overrides && overrides.metrics ? overrides.metrics : base.metrics,
    outcomes: "outcomes" in overrides && overrides.outcomes ? overrides.outcomes : base.outcomes,
    bestFit: "bestFit" in overrides && overrides.bestFit ? overrides.bestFit : base.bestFit,
    notFit: "notFit" in overrides && overrides.notFit ? overrides.notFit : base.notFit,
    reviewChecklist:
      "reviewChecklist" in overrides && overrides.reviewChecklist
        ? overrides.reviewChecklist
        : base.reviewChecklist,
    secondaryCtaHref: locale === "es" ? "/es/demos" : "/en/demos",
  };
}
