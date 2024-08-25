import { Request, Response } from 'express';
import { EventService } from '../services/EventService';
import { PDFService } from '../services/PDFService';

export class EventController {
  private eventService: EventService;
  private pdfService: PDFService;

  constructor() {
    this.eventService = new EventService();
    this.pdfService = new PDFService();
  }

  public async createEvent(req: Request, res: Response): Promise<Response> {
    try {
      const event = await this.eventService.createEvent(req.body);
      return res.status(201).json(event);
    } catch (error: any) {
      console.error('Error creating event:', error);

      if (error.code === '23502') { 
        return res.status(400).json({
          message: 'Failed to create event',
          error: 'All required fields are not given.'
        });
      }

      return res.status(500).json({
        message: 'Failed to create event',
        error: 'Error occurred while creating the event...'
      });
    }
  }

  public async updateEvent(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const event = await this.eventService.updateEvent(parseInt(id), req.body);
      if (!event) {
        return res.status(404).json({ message: 'Event not found :(' });
      }
      return res.json(event);
    } catch (error: any) {
      console.error('Error updating event:', error);

      if (error.code === '23502') {
        return res.status(400).json({
          message: 'Failed to update event',
          error: 'Missing required fields or invalid data...'
        });
      }

      return res.status(500).json({
        message: 'Failed to update event',
        error: 'Error occurred while updating the event.'
      });
    }
  }

  public async deleteEvent(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
        const eventId = parseInt(id);

        // Delete the event, including associated sessions and participants
        await this.eventService.deleteEvent(eventId);

        return res.status(204).json({ msg: "Event and associated data deleted successfully" });
    } catch (error: any) {
        console.error('Error deleting event and sessions:', error);

        if (error.code === '23503') { // Foreign key violation
            return res.status(400).json({
                message: 'Cannot delete event',
                error: 'This event is associated with other data. Please try again.'
            });
        }

        return res.status(500).json({
            message: 'Failed to delete event',
            error: 'An unexpected error occurred while deleting the event and its associated data'
        });
    }
  }

  public async getEvent(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const event = await this.eventService.getEventById(parseInt(id));
      if (!event) {
        return res.status(404).json({ message: 'Event not found :(' });
      }
      return res.json(event);
    } catch (error) {
      console.error('Error retrieving event:', error);
      return res.status(500).json({
        message: 'Failed to retrieve event',
        error: 'Error occurred while retrieving the event'
      });
    }
  }

  public async getEventPDF(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const event = await this.eventService.getEventById(parseInt(id));
      if (!event) {
        res.status(404).json({ message: 'Event not found' });
        return;
      }

      const pdfBuffer = await this.pdfService.generateEventPDF(event);

      res.setHeader('Content-Disposition', `inline; filename="event_${event.id}.pdf"`);
      res.contentType('application/pdf');
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ message: 'Failed to generate PDF' });
    }
  }


}
