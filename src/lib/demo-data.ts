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

// Helper function to get icon component by name
export function getIconComponent(iconName: string) {
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

  return iconMap[iconName] || Eye; // Default to Eye if not found
}

// Computer Vision Demo Data
export const computerVisionDemo: DemoContent = {
  title: "Object Detection Interface",
  subtitle: "Interactive object detection powered by COCO-SSD. Identify 80+ classes of objects in uploaded images with instant feedback.",
  badge: "Computer Vision",
  badgeIcon: "Eye",

  metrics: [
    { label: "Classes", value: "80+", description: "COCO Dataset categories" },
    { label: "Architecture", value: "SSD MobileNet", description: "Efficient lightweight model" },
    { label: "Inference", value: "Real-time", description: "Server-side processing" },
    { label: "Input", value: "Multi-format", description: "JPG, PNG, WEBP support" },
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
  primaryCta: "Start Vision Pilot",
  secondaryCta: "View Documentation",
  secondaryCtaIcon: "Code"
};

// NLP Demo Data
export const nlpDemo: DemoContent = {
  title: "Sentiment Analysis System",
  subtitle: "Transformer-based sentiment analysis with support for 50+ languages.",
  badge: "Natural Language Processing",
  badgeIcon: "MessageSquare",

  metrics: [
    { label: "Sentiment Accuracy", value: "94.2%", description: "Context-aware analysis" },
    { label: "Language Support", value: "50+", description: "Languages covered" },
    { label: "Inference Speed", value: "< 50ms", description: "Per prediction" },
    { label: "Model Size", value: "420MB", description: "DistilBERT optimized" },
  ],

  demoId: "nlp-analysis",
  demoTitle: "Sentiment Analysis Engine",
  demoDescription: "Analyzes text sentiment with 95% accuracy.",
  demoCategory: "nlp",
  demoTechnologies: ["BERT", "Transformers", "PyTorch"],

  architectureTitle: "Transformer Architecture",
  architectureSubtitle: "The attention mechanism and transformer layers powering the NLP system",
  architectureComponents: [
    {
      title: "Tokenization",
      description: "WordPiece tokenization (30,522 subword units)",
      icon: "Database",
      details: [
        "WordPiece algorithm implementation",
        "UNK token handling for OOV words",
        "Special tokens: [CLS], [SEP], [MASK]",
        "Maximum sequence length: 512 tokens"
      ]
    },
    {
      title: "Embedding Layer",
      description: "768-dimensional embeddings",
      icon: "Layers",
      details: [
        "Token embeddings + position embeddings",
        "Segment embeddings for sentence pairs",
        "Layer normalization + dropout (0.1)",
        "Sinusoidal positional encoding"
      ]
    },
    {
      title: "Multi-Head Attention",
      description: "12 attention heads",
      icon: "Brain",
      details: [
        "Query-Key-Value attention computation",
        "Multi-head parallel processing",
        "Attention dropout (0.1) for regularization",
        "Residual connections + layer norm"
      ]
    },
    {
      title: "Feed Forward Networks",
      description: "Position-wise FFN with GELU",
      icon: "Cpu",
      details: [
        "Two-layer MLP: 768 → 3072 → 768",
        "GELU activation function",
        "Residual connections",
        "Stochastic depth regularization"
      ]
    }
  ],

  challengesTitle: "Technical Challenges",
  challengesSubtitle: "Solving challenges in understanding human language",
  challenges: [
    {
      challenge: "Context Understanding",
      solution: "Bidirectional attention with masked language modeling",
      impact: "92% improvement in context"
    },
    {
      challenge: "Long-range Dependencies",
      solution: "Self-attention mechanism with global receptive field",
      impact: "Handles sequences up to 512 tokens"
    },
    {
      challenge: "Computational Efficiency",
      solution: "Distillation and quantization",
      impact: "60% smaller model"
    },
    {
      challenge: "Domain Adaptation",
      solution: "Fine-tuning on domain-specific datasets",
      impact: "Consistent performance across domains"
    }
  ],

  implementationTitle: "Training Methodology",
  trainingPhases: [
    {
      phase: "Masked Language Modeling",
      duration: "80%",
      description: "Bidirectional context prediction",
      techniques: ["15% token masking", "Bidirectional prediction", "Next sentence prediction", "Trained on 570GB text"]
    },
    {
      phase: "Task-Specific Fine-tuning",
      duration: "15%",
      description: "Supervised learning on labeled datasets",
      techniques: ["SST-2 sentiment dataset", "Sequence classification", "Learning rate: 2e-5", "Early stopping patience=3"]
    },
    {
      phase: "Knowledge Distillation",
      duration: "5%",
      description: "Model compression for production",
      techniques: ["Teacher-student architecture", "Soft target matching", "Temperature scaling", "60% size reduction"]
    }
  ],

  ctaTitle: "Start Text Analysis",
  ctaSubtitle: "Deploy our multilingual NLP models to extract insights from customer feedback, automate content moderation, or power conversational AI.",
  primaryCta: "Schedule NLP Consultation",
  secondaryCta: "Explore Transformer Models",
  secondaryCtaIcon: "Brain"
};

// Deep Learning Demo Data
export const deepLearningDemo: DemoContent = {
  title: "Neural Architecture Design",
  subtitle: "Design and train custom deep learning models. Visual tools for architecture search and optimization.",
  badge: "Deep Learning",
  badgeIcon: "Brain",

  metrics: [
    { label: "Training Efficiency", value: "85%", description: "GPU utilization" },
    { label: "Model Accuracy", value: "96.7%", description: "Validation accuracy" },
    { label: "Convergence Time", value: "2.3hrs", description: "To optimal performance" },
    { label: "Scalability", value: "256", description: "Max GPU nodes" },
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
  primaryCta: "Start Model Development",
  secondaryCta: "Explore Architectures",
  secondaryCtaIcon: "Layers"
};

// Predictive Analytics Demo Data
export const predictiveAnalyticsDemo: DemoContent = {
  title: "Predictive Analytics System",
  subtitle: "Real-time forecasting and anomaly detection for time-series data.",
  badge: "Predictive Analytics",
  badgeIcon: "TrendingUp",

  metrics: [
    { label: "Prediction Accuracy", value: "94.2%", description: "Forecast precision" },
    { label: "Processing Speed", value: "< 50ms", description: "Real-time predictions" },
    { label: "Time Horizons", value: "90 days", description: "Forecast range" },
    { label: "Data Sources", value: "50+", description: "Integrated streams" },
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
  primaryCta: "Start Predictive Analytics",
  secondaryCta: "Explore Forecasting Models",
  secondaryCtaIcon: "Clock"
};