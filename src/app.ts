import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from `@/utils/interfaces/controller.interface`;
import ErrorMiddleware from `@/middleware/error.middleware`;
import helmet from 'helmet';
import { throws } from 'assert';

class App {
  public express: Application;
  public port: Number;
  
  constructor(controllers: Controller[], port: Number) {
    this.express = express();
    this.port = port;
    
    this.initMiddleware();
    this.initControllers(controllers);
    this.initDatabase();
    this.initErrorHandling();
  }

  private initMiddleware() : void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json()); 
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initControllers(controllers: Controller[]) : void {
    controllers.forEach((controller:Controller)  => {
      this.express.use('/api', controller.router)
    })
  }

  private initErrorHandling(): void {
    this.express.use(ErrorMiddleware())
  }




}


// const app = express();
// app.use(express.json());

// //Routes
// app.get('/', (req: Request, res: Response) => {
//     return res.send('Hello World!');
// });

// app.post('/api/data', (req: Request, res: Response) => {
//     const { data } = req.body;
//     console.log(data);
//     return res.sendStatus(200);
// });

// //Port
// const HTTP_PORT = process.env.PORT || 8080;
// app.listen(HTTP_PORT, () => {
//     console.log(`Running at http://localhost:${HTTP_PORT}`);
// });
