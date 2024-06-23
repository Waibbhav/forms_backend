import { Controller, Post ,Get} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    
    @Get("get/:id")
    getUser() {
        
    
    }    

    @Post("create")
    createUser() {
        
    }

    @Post("update")
    updateUser() {
        
    }

    @Post("delete")
    deleteUser() {
        
    }
}
