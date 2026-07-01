import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fix for environments that redefine fetch as a getter (like AI Studio preview)
try {
  if (typeof window !== 'undefined') {
    const originalFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      value: originalFetch,
      writable: true,
      configurable: true,
      enumerable: true
    });
  }
} catch (e) {
  console.warn('Could not polyfill fetch setter', e);
}

// Load tracking scripts
let isIframe = false;
try {
  isIframe = window.top !== window.self;
} catch (e) {
  isIframe = true;
}

if (!isIframe) {
  try {
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

