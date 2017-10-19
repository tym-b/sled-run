// import React from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import store from 'store';
// import routes from 'routes';
//
// render(
//   <Provider store={store}>{routes}</Provider>,
//   document.getElementById('react')
// );

import socketio from 'socket.io-client';

const socket = socketio('http://localhost:8181');

socket.on('news', (data) => {
  console.log(data);
  socket.emit('devicemove', { my: 'data' });
});
