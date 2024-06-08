import "./App.css";
import { useEffect, useState } from "react";
import JobListing from "./components/JobListing";

const ITEMS_PER_PAGE = 6;
const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";

function App() {
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);


  async function fetchItems(currPage) {
    setCurrentPage(currPage);
    setFetchingDetails(true);

    let itemsList = itemIds;
    if (itemsList === null) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
    }

    const itemIdsForPage = itemsList.slice(
      currPage * ITEMS_PER_PAGE,
      currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )

    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((response) =>
          response.json()
        )
      )
    );
    setItems([...items, ...itemsForPage]);

    setFetchingDetails(false);
  }

  useEffect(() => {
    if (currentPage === 0) fetchItems(currentPage);
  }, [currentPage]);

  return (
    <div className="flex mx-auto flex-col justify-center items-center w-[60%]">
      <h1 className="text-3xl font-bold py-3 text-orange-400">Hacker news job board</h1>
      {items.length < 1 || itemIds === null ? (
        <p className="pb-3 text-2xl font-medium">Loading...</p>
      ) : (
        <>
          <div>
            {items.map((item) => (
              <JobListing {...item} key={item.id}/>
            ))}
          </div>
          <button className="bg-orange-400 text-white p-2 text-2xl rounded-md my-3"
          onClick={()=>fetchItems(currentPage+1)} disabled={fetchingDetails}>
            {!fetchingDetails ? 'Load More jobs' : 'Loading...'}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
