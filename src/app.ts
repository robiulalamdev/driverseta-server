import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import http from 'http';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

import cookieParser from 'cookie-parser';
import setupSocket from './app/modules/GPS/tracking.websocket';
import sendResponse from './shared/sendResponse';
import swaggerSetup from './swagger';

const app: Application = express();

app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a server
const server = http.createServer(app);

// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

app.use('/api/v1', routes);

// Setup Swagger
swaggerSetup(app);

// Setup Socket.io
const io = setupSocket(server);

//Testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'API is working !',
    data: "Welcome to HOME!",
  })
})


//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
