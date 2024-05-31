import React, { useEffect, useState } from "react";
import { MAX, MIN } from "../utils/Constant";

const ProgressBar = ({ value,onComplete }) => {
  const [percentage, setPercentage] = useState(value);

  useEffect(() => {
    setPercentage(Math.min(MAX, Math.max(value, MIN)));

    if(value>=MAX){
      onComplete();
    }
  }, [value]);
  return (
    <div className="flex justify-center mx-auto items-center w-1/2 border border-gray-400 rounded-xl my-3 bg-gray-200 relative overflow-hidden">
      <span
        className={
          percentage > 49
            ? "font-semibold sticky z-10 text-white"
            : "font-semibold sticky z-10"
        }
      >
        {percentage.toFixed()}%
      </span>
      <div
        className="h-full w-full bg-green-500 absolute left-0"
        style={{ width: `${percentage}%` }}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={percentage}
        role="progressbar"
      />
    </div>
  );
};

export default ProgressBar;
