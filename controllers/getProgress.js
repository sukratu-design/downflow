import { EventEmitter } from 'events';

function sendProgressMessages(req, res) {
 res.setHeader('Content-Type', 'text/event-stream');
 res.setHeader('Cache-Control', 'no-cache');
 res.setHeader('Connection', 'keep-alive');
 res.setHeader('Transfer-Encoding', 'chunked');

 const sendEvent = (data) => {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
 };

 const handleProgress = (message) => {
  sendEvent({ progress: message });
 };

 // Listen for progress events and send messages to the client
 EventEmitter.on('progress', handleProgress);

 // Clean up event listener when the client closes the connection
 req.on('close', () => {
  EventEmitter.off('progress', handleProgress);
 });
}

export { sendProgressMessages };
