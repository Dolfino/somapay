// Global type definitions for analytics and tracking

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
        fbq: (...args: any[]) => void;
        cookieConsentManager: {
            hasConsent: () => boolean;
            setConsent: (consent: boolean) => void;
            showBanner: () => void;
        };
        enhancedConversions: {
            setUserData: (userData: {
                email?: string;
                phone?: string;
                firstName?: string;
                lastName?: string;
                state?: string;
                city?: string;
            }) => void;
            trackConversion: (conversionData: {
                value: number;
                currency?: string;
                transactionId: string;
            }) => void;
        };
    }

    // Extend NodeJS ProcessEnv
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_GTM_ID: string;
            NEXT_PUBLIC_GTM_AUTH: string;
            NEXT_PUBLIC_GTM_PREVIEW: string;
            NEXT_PUBLIC_GA4_MEASUREMENT_ID: string;
            NEXT_PUBLIC_FACEBOOK_PIXEL_ID: string;
            FACEBOOK_CONVERSION_API_TOKEN: string;
            NEXT_PUBLIC_GTM_SERVER_URL: string;
            NODE_ENV: 'development' | 'production' | 'test';
        }
    }
}

// Analytics event types
export interface AnalyticsEvent {
    event: string;
    event_category?: string;
    event_action?: string;
    event_label?: string;
    value?: number;
    currency?: string;
    transaction_id?: string;
    custom_parameters?: Record<string, any>;
}

// UTM parameters type
export interface UTMParameters {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_content: string;
    utm_term: string;
}

// E-commerce item type
export interface EcommerceItem {
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
}

// User data for enhanced conversions
export interface UserData {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    address?: {
        country?: string;
        region?: string;
        city?: string;
    };
}

export { };
