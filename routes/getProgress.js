import express from 'express';
const router = express.Router();

const handleProgress = (io) => {
 return (req, res) => {
  console.log('Received request to /progress endpoint');

  const sendEvent = (data) => {
   io.emit('progress', data); // Emit the progress event to all connected clients
  };

  const handleMessage = (message) => {
   sendEvent({ progress: message });
  };

  // Listen for progress events and send messages to the client
  eventEmitter.on('progress', handleMessage);

  // Clean up event listener when the client disconnects
  req.on('disconnect', () => {
   console.log('Client disconnected');
   eventEmitter.off('progress', handleMessage);
  });
 };
};

export default handleProgress;


/*
import express from 'express';
const router = express.Router();

// SSE endpoint for progress messages

router.get('/', (req, res) => {
 const eventEmitter = req.eventEmitter;
 //console.log(eventEmitter);
 console.log('Received request to /progress endpoint');

 res.setHeader('Content-Type', 'text/event-stream');
 res.setHeader('Cache-Control', 'no-cache');
 res.setHeader('Connection', 'keep-alive');
 res.setHeader('Transfer-Encoding', 'chunked');
 //console.log(eventEmitter);

 const sendEvent = (data) => {
  //console.log('Sending event:', data);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
 };

 const handleProgress = (message) => {
  //console.log('Progress:', message);
  sendEvent({ progress: message });
 };
 // Listen for progress events and send messages to the client
 eventEmitter.on('progress', handleProgress);

 // Clean up event listener when the client closes the connection
 req.on('close', () => {
  console.log('Connection closed');
  eventEmitter.off('progress', handleProgress);
 });
});

export { router as default };
*/