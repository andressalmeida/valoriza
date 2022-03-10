import "reflect-metadata"; 
import express, { response } from 'express';

import "./database/index";

const app = express();


app.listen(3000, () => console.log('Server is running'))

