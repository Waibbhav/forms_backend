import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AggregatePaginateModel } from 'mongoose-aggregate-paginate-v2';
import { User, UserDocument } from "../schemas/users.schema";
import { Injectable } from "@nestjs/common";
import * as _ from 'underscore';
const mongoose = require('mongoose');


@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(User.name) private userModelPaginated: AggregatePaginateModel<UserDocument>
    ) {}

    async getAllByField(params: any): Promise<any> {
        try {
            return await this.userModel.find(params).exec();
        } catch (error) {
            return error;
        }
    }

    async getByField(params: any): Promise<any> {
        try {
            return await this.userModel.findOne(params).exec();
        } catch (error) {
            return error;
        }
    }

    async getById(id: any): Promise<any> {
        try {
            return await this.userModel.findById(id).exec();
        } catch (error) {
            return error;
        }
    }

    async getCountByParam (params: any): Promise<any> {
        try {
            return await this.userModel.countDocuments(params);
        } catch (e) {
            return e;
        }
    }

    async save(body: any): Promise<any> {
        try {
            return await this.userModel.create(body);
        } catch (error) {
            return error;
        }
    }

    async updateById(data: any, id: any): Promise<any> {
        try {
            return await this.userModel.findByIdAndUpdate(id, data, {
                new: true
            });
        } catch (error) {
            return error;
        }
    }

    async getDistinctDocument(field:string, params:any) {
        try {
            let datas = await this.userModel.distinct(field, params);
            if (!datas) {
                return null;
            }
            return datas;
        } catch (e) {
            return e;
        }
    }

    async getDistinctDocumentCount(field:string, params:any) {
        try {
            let datasCount = await this.userModel.distinct(field, params);
            if (!datasCount) {
                return 0;
            }
            return datasCount.length;
        } catch (e) {
            return e;
        }
    }

    async delete(id:any) {
        try {
            let dataDelete = await this.userModel.deleteOne({
                _id: mongoose.Types.ObjectId(id)
            }).exec();
            return dataDelete;
        } catch (e) {
            throw (e);
        }
    }

    async bulkDelete(params:any) {
        try {
            let deleted = await this.userModel.deleteMany(params);
            return true;
        } catch (e) {
            return e;
        }
    }

    async updateByField(data:any, param:any) {
        try {
            let datas = await this.userModel.updateOne(param, data, {
                new: true,
            });
            if (!datas) {
                return null;
            }
            return datas;
        } catch (e) {
            return e;
        }
    }

    async updateAllByParams(data:any, params:any) {
        try {
            let datas = await this.userModel.updateMany(params, data, { new: true });
            if (!datas) {
                return null;
            }
            return datas;
        } catch (e) {
            return e;
        }
    }


   async getAll(req:any) {
       try {
           
           
              let aggregate = this.userModel.aggregate([
                {
                  $match: {
                    isDeleted: { $eq: false },
                  },
                },
              ]);
           
               const options = {
                 page: req.page ? req.page : 1,
                 limit: req.length ? req.length :10,
               };
               const allUsers = await this.userModelPaginated.aggregatePaginate(
                 aggregate,
                 options,
               );
           
           console.log(allUsers);
           
       return allUsers;
       } catch(e) {
           return e
        }
     
    }
  

   
}