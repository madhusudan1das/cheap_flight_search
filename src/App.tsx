import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { ResultsPage } from './pages/ResultsPage';
import { BookingPage } from './pages/BookingPage';
import { Header } from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/book/:id" element={<BookingPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
