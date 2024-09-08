import React from "react";

const Sequence = ({ id, sequences, handleSequence, currentSequence }) => {
  return (
    <div className="flex">
      <div className="grid w-[50%] grid-cols-3">
        {sequences?.map((seq) => (
          <div
            key={seq.name}
            onClick={() => handleSequence(seq)}
            className={`w-full border cursor-pointer px-4 py-2 ${
              seq.name === currentSequence?.name ? "bg-teal-400" : ""
            }`}
          >
            <p>{seq?.name}</p>
            <p>{seq?.status}</p>
          </div>
        ))}
      </div>
      <div className="w-[50%] grid-cols-2 grid">
        <div className="p-10 border">graph</div>
        <div className="p-10 border">card</div>
      </div>
    </div>
  );
};

export default Sequence;
