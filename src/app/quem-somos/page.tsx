'use client';
import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export default function QuemSomosPage() {
    const [showVideo, setShowVideo] = useState(false);

    // Função dummy para tracking de botões (evita erro de referência)
    const handleButtonClick = () => { };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section
                className="relative bg-white overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-center gap-12">
                    <div className="flex-1 flex flex-col items-center md:items-start justify-center">
                        <span className="text-[#FF6B3D] text-xl font-semibold mb-2">Propósito</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight text-center md:text-left">
                            Transformar<br />
                            vidas<br />
                            facilitando<br />
                            o crédito.
                        </h2>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="relative w-full max-w-[340px] aspect-[1/1] flex items-center justify-center">
                            <img
                                src="/QSomos.png"
                                alt="Ambiente Somapay"
                                className="w-full h-full object-cover rounded-[48px] border-[10px] border-[#FF6B3D] bg-white"
                                style={{ aspectRatio: "1/1" }}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* Bloco "Tudo em um só lugar!" */}
            <section className="bg-[#F7F7FA] py-12">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto mb-8 md:mb-0 relative">
                        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                            <ellipse cx="80" cy="80" rx="75" ry="75" stroke="#FF6B3D" strokeWidth="3" />
                            <path d="M155 80c0 41.421-33.579 75-75 75" stroke="#FF6B3D" strokeWidth="3" />
                        </svg>
                        <span
                            className="absolute font-bold text-2xl leading-tight text-center text-[#FF6B3D] select-none pointer-events-none"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 120,
                                lineHeight: 1.1,
                            }}
                        >
                            Tudo<br />em<br />um só<br />lugar!
                        </span>
                    </div>
                    <div className="flex-1 text-gray-900 text-lg leading-relaxed">
                        Somos a primeira instituição financeira a oferecer um internet banking que <b>simplifica a rotina do RH, DP e financeiro</b> das empresas ao fazer abertura de conta digital, pagamento de folha integrado à ERP’s, gestão de contracheque e ponto online, seguro estagiário e empresarial e gestão de benefícios flexíveis.
                    </div>
                </div>
            </section>
            {/* Bloco História */}
            <section className="bg-white py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <p className="text-lg text-gray-900 mb-6">
                        Nascemos em 2014 no Ceará como uma fintech especializada no pagamento da folha e <b>em 2022 nos tornamos uma SCD</b> – Sociedade de Crédito Direto – <b>autorizada pelo Banco Central do Brasil</b>.
                    </p>
                    <p className="text-lg text-gray-900 font-semibold mb-2">
                        Em 2024 celebramos uma década de inovação e crescimento
                    </p>
                    <p className="text-lg text-gray-900">
                        no mercado financeiro, inauguramos nosso escritório em São Paulo focando na expansão da empresa a nível nacional e adquirimos a Bee Vale, nos tornando o primeiro banco digital a oferecer benefícios flexíveis em sua plataforma.
                    </p>
                </div>
            </section>
            {/* Bloco Linha do Tempo */}
            <section className="bg-[#FF6B3D] py-14 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="relative flex flex-col md:flex-row items-start md:items-start justify-between gap-10 md:gap-0">
                        {/* Linha horizontal */}
                        <div className="hidden md:block absolute left-[8%] right-[8%] top-[44px] h-0.5 bg-white/60 z-0" />
                        {/* 2014 */}
                        <div className="flex-1 flex flex-col items-center text-center z-10">
                            <div className="text-white text-2xl font-bold mb-2">2014</div>
                            <div className="w-4 h-4 rounded-full bg-white mb-4 md:mb-6 border-4 border-[#FF6B3D]"></div>
                            <div className="text-white text-base leading-relaxed max-w-xs">
                                Nasce uma forma automatizada de pagamento de folha como uma alternativa de sair da burocracia dos bancos tradicionais.
                            </div>
                        </div>
                        {/* 2020 */}
                        <div className="flex-1 flex flex-col items-center text-center z-10">
                            <div className="text-white text-2xl font-bold mb-2">2020</div>
                            <div className="w-4 h-4 rounded-full bg-white mb-4 md:mb-6 border-4 border-[#FF6B3D]"></div>
                            <div className="text-white text-base leading-relaxed max-w-xs">
                                A plataforma de pagamento Soma Conta Digital vira Somapay e já é a conta digital de mais de 100 mil colaboradores no Brasil.
                            </div>
                        </div>
                        {/* 2022 */}
                        <div className="flex-1 flex flex-col items-center text-center z-10">
                            <div className="text-white text-2xl font-bold mb-2">2022</div>
                            <div className="w-4 h-4 rounded-full bg-white mb-4 md:mb-6 border-4 border-[#FF6B3D]"></div>
                            <div className="text-white text-base leading-relaxed max-w-xs">
                                Em todo o Brasil, a Somapay se torna SCD (Sociedade de Crédito Direto) e com movimentações de mais de 500 milhões de reais em transações.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Bloco RA1000 */}
            <section className="bg-[#F7F7FA] py-16 px-2">
                <div className="max-w-5xl mx-auto rounded-3xl bg-white flex flex-col md:flex-row items-center justify-between shadow-md px-6 py-10 gap-8">
                    <div className="flex-1 flex flex-col items-start justify-center">
                        <div className="text-black text-base font-medium mb-2">#Somos<br />RA1000</div>
                        <svg width="32" height="32" className="mb-4" viewBox="0 0 32 32" fill="none">
                            <path d="M8 12l8 8 8-8" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="text-2xl md:text-3xl font-semibold text-black leading-snug">
                            Já são mais de 2 mil<br />
                            empresas atendidas e<br />
                            mais de 200 mil<br />
                            contas abertas.
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-[340px] rounded-2xl border border-gray-300 bg-white p-6 flex flex-col items-center">
                            <img
                                src="/RA1000_QSomos.png"
                                alt="Certificado RA1000 ReclameAqui"
                                className="w-48 h-auto mb-4"
                            />
                            <div className="text-gray-500 text-sm text-center">
                                Selo de excelência em atendimento ao consumidor
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Main content */}
            <section className="py-12 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Junte-se a nós e faça parte da transformação!
                    </h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Descubra como podemos ajudar sua empresa a simplificar a gestão financeira e de recursos humanos.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#"
                            className="inline-block bg-[#FF6B3D] text-white text-lg font-semibold py-3 px-6 rounded-full shadow-md hover:bg-[#e65c32] transition-all duration-300"
                        >
                            Fale com um consultor
                        </a>
                        <a
                            href="#"
                            className="inline-block text-[#FF6B3D] text-lg font-semibold py-3 px-6 rounded-full border-2 border-[#FF6B3D] shadow-md hover:bg-[#FF6B3D] hover:text-white transition-all duration-300"
                        >
                            Conheça nossos produtos
                        </a>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <div className="bg-[#4B0B6B] text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
                        {/* Produtos */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Produtos</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="/gestao-beneficios" className="hover:text-white transition-colors">Gestão de Benefícios</a></li>
                                <li><a href="/gestao-pessoas" className="hover:text-white transition-colors">Gestão de Pessoas</a></li>
                                <li><a href="/credito-consignado" className="hover:text-white transition-colors">Crédito Consignado</a></li>
                                <li><a href="/saldo-extra" className="hover:text-white transition-colors">Saldo Extra</a></li>
                                <li><a href="/seguros" className="hover:text-white transition-colors">Seguros</a></li>
                            </ul>
                        </div>

                        {/* Transparência */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Transparência</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="/politica-cookies" className="hover:text-white transition-colors">Políticas de Cookies</a></li>
                                <li><a href="/termos" className="hover:text-white transition-colors">Termos e Condições</a></li>
                                <li><a href="/convenio" className="hover:text-white transition-colors">Convênio de Adesão</a></li>
                                <li><a href="/abertura-conta" className="hover:text-white transition-colors">Termos de Abertura de Conta</a></li>
                            </ul>
                        </div>

                        {/* Sobre nós */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Sobre nós</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="/quem-somos" className="hover:text-white transition-colors">Quem somos</a></li>
                                <li><a href="/duvidas" className="hover:text-white transition-colors">Dúvidas</a></li>
                                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>

                        {/* Atendimento */}
                        <div className="flex flex-col justify-start">
                            <h3 className="text-lg font-semibold mb-4">Atendimento</h3>
                            <div className="space-y-3 text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span className="text-sm">PF: 4007-2699 <br />  0800 006 6650</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span className="text-sm">PJ: 4000-2995 <br />  0800 006 6670</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span className="text-sm">atendimento@somapay.com.br</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-700">
                                <p className="text-sm text-gray-400">
                                    Horários: Segunda a sábado das <br /> 7h às 20h | Domingos das 8h às 20h
                                </p>
                            </div>
                        </div>

                        {/* Redes Sociais */}
                        <div className="flex flex-col items-start justify-start lg:items-start lg:justify-start mt-0">
                            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
                            <div className="flex flex-row gap-4">
                                <a
                                    href="https://facebook.com/somapay"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white hover:bg-[#5C1A7A] transition-colors"
                                    style={{ background: 'rgba(255,255,255,0.08)' }}
                                >
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="12" fill="none" />
                                        <path fill="#fff" d="M15.117 8.25V6.75c0-.621.504-1.125 1.125-1.125h1.125V3.75h-2.25A3.375 3.375 0 0 0 12 7.125v1.125H9.75v2.25H12v6.75h2.25v-6.75h1.5l.375-2.25h-1.875z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://instagram.com/somapay"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white hover:bg-[#5C1A7A] transition-colors"
                                    style={{ background: 'rgba(255,255,255,0.08)' }}
                                >
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="12" fill="none" />
                                        <rect width="14" height="14" x="5" y="5" rx="4" stroke="#fff" strokeWidth="2" />
                                        <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="2" />
                                        <circle cx="16.2" cy="7.8" r="1" fill="#fff" />
                                    </svg>
                                </a>
                                <a
                                    href="https://linkedin.com/company/somapay"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white hover:bg-[#5C1A7A] transition-colors"
                                    style={{ background: 'rgba(255,255,255,0.08)' }}
                                >
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="12" fill="none" />
                                        <rect width="14" height="14" x="5" y="5" rx="3" stroke="#fff" strokeWidth="2" />
                                        <path d="M9 10v5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="9" cy="8.5" r="1" fill="#fff" />
                                        <path d="M13 13v2m0-2a2 2 0 1 1 4 0v2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Institucional */}
            <div className="bg-[#4B0B6B] py-8 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col gap-2">
                        <img
                            src="/logo-somapay-white.png"
                            alt="Somapay Digital Bank"
                            className="mb-2 h-auto max-w-[200px]"
                            style={{ objectFit: 'contain' }}
                        />
                        <div className="text-white text-sm font-medium">Somapay Sociedade de Crédito Direto S.A.</div>
                        <div className="text-white text-sm">CNPJ: 44.705.774/0001-93</div>
                        <div className="text-white text-sm">Av. Washington Soares, 4335, Sapiranga, Fortaleza – CE</div>
                    </div>
                    <div className="flex items-center gap-6 mt-6 md:mt-0">
                        <img src="/footer-selo-bacen.png" alt="Selo Bacen" className="h-12" />
                        <img src="/footer-ra1000.png" alt="Selo RA1000" className="h-12" />
                        <img src="/footer-gptw.png" alt="Great Place to Work" className="h-12" />
                    </div>
                </div>
            </div>
        </div>
    );
}
