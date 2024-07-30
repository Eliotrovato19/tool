import React, { useEffect } from "react";
import Content from "./Content";
import "./ideas.css";
import { useState } from "react";
import AddItem from "./AddItem";
import apiRequest from "./apiRequest";

function Ideas() {
  useEffect(() => {
    document.title = "ideas";
  }, []);

  const API_URL = "https://good-ajar-hardhat.glitch.me/items";

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => fetchItems(), 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

 

  const handleDelete = async (id) => {
    //console.log(`key:${id}`);
    const listItems = items.filter((ite) => ite.id !== id);
    setItems(listItems);

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  return (
    <div className="App">
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <main style={{ width: "100%" }}>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items}
             handleDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default Ideas;
