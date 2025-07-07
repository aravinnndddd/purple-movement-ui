// import React, { useState, useRef } from "react";
// import video from "../assets/main logo.mp4";
// const LoadingScreen = () => {
//   const [loading, setLoading] = useState(true);
//   const videoRef = useRef(null);

//   const handleVideoEnd = () => {
//     // Add a small delay after video ends (optional)
//     setTimeout(() => {
//       setLoading(false);
//     }, 500);
//   };

//   return loading ? (
//     <div className="fixed inset-0 z-50 size-10 flex items-center justify-center bg-black">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         playsInline
//         onEnded={handleVideoEnd}
//         className="h-screen w-screen object-cover"
//       >
//         <source src={video} type="video/mp4" />
//       </video>
//     </div>
//   ) : null;
// };

// export default LoadingScreen;
