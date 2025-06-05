'use client';

import { trackButtonClick } from '@/utils/analytics';
import { Building2, ChevronDown, FileText, Menu, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (itemName: string) => {
        trackButtonClick(itemName, 'navigation');
        setIsOpen(false);
        setActiveDropdown(null);
    };

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
            : 'bg-transparent'
            }`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="/"
                            onClick={() => handleNavClick('logo')}
                            className="flex items-center space-x-2"
                        >
                            <img
                                src="/logo-somapay.png"
                                alt="Somapay"
                                className="h-10 w-auto"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {/* Quem somos */}
                        <a
                            href="/quem-somos"
                            onClick={() => handleNavClick('quem_somos')}
                            className={`font-medium transition-colors hover:text-primary-600 ${isScrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
                                }`}
                        >
                            Quem somos
                        </a>

                        {/* Soluções Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('solucoes')}
                                className={`flex items-center space-x-1 font-medium transition-colors hover:text-primary-600 ${isScrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                <span>Soluções</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'solucoes' ? 'rotate-180' : ''
                                    }`} />
                            </button>

                            {activeDropdown === 'solucoes' && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                    <a
                                        href="/gestao-beneficios"
                                        onClick={() => handleNavClick('gestao_beneficios')}
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                    >
                                        <Building2 className="h-5 w-5 mr-3 text-primary-500" />
                                        <div>
                                            <div className="font-medium">Gestão de Benefícios</div>
                                            <div className="text-sm text-gray-500">Cartão multibenefícios</div>
                                        </div>
                                    </a>
                                    <a
                                        href="/conta-digital"
                                        onClick={() => handleNavClick('conta_digital')}
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                    >
                                        <User className="h-5 w-5 mr-3 text-secondary-500" />
                                        <div>
                                            <div className="font-medium">Conta Digital</div>
                                            <div className="text-sm text-gray-500">Pagamento de folha</div>
                                        </div>
                                    </a>
                                    <a
                                        href="/credito-consignado"
                                        onClick={() => handleNavClick('credito_consignado')}
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                    >
                                        <FileText className="h-5 w-5 mr-3 text-accent-500" />
                                        <div>
                                            <div className="font-medium">Crédito Consignado</div>
                                            <div className="text-sm text-gray-500">Empréstimos facilitados</div>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Dúvidas */}
                        <a
                            href="/duvidas"
                            onClick={() => handleNavClick('duvidas')}
                            className={`font-medium transition-colors hover:text-primary-600 ${isScrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
                                }`}
                        >
                            Dúvidas
                        </a>

                        {/* Blog */}
                        <a
                            href="/blog"
                            onClick={() => handleNavClick('blog')}
                            className={`font-medium transition-colors hover:text-primary-600 ${isScrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
                                }`}
                        >
                            Blog
                        </a>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <a
                            href="/login"
                            onClick={() => handleNavClick('acessar_conta')}
                            className={`font-medium transition-colors hover:text-primary-600 ${isScrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
                                }`}
                        >
                            Acessar conta
                        </a>
                        <button
                            onClick={() => handleNavClick('cadastre_se_header')}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                            Cadastre-se
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                }`}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-xl">
                        <div className="px-4 py-6 space-y-4">
                            <a
                                href="/quem-somos"
                                onClick={() => handleNavClick('quem_somos_mobile')}
                                className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                            >
                                Quem somos
                            </a>

                            {/* Mobile Soluções */}
                            <div>
                                <button
                                    onClick={() => toggleDropdown('solucoes-mobile')}
                                    className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                                >
                                    <span>Soluções</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'solucoes-mobile' ? 'rotate-180' : ''
                                        }`} />
                                </button>

                                {activeDropdown === 'solucoes-mobile' && (
                                    <div className="ml-4 mt-2 space-y-2">
                                        <a
                                            href="/gestao-beneficios"
                                            onClick={() => handleNavClick('gestao_beneficios_mobile')}
                                            className="flex items-center py-2 text-gray-600 hover:text-primary-600 transition-colors"
                                        >
                                            <Building2 className="h-4 w-4 mr-2 text-primary-500" />
                                            Gestão de Benefícios
                                        </a>
                                        <a
                                            href="/conta-digital"
                                            onClick={() => handleNavClick('conta_digital_mobile')}
                                            className="flex items-center py-2 text-gray-600 hover:text-primary-600 transition-colors"
                                        >
                                            <User className="h-4 w-4 mr-2 text-secondary-500" />
                                            Conta Digital
                                        </a>
                                        <a
                                            href="/credito-consignado"
                                            onClick={() => handleNavClick('credito_consignado_mobile')}
                                            className="flex items-center py-2 text-gray-600 hover:text-primary-600 transition-colors"
                                        >
                                            <FileText className="h-4 w-4 mr-2 text-accent-500" />
                                            Crédito Consignado
                                        </a>
                                    </div>
                                )}
                            </div>

                            <a
                                href="/duvidas"
                                onClick={() => handleNavClick('duvidas_mobile')}
                                className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                            >
                                Dúvidas
                            </a>

                            <a
                                href="/blog"
                                onClick={() => handleNavClick('blog_mobile')}
                                className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                            >
                                Blog
                            </a>

                            <div className="border-t border-gray-200 pt-4 space-y-3">
                                <a
                                    href="/login"
                                    onClick={() => handleNavClick('acessar_conta_mobile')}
                                    className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                                >
                                    Acessar conta
                                </a>
                                <button
                                    onClick={() => handleNavClick('cadastre_se_mobile')}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Cadastre-se
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}