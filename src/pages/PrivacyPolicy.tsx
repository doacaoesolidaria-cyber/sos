import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold mb-8 transition">
          &larr; Voltar para a página inicial
        </Link>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 border-b pb-4">Política de Privacidade</h1>
        
        <div className="space-y-8 text-gray-600 leading-relaxed md:text-lg">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Nosso Compromisso com Sua Privacidade</h2>
            <p>
              Prezamos pela confidencialidade e segurança dos dados das pessoas que se comovem com nossa causa. Esta Política de Privacidade explica o modo que coletamos, usamos e protegemos suas informações na plataforma SOS Animal Help.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Dados Coletados</h2>
            <p>
              Em interações básicas e doações anônimas pelo Pix, não retemos ativamente dados sensíveis que o identifiquem. Nos casos onde houver contato via e-mail ou eventuais formulários futuros, os dados poderão incluir:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Nome</li>
              <li>Endereço de E-mail</li>
              <li>Informações básicas providas por ferramentas de análise web da forma de navegação na página</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Como Usamos os Dados</h2>
            <p>
              Os dados coletados são estritamente direcionados aos propósitos:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Garantir a verificação de interações de maneira segura</li>
              <li>Acompanhar doações (conforme a viabilidade sistêmica) e prestar suporte caso necessite</li>
              <li>Entender o tráfego do site para melhorar a experiência dos doadores e aumentar as campanhas a favor dos animais abandonados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Processamento de Transações</h2>
            <p>
              O sistema Pix da página delega as transações aos intermediadores de pagamento. Estes provedores são instituições idóneas, mantendo os seus próprios padrões rigorosos de anonimato e criptografia. Não armazenamos, de forma alguma, o acesso ou as chaves bancárias originais dos usuários em nossos servidores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Compartilhamento de Informações</h2>
            <p>
              Asseguramos que <strong>não comercializamos, vendemos ou alugamos</strong> suas informações pessoais com terceiros em qualquer circunstância. Os dados são fornecidos rigorosamente apenas em caráter requisitado por mandatos legais ou de segurança imprescindível.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Cookies e Rastreamento</h2>
            <p>
              A plataforma pode utilizar pequenos arquivos chamados "cookies" e tecnologias similares de provedores para compilar estatísticas agregadas sobre o tráfego web, o que colabora com inovações dos nossos contatos e captação de recursos beneficentes on-line.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Os Seus Direitos</h2>
            <p>
              Se desejar interpelar os dados coletados de contatos da sua pessoa, você possui o direito e poderá solicitar esclarecimento bem como pedido de remoção das listas. Para isso entre de contato usando o email fornecido no rodapé.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center gap-2">
          <p className="font-bold text-gray-700 text-base">Fale conosco</p>
          <a href="mailto:ajude@sosanimalhelp.shop" className="text-primary-500 hover:underline font-medium mb-4">ajude@sosanimalhelp.shop</a>
          <p className="mt-2 text-gray-400">&copy; 2026 – Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
}
