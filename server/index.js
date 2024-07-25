import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute.js';
import propertyCardRoutes from './routes/propertyCardRoute.js';
import leadRoutes from './routes/leadRoute.js'


const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/property-cards', propertyCardRoutes);
app.use('/leads', leadRoutes);
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});
const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });