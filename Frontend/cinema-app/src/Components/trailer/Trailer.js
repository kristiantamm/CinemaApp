import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Youtube API ja filmi pealkirja põhjal kuvab traileri
const Trailer = ({ title }) => {
  const [trailerUrl, setTrailerUrl] = useState('');

  const fetchTrailer = async (title) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          q: `${title} official trailer`,
          key: 'AIzaSyAZvmHNhkY3JROlLEih2dDiyePCAMaFwts',
          type: 'video',
        },
      });

      const videoId = response.data.items[0].id.videoId;
      const url = `https://www.youtube.com/embed/${videoId}`;
      console.log(videoId);
      setTrailerUrl(url);
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  useEffect(() => {
    fetchTrailer(title);
  }, []);

  return (
    <div>
      {trailerUrl && (
        <iframe
          style={{ width: '560px', height: '340px' }}
          src={trailerUrl}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Trailer;