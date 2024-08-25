import { AppDataSource } from '../database';
import { Event } from '../entities/Event';

export class EventService {
  private eventRepository = AppDataSource.getRepository(Event);

  public async createEvent(eventData: Partial<Event>): Promise<Event> {
    const event = this.eventRepository.create(eventData);
    return await this.eventRepository.save(event);
  }

  public async updateEvent(id: number, eventData: Partial<Event>): Promise<Event | null> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) return null;
    this.eventRepository.merge(event, eventData);
    return await this.eventRepository.save(event);
  }

  public async deleteEvent(id: number): Promise<void> {
    await this.eventRepository.delete({ id });
  }

  public async getEventById(id: number): Promise<Event | null> {
    // Ensure that sessions and participants are eagerly loaded
    return await this.eventRepository.findOne({
      where: { id },
      relations: ['sessions', 'sessions.participants'],
    });
  }
}
