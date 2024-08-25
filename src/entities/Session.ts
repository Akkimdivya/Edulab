import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Event } from './Event';
import { Participant } from './Participant';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => Event, (event) => event.sessions)
  event: Event;

  @OneToMany(() => Participant, (participant) => participant.session, { cascade: true })
  participants: Participant[];
}
