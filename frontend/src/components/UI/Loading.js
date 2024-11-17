// frontend/src/components/UI/Loading.js
import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
    <ReactLoading type="spin" color="#000" height={50} width={50} />
  </div>
);

export default Loading;

// Use it in your component like this:
import Loading from './Loading';

// In your component logic
if (isLoading) {
  return <Loading />;
}

// // frontend/src/components/Loading.js
// import React from 'react';
// import './Loading.css'; // You can add styles in this file for better visuals

// const Loading = () => {
//     return (
//         <div className="loading">
//             <h2>Loading...</h2>
//             <div className="spinner"></div> {/* You can create a CSS spinner animation */}
//         </div>
//     );
// };

// export default Loading;
