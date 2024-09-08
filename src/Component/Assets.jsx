import React from "react";

const Assets = ({ currentAsset, handleAssets, defaultAssets }) => {
  return (
    <div className="flex">
      <div className="grid w-[50%] grid-cols-3">
        {defaultAssets?.map((asset) => (
          <div
            key={asset.name}
            onClick={() => handleAssets(asset)}
            className={`w-full border px-4 py-2 ${
              asset.name === currentAsset?.name ? "bg-teal-400" : ""
            }`}
          >
            <p>{asset?.name}</p>
            <p>{asset?.status}</p>
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

export default Assets;
