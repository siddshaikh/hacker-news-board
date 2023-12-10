import "./App.css";
import React, { useEffect, useState, useTransition } from "react";
import JobPosting from "./Components/JobPosting";

const ITEMS_PER_PAGE = 6;
const API_URL = "https://hacker-news.firebaseio.com/v0";

const App = () => {
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchItems = async (currePage) => {
    setCurrentPage(currePage);
    setFetchingDetails(false);

    let itemList = itemIds;
    if (itemList === null) {
      const response = await fetch(`${API_URL}/jobstories.json`);
      itemList = await response.json();
      setItemIds(itemList);
    }
    const itemIdsForPage = itemList.slice(
      currePage * ITEMS_PER_PAGE,
      currePage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${API_URL}/item/${itemId}.json`).then((res) => res.json())
      )
    );
    setItems([...items, ...itemsForPage]);
  };
  useEffect(() => {
    if (currentPage === 0) {
      fetchItems(currentPage);
    }
  }, []);
  return (
    <div className="App">
      <h1 className="title">Hacker News Job Board!</h1>
      {(itemIds === null || items.length) < 1 ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <div className="items" role="list">
            {items.map((item) => (
              <JobPosting key={item.id} {...item} />
            ))}
          </div>
          <button
            className="load_more__button"
            onClick={() => fetchItems(currentPage + 1)}
            disabled={fetchingDetails}
          >
            {fetchingDetails ? "Loading" : "Load More Jobs"}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
