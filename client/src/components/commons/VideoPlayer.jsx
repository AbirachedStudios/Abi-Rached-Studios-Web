import React, { useState } from 'react';

function VideoPlayer({ id, width = 710, height = 430 }) {
  const [play, setPlay] = useState(false);
  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return (
    <div
      onClick={() => setPlay(true)}
      style={{
        width:  `${width}px`,
        height: `${height}px`,
        background: `url(${thumb}) center/cover`,
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      {!play && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontSize: '3rem', color: 'white'
        }}>▶</div>
      )}
      {play && (
        <iframe
          width={width}
          height={height}
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
}

export default function App() {
  return <VideoPlayer id="S7W4DKXA3k0" />;
}
