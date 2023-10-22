import { createLogger, transports, format } from 'winston';

// Error logs
const errorLogger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

export default errorLogger;