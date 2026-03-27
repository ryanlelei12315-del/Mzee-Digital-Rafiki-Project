import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppStore, ChatMessage, Payment, Service, User, AssistantState } from '../types';

export const useStore = create<AppStore>()(
    persist(
        (set) => ({
            // User state
            user: null,
            setUser: (user) => set({ user }),

            // UI state
            fontSize: 'medium',
            setFontSize: (fontSize) => {
                set({ fontSize });
                // Update body class
                document.body.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
                document.body.classList.add(`font-${fontSize}`);
            },

            highContrast: false,
            toggleHighContrast: () => set((state) => {
                const newValue = !state.highContrast;
                // Update body class
                if (newValue) {
                    document.body.classList.add('high-contrast');
                } else {
                    document.body.classList.remove('high-contrast');
                }
                return { highContrast: newValue };
            }),

            language: 'sw',
            setLanguage: (language) => set({ language }),

            ttsEnabled: true,
            toggleTTS: () => set((state) => ({ ttsEnabled: !state.ttsEnabled })),

            // Assistant state
            assistantState: 'IDLE',
            setAssistantState: (assistantState) => set({ assistantState }),

            messages: [],
            addMessage: (message) => set((state) => ({
                messages: [
                    ...state.messages,
                    {
                        ...message,
                        id: `msg-${Date.now()}-${Math.random()}`,
                        timestamp: new Date(),
                    },
                ],
            })),
            clearMessages: () => set({ messages: [] }),

            // Payment state
            currentPayment: null,
            setCurrentPayment: (currentPayment) => set({ currentPayment }),

            paymentHistory: [],
            setPaymentHistory: (paymentHistory) => set({ paymentHistory }),
            addPaymentToHistory: (payment) => set((state) => ({
                paymentHistory: [payment, ...state.paymentHistory],
            })),

            // Services
            services: [],
            setServices: (services) => set({ services }),
        }),
        {
            name: 'mzee-storage',
            partialize: (state) => ({
                user: state.user,
                fontSize: state.fontSize,
                highContrast: state.highContrast,
                language: state.language,
                ttsEnabled: state.ttsEnabled,
            }),
        }
    )
);
