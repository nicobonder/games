import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Pokemon from "./screens/Pokemon"
import WordsPerMinute from "./screens/WordsPerMinute"
import Memotest from "./screens/Memotest"
import MemoTech from "./screens/MemoTech"
import MemoFood from './screens/MemoFood';
import MemoBrand from './screens/MemoBrand';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  return (
    <>
    <Routes>
      <Route path="/" element={<Memotest />} />
      <Route path="/memotech" element={<MemoTech />} />
      <Route path="/memofood" element={<MemoFood />} />
      <Route path="/memobrand" element={<MemoBrand />} />
      <Route path="/pokemon" element={<Pokemon />} />
      <Route path="/wpm" element={<WordsPerMinute />} />
    </Routes>
    {location.pathname !== '/' && <Footer />}
  </>
    )
}

export default App
