import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import AllTransactions from './pages/AllTransactions';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/transactions" element={<AllTransactions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
