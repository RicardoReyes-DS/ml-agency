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
  title: "Real-time Object Detection Engine",
  subtitle: "Experience our state-of-the-art object detection system powered by advanced deep learning architectures, delivering enterprise-grade accuracy with real-time performance.",
  badge: "Computer Vision",
  badgeIcon: "Eye",

  metrics: [
    { label: "Accuracy", value: "98.5%", description: "Object detection precision" },
    { label: "Processing Speed", value: "< 100ms", description: "Real-time inference" },
    { label: "Model Size", value: "45MB", description: "Optimized deployment" },
    { label: "Classes", value: "1000+", description: "Object categories" },
  ],

  demoId: "computer-vision",
  demoTitle: "Real-time Object Detection",
  demoDescription: "Advanced computer vision model for detecting and classifying objects in real-time video streams.",
  demoCategory: "computer-vision",
  demoTechnologies: ["TensorFlow", "OpenCV", "Python"],

  architectureTitle: "Model Architecture Deep Dive",
  architectureSubtitle: "Understanding the neural network architecture that powers our object detection capabilities",
  architectureComponents: [
    {
      title: "Input Processing",
      description: "Multi-scale feature extraction with adaptive pooling",
      icon: "Database",
      details: [
        "RGB image normalization",
        "Multi-resolution feature maps",
        "Channel-wise attention mechanisms"
      ]
    },
    {
      title: "Backbone Network",
      description: "EfficientNet-B4 with compound scaling for optimal performance",
      icon: "Layers",
      details: [
        "Compound scaling (depth, width, resolution)",
        "MBConv blocks with squeeze-excitation",
        "Progressive resolution reduction"
      ]
    },
    {
      title: "Feature Pyramid Network",
      description: "Multi-scale feature fusion for robust detection",
      icon: "Target",
      details: [
        "Top-down pathway with lateral connections",
        "Feature map fusion at multiple scales",
        "Context aggregation across resolutions"
      ]
    },
    {
      title: "Detection Head",
      description: "Anchor-free detection with centerness prediction",
      icon: "Cpu",
      details: [
        "Center-based object detection",
        "Heatmap prediction for object centers",
        "Size-aware bounding box regression"
      ]
    }
  ],

  challengesTitle: "Technical Challenges & Solutions",
  challengesSubtitle: "Overcoming real-world computer vision challenges through innovative engineering",
  challenges: [
    {
      challenge: "Real-time Performance",
      solution: "Model quantization and TensorRT optimization",
      impact: "45% faster inference with minimal accuracy loss"
    },
    {
      challenge: "Scale Invariance",
      solution: "Multi-scale training and test-time augmentation",
      impact: "Consistent performance across object sizes"
    },
    {
      challenge: "Occlusion Handling",
      solution: "Part-based detection and context modeling",
      impact: "Robust detection under partial occlusion"
    },
    {
      challenge: "Lighting Variations",
      solution: "Adaptive normalization and illumination modeling",
      impact: "Stable performance across lighting conditions"
    }
  ],

  implementationTitle: "Implementation Details",
  pipelineStages: [
    {
      stage: "Data Preparation",
      icon: "Database",
      description: "Dataset curation, preprocessing, and augmentation",
      technologies: ["COCO Dataset", "Data Normalization", "Augmentation", "Cross-validation"]
    },
    {
      stage: "Model Training",
      icon: "Cpu",
      description: "Distributed training with hyperparameter optimization",
      technologies: ["PyTorch", "CUDA", "Multi-GPU", "Gradient Checkpointing"]
    },
    {
      stage: "Inference Optimization",
      icon: "Zap",
      description: "Real-time deployment with performance optimization",
      technologies: ["TensorRT", "ONNX", "Model Quantization", "CUDA Acceleration"]
    },
    {
      stage: "Production Deployment",
      icon: "Code",
      description: "Scalable API deployment with monitoring",
      technologies: ["FastAPI", "Docker", "Prometheus", "Load Balancing"]
    }
  ],

  ctaTitle: "Transform Your Visual Data Into Actionable Insights",
  ctaSubtitle: "Deploy our battle-tested computer vision models in your applications. From real-time video analysis to automated quality inspection, we deliver production-ready solutions.",
  primaryCta: "Schedule Technical Review",
  secondaryCta: "View Source Code",
  secondaryCtaIcon: "Code"
};

// NLP Demo Data
export const nlpDemo: DemoContent = {
  title: "Sentiment Analysis Transformer Engine",
  subtitle: "Experience our advanced sentiment analysis system powered by transformer architectures, delivering nuanced emotional intelligence with enterprise-grade accuracy and multilingual support.",
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
  demoDescription: "Natural language processing model that analyzes text sentiment with 95% accuracy.",
  demoCategory: "nlp",
  demoTechnologies: ["BERT", "Transformers", "PyTorch"],

  architectureTitle: "Transformer Architecture Technical Deep Dive",
  architectureSubtitle: "Understanding the attention mechanism and transformer layers that power our NLP capabilities",
  architectureComponents: [
    {
      title: "Tokenization",
      description: "WordPiece tokenization with vocabulary of 30,522 subword units",
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
      description: "768-dimensional embeddings with positional encoding",
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
      description: "12 attention heads with scaled dot-product attention mechanism",
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
      description: "Position-wise feed-forward networks with GELU activation",
      icon: "Cpu",
      details: [
        "Two-layer MLP: 768 → 3072 → 768",
        "GELU activation function",
        "Residual connections",
        "Stochastic depth regularization"
      ]
    }
  ],

  challengesTitle: "NLP Challenges & Breakthroughs",
  challengesSubtitle: "Solving the fundamental challenges in understanding human language",
  challenges: [
    {
      challenge: "Context Understanding",
      solution: "Bidirectional attention with masked language modeling pre-training",
      impact: "92% improvement in contextual understanding"
    },
    {
      challenge: "Long-range Dependencies",
      solution: "Self-attention mechanism with global receptive field",
      impact: "Handles sequences up to 512 tokens effectively"
    },
    {
      challenge: "Computational Efficiency",
      solution: "Distillation and quantization techniques",
      impact: "60% smaller model with 95% performance retention"
    },
    {
      challenge: "Domain Adaptation",
      solution: "Fine-tuning on domain-specific datasets",
      impact: "Consistent performance across different text domains"
    }
  ],

  implementationTitle: "Training Methodology Pre-training & Fine-tuning",
  trainingPhases: [
    {
      phase: "Masked Language Modeling",
      duration: "80%",
      description: "Bidirectional context prediction pre-training",
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
      description: "Model compression for production deployment",
      techniques: ["Teacher-student architecture", "Soft target matching", "Temperature scaling", "60% size reduction"]
    }
  ],

  ctaTitle: "Transform Text Data Into Actionable Intelligence",
  ctaSubtitle: "Deploy our multilingual NLP models to extract insights from customer feedback, automate content moderation, or power conversational AI experiences.",
  primaryCta: "Schedule NLP Consultation",
  secondaryCta: "Explore Transformer Models",
  secondaryCtaIcon: "Brain"
};

// Deep Learning Demo Data
export const deepLearningDemo: DemoContent = {
  title: "Neural Network Architecture Lab",
  subtitle: "Explore our custom deep learning architectures with interactive model visualization, real-time training metrics, and comprehensive performance analysis tools.",
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

  architectureTitle: "Neural Architecture Layer by Layer",
  architectureSubtitle: "Understanding the building blocks that power modern deep learning systems",
  architectureComponents: [
    {
      title: "Input Layer",
      description: "Multi-modal data preprocessing with feature normalization",
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
      description: "ResNet-style residual connections with bottleneck design",
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
      description: "Multi-head self-attention for long-range dependencies",
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
      description: "Task-specific heads with softmax classification",
      icon: "Target",
      details: [
        "Global average pooling",
        "Fully connected classification",
        "Softmax probability distribution",
        "Confidence thresholding"
      ]
    }
  ],

  challengesTitle: "Technical Breakthroughs Solving Deep Learning Challenges",
  challengesSubtitle: "Innovative solutions to the fundamental challenges in deep learning",
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
      impact: "4x faster training with same resources"
    },
    {
      challenge: "Model Interpretability",
      solution: "Attention visualization and feature attribution",
      impact: "Clear understanding of model decisions"
    }
  ],

  implementationTitle: "Training Pipeline End-to-End Process",
  trainingPhases: [
    {
      phase: "Data Preparation",
      duration: "15%",
      description: "Dataset curation, preprocessing, and augmentation",
      techniques: ["Data normalization", "Augmentation", "Class balancing", "Cross-validation splits"]
    },
    {
      phase: "Architecture Design",
      duration: "20%",
      description: "Neural network design and hyperparameter optimization",
      techniques: ["Grid search", "Random search", "Bayesian optimization", "Neural architecture search"]
    },
    {
      phase: "Training Execution",
      duration: "50%",
      description: "Distributed training with monitoring and early stopping",
      techniques: ["Multi-GPU training", "Gradient checkpointing", "Learning rate scheduling", "Model checkpointing"]
    },
    {
      phase: "Model Optimization",
      duration: "15%",
      description: "Post-training quantization and deployment preparation",
      techniques: ["Model pruning", "Quantization", "Knowledge distillation", "ONNX conversion"]
    }
  ],

  ctaTitle: "Design & Deploy Custom AI Solutions",
  ctaSubtitle: "From concept to production, we design, train, and deploy custom deep learning models that solve your unique business challenges with enterprise-grade performance.",
  primaryCta: "Start Model Development",
  secondaryCta: "Explore Architectures",
  secondaryCtaIcon: "Layers"
};

// Predictive Analytics Demo Data
export const predictiveAnalyticsDemo: DemoContent = {
  title: "Forecasting Intelligence Engine",
  subtitle: "Experience our advanced predictive analytics platform with real-time forecasting, automated model selection, and comprehensive performance monitoring across multiple domains.",
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
  demoDescription: "Machine learning system that predicts equipment failures before they occur.",
  demoCategory: "predictive",
  demoTechnologies: ["Scikit-learn", "Time Series", "AWS"],

  architectureTitle: "Forecasting Models Algorithm Deep Dive",
  architectureSubtitle: "Understanding the mathematical foundations of our predictive analytics algorithms",
  architectureComponents: [
    {
      title: "ARIMA/SARIMA",
      description: "Classical statistical forecasting with seasonal decomposition",
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
      description: "Additive regression model for time series forecasting",
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
      description: "Deep learning approach for sequential pattern recognition",
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
      description: "Ensemble learning for regression and classification",
      icon: "Target",
      details: [
        "XGBoost/LightGBM implementation",
        "Feature importance analysis",
        "Early stopping optimization",
        "Cross-validation tuning"
      ]
    }
  ],

  challengesTitle: "Predictive Analytics Innovation Challenges",
  challengesSubtitle: "Solving the fundamental challenges in predictive modeling and time series forecasting",
  challenges: [
    {
      challenge: "Data Quality Issues",
      solution: "Multi-stage preprocessing with anomaly detection",
      impact: "95% reduction in prediction errors"
    },
    {
      challenge: "Concept Drift",
      solution: "Online learning with adaptive model updates",
      impact: "Maintained accuracy over time"
    },
    {
      challenge: "Cold Start Problem",
      solution: "Transfer learning from similar domains",
      impact: "Immediate predictions for new scenarios"
    },
    {
      challenge: "Uncertainty Quantification",
      solution: "Ensemble methods and confidence intervals",
      impact: "Actionable uncertainty estimates"
    }
  ],

  implementationTitle: "End-to-End Pipeline Production Architecture",
  pipelineStages: [
    {
      stage: "Data Ingestion",
      icon: "Database",
      description: "Real-time data collection from multiple sources",
      technologies: ["Apache Kafka", "AWS Kinesis", "Time-series DB"]
    },
    {
      stage: "Feature Engineering",
      icon: "Code",
      description: "Automated feature extraction and transformation",
      technologies: ["Pandas", "Featuretools", "Custom ETL"]
    },
    {
      stage: "Model Training",
      icon: "Cpu",
      description: "Distributed training with hyperparameter optimization",
      technologies: ["MLflow", "Optuna", "Distributed computing"]
    },
    {
      stage: "Prediction Serving",
      icon: "Zap",
      description: "Low-latency inference with monitoring",
      technologies: ["FastAPI", "Redis", "Prometheus"]
    }
  ],

  ctaTitle: "Transform Data Into Predictive Power",
  ctaSubtitle: "Deploy our enterprise-grade forecasting systems to anticipate trends, prevent failures, and optimize operations with AI-powered predictive analytics.",
  primaryCta: "Start Predictive Analytics",
  secondaryCta: "Explore Forecasting Models",
  secondaryCtaIcon: "Clock"
};