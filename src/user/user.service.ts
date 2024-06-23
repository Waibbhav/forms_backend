import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories';
import mongoose from 'mongoose';
import { UpdateUser, UserCreate } from './dto';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async userCreate(body: UserCreate): Promise<any> {
    try {
      body.email = body.email.toLowerCase().trim();

      let saveUser = await this.userRepo.save(body);
      if (saveUser && saveUser?._id) {
        return {
          success: true,
          type: 'success',
          data: saveUser,
          message: 'User account created successfully!',
        };
      } else {
        return {
          success: false,
          type: 'error',
          message: 'Something went wrong',
        };
      }
    } catch (error) {
      console.error(error);
      return { success: false, type: 'error', message: error.message };
    }
  }

  async userUpdate(body: UpdateUser, files: any): Promise<any> {
    try {
      body.email = body.email.toLowerCase().trim();

      let userDetail = await this.userRepo.getByField({
        _id: body.id,
        isDeleted: false,
      });

      if (userDetail && userDetail?._id) {
        let userUpdate = await this.userRepo.updateById(body, body.id);
        if (userUpdate && userUpdate?._id) {
          return {
            success: true,
            type: 'success',
            data: userUpdate,
            message: 'User account updated successfully!',
          };
        } else {
          return {
            success: false,
            type: 'error',
            message: 'Something went wrong',
          };
        }
      } else {
        return {
          success: false,
          type: 'error',
          message: 'Something went wrong user not found',
        };
      }
    } catch (error) {
      console.error(error);
      return { success: false, type: 'error', message: error.message };
    }
  }

  async deleteUser(id: any): Promise<any> {
    try {
      id = new mongoose.Types.ObjectId(id);
      const userDetails = await this.userRepo.getById(id);
      if (!userDetails) {
        return {
          success: false,
          type: 'error',
          message: 'Something Went Wrong.. No User Found!',
        };
      }
      let updateUser = await this.userRepo.updateById(
        {
          isDeleted: true,
        },
        id,
      );
      if (updateUser && updateUser._id) {
        return {
          success: true,
          type: 'success',
          message: 'Account deleted successfully!',
        };
      } else {
        return {
          success: false,
          type: 'error',
          message: 'Something Went Wrong!',
        };
      }
    } catch (error) {
      console.error(error);
      return { success: false, type: 'error', message: error.message };
    }
  }

  async userDetails(id: any): Promise<any> {
    try {
      id = new mongoose.Types.ObjectId(id);
      let userDetails = await this.userRepo.getByField({
        _id: id,
        isDeleted: false,
      });
      if (userDetails && userDetails.length) {
        return {
          success: true,
          type: 'success',
          data: userDetails,
          message: 'User details fetched successfully!',
        };
      } else {
        return {
          success: false,
          type: 'error',
          data: null,
          message: 'Something Went Wrong.. No User Found!',
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        type: 'error',
        data: null,
        message: error.message,
      };
    }
  }

    async getAll(req:any): Promise<any> {
        try {
            let userData = await this.userRepo.getAll(req);
          if (userData ) {
            return {
              success: true,
              type: 'success',
              data: userData,
              message: 'all users fetched successfully!',
            };
          } else {
            return {
              success: false,
              type: 'error',
              data: null,
              message: 'Something Went Wrong.. No User Found!',
            };
          }
        } catch (error) {
          console.error(error);
          return {
            success: false,
            type: 'error',
            data: null,
            message: error.message,
          };
        }
  }
}
