import React from "react";
import {HiOutlineStar, HiStar} from "react-icons/hi2"

const Dropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavourite,
  title,
}) => {

  const isFavorite = (curr) => favorites.includes(curr);


  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
         {/* render favorites */}
         {favorites.map((curr)=>(
         <option value={curr} key={curr} className="bg-gray-200">{curr}</option>
         ))}
         <hr/>
          {currencies.filter((curr)=>(
            !favorites.includes(curr)
          )).map((curr) => {
            return (
              <option value={curr} key={curr}>
                {curr}
              </option>
            );
          })}
        </select>
        <button onClick={()=>handleFavourite(currency)} className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"> {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}</button>
      </div>
    </div>
  );
};

export default Dropdown;
