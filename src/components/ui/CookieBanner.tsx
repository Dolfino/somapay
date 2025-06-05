"use client";

import { Cookie, Settings, Shield, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CookieBannerProps {
    className?: string;
}

export default function CookieBanner({ className = '' }: CookieBannerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true, // Sempre habilitado
        analytics: false,
        marketing: false,
        functional: false
    });

    useEffect(() => {
        const checkConsent = () => {
            const consent = localStorage.getItem('cookie-consent');
            if (!consent) {
                setTimeout(() => setIsVisible(true), 2000);
            }
        };

        checkConsent();
    }, []);

    const handleAcceptAll = () => {
        const newPreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true
        };
        setPreferences(newPreferences);
        saveConsent(newPreferences);
    };

    const handleRejectAll = () => {
        const newPreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        setPreferences(newPreferences);
        saveConsent(newPreferences);
    };

    const handleSavePreferences = () => {
        saveConsent(preferences);
    };

    const saveConsent = (prefs: typeof preferences) => {
        localStorage.setItem('cookie-consent', 'configured');
        localStorage.setItem('cookie-preferences', JSON.stringify(prefs));

        // Configurar consentimento no GTM
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
                ad_storage: prefs.marketing ? 'granted' : 'denied',
                analytics_storage: prefs.analytics ? 'granted' : 'denied',
                personalization_storage: prefs.marketing ? 'granted' : 'denied',
                functionality_storage: prefs.functional ? 'granted' : 'denied',
                security_storage: 'granted'
            });
        }

        // Notificar Facebook Pixel
        if (typeof window !== 'undefined' && window.fbq && prefs.marketing) {
            window.fbq('track', 'PageView');
        }

        setIsVisible(false);
        setShowDetails(false);
    };

    const updatePreference = (key: keyof typeof preferences, value: boolean) => {
        if (key === 'necessary') return; // Não pode ser alterado
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    if (!isVisible) return null;

    return (
        <div id="cookie-banner" className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl ${className}`}>
            <div className="max-w-7xl mx-auto p-4">
                {!showDetails ? (
                    // Banner Principal
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                            <Cookie className="h-8 w-8 text-primary-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Respeitamos sua privacidade
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego.
                                    Ao continuar navegando, você concorda com nossa{' '}
                                    <a href="/politica-privacidade" className="text-primary-600 hover:underline">
                                        Política de Privacidade
                                    </a>{' '}
                                    e{' '}
                                    <a href="/politica-cookies" className="text-primary-600 hover:underline">
                                        Política de Cookies
                                    </a>.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 min-w-max">
                            <button
                                onClick={() => setShowDetails(true)}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                <Settings className="h-4 w-4" />
                                Personalizar
                            </button>
                            <button
                                onClick={handleRejectAll}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Rejeitar
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-6 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                            >
                                Aceitar todos
                            </button>
                        </div>
                    </div>
                ) : (
                    // Configurações Detalhadas
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Shield className="h-6 w-6 text-primary-600" />
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Configurações de Privacidade
                                </h3>
                            </div>
                            <button
                                onClick={() => setShowDetails(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="grid gap-4">
                            {/* Cookies Necessários */}
                            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 mb-1">Cookies Necessários</h4>
                                    <p className="text-sm text-gray-600">
                                        Essenciais para o funcionamento básico do site. Incluem cookies de segurança e funcionalidades fundamentais.
                                    </p>
                                </div>
                                <div className="ml-4 flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={preferences.necessary}
                                        disabled
                                        className="h-4 w-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                                    />
                                </div>
                            </div>

                            {/* Cookies Analíticos */}
                            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 mb-1">Cookies Analíticos</h4>
                                    <p className="text-sm text-gray-600">
                                        Nos ajudam a entender como você interage com nosso site através do Google Analytics, permitindo melhorias contínuas.
                                    </p>
                                </div>
                                <div className="ml-4 flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={preferences.analytics}
                                        onChange={(e) => updatePreference('analytics', e.target.checked)}
                                        className="h-4 w-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                                    />
                                </div>
                            </div>

                            {/* Cookies de Marketing */}
                            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 mb-1">Cookies de Marketing</h4>
                                    <p className="text-sm text-gray-600">
                                        Utilizados para rastreamento de conversões, personalização de anúncios e remarketing através do Facebook Pixel e Google Ads.
                                    </p>
                                </div>
                                <div className="ml-4 flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={preferences.marketing}
                                        onChange={(e) => updatePreference('marketing', e.target.checked)}
                                        className="h-4 w-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                                    />
                                </div>
                            </div>

                            {/* Cookies Funcionais */}
                            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 mb-1">Cookies Funcionais</h4>
                                    <p className="text-sm text-gray-600">
                                        Permitem funcionalidades aprimoradas como lembrança de preferências, chat ao vivo e personalização da experiência.
                                    </p>
                                </div>
                                <div className="ml-4 flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={preferences.functional}
                                        onChange={(e) => updatePreference('functional', e.target.checked)}
                                        className="h-4 w-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                onClick={handleRejectAll}
                                className="px-6 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Rejeitar todos
                            </button>
                            <button
                                onClick={handleSavePreferences}
                                className="px-6 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                            >
                                Salvar preferências
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-6 py-2 text-sm bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors font-medium"
                            >
                                Aceitar todos
                            </button>
                        </div>

                        <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                            <p>
                                Para mais informações sobre como utilizamos cookies e como você pode gerenciar suas preferências,
                                consulte nossa{' '}
                                <a href="/politica-cookies" className="text-primary-600 hover:underline">
                                    Política de Cookies
                                </a>{' '}
                                e{' '}
                                <a href="/politica-privacidade" className="text-primary-600 hover:underline">
                                    Política de Privacidade
                                </a>.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}