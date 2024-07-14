import React, { useState, useEffect } from 'react';

const IncomeForm = ({ income, isVisible, onSubmit, onCancel, isUpdating }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('₹');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (income) {
      setCategory(income.category || '');
      setAmount(income.amount || '');
      setCurrency(income.currency || '₹');
      setDate(income.date ? income.date.substring(0, 10) : '');
      setDescription(income.description || '');
    }
  }, [income]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const incomeData = { category, amount, currency, date, description };
    onSubmit(incomeData);
  };

  if (!isVisible) return null;
  const formTitle = income ? 'Edit Income' : 'Add New Income';

  return (


  <div className="container" style={{ paddingTop: '10px', paddingBottom: '50px', minWidth: '60%' }}>
  <div className="mt-3">
    <h3 className="text-center mb-4">{formTitle}</h3>
    <form onSubmit={handleSubmit} className="form-group">
      <table className="table">
        <tbody>
          <tr>
            <td className="no-border"><label>Category:</label></td>
            <td className="no-border">
              <input
                type="text"
                className="form-control"
                name="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '55%' }}
              />
            </td>
            <td className="no-border"><label>Amount:</label></td>
            <td className="no-border">
              <input
                type="number"
                className="form-control"
                name="amount"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: '30%' }}
              />
            </td>
          </tr>
          <tr>
            <td className="no-border"><label>Date:</label></td>
            <td className="no-border">
              <input
                type="date"
                className="form-control"
                name="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '55%' }}
              />
            </td>
            <td className="no-border"><label>Currency:</label></td>
            <td className="no-border">
            <input
                type="text"
                className="form-control"
                name="currency"
                required
                value={currency}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '30%' }}
              />
            </td>
          </tr>
          <tr>
            <td className="no-border"><label>Description:</label></td>
            <td className="no-border" colSpan="3">
              <textarea
                className="form-control"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '71.7%' }}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan="4" className="no-border"> 
              <button type="submit" className="btn" style={{ color: 'white', backgroundColor: '#e76e50', marginRight: '5px' }}>
          Submit
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</div>

  );
  }

export default IncomeForm;
