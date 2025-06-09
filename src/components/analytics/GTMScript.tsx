"use client";

import { FACEBOOK_CONFIG, GA4_CONFIG, GTM_CONFIG, HOTJAR_CONFIG } from '@/utils/analytics';
import Hotjar from '@hotjar/browser';
import Script from 'next/script';
import { useEffect } from 'react';

interface GTMScriptProps {
  children?: React.ReactNode;
}

export default function GTMScript({ children }: GTMScriptProps) {
  useEffect(() => {
    // Aguardar um pouco para garantir que os scripts foram carregados
    const initializeAnalytics = () => {
      // Inicializar dataLayer
      window.dataLayer = window.dataLayer || [];

      // Inicializar Hotjar se configurado
      if (HOTJAR_CONFIG.siteId && HOTJAR_CONFIG.version) {
        Hotjar.init(HOTJAR_CONFIG.siteId, HOTJAR_CONFIG.version);
      }

      // Configurar gtag se ainda não existir
      if (!window.gtag) {
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };
      }

      // Configuração inicial do GA4
      window.gtag('js', new Date());
      window.gtag('config', GA4_CONFIG.measurementId, {
        send_page_view: false, // Controlar manualmente
        enhanced_conversions: true,
        allow_enhanced_conversions: true,
        conversion_linker: true,
        transport_url: GTM_CONFIG.serverContainerUrl,
        first_party_collection: true
      });

      // Enviar evento inicial de page view
      window.dataLayer.push({
        event: 'gtm.js',
        'gtm.start': new Date().getTime(),
        'gtm.uniqueEventId': 0
      });
    };

    // Executar após um delay para garantir que os scripts foram carregados
    const timer = setTimeout(initializeAnalytics, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Google Tag Manager - Head */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        onLoad={() => {
          // Callback quando o GTM é carregado
          console.log('GTM loaded successfully');
        }}
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl+'&gtm_auth=${GTM_CONFIG.auth}&gtm_preview=${GTM_CONFIG.preview}&gtm_cookies_win=x';
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_CONFIG.containerId}');
          `
        }}
      />

      {/* Google Analytics 4 - Global Site Tag */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.measurementId}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('GA4 script loaded successfully');
        }}
      />

      {/* Facebook Pixel - Base Code */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Facebook Pixel loaded successfully');
        }}
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            // Aguardar carregamento antes de inicializar
            setTimeout(function() {
              if (window.fbq) {
                window.fbq('init', '${FACEBOOK_CONFIG.pixelId}');
                window.fbq('track', 'PageView');
              }
            }, 500);
          `
        }}
      />

      {/* Noscript fallback para Facebook Pixel */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FACEBOOK_CONFIG.pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* Cookie Consent e LGPD Script */}
      <Script
        id="cookie-consent"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.cookieConsentManager = {
              hasConsent: function() {
                return localStorage.getItem('cookie-consent') === 'accepted';
              },
              setConsent: function(consent) {
                localStorage.setItem('cookie-consent', consent ? 'accepted' : 'rejected');
                
                // Aguardar gtag estar disponível
                var checkGtag = setInterval(function() {
                  if (window.gtag) {
                    clearInterval(checkGtag);
                    if (consent) {
                      // Ativar todos os trackings
                      window.gtag('consent', 'update', {
                        ad_storage: 'granted',
                        analytics_storage: 'granted',
                        personalization_storage: 'granted',
                        functionality_storage: 'granted',
                        security_storage: 'granted'
                      });
                      // Reenviar eventos pendentes
                      if (window.fbq) {
                        window.fbq('track', 'PageView');
                      }
                    } else {
                      // Desativar trackings não essenciais
                      window.gtag('consent', 'update', {
                        ad_storage: 'denied',
                        analytics_storage: 'denied',
                        personalization_storage: 'denied',
                        functionality_storage: 'granted',
                        security_storage: 'granted'
                      });
                    }
                  }
                }, 100);
                
                // Esconder banner
                const banner = document.getElementById('cookie-banner');
                if (banner) banner.style.display = 'none';
              },
              showBanner: function() {
                if (!this.hasConsent() && localStorage.getItem('cookie-consent') !== 'rejected') {
                  const banner = document.getElementById('cookie-banner');
                  if (banner) banner.style.display = 'block';
                }
              }
            };

            // Aguardar gtag estar disponível para configuração inicial
            var initConsent = setInterval(function() {
              if (window.gtag) {
                clearInterval(initConsent);
                
                // Configuração inicial de consentimento (modo padrão: negado)
                window.gtag('consent', 'default', {
                  ad_storage: 'denied',
                  analytics_storage: 'denied',
                  personalization_storage: 'denied',
                  functionality_storage: 'granted',
                  security_storage: 'granted',
                  region: ['BR']
                });

                // Verificar consentimento existente
                if (window.cookieConsentManager.hasConsent()) {
                  window.gtag('consent', 'update', {
                    ad_storage: 'granted',
                    analytics_storage: 'granted',
                    personalization_storage: 'granted'
                  });
                } else {
                  // Mostrar banner após 2 segundos
                  setTimeout(function() {
                    window.cookieConsentManager.showBanner();
                  }, 2000);
                }
              }
            }, 100);
          `
        }}
      />

      {/* Enhanced Conversions Setup */}
      <Script
        id="enhanced-conversions"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.enhancedConversions = {
              setUserData: function(userData) {
                var checkGtag = setInterval(function() {
                  if (window.gtag && userData) {
                    clearInterval(checkGtag);
                    window.gtag('config', '${GA4_CONFIG.measurementId}', {
                      user_data: {
                        email_address: userData.email,
                        phone_number: userData.phone,
                        first_name: userData.firstName,
                        last_name: userData.lastName,
                        address: {
                          country: 'BR',
                          region: userData.state,
                          city: userData.city
                        }
                      }
                    });
                  }
                }, 100);
              },
              trackConversion: function(conversionData) {
                var checkGtag = setInterval(function() {
                  if (window.gtag) {
                    clearInterval(checkGtag);
                    window.gtag('event', 'conversion', {
                      send_to: '${GA4_CONFIG.measurementId}',
                      value: conversionData.value,
                      currency: conversionData.currency || 'BRL',
                      transaction_id: conversionData.transactionId
                    });
                  }
                }, 100);
              }
            };
          `
        }}
      />

      {children}
    </>
  );
}