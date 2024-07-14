import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm'; 
import { ConfigContext } from '../context/ConfigContext';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const authToken = localStorage.getItem('authToken');
  const { baseUrl } = useContext(ConfigContext);

  

  const fetchExpenses = useCallback (async () => {
    try {
      const response = await axios.get(`${baseUrl}/expense`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }, [authToken, baseUrl]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAddExpense = () => {
    setCurrentExpense(null);
    setFormVisible(true);
  };

  const handleSubmit = async (expenseData) => {
    setIsUpdating(true);
    const id = currentExpense ? currentExpense._id : null;
    const url = id ? `${baseUrl}/expense/${id}` : `${baseUrl}/expense`;
    const method = id ? 'put' : 'post';
    try {
      await axios({
        method: method,
        url: url,
        data: expenseData,
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      setFormVisible(false);
      fetchExpenses(); // Refresh the list
    } catch (error) {
      console.error("Error submitting expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setCurrentExpense(expense);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      fetchExpenses(); // Refresh the list
    } catch (error) {
      console.error("Error deleting expense:", error);
    } finally {
      setIsUpdating(false);
      setFormVisible(false);
    }
  };

  const handleCancel = () => {
    setFormVisible(false);
  };

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px', minWidth: '60%' }}>
      <h1 className="mb-3">Expense List</h1>
      <button
        type="button"
        className="btn"
        style={{ color: 'white', backgroundColor: '#e76e50', marginTop: '20px' }}
        onClick={handleAddExpense}
      >
        Add New Expense
      </button>
      <div className="card mx-auto" style={{ maxWidth: '800px', backgroundColor: '#82c4be', marginTop: '20px' }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Currency</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(expenses) && expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.date).toLocaleDateString('en-GB')}</td>
                <td>{expense.currency}</td>
                <td>{expense.description}</td>
                <td>
                  <button
                    onClick={() => handleEdit(expense)}
                    className="btn btn-sm mr-2"
                    style={{ color: 'white', backgroundColor: '#006c75' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="btn btn-danger btn-sm"
                    style={{ marginLeft: '4px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {formVisible && (
        <ExpenseForm
          expense={currentExpense}
          isVisible={formVisible}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
};

export default ExpenseList;

