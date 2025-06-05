'use client';

import Modal from '@/components/layout/Modal';
import { trackButtonClick, trackFileDownload, trackFormSubmit, trackPageView } from '@/utils/analytics';
import {
  ArrowRight,
  CheckCircle,
  Download,
  ExternalLink,
  Mail,
  Phone,
  PlayCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface FormData {
  nome: string;
  telefone: string;
  email: string;
  cidade: string;
  nomeEmpresa: string;
  numeroFuncionarios: string;
  cargo: string;
  tipoCliente: 'PF' | 'PJ' | 'nao-cliente';
}

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    telefone: '',
    email: '',
    cidade: '',
    nomeEmpresa: '',
    numeroFuncionarios: '',
    cargo: '',
    tipoCliente: 'nao-cliente'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Rastrear visualização da página
    trackPageView('Home');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Rastrear envio do formulário
      trackFormSubmit('contact_form', {
        tipo_cliente: formData.tipoCliente,
        numero_funcionarios: formData.numeroFuncionarios,
        cargo: formData.cargo
      });

      setShowSuccess(true);

      // Resetar formulário após 3 segundos
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          nome: '',
          telefone: '',
          email: '',
          cidade: '',
          nomeEmpresa: '',
          numeroFuncionarios: '',
          cargo: '',
          tipoCliente: 'nao-cliente'
        });
      }, 3000);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = (buttonName: string, section?: string) => {
    trackButtonClick(buttonName, section);
  };

  const handleDownload = (fileName: string, fileType: string) => {
    trackFileDownload(fileName, fileType);
    // Simular download
    const link = document.createElement('a');
    link.href = '#';
    link.download = fileName;
    link.click();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/hero.png')`
          }}
        ></div>

        {/* Overlay para garantir legibilidade do texto */}
        <div className="absolute inset-0 bg-black/40"></div>

        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white overflow-hidden">
        </section>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 mt-56">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight">
              O primeiro <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-accent-400">com uma solução completa</span>
            </h1>

            <p className="text-xl md:text-2xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              Simplifique a gestão de pagamentos com a Somapay. Mais controle para o seu negócio,
              mais benefícios para os seus colaboradores - tudo em um só lugar!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={() => handleButtonClick('quero_ser_cliente_hero', 'hero')}
                className="group bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2"
              >
                Quero ser cliente
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  handleButtonClick('assistir_demo', 'hero');
                  setShowVideo(true);
                }}
                className="group border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/10 flex items-center gap-2"
              >
                <PlayCircle className="h-5 w-5" />
                Assistir demonstração
              </button>
              <Modal open={showVideo} onClose={() => setShowVideo(false)}>
                <div className="w-[840px] max-w-full mx-auto">
                  <div className="relative pt-[56.25%]"> {/* 16:9 ratio */}
                    <iframe
                      src="https://www.youtube.com/embed/Mh6J0BxWFLI?autoplay=1"
                      title="Demonstração Somapay"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full rounded-b-xl"
                    ></iframe>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Conheça todos os produtos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A parceria que sua empresa merece! Soluções completas para gestão financeira empresarial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gestão de Benefícios */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col">
              <img
                src="/Beevale_102.png"
                alt="Cartão Beevale"
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestão de Benefícios</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Cartão multibenefícios com bandeira ELO, aceito em mais de 4 milhões de estabelecimentos em todo o Brasil.
                </p>
                <button
                  onClick={() => handleButtonClick('saiba_mais_beneficios', 'produtos')}
                  className="border border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white font-semibold px-6 py-2 rounded-lg transition-all self-start"
                >
                  Saiba mais
                </button>
              </div>
            </div>

            {/* Conta Digital */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <img
                src="/Conta-Digital_102.png"
                alt="Conta Digital"
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Conta Digital</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  O jeito mais fácil e rápido de pagar a folha dos seus colaboradores.
                  Pague em poucos cliques com o internet banking Somapay.
                </p>
                <button
                  onClick={() => handleButtonClick('saiba_mais_conta', 'produtos')}
                  className="border border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white font-semibold px-6 py-2 rounded-lg transition-all self-start"
                >
                  Saiba mais
                </button>
              </div>
            </div>

            {/* Pagamento da Folha */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <img
                src="/Computador_102.png"
                alt="Pagamento da Folha"
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pagamento da Folha</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Proteção para empresa e colaboradores. Segurança e benefícios que fazem
                  a diferença no seu negócio e na vida dos colaboradores.
                </p>
                <button
                  onClick={() => handleButtonClick('saiba_mais_folha', 'produtos')}
                  className="border border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white font-semibold px-6 py-2 rounded-lg transition-all self-start"
                >
                  Saiba mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section
        className="py-20 bg-white relative"
        style={{
          backgroundImage: `url('/BG_Formulario.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        {/* overlay opcional para legibilidade */}
        <div className="absolute inset-0 bg-white/50 pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Quer ter todos os benefícios?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Entre em contato e conheça as facilidades da Somapay.
                Mais de 3.000 empresas já contam com a gente!
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Autorizada pelo Banco Central (registro 520)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Certificada GPTW - Great Place to Work</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Selo RA 1000 de excelência no atendimento</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              {showSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Obrigado!</h3>
                  <p className="text-gray-600">
                    Recebemos sua mensagem e entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="nome"
                      placeholder="Nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                    <input
                      type="tel"
                      name="telefone"
                      placeholder="Telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                    <input
                      type="text"
                      name="cidade"
                      placeholder="Cidade/Estado"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <input
                    type="text"
                    name="nomeEmpresa"
                    placeholder="Nome da empresa"
                    value={formData.nomeEmpresa}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      name="numeroFuncionarios"
                      value={formData.numeroFuncionarios}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Número de funcionários</option>
                      <option value="1-10">1 a 10 funcionários</option>
                      <option value="11-50">11 a 50 funcionários</option>
                      <option value="51-200">51 a 200 funcionários</option>
                      <option value="201-500">201 a 500 funcionários</option>
                      <option value="500+">Mais de 500 funcionários</option>
                    </select>
                    <input
                      type="text"
                      name="cargo"
                      placeholder="Cargo"
                      value={formData.cargo}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="text-sm text-gray-700 font-medium">Você é:</div>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="tipoCliente"
                          value="PF"
                          checked={formData.tipoCliente === 'PF'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Cliente PF</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="tipoCliente"
                          value="PJ"
                          checked={formData.tipoCliente === 'PJ'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Cliente PJ</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="tipoCliente"
                          value="nao-cliente"
                          checked={formData.tipoCliente === 'nao-cliente'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Ainda não sou cliente</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Li e aceito os{' '}
                      <a href="/termos" className="text-primary-600 hover:underline">
                        termos e condições
                      </a>{' '}
                      de{' '}
                      <a href="/politica-privacidade" className="text-primary-600 hover:underline">
                        Política de Privacidade
                      </a>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Quero ser cliente
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section> {/* Fim do Formulário de Contato */}

      {/* Mapa Pontilhado - Presença Nacional */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 flex flex-col items-start">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              Estamos em todos os estados do Brasil
            </h2>
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold text-gray-900">3 mil</div>
                <div className="text-gray-600 text-sm">Empresas clientes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">R$ 10 bi</div>
                <div className="text-gray-600 text-sm">Em transações bancárias</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">400 mil</div>
                <div className="text-gray-600 text-sm">Contas digitais abertas</div>
              </div>
            </div>
            <button
              onClick={() => handleButtonClick('quero_ser_cliente_mapa', 'mapa')}
              className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Quero ser cliente
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/art.png"
              alt="Mapa pontilhado do Brasil"
              className="max-w-full h-auto"
              style={{ minWidth: 280, maxWidth: 400 }}
            />
          </div>
        </div>
        <div className="mt-16 text-center">
          <div className="text-xl md:text-2xl text-gray-600 font-medium">
            Mais de 3.000 empresas já contam com a Somapay
          </div>
        </div>
      </section>

      {/* Soluções e App Somapay */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col items-center lg:items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-center lg:text-left mb-8">
              Conheça melhor as soluções que garantem<br />
              mais comodidade e segurança
            </h2>
            <div className="mt-auto mb-8 lg:mb-0">
              <div className="text-xl md:text-2xl font-medium mb-2 text-white">App Somapay, experimente<br />uma vida mais prática</div>
              <a href="#" className="text-sm text-accent-200 hover:underline font-semibold">
                Conheça a Conta Digital da Somapay
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/plataforma_102.png"
              alt="Dashboard Somapay"
              className="max-w-full h-auto rounded-2xl shadow-2xl"
              style={{ minWidth: 320, maxWidth: 480 }}
            />
          </div>
        </div>
      </section>

      {/* Depoimento */}
      <section className="py-16 px-4 bg-[#3B0A4A] rounded-3xl max-w-6xl mx-auto mt-16 flex flex-col md:flex-row items-center relative overflow-hidden">
        {/* Imagem decorativa lateral */}
        <img
          src="/Layer_102.png"
          alt="Decoração"
          className="hidden md:block absolute right-0 top-0 h-full object-contain pointer-events-none select-none"
          style={{ maxHeight: '100%', zIndex: 1 }}
        />
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="text-orange-400 text-3xl mb-4">&#10077;</div>
          <blockquote className="text-white text-lg md:text-xl font-medium leading-relaxed mb-6">
            A palavra que resume a parceria da Somapay com o nosso grupo é <b>AGILIDADE</b>. Transformou o dia a dia e facilitou os processos internos. Eu não abro mão da empresa que facilitou a minha vida.
          </blockquote>
          <div className="font-bold text-white text-base mb-1">Marina Carvalho</div>
          <div className="text-white text-sm mb-4">Gerente de Recursos Humanos e Departamento Pessoal da BPO Solution</div>
          <img src="/Group_102.png" alt="Logo BPO Solution" className="h-10 w-auto mt-4" style={{ maxWidth: 100, height: 'auto' }} />
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Blog da Somapay
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Educação financeira, novidades e mais! Acompanhe nossos conteúdos exclusivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Post 1 */}
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <img src="/blog_101.png" alt="Imagem do post 1" className="w-full h-60 object-cover" />
              <div className="p-6">
                <div className="text-sm text-primary-600 font-medium mb-2">14 fev 2025 | Finanças Pessoais</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Conta Salário, Conta de Pagamento, Portabilidade e Transferência Programada: entenda as diferenças
                </h3>
                <p className="text-gray-600 mb-4">
                  Quando o assunto é o recebimento do salário, muitos trabalhadores ainda têm dúvidas sobre as diferenças...
                </p>
                <button
                  onClick={() => handleButtonClick('ler_post_1', 'blog')}
                  className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
                >
                  Ler mais
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </article>

            {/* Post 2 */}
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <img src="/blog_102.png" alt="Imagem do post 2" className="w-full h-60 object-cover" />
              <div className="p-6">
                <div className="text-sm text-primary-600 font-medium mb-2">07 out 2025 | Portal Somapay</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Somapay é eleita a segunda melhor instituição financeira para se trabalhar no Brasil
                </h3>
                <p className="text-gray-600 mb-4">
                  Essa é a segunda vez que a empresa cearense participou da pesquisa, passando de certificada GPTW...
                </p>
                <button
                  onClick={() => handleButtonClick('ler_post_2', 'blog')}
                  className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
                >
                  Ler mais
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </article>

            {/* Post 3 */}
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-accent-400 to-secondary-400"></div>
              <div className="p-6">
                <div className="text-sm text-primary-600 font-medium mb-2">22 jan 2025 | Finanças Pessoais</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Dicas para organizar as finanças e despesas neste início de ano
                </h3>
                <p className="text-gray-600 mb-4">
                  O início do ano é o momento ideal para reorganizar as finanças e estabelecer metas...
                </p>
                <button
                  onClick={() => handleButtonClick('ler_post_3', 'blog')}
                  className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
                >
                  Ler mais
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </article>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => handleButtonClick('ver_blog', 'blog')}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Visite o nosso Blog
            </button>
          </div>
        </div>
      </section>

      {/* App Download */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                App Somapay, experimente uma vida mais prática
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Baixe o aplicativo e tenha todo o controle financeiro na palma da sua mão.
                Disponível para iOS e Android.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    handleButtonClick('download_ios', 'app');
                    handleDownload('Somapay-iOS.ipa', 'app');
                  }}
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-xs">Baixar na</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    handleButtonClick('download_android', 'app');
                    handleDownload('Somapay-Android.apk', 'app');
                  }}
                  className="flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-xs">Baixar no</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl p-8 text-center">
                <div className="w-32 h-56 bg-gradient-to-b from-primary-600 to-accent-600 rounded-3xl mx-auto relative">
                  <div className="absolute inset-4 bg-white rounded-2xl flex items-center justify-center">
                    <div className="text-4xl">📱</div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="text-2xl font-bold text-gray-900">Somapay App</div>
                  <div className="text-gray-600">Gestão financeira simplificada</div>
                </div>
              </div>
            </div>
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
              className="mb-2 h-auto max-w-[200px]" // ajusta para não deformar
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