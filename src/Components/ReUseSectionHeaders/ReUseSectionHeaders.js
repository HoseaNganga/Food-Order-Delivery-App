import React from "react";

const ReUseSectionHeaders = ({ header1, header2 }) => {
  return (
    <div className="grid justify-center gap-2">
      <h1 className="text-center uppercase text-2xl font-bold ">{header1}</h1>
      <h2 className="text-center capitalize text-red-600 italic font-semibold text-2xl">
        {header2}
      </h2>
    </div>
  );
};

export default ReUseSectionHeaders;
