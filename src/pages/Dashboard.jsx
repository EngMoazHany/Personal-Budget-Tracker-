import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    categoryTotals: []
  });

  useEffect(() => {
    async function fetchSummary() {
      try {
        // Fetch summary data from the API
        const res = await axios.get('http://localhost:5000/api/summary?month=4&year=2025');
        setSummary(res.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    }

    fetchSummary();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
      backgroundColor: '#e3f2fd',
      backgroundSize: 'cover',
      backgroundRepeat: 'repeat',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: 700,
        margin: 'auto',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1976d2' }}>📊 Dashboard</h2>

        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '2rem',
          background: '#f1f8ff',
          padding: '1rem',
          borderRadius: '10px'
        }}>
          <div><strong>Income:</strong> ${summary.totalIncome}</div>
          <div><strong>Expense:</strong> ${summary.totalExpense}</div>
          <div><strong>Balance:</strong> ${summary.balance}</div>
        </div>

        <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#424242' }}>💰 Expenses by Category</h3>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PieChart width={400} height={300}>
            <Pie
              data={summary.categoryTotals}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {summary.categoryTotals.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
