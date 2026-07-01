import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Load tracking scripts
let isIframe = false;
try {
  isIframe = window.top !== window.self;
} catch (e) {
  isIframe = true;
}

if (!isIframe) {
  try {
    // Fix for environments that redefine fetch as a getter (like AI Studio preview)
    let _fetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get: () => _fetch,
      set: (val) => { _fetch = val; },
      configurable: true,
      enumerable: true
    });
  } catch (e) {
    console.warn('Could not polyfill fetch setter', e);
  }

  try {
    // Facebook Pixel
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e) as HTMLScriptElement;t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    if (s && s.parentNode) s.parentNode.insertBefore(t,s)}
    (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
    (window as any).fbq('set', 'autoConfig', false, '2093639501173506');
    (window as any).fbq('init', '2093639501173506');
    (window as any).fbq('track', 'PageView');
    
    // Google Tag (gtag.js)
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18240919051';
    document.head.appendChild(gtagScript);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]){ (window as any).dataLayer.push(args); }
    gtag('js', new Date());
    gtag('config', 'AW-18240919051');
    (window as any).gtag = gtag;
  } catch (e) {
    console.warn('Failed to initialize tracking scripts:', e);
  }
}

createRoot(document.getElementById('root')!).render(
  <App />
);

