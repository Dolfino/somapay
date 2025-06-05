import GTMScript from '@/components/analytics/GTMScript';
import Header from '@/components/layout/Header';
import CookieBanner from '@/components/ui/CookieBanner';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Somapay - O primeiro com uma solução completa',
  description: 'Simplifique a gestão de pagamentos com a Somapay. Mais controle para o seu negócio, mais benefícios para os seus colaboradores - tudo em um só lugar!',
  keywords: 'gestão financeira, pagamento de folha, conta digital, benefícios empresariais, cartão multibenefícios',
  authors: [{ name: 'Somapay' }],
  creator: 'Somapay',
  publisher: 'Somapay',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://somapay.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Somapay - O primeiro com uma solução completa',
    description: 'Simplifique a gestão de pagamentos com a Somapay. Mais controle para o seu negócio, mais benefícios para os seus colaboradores - tudo em um só lugar!',
    url: 'https://somapay.com.br',
    siteName: 'Somapay',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Somapay - Gestão financeira empresarial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Somapay - O primeiro com uma solução completa',
    description: 'Simplifique a gestão de pagamentos com a Somapay. Mais controle para o seu negócio, mais benefícios para os seus colaboradores - tudo em um só lugar!',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect para melhor performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://sst.somapay.com.br" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Color */}
        <meta name="theme-color" content="#f5793b" />
        <meta name="msapplication-TileColor" content="#f5793b" />

        {/* Configuração do viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Somapay",
              "description": "Simplifique a gestão de pagamentos com a Somapay. Mais controle para o seu negócio, mais benefícios para os seus colaboradores - tudo em um só lugar!",
              "url": "https://somapay.com.br",
              "logo": "https://somapay.com.br/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Washington Soares, 4335",
                "addressLocality": "Fortaleza",
                "addressRegion": "CE",
                "postalCode": "60834-005",
                "addressCountry": "BR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-85-4007-2699",
                "contactType": "customer service",
                "availableLanguage": "Portuguese"
              },
              "sameAs": [
                "https://www.facebook.com/somapay",
                "https://www.linkedin.com/company/somapay",
                "https://www.instagram.com/somapay"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <GTMScript>
          <Header />
          <main role="main">
            {children}
          </main>
          <CookieBanner />
        </GTMScript>

        {/* Schema.org para Breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://somapay.com.br"
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}