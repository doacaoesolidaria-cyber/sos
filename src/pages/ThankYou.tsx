import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  useEffect(() => {
    // Dispara o evento de compra do Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', { currency: 'BRL', value: 0 }); // You can update value via search params if needed
    }

    // Dispara o evento de compra do Google Ads
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-18240919051/XjtCCM2kj8AcEIus-flD',
          'transaction_id': ''
      });
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Pagamento Confirmado!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sua doação foi recebida com sucesso. Graças a você, mais animais terão alimento e cuidado pelos próximos dias. O nosso muito obrigado!
        </p>
        <Link 
          to="/"
          className="inline-block w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-2xl transition"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
