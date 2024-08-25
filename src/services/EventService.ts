import { AppDataSource } from '../database';
import { Event } from '../entities/Event';
import { Session } from '../entities/Session';
import { Participant } from '../entities/Participant';

export class EventService {
  private eventRepository = AppDataSource.getRepository(Event);
  private sessionRepository = AppDataSource.getRepository(Session);
  private participantRepository = AppDataSource.getRepository(Participant);

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
    // First, delete all participants associated with sessions of the event
    await this.deleteParticipantsByEventId(id);
    
    // Then, delete all sessions associated with the event
    await this.deleteSessionsByEventId(id);

    // Finally, delete the event
    await this.eventRepository.delete({ id });
  }

  private async deleteParticipantsByEventId(eventId: number): Promise<void> {
    const sessions = await this.sessionRepository.find({ where: { event: { id: eventId } } });

    for (const session of sessions) {
      await this.participantRepository.delete({ session: { id: session.id } });
    }
  }

  private async deleteSessionsByEventId(eventId: number): Promise<void> {
    await this.sessionRepository.delete({ event: { id: eventId } });
  }

  public async getEventById(id: number): Promise<Event | null> {
    // Ensure that sessions and participants are eagerly loaded
    return await this.eventRepository.findOne({
      where: { id },
      relations: ['sessions', 'sessions.participants'],
    });
  }
}
