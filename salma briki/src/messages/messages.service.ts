import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) {}

  create(content: string, status: string) {
    const msg = this.messageRepo.create({ content, status });
    return this.messageRepo.save(msg);
  }

  findAll() {
    return this.messageRepo.find();
  }
}
