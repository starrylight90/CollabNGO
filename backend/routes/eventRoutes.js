import express from 'express';
import createEvent from '../controllers/eventController.js';


const eventRouter = express.Router();

eventRouter.post('/event', createEvent);

export default eventRouter;
