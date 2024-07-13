import React, { useState, useEffect, useCallback, useContext } from 'react';
import IncomeForm from './IncomeForm';
import axios from 'axios';
import { ConfigContext } from '../context/ConfigContext';

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const [currentIncome, setCurrentIncome] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const authToken = localStorage.getItem('authToken');
  const { baseUrl } = useContext(ConfigContext);

  

  const fetchIncomes = useCallback (async () => {
    try {
      const response = await axios.get(`${baseUrl}/income`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setIncomes(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  }, [authToken, baseUrl]);

  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);



  const handleAddIncome = () => {
    setCurrentIncome(null);
    setFormVisible(true);
  };

  const handleSubmit = async (incomeData) => {
    setIsUpdating(true);
    const id = currentIncome ? currentIncome._id : null;
        const url = id ? `${baseUrl}/income/${id}` : `${baseUrl}/income`;
        const method = id ? 'put' : 'post';
    try {
      await axios({
        method: method,
        url: url,
        data: incomeData,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

      setFormVisible(false);
      fetchIncomes(); // Refresh the list
    } catch (error) {
      console.error("Error submitting income:", error);
    }
  };

  const handleEdit = (income) => {
    setCurrentIncome(income);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/income/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      fetchIncomes(); // Refresh the list
    } catch (error) {
      console.error("Error deleting income:", error);
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
      <h1 className="mb-3">Income List</h1>
      <button
        type="button"
        className="btn"
        style={{ color: 'white', backgroundColor: '#e76e50', marginTop: '20px' }}
        onClick={handleAddIncome}
      >
        Add New Income
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
            {Array.isArray(incomes) && incomes.map((income) => (
              <tr key={income._id}>
                <td>{income.category}</td>
                <td>{income.amount}</td>
                <td>{new Date(income.date).toLocaleDateString('en-GB')}</td>
                <td>{income.currency}</td>
                <td>{income.description}</td>
                <td>
                  <button
                    onClick={() => handleEdit(income)}
                    className="btn btn-sm mr-2"
                    style={{ color: 'white', backgroundColor: '#006c75' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(income._id)}
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
      <IncomeForm
        income={currentIncome}
        isVisible={formVisible}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isUpdating={isUpdating}
      />
    )}
  </div>
);
    }

export default IncomeList;
