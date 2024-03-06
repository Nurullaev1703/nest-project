import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager
    ){}

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto)
    await this.entityManager.save(user)
    return 'This action adds a new user';
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOneBy({id});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.save({id, ...updateUserDto})
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    await this.userRepository.delete({id})
    return `This action removes a #${id} user`;
  }
}
