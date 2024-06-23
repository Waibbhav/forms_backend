import { Controller, Post ,Get, Body, HttpException, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreate } from './dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    
    @Get("get/:id")
    getUser() {
        
    
    }    

    @Post("create")
    async createUser(@Body() body:UserCreate) {
    try {
      const createdUser = await this.userService.userCreate(body);
      return createdUser; // Return the created user data
    } catch (error) {
      // Handle potential errors (e.g., database errors, validation errors)
      throw new HttpException(error.message || 'Unexpected error creating user', HttpStatus.BAD_REQUEST);
    }
  }
    

    @Post("update")
    updateUser() {
        
    }

    @Post("delete")
    deleteUser() {
        
    }
}
