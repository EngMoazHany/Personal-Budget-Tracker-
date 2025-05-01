function Summary({ income, expense, balance }) {
    return (
      <div>
        <h3>Summary</h3>
        <p>Income: ${income}</p>
        <p>Expense: ${expense}</p>
        <p>Balance: ${balance}</p>
      </div>
    );
  }
  
  export default Summary;
  