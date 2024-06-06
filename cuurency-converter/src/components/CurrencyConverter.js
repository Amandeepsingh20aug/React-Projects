import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConverter = () => {
  // Currencies -> https://api.frankfurter.app/currencies
  // Conversion -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedCurrency,setConvertedCurreny] = useState(null);
  const [converting,setConverting] = useState(false);
  const [favourite,setFavourite] = useState(JSON.parse(localStorage.getItem("favourites"))|| ["INR","USD","ZAR"])


  const fetchCurrencies = async () => {
    try {
      const resposne = await fetch("https://api.frankfurter.app/currencies");

      const data = await resposne.json();

      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log(error, "Error");
    }
  };

  const convertCurrency = async() => {
    if(!amount) return
    setConverting(true)
    try { 
      const resposne = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)

      const data = await resposne.json();

     setConvertedCurreny(data.rates[toCurrency]+ " " + toCurrency)
      
    } catch (error) {
      console.log(error);
    } finally{
      setConverting(false)
    }
  };

  const handleFavourite = (curreny) =>{ 
    let updatedFavorites = [...favourite]
    if(updatedFavorites.includes(curreny)){
      updatedFavorites = updatedFavorites.filter((fav)=>(
         fav !== curreny
      ))
    } else {
      updatedFavorites.push(curreny);
    }
    setFavourite(updatedFavorites);
    localStorage.setItem("favourites",JSON.stringify(updatedFavorites))  
  }

  const swapCurrency = () =>{
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>
      <div className="grid
       grid-col-1 sm:grid-cols-3 gap-4 items-end">
        <Dropdown currencies={currencies} title="From"
          handleFavourite={handleFavourite}
          setCurrency={setFromCurrency}
          currency={fromCurrency}
          favorites={favourite}
        />
        {/* Swap Currency button */}
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button onClick={swapCurrency} className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
            <HiArrowsRightLeft className="text-xl text-gray-700"/>
          </button>
        </div>
        <Dropdown currencies={currencies} title="To"
          handleFavourite={handleFavourite}
          setCurrency={setToCurrency}
          currency={toCurrency}
          favorites={favourite}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="text-sm font-medium text-gray-700 block"
        >
          Amount
        </label>
        <input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
           className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${converting ? "animate-pulse" : ""}`}
          onClick={convertCurrency}
        >
          Convert
        </button>
      </div>
       {convertedCurrency && <div className="mt-4 text-lg font-medium text-right text-green-600">
        Converted Amount : {convertedCurrency} 
      </div>}
    </div>
  );
};

export default CurrencyConverter;
