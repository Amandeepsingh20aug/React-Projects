import React from "react";

const JobListing = ({ url, title, by, time }) => {
  const formtedDate = new Date(time*1000).toLocaleString()
  return (
    <div className="border border-gray-400 w-full my-5 bg-orange-100 rounded-md">
      <h2 className="py-5 px-5">
        {url ? (
          <a href={url} target="_blank" rel="noopener" className="text-3xl font-semibold underline">
            {title}
          </a>
        ) : (
          <span className="text-3xl font-semibold">{title}</span>
        )}
      </h2>
      <p className="px-5 pb-5 font-medium text-xl">By {by} . {formtedDate}</p>
    </div>
  );
};

export default JobListing;
