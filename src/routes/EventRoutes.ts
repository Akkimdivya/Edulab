import { Router } from 'express';
import { EventController } from '../controllers/EventController';

const router = Router();
const eventController = new EventController();

router.post('/events', eventController.createEvent.bind(eventController));
router.put('/events/:id', eventController.updateEvent.bind(eventController));
router.delete('/events/:id', eventController.deleteEvent.bind(eventController));
router.get('/events/:id', eventController.getEvent.bind(eventController));
router.get('/events/:id/pdf', eventController.getEventPDF.bind(eventController));


export default router;
