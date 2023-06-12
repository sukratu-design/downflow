import path from 'path';
import winston from 'winston';
import paths from './paths.js';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({ projectId: 'website-downloader-387015' });

const { logsDirectory } = paths;

// Create logger
const logger = winston.createLogger({
 level: 'info',
 format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
 transports: [],
});

if (process.env.NODE_ENV === 'production') {
 // Add Google Cloud Storage transport
 const bucket = storage.bucket(logsDirectory);
 logger.add(
  new winston.transports.Stream({
   stream: bucket.file('combined.log').createWriteStream(),
  })
 );
} else if (process.env.NODE_ENV === 'development') {
 logger.add(
  new winston.transports.Console({
   format: winston.format.simple(),
  })
 );

 // Add file transports for development
 logger.add(
  new winston.transports.File({
   filename: path.join(logsDirectory, 'error.log'),
   level: 'error',
  })
 );
 logger.add(
  new winston.transports.File({
   filename: path.join(logsDirectory, 'combined.log'),
  })
 );
}

export default logger;
