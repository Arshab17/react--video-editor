import React from "react";

const Shots = ({ id, defaultShots, handleShots, currentShot }) => {
  return (
    <div className="flex">
      <div className="grid w-[50%] grid-cols-3">
        {defaultShots?.map((shot) => (
          <div
            key={shot.name}
            onClick={() => handleShots(shot)}
            className={`w-full border px-4 py-2 ${
              shot.name === currentShot?.name ? "bg-teal-400" : ""
            }`}
          >
            <p>{shot?.name}</p>
            <p>{shot?.status}</p>
          </div>
        ))}
      </div>
      <div className="w-[50%] grid-cols-2 grid">
        <div className=" border">graph</div>
        <div className=" border">card</div>
      </div>
    </div>
  );
};

export default Shots;
