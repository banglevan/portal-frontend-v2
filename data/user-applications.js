// User Applications Data
const userApplicationsData = {
    applications: [
        {
            id: 1,
            name: "SmartCam Security",
            type: "face-recognition",
            typeName: "Face Recognition",
            status: "active",
            icon: "👤",
            iconColor: "#3b82f6",
            description: "Advanced face recognition system for security monitoring",
            config: {
                general: {
                    name: "SmartCam Security",
                    type: "face-recognition",
                    status: "active",
                    description: "Advanced face recognition system for security monitoring with real-time detection capabilities"
                },
                advanced: {
                    modelVersion: "v1.1",
                    confidenceThreshold: 88,
                    processingMode: "realtime",
                    enablePreprocessing: true
                },
                performance: {
                    maxRequests: 150,
                    requestTimeout: 25,
                    memoryLimit: 6,
                    cpuCores: 4
                },
                security: {
                    apiKey: "sk-face-rec-1234567890",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://security.company.com\nhttps://admin.company.com"
                },
                monitoring: {
                    logLevel: "info",
                    enableMetrics: true,
                    enableAlerts: true,
                    alertEmail: "security@company.com"
                }
            },
            lastUsed: "2024-01-15T10:30:00Z",
            createdAt: "2024-01-10T09:00:00Z"
        },
        {
            id: 2,
            name: "ParkGuard LPR",
            type: "license-plate",
            typeName: "License Plate Detection",
            status: "active",
            icon: "🚗",
            iconColor: "#10b981",
            description: "Automated license plate recognition for parking management",
            config: {
                general: {
                    name: "ParkGuard LPR",
                    type: "license-plate",
                    status: "active",
                    description: "Automated license plate recognition for parking management and access control"
                },
                advanced: {
                    modelVersion: "v2.0",
                    confidenceThreshold: 92,
                    processingMode: "hybrid",
                    enablePreprocessing: true
                },
                performance: {
                    maxRequests: 200,
                    requestTimeout: 15,
                    memoryLimit: 8,
                    cpuCores: 6
                },
                security: {
                    apiKey: "sk-lpr-guard-0987654321",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://parking.company.com\nhttps://access.company.com"
                },
                monitoring: {
                    logLevel: "info",
                    enableMetrics: true,
                    enableAlerts: true,
                    alertEmail: "parking@company.com"
                }
            },
            lastUsed: "2024-01-15T11:45:00Z",
            createdAt: "2024-01-08T14:20:00Z"
        },
        {
            id: 3,
            name: "VisionBot Object",
            type: "object-detection",
            typeName: "Object Detection",
            status: "active",
            icon: "📦",
            iconColor: "#f59e0b",
            description: "Multi-object detection and tracking system",
            config: {
                general: {
                    name: "VisionBot Object",
                    type: "object-detection",
                    status: "active",
                    description: "Multi-object detection and tracking system for warehouse automation"
                },
                advanced: {
                    modelVersion: "v1.0",
                    confidenceThreshold: 85,
                    processingMode: "batch",
                    enablePreprocessing: false
                },
                performance: {
                    maxRequests: 80,
                    requestTimeout: 45,
                    memoryLimit: 12,
                    cpuCores: 8
                },
                security: {
                    apiKey: "sk-obj-detect-abcdef1234",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://warehouse.company.com"
                },
                monitoring: {
                    logLevel: "debug",
                    enableMetrics: true,
                    enableAlerts: false,
                    alertEmail: "warehouse@company.com"
                }
            },
            lastUsed: "2024-01-14T16:20:00Z",
            createdAt: "2024-01-05T11:30:00Z"
        },
        {
            id: 4,
            name: "DocuScan OCR",
            type: "text-recognition",
            typeName: "Text Recognition",
            status: "maintenance",
            icon: "📄",
            iconColor: "#8b5cf6",
            description: "Document text extraction and analysis",
            config: {
                general: {
                    name: "DocuScan OCR",
                    type: "text-recognition",
                    status: "maintenance",
                    description: "Document text extraction and analysis for automated data processing"
                },
                advanced: {
                    modelVersion: "v1.1",
                    confidenceThreshold: 75,
                    processingMode: "batch",
                    enablePreprocessing: true
                },
                performance: {
                    maxRequests: 50,
                    requestTimeout: 60,
                    memoryLimit: 4,
                    cpuCores: 2
                },
                security: {
                    apiKey: "sk-ocr-scan-xyz789012",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://docs.company.com\nhttps://archive.company.com"
                },
                monitoring: {
                    logLevel: "warn",
                    enableMetrics: true,
                    enableAlerts: true,
                    alertEmail: "docs@company.com"
                }
            },
            lastUsed: "2024-01-12T09:15:00Z",
            createdAt: "2024-01-03T10:45:00Z"
        },
        {
            id: 5,
            name: "CrowdWatch Analytics",
            type: "face-recognition",
            typeName: "Face Recognition",
            status: "active",
            icon: "👥",
            iconColor: "#ef4444",
            description: "Crowd monitoring and people counting",
            config: {
                general: {
                    name: "CrowdWatch Analytics",
                    type: "face-recognition",
                    status: "active",
                    description: "Crowd monitoring and people counting for event management and safety"
                },
                advanced: {
                    modelVersion: "v1.0",
                    confidenceThreshold: 80,
                    processingMode: "realtime",
                    enablePreprocessing: true
                },
                performance: {
                    maxRequests: 300,
                    requestTimeout: 20,
                    memoryLimit: 10,
                    cpuCores: 8
                },
                security: {
                    apiKey: "sk-crowd-watch-def456789",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://events.company.com\nhttps://safety.company.com"
                },
                monitoring: {
                    logLevel: "info",
                    enableMetrics: true,
                    enableAlerts: true,
                    alertEmail: "events@company.com"
                }
            },
            lastUsed: "2024-01-15T13:00:00Z",
            createdAt: "2024-01-01T15:00:00Z"
        },
        {
            id: 6,
            name: "RetailGuard Vision",
            type: "object-detection",
            typeName: "Object Detection",
            status: "inactive",
            icon: "🏪",
            iconColor: "#6b7280",
            description: "Retail theft prevention and inventory tracking",
            config: {
                general: {
                    name: "RetailGuard Vision",
                    type: "object-detection",
                    status: "inactive",
                    description: "Retail theft prevention and inventory tracking system"
                },
                advanced: {
                    modelVersion: "v1.1",
                    confidenceThreshold: 90,
                    processingMode: "realtime",
                    enablePreprocessing: true
                },
                performance: {
                    maxRequests: 120,
                    requestTimeout: 30,
                    memoryLimit: 6,
                    cpuCores: 4
                },
                security: {
                    apiKey: "sk-retail-guard-ghi123456",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://retail.company.com"
                },
                monitoring: {
                    logLevel: "error",
                    enableMetrics: false,
                    enableAlerts: false,
                    alertEmail: "retail@company.com"
                }
            },
            lastUsed: "2024-01-10T14:30:00Z",
            createdAt: "2023-12-28T12:00:00Z"
        },
        {
            id: 7,
            name: "MedScan Analyzer",
            type: "object-detection",
            typeName: "Medical Imaging",
            status: "active",
            icon: "🏥",
            iconColor: "#06b6d4",
            description: "Medical image analysis for diagnostic assistance",
            config: {
                general: {
                    name: "MedScan Analyzer",
                    type: "object-detection",
                    status: "active",
                    description: "Medical image analysis for diagnostic assistance and anomaly detection"
                },
                advanced: {
                    modelVersion: "v2.0",
                    confidenceThreshold: 95,
                    processingMode: "batch",
                    enablePreprocessing: true
                },
                performance: {
                    maxRequests: 30,
                    requestTimeout: 120,
                    memoryLimit: 16,
                    cpuCores: 12
                },
                security: {
                    apiKey: "sk-medscan-jkl789012",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://medical.company.com\nhttps://diagnosis.company.com"
                },
                monitoring: {
                    logLevel: "info",
                    enableMetrics: true,
                    enableAlerts: true,
                    alertEmail: "medical@company.com"
                }
            },
            lastUsed: "2024-01-15T08:20:00Z",
            createdAt: "2024-01-02T16:30:00Z"
        },
        {
            id: 8,
            name: "TrafficFlow Monitor",
            type: "license-plate",
            typeName: "Traffic Analysis",
            status: "active",
            icon: "🚦",
            iconColor: "#84cc16",
            description: "Traffic flow analysis and vehicle counting",
            config: {
                general: {
                    name: "TrafficFlow Monitor",
                    type: "license-plate",
                    status: "active",
                    description: "Traffic flow analysis and vehicle counting for urban planning"
                },
                advanced: {
                    modelVersion: "v1.0",
                    confidenceThreshold: 85,
                    processingMode: "realtime",
                    enablePreprocessing: false
                },
                performance: {
                    maxRequests: 500,
                    requestTimeout: 10,
                    memoryLimit: 8,
                    cpuCores: 6
                },
                security: {
                    apiKey: "sk-traffic-flow-mno345678",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://traffic.city.gov\nhttps://planning.city.gov"
                },
                monitoring: {
                    logLevel: "info",
                    enableMetrics: true,
                    enableAlerts: true,
                    alertEmail: "traffic@city.gov"
                }
            },
            lastUsed: "2024-01-15T12:10:00Z",
            createdAt: "2024-01-07T08:00:00Z"
        },
        {
            id: 9,
            name: "SmartForm Reader",
            type: "text-recognition",
            typeName: "Form Processing",
            status: "active",
            icon: "📋",
            iconColor: "#f97316",
            description: "Automated form data extraction and processing",
            config: {
                general: {
                    name: "SmartForm Reader",
                    type: "text-recognition",
                    status: "active",
                    description: "Automated form data extraction and processing for business workflows"
                },
                advanced: {
                    modelVersion: "v1.1",
                    confidenceThreshold: 88,
                    processingMode: "batch",
                    enablePreprocessing: true
                },
                performance: {
                    maxRequests: 100,
                    requestTimeout: 30,
                    memoryLimit: 4,
                    cpuCores: 3
                },
                security: {
                    apiKey: "sk-form-reader-pqr678901",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://forms.company.com"
                },
                monitoring: {
                    logLevel: "info",
                    enableMetrics: true,
                    enableAlerts: false,
                    alertEmail: "forms@company.com"
                }
            },
            lastUsed: "2024-01-14T15:45:00Z",
            createdAt: "2024-01-06T13:15:00Z"
        },
        {
            id: 10,
            name: "SecureEntry Face",
            type: "face-recognition",
            typeName: "Access Control",
            status: "maintenance",
            icon: "🔐",
            iconColor: "#8b5cf6",
            description: "Facial recognition for secure building access",
            config: {
                general: {
                    name: "SecureEntry Face",
                    type: "face-recognition",
                    status: "maintenance",
                    description: "Facial recognition for secure building access and employee authentication"
                },
                advanced: {
                    modelVersion: "v1.0",
                    confidenceThreshold: 95,
                    processingMode: "realtime",
                    enablePreprocessing: true
                },
                performance: {
                    maxRequests: 80,
                    requestTimeout: 15,
                    memoryLimit: 6,
                    cpuCores: 4
                },
                security: {
                    apiKey: "sk-secure-entry-stu234567",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://access.company.com\nhttps://security.company.com"
                },
                monitoring: {
                    logLevel: "warn",
                    enableMetrics: true,
                    enableAlerts: true,
                    alertEmail: "access@company.com"
                }
            },
            lastUsed: "2024-01-11T17:30:00Z",
            createdAt: "2023-12-30T10:00:00Z"
        },
        {
            id: 11,
            name: "QualityCheck Vision",
            type: "object-detection",
            typeName: "Quality Control",
            status: "active",
            icon: "🔍",
            iconColor: "#059669",
            description: "Manufacturing quality control and defect detection",
            config: {
                general: {
                    name: "QualityCheck Vision",
                    type: "object-detection",
                    status: "active",
                    description: "Manufacturing quality control and defect detection for production lines"
                },
                advanced: {
                    modelVersion: "v2.0",
                    confidenceThreshold: 98,
                    processingMode: "realtime",
                    enablePreprocessing: true
                },
                performance: {
                    maxRequests: 200,
                    requestTimeout: 5,
                    memoryLimit: 8,
                    cpuCores: 8
                },
                security: {
                    apiKey: "sk-quality-check-vwx890123",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://manufacturing.company.com\nhttps://quality.company.com"
                },
                monitoring: {
                    logLevel: "info",
                    enableMetrics: true,
                    enableAlerts: true,
                    alertEmail: "quality@company.com"
                }
            },
            lastUsed: "2024-01-15T14:20:00Z",
            createdAt: "2024-01-04T11:45:00Z"
        },
        {
            id: 12,
            name: "InvoiceBot Scanner",
            type: "text-recognition",
            typeName: "Document Processing",
            status: "active",
            icon: "💰",
            iconColor: "#dc2626",
            description: "Automated invoice processing and data extraction",
            config: {
                general: {
                    name: "InvoiceBot Scanner",
                    type: "text-recognition",
                    status: "active",
                    description: "Automated invoice processing and data extraction for accounting workflows"
                },
                advanced: {
                    modelVersion: "v1.1",
                    confidenceThreshold: 90,
                    processingMode: "batch",
                    enablePreprocessing: true
                },
                performance: {
                    maxRequests: 60,
                    requestTimeout: 45,
                    memoryLimit: 3,
                    cpuCores: 2
                },
                security: {
                    apiKey: "sk-invoice-bot-yza456789",
                    enableAuth: true,
                    enableHttps: true,
                    allowedOrigins: "https://accounting.company.com\nhttps://finance.company.com"
                },
                monitoring: {
                    logLevel: "info",
                    enableMetrics: true,
                    enableAlerts: true,
                    alertEmail: "accounting@company.com"
                }
            },
            lastUsed: "2024-01-15T09:30:00Z",
            createdAt: "2024-01-09T14:00:00Z"
        }
    ],
    
    categories: [
        {
            id: "face-recognition",
            name: "Face Recognition",
            count: 3,
            icon: "👤"
        },
        {
            id: "license-plate",
            name: "License Plate Detection",
            count: 2,
            icon: "🚗"
        },
        {
            id: "object-detection",
            name: "Object Detection",
            count: 4,
            icon: "📦"
        },
        {
            id: "text-recognition",
            name: "Text Recognition",
            count: 3,
            icon: "📄"
        }
    ],
    
    stats: {
        totalApplications: 12,
        activeApplications: 8,
        inactiveApplications: 1,
        maintenanceApplications: 3,
        totalCategories: 4,
        averageUptime: 98.5
    }
}; 