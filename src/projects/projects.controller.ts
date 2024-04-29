import { Controller, Get, Post, Body, Patch, Param, Delete, Request} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetProjectFindAllResponse } from './response/get-project-find-all.response';
import { GetParticipantsResponse } from './response/get-participants-response';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Request() req:AuthRequest,
    @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(req.user,createProjectDto);
  }
  @ApiOkResponse({type:GetProjectFindAllResponse})
  @Get()
  findAll(@Request() req:AuthRequest) {
    return this.projectsService.findAll(req.user);
  }
  @ApiOkResponse({type: GetParticipantsResponse})
  @Get(':id/participants')
  findParticipants(@Param('id') id:string){
    return this.projectsService.findParticipants(id)
  }
}
