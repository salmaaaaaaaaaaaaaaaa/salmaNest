import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put('activate')
  async activate(@Body() body: { id: string; password: string }) {
    return this.userService.activate(body.id, body.password);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Get('active')
  async findActive() {
    return this.userService.findActive();
  }
}