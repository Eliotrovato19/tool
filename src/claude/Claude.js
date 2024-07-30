import React, { useState, useEffect } from 'react';
import './claude.css';

const API_URL = 'https://alive-gray-cheshire.glitch.me/text';

function Claude() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
      document.title = "cloude";
    }, []);
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const addItem = async () => {
      if (newItem.trim() !== '') {
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: newItem, completed: false }),
          });
          if (response.ok) {
            fetchItems();
            setNewItem('');
          }
        } catch (error) {
          console.error('Errore nell\'aggiunta dell\'elemento:', error);
        }
      }
    };
  
    const deleteItem = async (id) => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchItems();
        }
      } catch (error) {
        console.error('Errore nell\'eliminazione dell\'elemento:', error);
      }
    };
  
    const toggleComplete = async (id) => {
      try {
        const item = items.find(item => item.id === id);
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...item, completed: !item.completed }),
        });
        if (response.ok) {
          fetchItems();
        }
      } catch (error) {
        console.error('Errore nell\'aggiornamento dell\'elemento:', error);
      }
    };
  
    return (
      <div className="daily-news-app">
        <header className="daily-news-header">
          <h1 className="daily-news-title">Bidmax ideas</h1>
        </header>
        <div className="daily-news-add-item">
          <input
            className="daily-news-input"
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add an idea"
          />
          <button className="daily-news-button" onClick={addItem}>Add</button>
        </div>
        <div className="daily-news-item-list-container">
          <ul className="daily-news-item-list">
            {items.map(item => (
              <li key={item.id} className="daily-news-item">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                  className="daily-news-checkbox"
                />
                <span className={item.completed ? 'daily-news-text completed' : 'daily-news-text'}>
                  {item.text}
                </span>
                <button className="daily-news-button daily-news-delete-button" onClick={() => deleteItem(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <footer className="daily-news-footer">
          items: <span className="daily-news-item-count">{items.length}</span>
        </footer>
      </div>
    );
}

export default Claude;