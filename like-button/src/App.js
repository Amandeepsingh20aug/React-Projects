import { HeartIcon, SpinnerIcon } from "./icon";
import "./App.css";
import { useState } from "react";
function App() {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const handlelikeUnlike = async () => {
    setIsFetching(true)
    setError(null)
    try {
      const data = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        }
      );
      
      const json = await data.json();

      if(data.status>=200 && data.status<300) {
        setLiked(!liked);
        setIsFetching(false)
      } else {
        setError(json.message);
        setIsFetching(false)
      }

    } finally {
      setIsFetching(false)
    }
  };
  return (
    <>
      <div className="App">
        <h1 className="text-center text-2xl text-black font-semibold my-2">
          Like Button
        </h1>
      </div>
      <div className="my-4 flex justify-center items-center">
        <button
         disabled ={isFetching ? true : false}
          className={
            !liked
              ? "text-xl text-gray-400 py-1 px-2 rounded-xl border border-2 border-gray-300 flex items-center justify-center font-semibold hover:border-red-500 hover:text-red-500"
              : "text-xl text-white py-1 px-2 rounded-xl  border-gray-300 flex items-center justify-center bg-red-500 border-none font-semibold"
          }
          onClick={handlelikeUnlike}
        >
          {!isFetching ? <HeartIcon className="mr-2" /> : <SpinnerIcon className="mr-2"/>}
          {!liked ? "Like" : "Liked"}
        </button>
      </div>
      <div>
      <p className="text-center py-3 text-red-500 text-lg">{error}</p>
      </div>
    </>
  );
}

export default App;
