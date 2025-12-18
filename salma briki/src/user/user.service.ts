import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...createUserDto,
      active: false,
    });
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    user.logRetrieval(); // ← hook personnalisé
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new NotFoundException(`User with email ${email} not found`);
    user.logRetrieval();
    return user;
  }

  async findActive(): Promise<User[]> {
    return await this.userRepository.findBy({ active: true });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }

  async activate(id: string, password: string): Promise<User> {
    const user = await this.findOneById(id);

    if (user.password !== password) {
      throw new BadRequestException('Mot de passe incorrect');
    }

    if (user.active) {
      throw new BadRequestException('Compte déjà activé');
    }

    user.active = true;
    user.activatedAt = new Date();

    return await this.userRepository.save(user);
  }
}