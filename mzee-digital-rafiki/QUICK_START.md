# Quick Start Guide - Mzee Digital Rafiki

This guide will help you continue development of the Mzee Digital Rafiki application.

---

## 🎯 What's Been Built

### ✅ Complete Foundation (30%)
1. **Project Structure**: Frontend (React + Vite + TypeScript) and Backend directories
2. **Design System**: Tailwind CSS with custom African-inspired colors, accessibility features
3. **Type System**: Complete TypeScript definitions for all data structures
4. **i18n**: Full Swahili and English translations
5. **State Management**: Zustand store with persistence
6. **Documentation**: README, PROJECT_STATUS, and this guide

### 📂 Key Files Created
```
mzee-digital-rafiki/
├── frontend/
│   ├── src/
│   │   ├── index.css              ✅ Complete design system
│   │   ├── types/index.ts         ✅ All TypeScript types
│   │   ├── i18n/
│   │   │   ├── sw.ts              ✅ Swahili translations
│   │   │   ├── en.ts              ✅ English translations
│   │   │   └── index.ts           ✅ i18n utilities
│   │   └── store/useStore.ts      ✅ Zustand state management
│   ├── tailwind.config.js         ✅ Custom Tailwind config
│   ├── postcss.config.js          ✅ PostCSS config
│   └── .env                       ✅ Environment variables
├── README.md                      ✅ Full documentation
├── PROJECT_STATUS.md              ✅ Progress tracking
└── QUICK_START.md                 ✅ This file
```

---

## 🚀 Next Steps to Get Running

### Step 1: Continue with Core Components (2-3 hours)

Create these essential UI components in `frontend/src/components/`:

#### 1. VoiceButton.tsx
```typescript
// Large microphone button with pulse animation
// States: idle (green pulse), listening (red pulse), processing (spinner)
// 80px minimum diameter, centered
// Keyboard shortcut: Spacebar
```

#### 2. ChatBubble.tsx
```typescript
// Message display for user and assistant
// Assistant: left-aligned, forest green background
// User: right-aligned, cream background
// Replay button (🔊) for TTS
```

#### 3. AccessibilityBar.tsx
```typescript
// Sticky top bar with:
// - Font size controls (A / A+ / A++ / A+++)
// - High contrast toggle
// - Language toggle (🇰🇪 Kiswahili | 🇬🇧 English)
// - TTS volume toggle
```

### Step 2: Implement Voice Hooks (2-3 hours)

Create these hooks in `frontend/src/hooks/`:

#### 1. useVoiceRecognition.ts
```typescript
// Web Speech API integration
// Returns: { transcript, isListening, startListening, stopListening, error }
// Language: 'sw-KE' for Swahili
// Confidence threshold: 0.7
```

#### 2. useTTS.ts
```typescript
// Text-to-speech using Web Speech API
// Returns: { speak, stop, isSpeaking, voices }
// Queue management for multiple messages
// Swahili voice selection
```

### Step 3: Set Up Backend (3-4 hours)

#### Initialize Backend
```bash
cd backend
npm init -y
npm install express @prisma/client prisma socket.io jsonwebtoken bcrypt axios dotenv cors express-rate-limit
npm install -D typescript @types/express @types/node @types/bcrypt @types/jsonwebtoken ts-node nodemon
npx tsc --init
npx prisma init
```

#### Create Prisma Schema
File: `backend/src/prisma/schema.prisma`
```prisma
// Copy the schema from MZEE_DIGITAL_RAFIKI_PROMPT.md
// Includes User, Payment, ServiceLog models
```

#### Run Migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 4: Create Backend API (4-5 hours)

#### File Structure
```
backend/src/
├── server.ts                    # Express app entry
├── routes/
│   ├── auth.ts                  # POST /api/auth/register, /login
│   ├── voice.ts                 # POST /api/voice/process
│   ├── payment.ts               # POST /api/payment/initiate
│   ├── callback.ts              # POST /api/payment/callback
│   └── services.ts              # GET /api/services
├── services/
│   ├── openaiService.ts         # GPT-4o intent extraction
│   ├── mpesaService.ts          # Daraja STK Push
│   └── whisperService.ts        # Audio transcription
├── middleware/
│   ├── auth.ts                  # JWT verification
│   ├── rateLimiter.ts           # Rate limiting
│   └── errorHandler.ts          # Global error handler
└── utils/
    ├── intentMapper.ts          # Rule-based fallback
    └── swahiliResponses.ts      # Canned responses
```

### Step 5: Integrate OpenAI (2 hours)

#### Install OpenAI SDK
```bash
cd backend
npm install openai
```

#### Create openaiService.ts
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractIntent(transcript: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an AI assistant helping elderly Kenyan citizens...
        // Copy full system prompt from MZEE_DIGITAL_RAFIKI_PROMPT.md
        `,
      },
      {
        role: 'user',
        content: transcript,
      },
    ],
    response_format: { type: 'json_object' },
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

### Step 6: Integrate M-Pesa (4-5 hours)

#### Get Daraja Credentials
1. Go to https://developer.safaricom.co.ke/
2. Create an app
3. Get Consumer Key and Consumer Secret
4. Use sandbox credentials for development

#### Create mpesaService.ts
```typescript
// Implement:
// - getOAuthToken()
// - initiateSTKPush()
// - handleCallback()
// See MZEE_DIGITAL_RAFIKI_PROMPT.md for full implementation
```

### Step 7: Build Main Pages (3-4 hours)

Create in `frontend/src/pages/`:

#### 1. Home.tsx
```typescript
// Main voice assistant interface
// VoiceButton + ChatBubble list
// Full conversation loop
```

#### 2. Services.tsx
```typescript
// Grid of ServiceCard components
// Manual service selection
```

#### 3. History.tsx
```typescript
// TransactionHistory component
// Filter by status/date
```

#### 4. Help.tsx
```typescript
// How-to guide in Swahili/English
// Step-by-step instructions
```

---

## 🔧 Development Commands

### Frontend
```bash
cd frontend
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
cd backend
npm run dev          # Start dev server with nodemon
npm run build        # Compile TypeScript
npm start            # Run compiled code
npm test             # Run tests
```

### Database
```bash
cd backend
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma migrate dev --name <name>  # Create migration
npx prisma generate  # Generate Prisma Client
```

---

## 🔑 Environment Variables Needed

### Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

### Backend `.env`
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

# M-Pesa Daraja API
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=your_daraja_consumer_key
MPESA_CONSUMER_SECRET=your_daraja_consumer_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey_from_daraja
MPESA_CALLBACK_URL=https://yourdomain.com/api/payment/callback

# CORS
CORS_ORIGIN=http://localhost:5173
```

---

## 📚 Reference Documents

1. **MZEE_DIGITAL_RAFIKI_PROMPT.md** - Complete technical specification
2. **README.md** - Project overview and setup
3. **PROJECT_STATUS.md** - Detailed progress tracking

---

## 🎨 Design Tokens

### Colors
```css
--color-terracotta: #C0622F;
--color-forest: #1B4332;
--color-cream: #FDF6EC;
--color-gold: #D4A017;
```

### Font Sizes (Medium)
```css
--font-size-base: 20px;
--font-size-xl: 24px;
--font-size-2xl: 28px;
```

### Spacing
```css
Touch targets: 48px minimum
Button padding: 16px 24px
Card padding: 24px
```

---

## 🧪 Testing Checklist

### Manual Testing
- [ ] Voice button responds to click and spacebar
- [ ] Voice recognition works in Swahili
- [ ] TTS speaks in Swahili
- [ ] Font size controls work
- [ ] High contrast mode works
- [ ] Language toggle works
- [ ] Payment flow completes
- [ ] Receipt number displays

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets are 48px minimum

---

## 🐛 Common Issues & Solutions

### Issue: Web Speech API not working
**Solution**: Use HTTPS or localhost. HTTP won't work for microphone access.

### Issue: Swahili voice not available
**Solution**: Install Swahili language pack on OS, or use Google TTS fallback.

### Issue: M-Pesa callback not received
**Solution**: Use ngrok to expose localhost for testing: `ngrok http 3001`

### Issue: CORS errors
**Solution**: Ensure backend CORS_ORIGIN matches frontend URL exactly.

---

## 📞 Getting Help

1. Check **MZEE_DIGITAL_RAFIKI_PROMPT.md** for detailed specs
2. Review **PROJECT_STATUS.md** for what's implemented
3. See **README.md** for API documentation
4. Check Safaricom Daraja docs for M-Pesa issues
5. Check OpenAI docs for GPT-4o issues

---

## 🎯 Priority Tasks (Next 8 Hours)

1. **Hour 1-2**: Create VoiceButton, ChatBubble, AccessibilityBar components
2. **Hour 3-4**: Implement useVoiceRecognition and useTTS hooks
3. **Hour 5-6**: Set up backend with Express, Prisma, and database
4. **Hour 7-8**: Create /api/voice/process endpoint with OpenAI

After these 8 hours, you'll have a working voice assistant that can:
- Record voice input
- Process it with GPT-4o
- Speak responses in Swahili
- Display conversation in chat bubbles

---

**Good luck! Karibu (Welcome) to the project! 🚀**
