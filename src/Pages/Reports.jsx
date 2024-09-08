// import React, { Fragment, useState } from "react";
// import Episode from "../Component/Sequence";
// import Sequence from "../Component/Sequence";
// import Shots from "../Component/Shots";
// import Assets from "../Component/Assets";

// const defaultAssets = [
//   { name: "Asset1" },
//   { name: "Asset2" },
//   { name: "Asset3" },
// ];

// const defaultShots = [
//   { id: 1, name: "Shot 1", status: "Approved", assets: defaultAssets },
//   { id: 2, name: "Shot 2", status: "Approved", assets: defaultAssets },
//   { id: 3, name: "Shot 3", status: "On Process", assets: defaultAssets },
// ];

// const sequences = [
//   { name: "sequence 1", status: "Approved", shots: defaultShots },
//   { name: "sequence 2", status: "Approved", shots: defaultShots },
//   { name: "sequence 3", status: "Approved", shots: defaultShots },
//   { name: "sequence 4", status: "Approved", shots: defaultShots },
//   { name: "sequence 5", status: "On Process", shots: defaultShots },
//   { name: "sequence 6", status: "On Process", shots: defaultShots },
//   { name: "sequence 7", status: "On Process", shots: defaultShots },
//   { name: "sequence 8", status: "On Process", shots: defaultShots },
//   { name: "sequence 9", status: "On Process", shots: defaultShots },
// ];

// const episodeData = [
//   { name: "Episode1", id: 1, status: "running" },
//   { name: "Episode2", id: 2, status: "completed" },
//   { name: "Episode3", id: 3, status: "running" },
//   { name: "Episode4", id: 4, status: "completed" },
//   { name: "Episode5", id: 5, status: "pending" },
// ];

// const Reports = () => {
//   const [currentSequence, setCurrentSequence] = useState(sequences[0]);

//   const [currentEpisode, setCurrentEpisode] = useState(episodeData[0]);

//   const [currentShot, setCurrentShot] = useState(defaultShots[0]);

//   const [currentAsset, setCurrentAsset] = useState(defaultAssets[0]);

//   const handleEpisode = (episode) => {
//     setCurrentEpisode(episode);
//     setCurrentSequence(sequences[0]);
//     setCurrentShot(defaultShots[0]);
//     setCurrentAsset(defaultAssets[0]);
//   };

//   const handleSequence = (sequence) => {
//     setCurrentSequence(sequence);
//     setCurrentShot(defaultShots[0]);
//     setCurrentAsset(defaultAssets[0]);
//   };

//   const handleShots = (shot) => {
//     setCurrentShot(shot);
//     setCurrentAsset(defaultAssets[0]);
//   };
//   const handleAssets = (asset) => {
//     setCurrentAsset(asset);
//   };

//   return (
//     <div className="space-y-4 ">
//       <h1 className="text-4xl  underline">Reports</h1>

//       <>
//         <h1 className="text-2xl font-bold">Episodes</h1>

//         <div className="flex ">
//           <div className="grid grid-cols-3 w-1/2 ">
//             {episodeData.map((item) => (
//               <div
//                 key={item.name}
//                 onClick={() => handleEpisode(item)}
//                 className={`cursor-pointer w-full border px-4 py-2 ${
//                   item.name === currentEpisode.name ? "bg-teal-400" : ""
//                 }`}
//               >
//                 {item.name}
//               </div>
//             ))}
//           </div>
//           <div className="w-1/2 grid grid-cols-2">
//             <div className=" border">graph</div>
//             <div className="border">card</div>
//           </div>
//         </div>
//       </>

//       {/* Current Episode- Current-sequnce */}
//       <p className="text-3xl font-semibold">
//         {currentEpisode?.name} - {currentSequence?.name}
//       </p>
//       <Sequence
//         currentSequence={currentSequence}
//         handleSequence={handleSequence}
//         sequences={sequences}
//         id={currentEpisode.id}
//       />

//       <p className="text-3xl font-semibold">
//         {currentSequence?.name} - {currentShot?.name}
//       </p>
//       <Shots
//         currentShot={currentShot}
//         handleShots={handleShots}
//         defaultShots={defaultShots}
//         id={currentShot.id}
//       />

//       <p className="text-3xl font-semibold">
//         {currentShot?.name} - {currentAsset?.name}
//       </p>
//       <Assets
//         currentAsset={currentAsset}
//         handleAssets={handleAssets}
//         defaultAssets={defaultAssets}
//         id={currentShot.id}
//       />
//     </div>
//   );
// };

// export default Reports;

import React from "react";
import VideoTimeline from "./Videoplayer";

const Reports = () => {
  const videoDuration = 120; // Duration of the video in seconds
  const keyframes = [10, 30, 45, 90]; // Keyframes in seconds
  const images = [
    "https://picsum.photos/200",
    "https://picsum.photos/100",
    "https://picsum.photos/300",
  ];

  const handleSeek = (newTime) => {
    console.log("Seeking to:", newTime);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Timeline</h1>
      <VideoTimeline
        duration={videoDuration}
        keyframes={keyframes}
        images={images}
        onSeek={handleSeek}
      />
    </div>
  );
};

export default Reports;
