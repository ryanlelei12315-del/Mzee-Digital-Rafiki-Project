// Swahili translations
export const sw = {
    // App name
    appName: 'Mzee Digital Rafiki',
    appTagline: 'Rafiki wako wa kidijitali',

    // Navigation
    nav: {
        home: 'Nyumbani',
        services: 'Huduma',
        history: 'Historia',
        help: 'Msaada',
    },

    // Voice button states
    voice: {
        idle: 'Sema neno lako...',
        listening: 'Sikiliza...',
        processing: 'Nafikiri...',
        tapToSpeak: 'Gusa kusema',
        pressSpace: 'Bonyeza Space kusema',
    },

    // Assistant messages
    assistant: {
        welcome: 'Habari! Mimi ni Rafiki wako wa kidijitali. Ninaweza kukusaidia kulipa huduma za serikali. Sema nini unahitaji.',
        listening: 'Nasikiliza...',
        processing: 'Nafikiri...',
        confirmPayment: 'Je, unataka kulipa {service} kwa shilingi {amount}?',
        confirmYes: 'Sema "ndio" kuthibitisha au "hapana" kughairi.',
        paymentInitiated: 'Tafadhali ingiza PIN yako ya M-Pesa kwenye simu yako.',
        paymentSuccess: 'Malipo yamekamilika! Nambari ya risiti ni {receiptNumber}.',
        paymentFailed: 'Malipo hayakukamilika. {error}',
        tryAgain: 'Tafadhali jaribu tena.',
        didNotUnderstand: 'Samahani, sikuelewa. Tafadhali jaribu tena.',
        clarification: 'Tafadhali eleza zaidi. {question}',
    },

    // Services
    services: {
        title: 'Huduma Zinazopatikana',
        select: 'Chagua huduma',
        drivingLicense: 'Leseni ya Udereva',
        nationalId: 'Kitambulisho cha Taifa',
        nhif: 'Malipo ya NHIF',
        kra: 'Malipo ya KRA',
        birthCertificate: 'Cheti cha Kuzaliwa',
        passport: 'Pasipoti',
    },

    // Payment
    payment: {
        title: 'Malipo',
        amount: 'Kiasi',
        service: 'Huduma',
        phone: 'Nambari ya Simu',
        status: 'Hali',
        pending: 'Inasubiri...',
        completed: 'Imekamilika',
        failed: 'Imeshindwa',
        cancelled: 'Imeghairiwa',
        receipt: 'Nambari ya Risiti',
        retry: 'Jaribu Tena',
        close: 'Funga',
        confirm: 'Thibitisha',
        cancel: 'Ghairi',
    },

    // History
    history: {
        title: 'Historia ya Malipo',
        noPayments: 'Hakuna malipo bado',
        date: 'Tarehe',
        viewReceipt: 'Angalia Risiti',
        filter: 'Chuja',
        all: 'Yote',
    },

    // Accessibility
    accessibility: {
        fontSize: 'Ukubwa wa Herufi',
        small: 'Ndogo',
        medium: 'Wastani',
        large: 'Kubwa',
        extraLarge: 'Kubwa Sana',
        highContrast: 'Tofauti Kubwa',
        language: 'Lugha',
        volume: 'Sauti',
        on: 'Imewashwa',
        off: 'Imezimwa',
    },

    // Auth
    auth: {
        login: 'Ingia',
        register: 'Jisajili',
        phone: 'Nambari ya Simu',
        name: 'Jina',
        logout: 'Toka',
        enterPhone: 'Ingiza nambari yako ya simu',
        enterName: 'Ingiza jina lako (si lazima)',
        loginSuccess: 'Umeingia kwa mafanikio',
        registerSuccess: 'Umejisajili kwa mafanikio',
        loginFailed: 'Kuingia kumeshindwa',
        registerFailed: 'Kusajili kumeshindwa',
    },

    // Errors
    errors: {
        networkError: 'Tatizo la mtandao. Tafadhali angalia muunganisho wako.',
        serverError: 'Tatizo la seva. Tafadhali jaribu tena baadaye.',
        voiceNotSupported: 'Sauti haitegemezwi kwenye kivinjari hiki.',
        microphonePermission: 'Tafadhali ruhusu upatikanaji wa kipaza sauti.',
        paymentTimeout: 'Malipo yamechelewa. Tafadhali jaribu tena.',
        invalidPhone: 'Nambari ya simu si sahihi.',
        insufficientFunds: 'Pesa hazitoshi.',
        userCancelled: 'Umeghairi malipo.',
        unknown: 'Tatizo lisilojulikana. Tafadhali jaribu tena.',
    },

    // Help
    help: {
        title: 'Jinsi ya Kutumia',
        step1: '1. Gusa kitufe cha kipaza sauti',
        step2: '2. Sema huduma unayotaka (mfano: "Nataka kulipa leseni ya udereva")',
        step3: '3. Thibitisha malipo',
        step4: '4. Ingiza PIN yako ya M-Pesa',
        step5: '5. Pokea risiti yako',
        tips: 'Vidokezo',
        tip1: 'Sema kwa uwazi na polepole',
        tip2: 'Hakikisha una muunganisho mzuri wa mtandao',
        tip3: 'Hakikisha una pesa za kutosha kwenye M-Pesa',
        contact: 'Wasiliana Nasi',
        contactInfo: 'Kwa msaada zaidi, piga simu: 0800 123 456',
    },

    // Common
    common: {
        yes: 'Ndio',
        no: 'Hapana',
        ok: 'Sawa',
        cancel: 'Ghairi',
        back: 'Rudi',
        next: 'Endelea',
        loading: 'Inapakia...',
        error: 'Kosa',
        success: 'Mafanikio',
        retry: 'Jaribu Tena',
        close: 'Funga',
        save: 'Hifadhi',
        delete: 'Futa',
        edit: 'Hariri',
        search: 'Tafuta',
        filter: 'Chuja',
        sort: 'Panga',
        currency: 'KES',
    },
};

export type TranslationKey = typeof sw;
