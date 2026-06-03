import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/termos-de-uso" element={<TermsOfUse />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
