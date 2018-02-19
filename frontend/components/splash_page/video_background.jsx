import React from 'react';
const VideoBackground = () => {
  return (
    <div>
       <video id="background-video" loop autoPlay muted>
		<source src="http://res.cloudinary.com/drpwlar6o/video/upload/v1519005037/Market.mp4" type="video/mp4" />Your browser does not support the video tag.
		<source src="http://res.cloudinary.com/drpwlar6o/video/upload/v1519005054/Market.webm" type="video/webm" />Your browser does not support the video tag.
  
      <source src={'https://res.cloudinary.com/dbbzpmyvc/video/upload/v1494882565/background_video_mrwna2.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
