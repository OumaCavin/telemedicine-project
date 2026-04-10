// frontend/src/components/UI/Loading.js
import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
    <ReactLoading type="spin" color="#000" height={50} width={50} />
  </div>
);

export default Loading;
