function TransactionForm({ formData, handleChange, handleSubmit }) {
    return (
      <form onSubmit={handleSubmit}>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option>Income</option>
          <option>Expense</option>
        </select>
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input name="amount" type="number" placeholder="Amount" value={formData.amount} onChange={handleChange} />
        <input name="date" type="date" value={formData.date} onChange={handleChange} />
        <input name="note" placeholder="Note" value={formData.note} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    );
  }
  
  export default TransactionForm;
  