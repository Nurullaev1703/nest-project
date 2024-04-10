import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ){}


  async findAll() {
    return this.userRepository.find({
      relations: {
        address: true
      }
    });
  }

  async findOne(id: string) {
    return this.userRepository.findOne({
      where: {id},
      relations: {
        address: true,
        projects:true
      }
    });
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
