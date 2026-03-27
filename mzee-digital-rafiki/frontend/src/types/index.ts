// User types
export interface User {
    id: string;
    phone: string;
    name?: string;
    language: 'sw' | 'en';
    fontSize: 'small' | 'medium' | 'large' | 'xlarge';
    highContrast: boolean;
    createdAt: string;
}

// Payment types
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface Payment {
    id: string;
    userId: string;
    service: string;
    serviceName: string;
    amount: number;
    phoneNumber: string;
    checkoutRequestId?: string;
    merchantRequestId?: string;
    mpesaReceiptNumber?: string;
    status: PaymentStatus;
    errorMessage?: string;
    createdAt: string;
    updatedAt: string;
}

// Voice assistant types
export type AssistantState = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'CONFIRMING' | 'PAYING' | 'SUCCESS' | 'ERROR';

export interface VoiceIntent {
    intent: string;
    service: string;
    amount: number;
    currency: string;
    confidence: number;
    confirmationMessage: string;
    requiresMoreInfo: boolean;
    clarificationQuestion?: string;
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'assistant';
    message: string;
    timestamp: Date;
}

// Service types
export interface Service {
    id: string;
    name: string;
    nameEn: string;
    amount: number | null;
    icon: string;
    description: string;
    descriptionEn: string;
    paybill: string;
    accountRef: string;
}

// API response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface VoiceProcessResponse {
    intent: string;
    service: string;
    amount: number;
    currency: string;
    confidence: number;
    confirmationMessage: string;
    requiresMoreInfo: boolean;
    clarificationQuestion?: string;
}

export interface PaymentInitiateResponse {
    success: boolean;
    checkoutRequestId: string;
    message: string;
    merchantRequestId: string;
}

export interface PaymentStatusResponse {
    checkoutRequestId: string;
    status: PaymentStatus;
    receiptNumber?: string;
    errorMessage?: string;
}

// Auth types
export interface LoginRequest {
    phone: string;
    password?: string;
}

export interface RegisterRequest {
    phone: string;
    name?: string;
    language?: 'sw' | 'en';
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    user?: User;
    message?: string;
}

// Store types
export interface AppStore {
    // User state
    user: User | null;
    setUser: (user: User | null) => void;

    // UI state
    fontSize: 'small' | 'medium' | 'large' | 'xlarge';
    setFontSize: (size: 'small' | 'medium' | 'large' | 'xlarge') => void;
    highContrast: boolean;
    toggleHighContrast: () => void;
    language: 'sw' | 'en';
    setLanguage: (lang: 'sw' | 'en') => void;
    ttsEnabled: boolean;
    toggleTTS: () => void;

    // Assistant state
    assistantState: AssistantState;
    setAssistantState: (state: AssistantState) => void;
    messages: ChatMessage[];
    addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
    clearMessages: () => void;

    // Payment state
    currentPayment: Payment | null;
    setCurrentPayment: (payment: Payment | null) => void;
    paymentHistory: Payment[];
    setPaymentHistory: (payments: Payment[]) => void;
    addPaymentToHistory: (payment: Payment) => void;

    // Services
    services: Service[];
    setServices: (services: Service[]) => void;
}

// Socket.IO event types
export interface SocketEvents {
    'payment:update': (data: PaymentStatusResponse) => void;
    'connect': () => void;
    'disconnect': () => void;
    'error': (error: Error) => void;
}
