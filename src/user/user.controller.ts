import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreate } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get/:id')
  getUser() {}

  @Get('get')
 async getAllUser(@Req() req: any, @Res() res: any) {
         const result = await this.userService.getAll(req.query);
      if (result.success) {
        res.status(HttpStatus.CREATED).json({
          data: result.data,
          message: result.message,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          data: result.data,
          message: result.message,
        });
      }
    } catch (error) {
      throw new HttpException(
        error.message || 'Unexpected error creating user',
        HttpStatus.BAD_REQUEST,
      );
    }
  

  @Post('create')
  async createUser(@Body() body: UserCreate, @Req() req: any, @Res() res: any) {
    try {
      const result = await this.userService.userCreate(body);
      if (result.success) {
        res.status(HttpStatus.CREATED).json({
          data: result.data,
          message: result.message,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          data: result.data,
          message: result.message,
        });
      }
    } catch (error) {
      throw new HttpException(
        error.message || 'Unexpected error creating user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('update')
  updateUser() {}

  @Post('delete')
  deleteUser() {}
}
