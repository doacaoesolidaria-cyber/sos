import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const donationOptions = [
  { 
    id: '5kg', 
    title: '5KG DE RAÇÃO', 
    price: 'R$ 33,79',
    desc: 'Alimenta 5 animais resgatados do abandono por 3 dias inteiros. Um pequeno gesto, um impacto enorme.',
    amount: 3379,
    image: '/ChatGPT_Image_29_04_2026__14_16_37-removebg-preview.png',
    featured: false,
  },
  { 
    id: '10kg', 
    title: '10KG DE RAÇÃO', 
    price: 'R$ 64,90',
    desc: 'Alimenta 7 animais por 5 dias com nutrição adequada. Nos ajuda a manter as barriguinhas cheias!',
    amount: 6490,
    image: '/ChatGPT_Image_29_04_2026__14_19_53-removebg-preview.png',
    featured: true,
  },
  { 
    id: '15kg', 
    title: '15KG DE RAÇÃO', 
    price: 'R$ 91,45',
    desc: 'Garante a sobrevivência de 9 animais por quase uma semana completa. Menos fome, mais esperança.',
    amount: 9145,
    image: '/ChatGPT_Image_29_04_2026__14_09_58-removebg-preview.png',
    featured: false,
  },
  { 
    id: '30kg', 
    title: '30KG DE RAÇÃO', 
    price: 'R$ 177,32',
    desc: 'Um impacto gigantesco: alimenta 15 animais por 8 dias no nosso abrigo. Eles precisam da sua força.',
    amount: 17732,
    image: '/ChatGPT_Image_29_04_2026__14_22_49-removebg-preview.png',
    featured: false,
  },
  { 
    id: '75kg', 
    title: '75KG DE RAÇÃO', 
    price: 'R$ 416,75',
    desc: 'Uma doação extraordinária: alimenta 28 animais carentes por 12 dias. Você vira nosso principal parceiro.',
    amount: 41675,
    image: '/ChatGPT_Image_29_04_2026__19_10_21-removebg-preview-rmqni74p1zqibihkjgy8wfacw7r806b4irj2f39s4g.png',
    featured: false,
  },
  { 
    id: '150kg', 
    title: '150KG DE RAÇÃO', 
    price: 'R$ 742,90',
    desc: 'O milagre que esperávamos: salva e alimenta 45 animais durante 18 dias! Seja um anjo da guarda.',
    amount: 74290,
    image: '/ChatGPT-Image-29_04_2026-19_05_29-rmqn9z1j96h6qcfnkeyrl005rualninoe2148xgskg.png',
    featured: false,
  },
];

export default function App() {
  const [step, setStep] = useState<'selection' | 'generating' | 'qrcode'>('selection');
  const [selectedOption, setSelectedOption] = useState<typeof donationOptions[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const [pixCode, setPixCode] = useState('00020126420014br.gov.bcb.pix0120doacao@sosanimal.com5204000053039865802BR5915SOS ANIMAL HELP6009SAO PAULO62140510DONATION0163045A9D');

  const handleSelect = async (option: typeof donationOptions[0]) => {
    setSelectedOption(option);
    setStep('generating');
    
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: option.amount })
      });
      
      let data;
      const textResponse = await res.text();
      
      try {
        data = JSON.parse(textResponse);
      } catch (parseError) {
        console.error("Failed to parse JSON response:", textResponse);
        alert(`O servidor respondeu de forma inesperada (código ${res.status}):\n\n${textResponse.slice(0, 150)}...\n\nVerifique se o backend na Vercel está ativo.`);
        setStep('selection');
        return;
      }
      
      if (!res.ok) {
        console.error("Erro da API no proxy:", data);
        const errorDetails = data?.details?.errors ? JSON.stringify(data.details.errors) : (data?.details?.title || JSON.stringify(data));
        alert(`Erro ao gerar transação (Status ${res.status}). Detalhes: ${errorDetails}`);
        setStep('selection');
        return;
      }

      // se a API do AnubisPay retornar um qr_code ou similar, a gente pode usar ele
      if (data?.data?.pix?.qr_code) {
        setPixCode(data.data.pix.qr_code);
        setStep('qrcode');
      } else if (data?.data?.[0]?.pix?.[0]?.qr_code) {
        setPixCode(data.data[0].pix[0].qr_code);
        setStep('qrcode');
      } else if (data?.pix?.[0]?.qr_code) {
        setPixCode(data.pix[0].qr_code);
        setStep('qrcode');
      } else if (data?.qr_code) {
        setPixCode(data.qr_code);
        setStep('qrcode');
      } else if (data?.pix_code) {
        setPixCode(data.pix_code);
        setStep('qrcode');
      } else {
        alert(`Sucesso na API, mas QR Code não foi encontrado. Resposta: ${JSON.stringify(data)}`);
        setStep('selection');
        return;
      }
      
    } catch (err: any) {
      console.error("Erro ao gerar pix:", err);
      // Se falhar na chamda da API (por ex, erro de conexão)
      alert(`Falha de conexão: ${err.message}. Verifique a sua conexão com a Vercel.`);
      setStep('selection');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const reset = () => {
    setStep('selection');
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen text-[#173224] selection:bg-primary-500 selection:text-white">
      
      {/* HEADER HERO */}
      <header className="w-full pt-10 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-danger-600 font-semibold tracking-wide text-sm mb-6 border border-red-100">
          Urgente: Nossos estoques de ração estão no fim.
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-tight max-w-4xl mb-8">
          A fome não espera o dia seguinte.<br className="hidden md:block"/> <span className="text-danger-500">Assista o vídeo e veja por que eles só têm a você.</span>
        </h1>
        
        {/* VIDEO AT THE VERY BEGINNING */}
        <div className="w-full max-w-4xl mx-auto mb-10">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-400/50 bg-black aspect-video w-full flex items-center justify-center">
            <video 
              controls 
              playsInline
              className="w-full h-full object-cover"
              poster="/ChatGPT-768x432.webp"
            >
              <source src="/video.mp4" type="video/mp4" />
              Seu navegador não suporta a visualização deste vídeo.
            </video>
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-10">
          Centenas de animais resgatados das ruas, vítimas de abandono e maus-tratos, 
          acordam hoje sem saber se terão o que comer. O seu apoio agora faz a diferença 
          entre a sobrevivência e a desnutrição.
        </p>

        <a 
          href="#checkout" 
          className="inline-flex items-center justify-center font-bold text-center transition-all duration-300 hover:scale-[1.02] active:scale-95 bg-danger-500 hover:bg-danger-600 shadow-xl shadow-red-500/30 text-white text-lg md:text-xl px-10 py-5 rounded-2xl w-full max-w-md mb-4"
        >
          SALVAR UMA VIDA AGORA &rarr;
        </a>
      </header>

      {/* EMOTIONAL APPEAL & IMAGES */}
      <section className="w-full bg-white border-y border-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <img 
              src="/ChatGPT-768x432.webp" 
              alt="Cão com olhar de esperança" 
              className="w-full h-auto object-cover rounded-3xl shadow-2xl shadow-gray-200" 
            />
            <img 
              src="/eles.webp" 
              alt="Eles precisam de você" 
              className="w-full h-auto object-cover object-top rounded-3xl shadow-2xl shadow-gray-200" 
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Entenda porque <span className="text-primary-500">cada segundo conta</span>.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Resgatar é apenas o primeiro passo. Sem alimento, de nada serve tirá-los das ruas. O abrigo os protege do frio e da crueldade, mas é a <strong>ração diária</strong> que os mantém vivos, reabilita seus corpos feridos e devolve a alegria de abanar o rabo.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Muitos chegam até nós em estado de completa inanição. Nós não desistimos de nenhum deles. Mas somos uma ONG movida pela solidariedade de pessoas como você. Sem sua doação hoje, as tigelas amanhã podem amanhecer estritamente vazias.
            </p>
            <div className="pt-4">
              <a 
                href="#checkout" 
                className="inline-flex items-center justify-center font-bold text-center transition-all duration-300 hover:scale-[1.02] bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl shadow-lg"
              >
                Garantir a Refeição Deles Hoje
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED IMPACT & TRUST (MASONRY/BENTO GRID) */}
      <section className="w-full py-20 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
            Seu impacto é real. Nossa transparência também.
          </h2>
          <p className="text-xl text-gray-500 mb-14 text-center max-w-2xl">
            Sua doação não se perde em burocracia. Ela vira sacos de ração que nutrem esperança, saúde e a chance de uma nova família.
          </p>

          <div className="w-full max-w-3xl mb-16">
            <img src="/ChatGPT_Image_30_04_2026__15_00_12-removebg-preview.png" alt="O custo de apenas 1 real por dia" className="w-full h-auto drop-shadow-xl" />
          </div>

          {/* Galeria Emocional de Fotos */}
          <div className="w-full max-w-6xl mx-auto mb-16">
            
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Veja nos olhos deles: A sua doação muda tudo.</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Estas são as vidas que você toca. Cada fotografia é uma história de abandono que, com a sua ajuda, pode ter um final feliz.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Foto 1 */}
              <div className="relative group overflow-hidden rounded-3xl shadow-xl">
                <img src="/J1.webp" alt="Olhar de resgate" className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-xl mb-1">Eles sentem dor e medo</h4>
                  <p className="text-gray-300 text-sm">Nas ruas, o frio e a fome são a única certeza. Nós mudamos esse destino.</p>
                </div>
              </div>

              {/* Foto 2 */}
              <div className="relative group overflow-hidden rounded-3xl shadow-xl lg:col-span-2">
                <img src="/S1.webp" alt="Recuperação e carinho" className="w-full h-[300px] object-cover object-center group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-xl mb-1">A nutrição é o primeiro passo para a cura</h4>
                  <p className="text-gray-300 text-sm">Antes de pensarmos em adoção, precisamos fortalecer corpos frágeis e famintos.</p>
                </div>
              </div>

              {/* Foto 3 */}
              <div className="relative group overflow-hidden rounded-3xl shadow-xl lg:col-span-2">
                <img src="/A2.webp" alt="Missão Nutrição" className="w-full h-[300px] object-cover object-center group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-xl mb-1">A alegria do retorno à vida</h4>
                  <p className="text-gray-300 text-sm">Com barriguinha cheia não há tristeza. É esse ânimo que a sua doação compra todos os dias.</p>
                </div>
              </div>

              {/* Foto 4 */}
              <div className="relative group overflow-hidden rounded-3xl shadow-xl">
                <img src="/M2.webp" alt="Carinho" className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-xl mb-1">Amparo garantido</h4>
                  <p className="text-gray-300 text-sm">Da rua até um novo lar. Nosso compromisso é inabalável graças aos nossos doadores.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm max-w-2xl mx-auto italic">"Um cão resgatado pode não ter a capacidade de dizer 'obrigado', mas os olhos deles dirão isso todos os dias da sua vida."</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                <img src="/S2.webp" alt="Apoio" className="h-16 w-auto rounded-lg" />
                <img src="/S3.webp" alt="Apoio" className="h-16 w-auto rounded-lg" />
                <img src="/A1.webp" alt="Apoio" className="h-16 w-auto rounded-lg" />
                <img src="/A3.webp" alt="Apoio" className="h-16 w-auto rounded-lg" />
            </div>

          </div>

        </div>
      </section>

      {/* DONATION / CHECKOUT */}
      <section id="checkout" className="w-full py-20 bg-gray-900 border-t-8 border-primary-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              A fome não marca hora para doer.
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Escolha a quantidade de ração que deseja doar. 100% do valor desta transação vai para barrigas famintas nas próximas horas.
            </p>
          </div>

          <div className="w-full max-w-6xl mx-auto">
            {step === 'selection' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {donationOptions.map((option) => (
                  <article
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    className={`relative flex flex-col bg-white rounded-3xl p-8 hover:shadow-2xl transition duration-300 cursor-pointer group ${option.featured ? 'ring-4 ring-primary-500 shadow-xl shadow-green-900/40 md:-translate-y-4' : 'border border-gray-200'}`}
                  >
                    {option.featured && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-1.5 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg flex items-center gap-2 whitespace-nowrap">
                        <span>⭐</span> Mais escolhido
                      </div>
                    )}
                    
                    <div className="h-[220px] mb-6 flex items-center justify-center p-4">
                      <img 
                        loading="lazy"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        src={option.image}
                        alt={option.title}
                      />
                    </div>
                    
                    <div className="text-center flex-grow flex flex-col justify-end">
                      <h3 className="text-2xl font-black text-gray-900 mb-2">{option.title}</h3>
                      <div className="text-3xl font-bold text-primary-600 mb-4">{option.price}</div>
                      <p className="text-gray-600 leading-snug mb-8 flex-grow">{option.desc}</p>
                      
                      <button 
                        className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-colors ${option.featured ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                      >
                        DOAR AGORA
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                  
                  <button onClick={reset} className="absolute top-6 left-6 text-gray-500 hover:text-gray-800 font-semibold flex items-center gap-2 transition">
                    &larr; Voltar
                  </button>

                  <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 mb-8">
                    <img src={selectedOption?.image} alt={selectedOption?.title} className="w-24 h-24 object-contain" />
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-gray-900">{selectedOption?.title}</h3>
                      <p className="text-gray-500 mt-1 mb-2 leading-tight">{selectedOption?.desc}</p>
                      <span className="text-2xl font-extrabold text-primary-600">{selectedOption?.price}</span>
                    </div>
                  </div>

                  {step === 'generating' && (
                    <div className="flex flex-col items-center py-10">
                      <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mb-6"></div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Gerando seu Pix...</h3>
                      <p className="text-gray-500">Conectando com segurança ao sistema bancário.</p>
                    </div>
                  )}

                  {step === 'qrcode' && (
                    <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <h3 className="text-3xl font-extrabold text-gray-900 mb-3">Tudo pronto!</h3>
                      <p className="text-gray-600 mb-8">
                        Abra o aplicativo do seu banco, escolha <strong>Pix Copia e Cola</strong> ou aponte a câmera para o QR Code abaixo.
                      </p>

                      <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 shadow-sm mb-6 inline-block">
                        <QRCodeSVG 
                          value={pixCode}
                          size={200}
                          level="Q"
                          includeMargin={false}
                        />
                      </div>

                      <div className="w-full relative mb-4">
                        <input
                          type="text"
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-center font-mono text-sm focus:outline-none"
                          readOnly
                          value={pixCode}
                        />
                      </div>

                      <button 
                        onClick={handleCopy}
                        className={`w-full py-5 rounded-2xl font-bold text-lg text-white transition-all duration-300 flex justify-center items-center gap-2 ${copied ? 'bg-primary-600 shadow-inner' : 'bg-primary-500 hover:bg-primary-600 shadow-xl shadow-green-500/30 hover:-translate-y-1'}`}
                      >
                        {copied ? (
                          <><span>✓</span> PIX COPIADO!</>
                        ) : (
                          <>COPIAR CÓDIGO PIX</>
                        )}
                      </button>
                      <p className="text-xs text-gray-400 mt-4 text-center">Pagamento 100% seguro processado instantaneamente.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FINAL TRUST FOOTER */}
      <footer className="w-full bg-white py-14 px-4 text-center flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-400 mb-8 uppercase tracking-widest">
          Transação e Ambiente Seguro
        </h3>
        
        <div className="max-w-4xl w-full flex flex-col gap-6 items-center">
          <img src="/doacao_segura_fundo_transparente.webp" alt="Doação Segura e Processador" className="w-full max-w-2xl h-auto opacity-80 hover:opacity-100 transition-opacity" />
          <img src="/ChatGPT_Image_30_04_2026__15_38_18-removebg-preview.png" alt="Garantia" className="w-full max-w-xl h-auto opacity-70 hover:opacity-100 transition-opacity" />
        </div>
        
        <p className="mt-12 text-sm text-gray-400 max-w-md mx-auto">
          &copy; {new Date().getFullYear()} SOS Animal Help. Todos os direitos reservados. 
          Sua doação salva vidas todos os dias. Muito obrigado pela sua generosidade.
        </p>
      </footer>
    </div>
  );
}
