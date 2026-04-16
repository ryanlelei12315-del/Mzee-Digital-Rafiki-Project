# Mzee Digital Rafiki — Full-Stack Web Application

## 🎯 Project Overview

Build a production-ready full-stack web application called **Mzee Digital Rafiki** ("Digital Friend for Elders") — an AI-powered Swahili voice assistant that helps elderly Kenyan citizens navigate government e-services (eCitizen) and complete M-Pesa payments via voice commands.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v3 + custom CSS variables |
| Voice Input | Web Speech API + OpenAI Whisper fallback |
| Text-to-Speech | Web Speech API (Swahili) + Google TTS fallback |
| Backend | Node.js + Express (TypeScript) |
| AI/NLP | OpenAI GPT-4o (intent extraction) |
| Payments | Safaricom Daraja API (STK Push) |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT + bcrypt |
| Hosting | Vercel (frontend) + Render (backend) |
| Testing | Vitest + Supertest |

---

## 📁 Project Structure

```
mzee-digital-rafiki/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VoiceButton.tsx          # Big mic button with animation
│   │   │   ├── ChatBubble.tsx           # Message display (Swahili + English)
│   │   │   ├── ServiceCard.tsx          # Government service options
│   │   │   ├── PaymentStatus.tsx        # M-Pesa STK push status
│   │   │   ├── LanguageToggle.tsx       # Swahili / English toggle
│   │   │   ├── AccessibilityBar.tsx     # Font size, contrast controls
│   │   │   └── TransactionHistory.tsx   # Past payments
│   │   ├── pages/
│   │   │   ├── Home.tsx                 # Landing / main assistant page
│   │   │   ├── Services.tsx             # Browse government services
│   │   │   ├── History.tsx              # Transaction history
│   │   │   └── Help.tsx                 # How-to guide (Swahili)
│   │   ├── hooks/
│   │   │   ├── useVoiceRecognition.ts   # Web Speech API logic
│   │   │   ├── useTTS.ts                # Text-to-speech logic
│   │   │   └── usePayment.ts            # Payment flow state machine
│   │   ├── services/
│   │   │   └── api.ts                   # Axios API client
│   │   ├── store/
│   │   │   └── useStore.ts              # Zustand global state
│   │   ├── types/
│   │   │   └── index.ts                 # Shared TypeScript types
│   │   ├── i18n/
│   │   │   ├── sw.ts                    # Swahili translations
│   │   │   └── en.ts                    # English translations
│   │   └── utils/
│   │       └── constants.ts             # App constants
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── voice.ts                 # POST /api/voice/process
│   │   │   ├── payment.ts               # POST /api/payment/initiate
│   │   │   ├── callback.ts              # POST /api/payment/callback (Daraja)
│   │   │   ├── services.ts              # GET /api/services
│   │   │   └── auth.ts                  # POST /api/auth/register|login
│   │   ├── services/
│   │   │   ├── openaiService.ts         # GPT-4o intent extraction
│   │   │   ├── whisperService.ts        # Audio transcription
│   │   │   ├── mpesaService.ts          # Daraja STK Push
│   │   │   └── ttsService.ts            # Google TTS fallback
│   │   ├── middleware/
│   │   │   ├── auth.ts                  # JWT verification
│   │   │   ├── rateLimiter.ts           # Express rate limiter
│   │   │   └── errorHandler.ts          # Global error handler
│   │   ├── prisma/
│   │   │   ├── schema.prisma            # DB models
│   │   │   └── migrations/              # DB migrations
│   │   ├── utils/
│   │   │   ├── intentMapper.ts          # Rule-based intent fallback
│   │   │   └── swahiliResponses.ts      # Canned Swahili responses
│   │   └── server.ts                    # Express app entry point
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🎨 UI/UX Design System

### Design Direction
- **Aesthetic**: Warm African modernism — earthy terracotta (#C0622F), deep forest green (#1B4332), cream (#FDF6EC), and gold (#D4A017)
- **Typography**: 
  - Display: `Playfair Display` (headings — dignified, readable)
  - Body: `Nunito` (large, friendly, high legibility for elderly)
  - Minimum font size: **18px** body, **24px** for interactive elements
- **Voice button**: Minimum **80px diameter**, pulsing green animation when active
- **Contrast ratio**: WCAG AA minimum everywhere, AAA preferred
- **Layout**: Single-column, no clutter, maximum 3 actions visible at once

### Color Palette (Tailwind Config)
```javascript
colors: {
  terracotta: {
    DEFAULT: '#C0622F',
    light: '#D4834F',
    dark: '#8B4513'
  },
  forest: {
    DEFAULT: '#1B4332',
    light: '#2D5F4C',
    dark: '#0F2419'
  },
  cream: {
    DEFAULT: '#FDF6EC',
    dark: '#F5E6D3'
  },
  gold: {
    DEFAULT: '#D4A017',
    light: '#E5B84F',
    dark: '#B8860B'
  }
}
```

### Accessibility Requirements (CRITICAL — elderly users)
- [ ] Font size controls: Small / Medium / Large / Extra Large (18px / 20px / 24px / 28px)
- [ ] High contrast mode toggle (increases contrast ratios to WCAG AAA)
- [ ] All interactive elements minimum 48px touch target
- [ ] Voice-first: every action triggerable by voice
- [ ] All text readable aloud via TTS on hover/focus
- [ ] Swahili UI by default, English toggle available
- [ ] No modals or popups — inline confirmations only
- [ ] Error messages read aloud automatically
- [ ] Full keyboard navigation support (Tab, Enter, Space, Escape)
- [ ] Screen reader compatible (ARIA labels on all interactive elements)

---

## 🔊 Voice Assistant Flow (State Machine)

```
IDLE → LISTENING → PROCESSING → CONFIRMING → PAYING → SUCCESS / ERROR
```

### State Descriptions

| State | UI | Voice Output (Swahili) | Voice Output (English) |
|---|---|---|---|
| `IDLE` | Large pulsing green mic button | "Sema neno lako..." | "Say your word..." |
| `LISTENING` | Red pulsing mic, waveform | Silent — recording | Silent — recording |
| `PROCESSING` | Spinner + "Nafikiri..." | "Nafikiri..." | "Thinking..." |
| `CONFIRMING` | Service + amount card | Read service + amount, ask to confirm | Read service + amount, ask to confirm |
| `PAYING` | Phone icon + spinner | "Tafadhali ingiza PIN yako ya M-Pesa" | "Please enter your M-Pesa PIN" |
| `SUCCESS` | Green checkmark | Read receipt number aloud | Read receipt number aloud |
| `ERROR` | Red icon + retry button | Explain error in Swahili, offer retry | Explain error in English, offer retry |

### State Machine Implementation (`usePayment.ts`)
```typescript
type PaymentState = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'CONFIRMING' | 'PAYING' | 'SUCCESS' | 'ERROR';

interface PaymentContext {
  transcript: string;
  intent: string;
  service: string;
  amount: number;
  phoneNumber: string;
  checkoutRequestId?: string;
  receiptNumber?: string;
  error?: string;
}
```

---

## 🧠 Backend: Intent Extraction

### `POST /api/voice/process`

**Request:**
```json
{
  "transcript": "Nataka kulipa leseni ya udereva",
  "userId": "user_abc123",
  "phoneNumber": "254712345678"
}
```

**Response:**
```json
{
  "intent": "driving_license_renewal",
  "service": "Leseni ya Udereva",
  "amount": 3050,
  "currency": "KES",
  "confidence": 0.95,
  "confirmationMessage": "Unataka kulipa Leseni ya Udereva kwa shilingi elfu tatu na hamsini. Je, ni sahihi?",
  "requiresMoreInfo": false,
  "clarificationQuestion": null
}
```

### GPT-4o System Prompt (include verbatim in `openaiService.ts`)
```
You are an AI assistant helping elderly Kenyan citizens access government e-services. 
Extract the intent and service details from the user's Swahili or English voice input.

Return ONLY valid JSON in this exact format:
{
  "intent": "driving_license_renewal | id_renewal | nhif_payment | kra_payment | birth_certificate | passport_application | unknown",
  "service": "Human-readable service name in Swahili",
  "amount": 3050,
  "currency": "KES",
  "confidence": 0.95,
  "confirmationMessage": "Full Swahili confirmation message to read to user",
  "requiresMoreInfo": false,
  "clarificationQuestion": null
}

Rules:
- Always respond in valid JSON, no markdown code blocks
- If unclear, set intent to "unknown" and ask for clarification in Swahili
- Use official eCitizen fee schedule for amounts
- confirmationMessage must be natural spoken Swahili
- For amounts over 10,000 KES, spell out the number in words
- If user mentions a phone number, extract it
- If user says "ndio" (yes) or "hapana" (no), return intent "confirmation" or "rejection"

Supported intents:
- driving_license_renewal: Renewing driving license (3,050 KES)
- id_renewal: National ID replacement (300 KES)
- nhif_payment: NHIF monthly contribution (500 KES default)
- kra_payment: KRA tax payment (amount varies)
- birth_certificate: Birth certificate (200 KES)
- passport_application: New passport (4,550 KES)
- confirmation: User confirming action
- rejection: User rejecting action
- unknown: Cannot determine intent
```

### Intent-to-Amount Map (rule-based fallback in `intentMapper.ts`)
```typescript
export const SERVICE_MAP = {
  driving_license_renewal: { 
    amount: 3050, 
    name: "Leseni ya Udereva", 
    nameEn: "Driving License Renewal",
    paybill: "222222",
    accountRef: "DL"
  },
  id_renewal: { 
    amount: 300, 
    name: "Kitambulisho cha Taifa", 
    nameEn: "National ID Replacement",
    paybill: "222222",
    accountRef: "ID"
  },
  nhif_payment: { 
    amount: 500, 
    name: "Malipo ya NHIF", 
    nameEn: "NHIF Payment",
    paybill: "200222",
    accountRef: "NHIF"
  },
  kra_payment: { 
    amount: null, // dynamic
    name: "Malipo ya KRA", 
    nameEn: "KRA Tax Payment",
    paybill: "572572",
    accountRef: "KRA"
  },
  birth_certificate: { 
    amount: 200, 
    name: "Cheti cha Kuzaliwa", 
    nameEn: "Birth Certificate",
    paybill: "222222",
    accountRef: "BC"
  },
  passport_application: { 
    amount: 4550, 
    name: "Pasipoti", 
    nameEn: "Passport Application",
    paybill: "222222",
    accountRef: "PP"
  },
};

export function extractIntent(transcript: string): IntentResult {
  const lower = transcript.toLowerCase();
  
  // Driving license keywords
  if (lower.match(/leseni|license|dereva|driving/)) {
    return { intent: 'driving_license_renewal', confidence: 0.8 };
  }
  
  // ID keywords
  if (lower.match(/kitambulisho|id|national\s+id/)) {
    return { intent: 'id_renewal', confidence: 0.8 };
  }
  
  // NHIF keywords
  if (lower.match(/nhif|bima|insurance/)) {
    return { intent: 'nhif_payment', confidence: 0.8 };
  }
  
  // KRA keywords
  if (lower.match(/kra|ushuru|tax/)) {
    return { intent: 'kra_payment', confidence: 0.8 };
  }
  
  // Birth certificate keywords
  if (lower.match(/cheti.*kuzaliwa|birth.*certificate/)) {
    return { intent: 'birth_certificate', confidence: 0.8 };
  }
  
  // Passport keywords
  if (lower.match(/pasipoti|passport/)) {
    return { intent: 'passport_application', confidence: 0.8 };
  }
  
  // Confirmation keywords
  if (lower.match(/ndio|sawa|yes|okay|confirm/)) {
    return { intent: 'confirmation', confidence: 0.9 };
  }
  
  // Rejection keywords
  if (lower.match(/hapana|no|cancel|sitaki/)) {
    return { intent: 'rejection', confidence: 0.9 };
  }
  
  return { intent: 'unknown', confidence: 0.0 };
}
```

---

## 💳 M-Pesa STK Push Integration

### `POST /api/payment/initiate`

**Request:**
```json
{
  "userId": "user_abc123",
  "phoneNumber": "254712345678",
  "amount": 3050,
  "service": "driving_license_renewal",
  "accountReference": "DL123456"
}
```

**Response:**
```json
{
  "success": true,
  "checkoutRequestId": "ws_CO_27032026093301234567890",
  "message": "STK push sent successfully",
  "merchantRequestId": "29115-34620561-1"
}
```

### Implementation Logic (`mpesaService.ts`)
```typescript
async function initiateSTKPush(params: STKPushParams): Promise<STKPushResponse> {
  // 1. Get OAuth token
  const token = await getOAuthToken();
  
  // 2. Generate password
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const password = Buffer.from(
    `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`
  ).toString('base64');
  
  // 3. Make STK Push request
  const response = await axios.post(
    `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
    {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: params.amount,
      PartyA: params.phoneNumber,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: params.phoneNumber,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: params.accountReference,
      TransactionDesc: params.description
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  
  // 4. Store in database
  await prisma.payment.create({
    data: {
      userId: params.userId,
      service: params.service,
      amount: params.amount,
      phoneNumber: params.phoneNumber,
      checkoutRequestId: response.data.CheckoutRequestID,
      status: 'PENDING'
    }
  });
  
  return response.data;
}
```

### `POST /api/payment/callback` (Daraja webhook)

**Daraja sends:**
```json
{
  "Body": {
    "stkCallback": {
      "MerchantRequestID": "29115-34620561-1",
      "CheckoutRequestID": "ws_CO_27032026093301234567890",
      "ResultCode": 0,
      "ResultDesc": "The service request is processed successfully.",
      "CallbackMetadata": {
        "Item": [
          { "Name": "Amount", "Value": 3050 },
          { "Name": "MpesaReceiptNumber", "Value": "QGR7XKJM9P" },
          { "Name": "TransactionDate", "Value": 20260327093345 },
          { "Name": "PhoneNumber", "Value": 254712345678 }
        ]
      }
    }
  }
}
```

**Implementation:**
```typescript
async function handleCallback(req: Request, res: Response) {
  try {
    const { Body } = req.body;
    const { stkCallback } = Body;
    
    const { CheckoutRequestID, ResultCode, CallbackMetadata } = stkCallback;
    
    // Extract receipt number
    let receiptNumber = null;
    if (ResultCode === 0 && CallbackMetadata) {
      const receiptItem = CallbackMetadata.Item.find(
        (item: any) => item.Name === 'MpesaReceiptNumber'
      );
      receiptNumber = receiptItem?.Value;
    }
    
    // Update database
    const payment = await prisma.payment.update({
      where: { checkoutRequestId: CheckoutRequestID },
      data: {
        status: ResultCode === 0 ? 'COMPLETED' : 'FAILED',
        mpesaReceiptNumber: receiptNumber,
        updatedAt: new Date()
      }
    });
    
    // Emit Socket.IO event
    io.to(payment.userId).emit('payment:update', {
      checkoutRequestId: CheckoutRequestID,
      status: payment.status,
      receiptNumber
    });
    
    // Respond to Daraja
    res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({ ResultCode: 1, ResultDesc: 'Failed' });
  }
}
```

### Frontend Socket.IO Integration
```typescript
// In usePayment.ts hook
useEffect(() => {
  socket.on('payment:update', (data) => {
    if (data.checkoutRequestId === currentCheckoutRequestId) {
      if (data.status === 'COMPLETED') {
        setState('SUCCESS');
        setReceiptNumber(data.receiptNumber);
        speakText(`Malipo yamekamilika. Nambari ya risiti ni ${data.receiptNumber}`);
      } else if (data.status === 'FAILED') {
        setState('ERROR');
        setError('Malipo hayakukamilika. Tafadhali jaribu tena.');
        speakText('Malipo hayakukamilika. Tafadhali jaribu tena.');
      }
    }
  });
  
  return () => socket.off('payment:update');
}, [currentCheckoutRequestId]);
```

---

## 🗄️ Database Schema (Prisma)

### `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String    @id @default(cuid())
  phone       String    @unique
  name        String?
  language    String    @default("sw") // sw = Swahili, en = English
  fontSize    String    @default("medium") // small, medium, large, xlarge
  highContrast Boolean  @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  payments    Payment[]
  serviceLogs ServiceLog[]
}

model Payment {
  id                 String        @id @default(cuid())
  userId             String
  user               User          @relation(fields: [userId], references: [id])
  service            String
  serviceName        String
  amount             Int
  phoneNumber        String
  checkoutRequestId  String?       @unique
  merchantRequestId  String?
  mpesaReceiptNumber String?
  status             PaymentStatus @default(PENDING)
  errorMessage       String?
  createdAt          DateTime      @default(now())
  updatedAt          DateTime      @updatedAt
  
  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

model ServiceLog {
  id         String   @id @default(cuid())
  userId     String?
  user       User?    @relation(fields: [userId], references: [id])
  transcript String
  intent     String
  confidence Float
  successful Boolean
  errorMessage String?
  createdAt  DateTime @default(now())
  
  @@index([userId])
  @@index([intent])
  @@index([createdAt])
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  CANCELLED
}
```

### Migrations
```bash
# Initialize Prisma
npx prisma init

# Create migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

---

## 🔐 Environment Variables

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
VITE_APP_NAME=Mzee Digital Rafiki
VITE_ENABLE_WHISPER_FALLBACK=true
```

### Backend (`.env`)
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mzee_db

# Server
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4o

# M-Pesa Daraja API
MPESA_ENV=sandbox  # or production
MPESA_CONSUMER_KEY=your_daraja_consumer_key
MPESA_CONSUMER_SECRET=your_daraja_consumer_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey_from_daraja
MPESA_CALLBACK_URL=https://yourdomain.com/api/payment/callback

# M-Pesa URLs
MPESA_BASE_URL_SANDBOX=https://sandbox.safaricom.co.ke
MPESA_BASE_URL_PRODUCTION=https://api.safaricom.co.ke

# Google TTS (fallback)
GOOGLE_TTS_API_KEY=your_google_tts_api_key

# Rate Limiting
RATE_LIMIT_VOICE_MAX=10  # requests per minute
RATE_LIMIT_PAYMENT_MAX=3  # requests per minute

# CORS
CORS_ORIGIN=http://localhost:5173

# Socket.IO
SOCKET_IO_CORS_ORIGIN=http://localhost:5173
```

---

## 🖥️ Key Components — Detailed Specs

### `VoiceButton.tsx`
```typescript
interface VoiceButtonProps {
  state: 'idle' | 'listening' | 'processing';
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
}

// Features:
// - 80px minimum diameter, centered on screen
// - Idle: green pulse animation (animate-pulse)
// - Listening: red pulse + waveform visualization
// - Processing: spinner overlay
// - Keyboard: Spacebar to toggle
// - Accessibility: aria-label, role="button", tabindex="0"
// - Label beneath showing current state in user's language
```

### `ChatBubble.tsx`
```typescript
interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  onReplay?: () => void; // TTS replay function
}

// Features:
// - Assistant: left-aligned, forest green background, cream text
// - User: right-aligned, cream background, forest text
// - Each assistant message has 🔊 replay button (48px touch target)
// - Auto-scroll to latest message
// - Large font (respects user's fontSize setting)
// - High contrast mode support
// - Timestamps in relative format ("2 minutes ago")
```

### `PaymentStatus.tsx`
```typescript
interface PaymentStatusProps {
  state: 'paying' | 'success' | 'error';
  service: string;
  amount: number;
  phoneNumber: string;
  receiptNumber?: string;
  error?: string;
  onRetry?: () => void;
  onClose?: () => void;
}

// Features:
// - Full-screen overlay (z-index: 50)
// - Semi-transparent backdrop
// - Large card in center (max-width: 500px)
// - Shows: service name, amount (formatted), masked phone
// - Paying: large spinner + "Subiri..." message
// - Success: green checkmark animation + receipt number (large, copyable)
// - Error: red X + error message + retry button
// - Auto-reads receipt number aloud on success
// - Escape key to close (only on success/error)
```

### `AccessibilityBar.tsx` (sticky top bar)
```typescript
interface AccessibilityBarProps {
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  onFontSizeChange: (size: string) => void;
  highContrast: boolean;
  onHighContrastToggle: () => void;
  language: 'sw' | 'en';
  onLanguageChange: (lang: string) => void;
  ttsEnabled: boolean;
  onTTSToggle: () => void;
}

// Features:
// - Sticky top bar (position: sticky, top: 0)
// - 4 font size buttons: A / A+ / A++ / A+++ (18/20/24/28px)
// - High contrast toggle (moon icon)
// - Language toggle: 🇰🇪 Kiswahili | 🇬🇧 English
// - TTS volume toggle (speaker icon)
// - All buttons 48px minimum touch target
// - Persists settings to backend (PATCH /api/users/:id/preferences)
```

### `ServiceCard.tsx`
```typescript
interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    nameEn: string;
    amount: number;
    icon: string;
    description: string;
  };
  onSelect: (serviceId: string) => void;
}

// Features:
// - Large card (min-height: 120px)
// - Icon + service name + amount
// - Tap to select (triggers voice confirmation flow)
// - Hover effect (scale + shadow)
// - Keyboard accessible (Enter to select)
// - Shows amount in KES format (e.g., "KES 3,050")
```

---

## 📋 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register with phone number | No |
| POST | `/api/auth/login` | Login, returns JWT | No |
| POST | `/api/voice/process` | Process transcript → intent | Yes |
| POST | `/api/voice/transcribe` | Audio file → transcript (Whisper) | Yes |
| POST | `/api/payment/initiate` | Trigger STK Push | Yes |
| POST | `/api/payment/callback` | Daraja webhook | No (verified) |
| GET | `/api/payment/status/:id` | Poll payment status | Yes |
| GET | `/api/payment/:checkoutRequestId` | Get payment by checkout ID | Yes |
| GET | `/api/services` | List all supported services | No |
| GET | `/api/history/:userId` | User payment history | Yes |
| PATCH | `/api/users/:id/preferences` | Update user preferences | Yes |
| GET | `/api/health` | Health check | No |

---

## ✅ Build Order (implement in this sequence)

### Phase 1: Project Scaffold (Day 1)
1. **Initialize monorepo structure**
   - Create `mzee-digital-rafiki/` root directory
   - Initialize `frontend/` with Vite + React + TypeScript
   - Initialize `backend/` with Express + TypeScript
   - Set up `docker-compose.yml` with PostgreSQL
   - Create `.gitignore` files

2. **Configure build tools**
   - Frontend: Vite config, TypeScript config, ESLint, Prettier
   - Backend: TypeScript config, nodemon, ESLint, Prettier
   - Install all dependencies

3. **Set up Prisma**
   - Initialize Prisma in backend
   - Create schema.prisma with all models
   - Run initial migration
   - Generate Prisma Client

### Phase 2: Design System (Day 1-2)
4. **Tailwind CSS configuration**
   - Install Tailwind + plugins
   - Configure custom colors (terracotta, forest, cream, gold)
   - Set up custom font sizes
   - Add Playfair Display + Nunito fonts

5. **CSS variables and global styles**
   - Create CSS variables for dynamic theming
   - Implement high contrast mode styles
   - Set up responsive breakpoints

6. **AccessibilityBar component**
   - Font size controls
   - High contrast toggle
   - Language toggle
   - TTS toggle
   - Persist preferences to backend

### Phase 3: Voice Input (Day 2-3)
7. **`useVoiceRecognition` hook**
   - Web Speech API integration
   - Swahili language support
   - Confidence threshold checking
   - Error handling

8. **VoiceButton component**
   - Mic button with animations
   - State management (idle/listening/processing)
   - Keyboard shortcut (Spacebar)
   - Accessibility features

9. **Whisper fallback service**
   - Backend route: POST `/api/voice/transcribe`
   - OpenAI Whisper API integration
   - Audio file upload handling
   - Automatic fallback when confidence < 0.7

### Phase 4: Backend NLP (Day 3-4)
10. **OpenAI service**
    - GPT-4o integration
    - System prompt implementation
    - Intent extraction logic
    - Error handling and retries

11. **Intent mapper (rule-based fallback)**
    - Keyword matching for all services
    - Confidence scoring
    - Swahili + English support

12. **`POST /api/voice/process` route**
    - Request validation
    - OpenAI service call
    - Fallback to rule-based mapper
    - Response formatting
    - Rate limiting

### Phase 5: Text-to-Speech (Day 4)
13. **`useTTS` hook**
    - Web Speech API (Swahili voice)
    - Queue management for multiple messages
    - Volume control
    - Pause/resume functionality

14. **Google TTS fallback service**
    - Backend route: POST `/api/tts/synthesize`
    - Google Cloud TTS API integration
    - Audio file caching

### Phase 6: Chat UI (Day 4-5)
15. **ChatBubble component**
    - Message display (user + assistant)
    - Replay button with TTS
    - Auto-scroll
    - Timestamp formatting

16. **Home page — full conversation loop**
    - VoiceButton integration
    - ChatBubble list
    - State machine implementation
    - Voice → Process → Speak flow

### Phase 7: M-Pesa Integration (Day 5-7)
17. **M-Pesa service (`mpesaService.ts`)**
    - OAuth token generation
    - STK Push implementation
    - Password generation
    - Environment-based URLs (sandbox/production)

18. **Payment routes**
    - POST `/api/payment/initiate`
    - POST `/api/payment/callback`
    - GET `/api/payment/status/:id`
    - Request validation
    - Database persistence

19. **Socket.IO setup**
    - Server-side Socket.IO configuration
    - Room-based events (per user)
    - Payment update events
    - Reconnection logic

### Phase 8: Payment UI (Day 7-8)
20. **`usePayment` hook**
    - Payment state machine
    - Socket.IO client integration
    - Real-time status updates
    - Error handling

21. **PaymentStatus component**
    - Full-screen overlay
    - Loading state (spinner)
    - Success state (checkmark + receipt)
    - Error state (retry button)
    - TTS integration

### Phase 9: Authentication (Day 8-9)
22. **Auth routes**
    - POST `/api/auth/register`
    - POST `/api/auth/login`
    - Phone number validation
    - JWT generation

23. **Auth middleware**
    - JWT verification
    - Token refresh logic
    - Protected route wrapper

24. **Frontend auth flow**
    - Login/register forms
    - Token storage (httpOnly cookies)
    - Axios interceptors
    - Auto-logout on 401

### Phase 10: Services Page (Day 9)
25. **ServiceCard component**
    - Service display with icon
    - Amount formatting
    - Tap to select
    - Accessibility

26. **Services page**
    - Grid layout of ServiceCards
    - Filter/search functionality
    - Manual service selection
    - Voice command alternative

### Phase 11: History Page (Day 10)
27. **TransactionHistory component**
    - Payment list display
    - Status badges
    - Date formatting
    - Retry failed payments

28. **History page**
    - Fetch user payment history
    - Pagination
    - Filter by status/date
    - Export to PDF (bonus)

### Phase 12: Accessibility (Day 10-11)
29. **Font sizing system**
    - Dynamic font size classes
    - Persist user preference
    - Apply globally

30. **High contrast mode**
    - CSS variable overrides
    - WCAG AAA compliance
    - Toggle persistence

31. **Keyboard navigation**
    - Tab order optimization
    - Focus indicators
    - Keyboard shortcuts
    - Skip links

32. **Screen reader support**
    - ARIA labels on all interactive elements
    - Live regions for dynamic content
    - Semantic HTML

### Phase 13: Error Handling (Day 11-12)
33. **Swahili error messages**
    - Create `swahiliResponses.ts` with all error messages
    - Map error codes to messages
    - TTS integration for errors

34. **Global error handler**
    - Backend middleware
    - Structured error responses
    - Logging

35. **Frontend error boundaries**
    - React error boundaries
    - Fallback UI
    - Error reporting

36. **Retry logic**
    - Exponential backoff for API calls
    - Manual retry buttons
    - Network error detection

### Phase 14: Testing (Day 12-13)
37. **Unit tests**
    - `intentMapper.ts` tests
    - `swahiliResponses.ts` tests
    - Utility function tests

38. **Integration tests**
    - Payment flow end-to-end
    - Voice processing pipeline
    - Auth flow

39. **API tests**
    - Supertest for all endpoints
    - Mock Daraja API responses
    - Mock OpenAI responses

### Phase 15: Deployment (Day 13-14)
40. **Docker configuration**
    - Dockerfile for frontend
    - Dockerfile for backend
    - docker-compose.yml for local dev
    - Environment variable management

41. **Vercel deployment (frontend)**
    - vercel.json configuration
    - Environment variables
    - Build optimization

42. **Render deployment (backend)**
    - render.yaml configuration
    - PostgreSQL database setup
    - Environment variables
    - Health check endpoint

43. **CI/CD pipeline**
    - GitHub Actions workflow
    - Automated testing
    - Automated deployment

---

## 🚨 Critical Requirements

### Security
- [ ] **All payment data encrypted at rest** using Prisma field-level encryption
- [ ] **No payment data in localStorage** — server-side only with JWT auth
- [ ] **STK Push uses sandbox in dev**, gated by `MPESA_ENV` env var
- [ ] **Daraja callback endpoint verifies request authenticity** (IP whitelist + signature)
- [ ] **Rate limiting**: max 10 voice requests/min per user, max 3 payment attempts/min
- [ ] **JWT tokens expire after 7 days**, refresh token flow implemented
- [ ] **All API calls have 10s timeout** with friendly error messages
- [ ] **CORS restricted to frontend domain only**

### Accessibility
- [ ] **Voice button is the FIRST focusable element** on the page
- [ ] **All interactive elements minimum 48px touch target**
- [ ] **WCAG AA minimum everywhere, AAA preferred**
- [ ] **All text readable aloud via TTS on hover/focus**
- [ ] **Full keyboard navigation** (Tab, Enter, Space, Escape)
- [ ] **Screen reader compatible** (ARIA labels everywhere)

### Internationalization
- [ ] **All user-facing text has Swahili translation** — use i18n object, not hardcoded strings
- [ ] **Swahili UI by default**, English toggle available
- [ ] **Error messages in user's selected language**
- [ ] **TTS uses correct language voice**

### Voice & AI
- [ ] **Whisper fallback activates automatically** if Web Speech API Swahili confidence < 0.7
- [ ] **Every payment action requires explicit voice or tap confirmation** before executing
- [ ] **OpenAI responses validated** (must be valid JSON, must contain required fields)
- [ ] **Intent confidence threshold**: minimum 0.7 to proceed, else ask for clarification

### Payments
- [ ] **STK Push timeout**: 60 seconds, then mark as FAILED
- [ ] **Socket.IO reconnects automatically** with exponential backoff
- [ ] **Payment status polling fallback** if Socket.IO fails
- [ ] **Receipt numbers read aloud** on successful payment
- [ ] **Failed payments retryable** from history page

### Performance
- [ ] **Frontend bundle size < 500KB** (gzipped)
- [ ] **API response time < 2s** (95th percentile)
- [ ] **TTS latency < 1s** for cached responses
- [ ] **Database queries optimized** with indexes

---

## 🎁 Bonus Features (implement if time allows)

### WhatsApp Bot Integration
- Use Twilio API for WhatsApp Business
- Same voice flow via WhatsApp voice messages
- Receive audio → transcribe → process → respond with audio
- Payment confirmations via WhatsApp

### USSD Fallback
- For feature phones (no smartphone required)
- Text-based menu navigation
- *123# style interface
- M-Pesa integration via USSD

### Admin Dashboard
- Track intent accuracy over time
- Payment success rates by service
- Common errors and failure reasons
- User analytics (anonymized)
- Service usage statistics

### Offline Mode
- Service Worker for offline functionality
- Cache service list and common intents
- Queue payments for when online
- Offline indicator in UI

### Advanced Features
- Multi-language support (add Kikuyu, Luo, etc.)
- Voice biometrics for authentication
- Receipt email/SMS delivery
- Payment reminders for recurring services
- Family account linking (elderly + caregiver)

---

## 📚 Resources & Documentation

### APIs
- [Safaricom Daraja API Docs](https://developer.safaricom.co.ke/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Google Cloud TTS](https://cloud.google.com/text-to-speech/docs)

### Libraries
- [Prisma Docs](https://www.prisma.io/docs)
- [Socket.IO Docs](https://socket.io/docs/v4/)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## 🎯 Success Metrics

### Technical
- [ ] 99.9% uptime
- [ ] < 2s average API response time
- [ ] < 1% payment failure rate (excluding user cancellations)
- [ ] > 90% intent extraction accuracy
- [ ] Zero critical security vulnerabilities

### User Experience
- [ ] > 80% task completion rate (elderly users)
- [ ] < 3 voice commands per transaction (average)
- [ ] > 90% user satisfaction score
- [ ] < 5% support ticket rate

### Business
- [ ] 1000+ registered users in first month
- [ ] 5000+ successful transactions in first month
- [ ] < $0.50 cost per transaction
- [ ] Partnership with at least one government agency

---

## 📝 Notes for Implementation

1. **Start with the Build Order** — follow it sequentially for best results
2. **Use sandbox mode** for M-Pesa until ready for production
3. **Test with real elderly users** early and often
4. **Prioritize accessibility** — this is the core value proposition
5. **Keep the UI simple** — resist feature creep
6. **Monitor intent accuracy** — improve prompts based on real data
7. **Have a fallback plan** — every feature should degrade gracefully
8. **Document everything** — especially the Swahili translations

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd mzee-digital-rafiki

# Start PostgreSQL
docker-compose up -d postgres

# Backend setup
cd backend
npm install
npx prisma migrate dev
npm run dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev

# Open browser
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

---

**This is a production-ready specification. Follow the build order, implement all critical requirements, and test thoroughly with real users. Karibu! (Welcome!)**
