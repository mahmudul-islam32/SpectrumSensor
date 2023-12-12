// src/api.js

const API_ENDPOINT = 'https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus';
const WS_ENDPOINT = 'wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS';

export const fetchData = async () => {
  const response = await fetch(API_ENDPOINT);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
};

export const subscribeToWebSocket = (callback) => {
  const socket = new WebSocket(WS_ENDPOINT);

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    callback(data);
  });

  return () => {
    socket.close();
  };
};
