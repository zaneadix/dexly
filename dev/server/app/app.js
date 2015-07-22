import express from 'express';
import config from './config';

var app = express();

config(app);

export default app;