import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { ConfigContext } from '../context/ConfigContext';


function CategoryComponent() {
 
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('income');
  const { baseUrl } = useContext(ConfigContext);

  

  const fetchCategories = useCallback (async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`${baseUrl}/category`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [baseUrl]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreateCategory = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.post(`${baseUrl}/category`, {
        name: newCategoryName,
        type: categoryType,
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.status === 201) {
        // Clear the input fields
        setNewCategoryName('');
        setCategoryType('income');
        // Fetch the updated categories
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.name} ({category.type})
          </li>
        ))}
      </ul>
      <div>
        <h2>Create New Category</h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Category name"
          required
        />
        <select
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={handleCreateCategory}>
          Create Category
        </button>
      </div>
    </div>
  );
}

export default CategoryComponent;
