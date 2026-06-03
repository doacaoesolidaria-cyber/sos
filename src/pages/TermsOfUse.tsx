import { Link } from 'react-router-dom';

export default function TermsOfUse() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold mb-8 transition">
          &larr; Voltar para a página inicial
        </Link>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 border-b pb-4">Termos de Uso</h1>
        
        <div className="space-y-8 text-gray-600 leading-relaxed md:text-lg">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar este site para realizar doações ou interagir com nosso conteúdo, você concorda com os presentes Termos de Uso. Caso não concorde com parte ou com a totalidade destes termos, pedimos que não utilize nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. O Serviço</h2>
            <p>
              Este site permite a captação de doações para a compra de ração e manutenção do abrigo de animais resgatados. Nós nos reservamos o direito de modificar, suspender ou descontinuar a plataforma (ou parte dela) a qualquer momento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Doações e Transações</h2>
            <p>
              Todas as doações são processadas com segurança através da geração de QR Code Pix. As contribuições são voluntárias, não reembolsáveis e se destinam especificamente ao socorro dos animais amparados pela nossa iniciativa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Conduta do Usuário</h2>
            <p>
              Você concorda em usar nosso site apenas para fins lícitos. Está estritamente proibido:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Assediar, ameaçar, ou de alguma forma infringir os direitos de terceiros.</li>
              <li>Tentar acessar áreas restritas do nosso sistema.</li>
              <li>Fazer uso da plataforma de forma contínua com softwares automatizados de modo que causem ou não instabilidades.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Propriedade Intelectual</h2>
            <p>
              O conteúdo deste site, incluindo imagens, logotipo, design e textos, são propriedade exclusiva do SOS Animal Help. É proibida a reprodução, distribuição ou utilização sem nossa autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Limitação de Responsabilidade</h2>
            <p>
              Envidamos os maiores esforços para que nossa plataforma opere perfeitamente, mas não podemos garantir que ela estará livre de erros ou interrupções constantes. Não nos responsabilizamos por perdas indiretas advindas da incapacidade de uso do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Atualizações dos Termos</h2>
            <p>
              Estes Termos de Uso podem ser atualizados periodicamente para refletir mudanças operacionais ou legislativas e é de responsabilidade do usuário revisar esta página sistematicamente.
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
