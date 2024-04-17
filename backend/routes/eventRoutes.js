import express from 'express';
import {createEvent, displayEvents} from '../controllers/eventController.js';


const eventRouter = express.Router();

eventRouter.post('/event',createEvent);
eventRouter.get('/displayevents', displayEvents);

export default eventRouter;
