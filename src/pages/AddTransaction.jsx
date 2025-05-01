import { useState } from 'react';
import axios from 'axios';

function AddTransaction() {
  const [form, setForm] = useState({
    type: 'Expense',
    category: '',
    amount: '',
    date: '',
    note: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // API call to add the transaction
      await axios.post('http://localhost:5000/api/transactions', form);
      alert('✅ Transaction added successfully!');
      setForm({
        type: 'Expense',
        category: '',
        amount: '',
        date: '',
        note: ''
      });
    } catch (err) {
      alert('❌ Error adding transaction.');
      console.error(err);
    }
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: '2rem auto',
      background: '#ffffffcc',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '1.5rem' }}>➕ Add Transaction</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          style={selectStyle}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: '0.8rem',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#1976d2',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s'
          }}
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: '0.8rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const selectStyle = {
  ...inputStyle,
  backgroundColor: '#f0f0f0'
};

export default AddTransaction;
