import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Role, RolesProject } from './entities/role.entity';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>
  ){}

  async create(tokenData:TokenData, createProjectDto: CreateProjectDto) {
    const user = await this.userRepository.findOne({
      where:{
        id: tokenData.id
      }
    })
    const project = new Project(createProjectDto)

    await this.projectRepository.save(project)
    await this.rolesRepository.save({
      user,
      project,
      role: RolesProject.admin
    })
    return JSON.stringify("Проект создан")
  }

  async findAll(tokenData: TokenData) {
    return this.projectRepository.find({
      where: {roles: { 
        user: {
          id:tokenData.id
        }
      }}
    })
  }

  async findParticipants(projectId:string){
    return this.rolesRepository.find({
      where:{
        project:{
          id: projectId
        }
      },
      relations:{
        user:true
      },
      select:{
        role:true,
        user:{
          username:true,
          firstName:true,
          lastName:true,
        }
      }
    })
  }
}
