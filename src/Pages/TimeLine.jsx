import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import './Timeline.css';

const Timeline = ({ videoDurations, playedSeconds, onSeek, videoUrls, onVideoSelect, onTrimChange }) => {
  const timelineRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [playheadPosition, setPlayheadPosition] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [trimRanges, setTrimRanges] = useState([]);

  const totalDuration = videoDurations.reduce((acc, duration) => acc + duration, 0);

  useEffect(() => {
    // Initialize trimRanges only when videoDurations are available
    setTrimRanges(videoDurations.map((duration) => ({ start: 0, end: duration })));
  }, [videoDurations]);

  useEffect(() => {
    if (!dragging && timelineRef.current) {
      const percentage = (playedSeconds / totalDuration) * 100;
      const newPosition = (percentage / 100) * timelineRef.current.offsetWidth;
      setPlayheadPosition(newPosition);
    }
  }, [playedSeconds, dragging, totalDuration]);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDrag = (e, data) => {
    if (timelineRef.current) {
      const timelineWidth = timelineRef.current.offsetWidth;
      let accumulatedDuration = 0;
      let newSeekTime = 0;
      let newVideoIndex = 0;

      for (let i = 0; i < videoDurations.length; i++) {
        accumulatedDuration += videoDurations[i];
        if (data.x / timelineWidth <= accumulatedDuration / totalDuration) {
          newVideoIndex = i;
          newSeekTime = (data.x / timelineWidth) * totalDuration - (accumulatedDuration - videoDurations[i]);
          break;
        }
      }

      newSeekTime = Math.max(0, Math.min(newSeekTime, videoDurations[newVideoIndex]));

      if (newVideoIndex !== currentVideoIndex) {
        setCurrentVideoIndex(newVideoIndex);
        onVideoSelect(videoUrls[newVideoIndex]);
      }

      // Adjust newSeekTime within the trim range
      newSeekTime = Math.max(trimRanges[newVideoIndex]?.start || 0, Math.min(newSeekTime, trimRanges[newVideoIndex]?.end || videoDurations[newVideoIndex]));

      onSeek(newSeekTime);
      setPlayheadPosition(data.x);
    }
  };

  const handleTrimStartDragStart = (index) => {
    const handleTrimDrag = (e) => {
      const newTrimStart = Math.max(
        0,
        Math.min(
          (e.clientX / timelineRef.current.offsetWidth) * videoDurations[index],
          trimRanges[index]?.end || videoDurations[index]
        )
      );
      setTrimRanges((prev) => {
        const newRanges = [...prev];
        newRanges[index] = { ...newRanges[index], start: newTrimStart };
        return newRanges;
      });
    };

    document.addEventListener('mousemove', handleTrimDrag);
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', handleTrimDrag);
        handleTrimDragEnd(index);
      },
      { once: true }
    );
  };

  const handleTrimEndDragStart = (index) => {
    const handleTrimDrag = (e) => {
      const newTrimEnd = Math.max(
        trimRanges[index]?.start || 0,
        Math.min(
          (e.clientX / timelineRef.current.offsetWidth) * videoDurations[index],
          videoDurations[index]
        )
      );
      setTrimRanges((prev) => {
        const newRanges = [...prev];
        newRanges[index] = { ...newRanges[index], end: newTrimEnd };
        return newRanges;
      });
    };

    document.addEventListener('mousemove', handleTrimDrag);
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', handleTrimDrag);
        handleTrimDragEnd(index);
      },
      { once: true }
    );
  };

  const handleTrimDragEnd = (index) => {
    const trimmedDuration = trimRanges[index]?.end - trimRanges[index]?.start;
    console.log(`Trimmed Video ${index + 1}: Start - ${trimRanges[index]?.start}s, End - ${trimRanges[index]?.end}s, Duration - ${trimmedDuration}s`);
    
    // Update the trim range in the parent component
    onTrimChange(index, trimRanges[index]?.start, trimRanges[index]?.end);
  };

  return (
    <div className="timeline-container" ref={timelineRef}>
      <div className="video-cards">
        {videoUrls.map((videoUrl, index) => (
          <div
            key={index}
            className={`video-card ${index === currentVideoIndex ? 'playing' : ''}`}
            style={{ flex: videoDurations[index] / totalDuration }}
          >
            <div
              className="trim-handle trim-handle-start"
              style={{ left: `${(trimRanges[index]?.start / videoDurations[index]) * 100}%` }}
              onMouseDown={() => handleTrimStartDragStart(index)}
              onMouseUp={() => handleTrimDragEnd(index)}
            />
            <div
              className="trim-handle trim-handle-end"
              style={{ left: `${(trimRanges[index]?.end / videoDurations[index]) * 100}%` }}
              onMouseDown={() => handleTrimEndDragStart(index)}
              onMouseUp={() => handleTrimDragEnd(index)}
            />
          </div>
        ))}
      </div>

      <Draggable
        axis="x"
        bounds="parent"
        position={{ x: playheadPosition, y: 0 }}
        onStart={handleDragStart}
        onStop={handleDragEnd}
        onDrag={handleDrag}
      >
        <div className="playhead" />
      </Draggable>
    </div>
  );
};

export default Timeline;
