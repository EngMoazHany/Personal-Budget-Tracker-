import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ padding: '15px 20px', background: '##000' }}>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/add" style={{ color: '#fff', textDecoration: 'none' }}>Add Transaction</Link>
        <Link to="/transactions" style={{ color: '#fff', textDecoration: 'none' }}>All Transactions</Link>
      </nav>
    </header>
  );
}

export default Header;
