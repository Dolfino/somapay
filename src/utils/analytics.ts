import CryptoJS from 'crypto-js';

// Tipos para o Data Layer
export interface DataLayerEvent {
    event: string;
    event_category?: string;
    event_action?: string;
    event_label?: string;
    value?: number;
    currency?: string;
    transaction_id?: string;
    items?: Array<{
        item_id: string;
        item_name: string;
        category: string;
        quantity: number;
        price: number;
    }>;
    user_data?: {
        email?: string;
        phone?: string;
        first_name?: string;
        last_name?: string;
    };
    page_title?: string;
    page_location?: string;
    content_group1?: string;
    custom_parameters?: Record<string, any>;
    user_id?: string; // Adicionada propriedade user_id
    user_properties?: Record<string, any>; // Adicionada propriedade user_properties
}

// Configuração do GTM
export const GTM_CONFIG = {
    containerId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PMMV4PCB',
    serverContainerUrl: process.env.NEXT_PUBLIC_GTM_SERVER_URL || 'https://sst.somapay.com.br',
    auth: process.env.NEXT_PUBLIC_GTM_AUTH || '',
    preview: process.env.NEXT_PUBLIC_GTM_PREVIEW || ''
};

// Configuração do Facebook Pixel
export const FACEBOOK_CONFIG = {
    pixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '841309739955811',
    accessToken: process.env.FACEBOOK_CONVERSION_API_TOKEN || 'your-conversion-api-token'
};

// Configuração do GA4
export const GA4_CONFIG = {
    measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-B998Z5QTDC'
};

// Configuração do Hotjar
export const HOTJAR_CONFIG = {
    siteId: Number(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID),
    version: Number(process.env.NEXT_PUBLIC_HOTJAR_VERSION)
};

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
        fbq: (...args: any[]) => void;
    }
}

// Função para hash de dados pessoais (Advanced Matching)
export const hashUserData = (data: string): string => {
    return CryptoJS.SHA256(data.toLowerCase().trim()).toString();
};

// Função para capturar parâmetros UTM
export const getUtmParameters = (): Record<string, string> => {
    if (typeof window === 'undefined') return {};

    const urlParams = new URLSearchParams(window.location.search);
    return {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_content: urlParams.get('utm_content') || '',
        utm_term: urlParams.get('utm_term') || '',
    };
};

// Função para gerar ID único de evento (deduplicação)
export const generateEventId = (): string => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Função para enviar evento para o Data Layer
export const pushToDataLayer = (eventData: DataLayerEvent): void => {
    if (typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];

    const enrichedEvent = {
        ...eventData,
        timestamp: Date.now(),
        event_id: generateEventId(),
        ...getUtmParameters(),
        page_title: document.title,
        page_location: window.location.href,
    };

    window.dataLayer.push(enrichedEvent);

    // Debug em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
        console.log('DataLayer Event:', enrichedEvent);
    }
};

// Eventos específicos do negócio
export const trackPageView = (pageName?: string): void => {
    pushToDataLayer({
        event: 'page_view',
        page_title: pageName || document.title,
        content_group1: pageName || 'general'
    });
};

export const trackFormSubmit = (formName: string, formData?: Record<string, any>): void => {
    pushToDataLayer({
        event: 'form_submit',
        event_category: 'engagement',
        event_action: 'form_submit',
        event_label: formName,
        custom_parameters: formData
    });
};

export const trackButtonClick = (buttonName: string, section?: string): void => {
    pushToDataLayer({
        event: 'button_click',
        event_category: 'engagement',
        event_action: 'click',
        event_label: buttonName,
        content_group1: section || 'general'
    });
};

export const trackFileDownload = (fileName: string, fileType: string): void => {
    pushToDataLayer({
        event: 'file_download',
        event_category: 'engagement',
        event_action: 'download',
        event_label: fileName,
        custom_parameters: {
            file_type: fileType
        }
    });
};

export const trackVideoPlay = (videoTitle: string, videoDuration?: number): void => {
    pushToDataLayer({
        event: 'video_play',
        event_category: 'engagement',
        event_action: 'video_play',
        event_label: videoTitle,
        custom_parameters: {
            video_duration: videoDuration
        }
    });
};

// Eventos de e-commerce
export const trackPurchase = (transactionData: {
    transaction_id: string;
    value: number;
    currency: string;
    items: Array<{
        item_id: string;
        item_name: string;
        category: string;
        quantity: number;
        price: number;
    }>;
}): void => {
    pushToDataLayer({
        event: 'purchase',
        event_category: 'ecommerce',
        transaction_id: transactionData.transaction_id,
        value: transactionData.value,
        currency: transactionData.currency,
        items: transactionData.items
    });
};

export const trackAddToCart = (item: {
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
}): void => {
    pushToDataLayer({
        event: 'add_to_cart',
        event_category: 'ecommerce',
        currency: 'BRL',
        value: item.price * item.quantity,
        items: [item]
    });
};

export const trackBeginCheckout = (items: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
}>): void => {
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    pushToDataLayer({
        event: 'begin_checkout',
        event_category: 'ecommerce',
        currency: 'BRL',
        value: totalValue,
        items: items
    });
};

// Função para configurar Enhanced E-commerce
export const setupEnhancedEcommerce = (): void => {
    if (typeof window === 'undefined') return;

    // Configurar enhanced ecommerce tracking
    window.gtag = window.gtag || function () {
        (window.dataLayer = window.dataLayer || []).push(arguments);
    };

    window.gtag('config', GA4_CONFIG.measurementId, {
        enhanced_conversions: true,
        allow_enhanced_conversions: true,
        conversion_linker: true
    });
};

// Função para rastrear erros JavaScript
export const trackError = (error: Error, errorInfo?: string): void => {
    pushToDataLayer({
        event: 'exception',
        event_category: 'error',
        event_action: 'javascript_error',
        event_label: error.message,
        custom_parameters: {
            error_stack: error.stack,
            error_info: errorInfo
        }
    });
};

// Função para configurar User ID
export const setUserId = (userId: string): void => {
    if (typeof window === 'undefined') return;

    window.gtag('config', GA4_CONFIG.measurementId, {
        user_id: userId
    });

    pushToDataLayer({
        event: 'set_user_id',
        user_id: userId
    });
};

// Função para configurar propriedades customizadas do usuário
export const setUserProperties = (properties: Record<string, any>): void => {
    if (typeof window === 'undefined') return;

    window.gtag('config', GA4_CONFIG.measurementId, {
        custom_map: properties
    });

    pushToDataLayer({
        event: 'set_user_properties',
        user_properties: properties
    });
};
