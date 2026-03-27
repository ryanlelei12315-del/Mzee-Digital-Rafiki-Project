import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { getTranslation } from './i18n';

function App() {
  const { language, fontSize, highContrast, setFontSize, toggleHighContrast, setLanguage } = useStore();
  const t = getTranslation(language);

  // Apply font size and high contrast on mount
  useEffect(() => {
    document.body.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
    document.body.classList.add(`font-${fontSize}`);

    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [fontSize, highContrast]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Accessibility Bar */}
      <div className="sticky top-0 z-50 bg-forest text-cream shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Font Size Controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{t.accessibility.fontSize}:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setFontSize('small')}
                  className={`touch-target px-3 py-2 rounded transition-colors ${fontSize === 'small' ? 'bg-gold text-forest' : 'bg-forest-light hover:bg-forest-dark'
                    }`}
                  aria-label={t.accessibility.small}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('medium')}
                  className={`touch-target px-3 py-2 rounded transition-colors ${fontSize === 'medium' ? 'bg-gold text-forest' : 'bg-forest-light hover:bg-forest-dark'
                    }`}
                  aria-label={t.accessibility.medium}
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`touch-target px-3 py-2 rounded transition-colors ${fontSize === 'large' ? 'bg-gold text-forest' : 'bg-forest-light hover:bg-forest-dark'
                    }`}
                  aria-label={t.accessibility.large}
                >
                  A++
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`touch-target px-3 py-2 rounded transition-colors ${fontSize === 'xlarge' ? 'bg-gold text-forest' : 'bg-forest-light hover:bg-forest-dark'
                    }`}
                  aria-label={t.accessibility.extraLarge}
                >
                  A+++
                </button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={toggleHighContrast}
              className="touch-target px-4 py-2 bg-forest-light hover:bg-forest-dark rounded transition-colors"
              aria-label={t.accessibility.highContrast}
            >
              🌙 {t.accessibility.highContrast}
            </button>

            {/* Language Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('sw')}
                className={`touch-target px-4 py-2 rounded transition-colors ${language === 'sw' ? 'bg-gold text-forest' : 'bg-forest-light hover:bg-forest-dark'
                  }`}
                aria-label="Kiswahili"
              >
                🇰🇪 Kiswahili
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`touch-target px-4 py-2 rounded transition-colors ${language === 'en' ? 'bg-gold text-forest' : 'bg-forest-light hover:bg-forest-dark'
                  }`}
                aria-label="English"
              >
                🇬🇧 English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="font-display text-5xl font-bold text-forest mb-4">
            {t.appName}
          </h1>
          <p className="text-2xl text-forest-light">
            {t.appTagline}
          </p>
        </header>

        {/* Welcome Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-4 border-forest">
            <div className="text-center mb-8">
              <div className="inline-block p-6 bg-forest rounded-full mb-4">
                <svg
                  className="w-16 h-16 text-cream"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <h2 className="font-display text-3xl font-bold text-forest mb-4">
                {t.assistant.welcome}
              </h2>
            </div>

            {/* Voice Button Placeholder */}
            <div className="flex justify-center mb-8">
              <button
                className="w-32 h-32 rounded-full bg-forest hover:bg-forest-light transition-all duration-300 pulse-green shadow-2xl flex items-center justify-center group"
                aria-label={t.voice.tapToSpeak}
              >
                <svg
                  className="w-16 h-16 text-cream group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
            </div>

            <p className="text-center text-xl text-forest-light mb-4">
              {t.voice.tapToSpeak}
            </p>
            <p className="text-center text-lg text-forest-light">
              {t.voice.pressSpace}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-forest-light hover:border-gold hover:shadow-2xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="font-display text-xl font-bold text-forest mb-2">
                {t.services.drivingLicense}
              </h3>
              <p className="text-terracotta font-bold text-lg">KES 3,050</p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-forest-light hover:border-gold hover:shadow-2xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🪪</div>
              <h3 className="font-display text-xl font-bold text-forest mb-2">
                {t.services.nationalId}
              </h3>
              <p className="text-terracotta font-bold text-lg">KES 300</p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-forest-light hover:border-gold hover:shadow-2xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🏥</div>
              <h3 className="font-display text-xl font-bold text-forest mb-2">
                {t.services.nhif}
              </h3>
              <p className="text-terracotta font-bold text-lg">KES 500</p>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-forest-light hover:border-gold hover:shadow-2xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-display text-xl font-bold text-forest mb-2">
                {t.services.kra}
              </h3>
              <p className="text-terracotta font-bold text-lg">{t.common.currency}</p>
            </div>

            {/* Service Card 5 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-forest-light hover:border-gold hover:shadow-2xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">👶</div>
              <h3 className="font-display text-xl font-bold text-forest mb-2">
                {t.services.birthCertificate}
              </h3>
              <p className="text-terracotta font-bold text-lg">KES 200</p>
            </div>

            {/* Service Card 6 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-forest-light hover:border-gold hover:shadow-2xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🛂</div>
              <h3 className="font-display text-xl font-bold text-forest mb-2">
                {t.services.passport}
              </h3>
              <p className="text-terracotta font-bold text-lg">KES 4,550</p>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gold-light rounded-xl shadow-lg p-8 border-2 border-gold">
            <h2 className="font-display text-2xl font-bold text-forest mb-4">
              {t.help.title}
            </h2>
            <ol className="space-y-3 text-forest">
              <li className="flex items-start gap-3">
                <span className="font-bold text-xl">1.</span>
                <span className="text-lg">{t.help.step1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-xl">2.</span>
                <span className="text-lg">{t.help.step2}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-xl">3.</span>
                <span className="text-lg">{t.help.step3}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-xl">4.</span>
                <span className="text-lg">{t.help.step4}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-xl">5.</span>
                <span className="text-lg">{t.help.step5}</span>
              </li>
            </ol>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-forest text-cream py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">
            {t.help.contact}
          </p>
          <p className="text-xl font-bold">
            {t.help.contactInfo}
          </p>
          <p className="mt-4 text-sm opacity-75">
            © 2026 Mzee Digital Rafiki. Built with ❤️ for Mzee (Elders) of Kenya
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
