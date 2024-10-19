import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Upload, Link, Key, PlayCircle } from 'lucide-react';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [streamKey, setStreamKey] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEnd);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(file);
      }
    }
  };

  const handleStartStream = () => {
    if (videoRef.current && videoFile) {
      videoRef.current.play();
      setIsPlaying(true);
      // Here you would typically initiate the actual stream to the RTMP server
      console.log(`Streaming to: ${streamUrl}`);
      console.log(`Stream key: ${streamKey}`);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">24/7 Livestream Dashboard</h1>
      <div className="w-full max-w-4xl aspect-video bg-black relative overflow-hidden rounded-lg shadow-lg">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          loop
          playsInline
        >
          Your browser does not support the video tag.
        </video>
        {!videoFile && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg">No video uploaded yet</p>
          </div>
        )}
      </div>
      <div className="mt-8 w-full max-w-4xl space-y-4">
        <div className="flex items-center space-x-4">
          <Upload className="w-6 h-6" />
          <input
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="flex-grow bg-gray-800 p-2 rounded"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Link className="w-6 h-6" />
          <input
            type="text"
            placeholder="RTMP Stream URL"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            className="flex-grow bg-gray-800 p-2 rounded text-white"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Key className="w-6 h-6" />
          <input
            type="text"
            placeholder="Stream Key"
            value={streamKey}
            onChange={(e) => setStreamKey(e.target.value)}
            className="flex-grow bg-gray-800 p-2 rounded text-white"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleStartStream}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            Start Stream
          </button>
          <button
            onClick={handlePlayPause}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2" /> Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" /> Play
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;