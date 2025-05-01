import { useState, useEffect } from 'react';

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({ type: '', month: '' });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('API_URL'); // Replace with the API URL
        const data = await response.json();
        setTransactions(data); 
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`API_URL/${id}`, {
        method: 'DELETE',
      });

      setTransactions(transactions.filter(t => t.id !== id)); 
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setEditedTransaction({ ...transaction }); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await fetch(`API_URL/${editingTransaction.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedTransaction),
      });

      setTransactions(transactions.map(t =>
        t.id === editingTransaction.id ? editedTransaction : t
      ));
      setEditingTransaction(null); 
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleCancel = () => {
    setEditingTransaction(null);    
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const filteredTransactions = transactions.filter(t => {
    const matchType = filter.type ? t.type === filter.type : true;
    const matchMonth = filter.month ? new Date(t.date).getMonth() + 1 === parseInt(filter.month) : true;
    return matchType && matchMonth;
  });

  return (
    <div style={{
      maxWidth: '90%',
      margin: '2rem auto',
      background: '#ffffffcc',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '1.5rem' }}>📋 All Transactions</h2>

      <div style={{ marginBottom: '1rem' }}>
        <select name="type" onChange={handleFilterChange} style={filterStyle}>
          <option value="">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select name="month" onChange={handleFilterChange} style={filterStyle}>
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
      </div>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Note</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(t => (
            <tr key={t.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{t.type}</td>
              <td style={tdStyle}>{t.category}</td>
              <td style={tdStyle}>${t.amount}</td>
              <td style={tdStyle}>{new Date(t.date).toLocaleDateString()}</td>
              <td style={tdStyle}>{t.note}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleEdit(t)}
                  style={{
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    cursor: 'pointer',
                    marginRight: '8px',
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  style={{
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTransaction && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <h3>Edit Transaction</h3>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={editedTransaction.type}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={editedTransaction.category}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                name="amount"
                value={editedTransaction.amount}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={editedTransaction.date}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>
            <label>
              Note:
              <input
                type="text"
                name="note"
                value={editedTransaction.note}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>
            <div>
              <button onClick={handleSave} style={saveCancelButtonStyle}>Save</button>
              <button onClick={handleCancel} style={saveCancelButtonStyle}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  padding: '12px',
  borderBottom: '2px solid #ddd'
};

const tdStyle = {
  padding: '10px'
};

const filterStyle = {
  padding: '8px',
  marginRight: '8px',
  borderRadius: '6px',
  border: '1px solid #ddd'
};

const modalBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  animation: 'fadeIn 0.3s'
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  width: '400px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  animation: 'modalContentFadeIn 0.3s ease-out'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  fontSize: '14px',
  transition: 'border-color 0.3s ease'
};

const saveCancelButtonStyle = {
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#1976d2',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default AllTransactions;
