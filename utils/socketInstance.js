import { Server } from 'socket.io';
import http from 'http';
import app from '../server'; // Assuming your Express app is defined in app.js

const server = http.createServer(app);
const io = new Server(server);

export default io;
