// English translations
export const en = {
    // App name
    appName: 'Mzee Digital Rafiki',
    appTagline: 'Your Digital Friend',

    // Navigation
    nav: {
        home: 'Home',
        services: 'Services',
        history: 'History',
        help: 'Help',
    },

    // Voice button states
    voice: {
        idle: 'Say your word...',
        listening: 'Listening...',
        processing: 'Thinking...',
        tapToSpeak: 'Tap to speak',
        pressSpace: 'Press Space to speak',
    },

    // Assistant messages
    assistant: {
        welcome: 'Hello! I am your Digital Friend. I can help you pay for government services. Tell me what you need.',
        listening: 'Listening...',
        processing: 'Thinking...',
        confirmPayment: 'Do you want to pay {service} for {amount} shillings?',
        confirmYes: 'Say "yes" to confirm or "no" to cancel.',
        paymentInitiated: 'Please enter your M-Pesa PIN on your phone.',
        paymentSuccess: 'Payment completed! Receipt number is {receiptNumber}.',
        paymentFailed: 'Payment failed. {error}',
        tryAgain: 'Please try again.',
        didNotUnderstand: 'Sorry, I did not understand. Please try again.',
        clarification: 'Please clarify. {question}',
    },

    // Services
    services: {
        title: 'Available Services',
        select: 'Select service',
        drivingLicense: 'Driving License',
        nationalId: 'National ID',
        nhif: 'NHIF Payment',
        kra: 'KRA Payment',
        birthCertificate: 'Birth Certificate',
        passport: 'Passport',
    },

    // Payment
    payment: {
        title: 'Payment',
        amount: 'Amount',
        service: 'Service',
        phone: 'Phone Number',
        status: 'Status',
        pending: 'Pending...',
        completed: 'Completed',
        failed: 'Failed',
        cancelled: 'Cancelled',
        receipt: 'Receipt Number',
        retry: 'Retry',
        close: 'Close',
        confirm: 'Confirm',
        cancel: 'Cancel',
    },

    // History
    history: {
        title: 'Payment History',
        noPayments: 'No payments yet',
        date: 'Date',
        viewReceipt: 'View Receipt',
        filter: 'Filter',
        all: 'All',
    },

    // Accessibility
    accessibility: {
        fontSize: 'Font Size',
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
        extraLarge: 'Extra Large',
        highContrast: 'High Contrast',
        language: 'Language',
        volume: 'Volume',
        on: 'On',
        off: 'Off',
    },

    // Auth
    auth: {
        login: 'Login',
        register: 'Register',
        phone: 'Phone Number',
        name: 'Name',
        logout: 'Logout',
        enterPhone: 'Enter your phone number',
        enterName: 'Enter your name (optional)',
        loginSuccess: 'Login successful',
        registerSuccess: 'Registration successful',
        loginFailed: 'Login failed',
        registerFailed: 'Registration failed',
    },

    // Errors
    errors: {
        networkError: 'Network error. Please check your connection.',
        serverError: 'Server error. Please try again later.',
        voiceNotSupported: 'Voice is not supported in this browser.',
        microphonePermission: 'Please allow microphone access.',
        paymentTimeout: 'Payment timed out. Please try again.',
        invalidPhone: 'Invalid phone number.',
        insufficientFunds: 'Insufficient funds.',
        userCancelled: 'You cancelled the payment.',
        unknown: 'Unknown error. Please try again.',
    },

    // Help
    help: {
        title: 'How to Use',
        step1: '1. Tap the microphone button',
        step2: '2. Say the service you want (example: "I want to pay for driving license")',
        step3: '3. Confirm payment',
        step4: '4. Enter your M-Pesa PIN',
        step5: '5. Receive your receipt',
        tips: 'Tips',
        tip1: 'Speak clearly and slowly',
        tip2: 'Ensure you have a good network connection',
        tip3: 'Ensure you have enough money in M-Pesa',
        contact: 'Contact Us',
        contactInfo: 'For more help, call: 0800 123 456',
    },

    // Common
    common: {
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        cancel: 'Cancel',
        back: 'Back',
        next: 'Next',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        retry: 'Retry',
        close: 'Close',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        currency: 'KES',
    },
};
