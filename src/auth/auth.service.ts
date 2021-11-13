import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/common/interfaces/user.interface';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Users, UsersDocument } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Users.name) private usersModel:Model<IUser>, private jwtService:JwtService) {}
    
    async login(loginAuthDto: LoginAuthDto) {
        const userToAttempt = await this.usersModel.findOne({email:loginAuthDto.email});
        if(!userToAttempt) throw new UnauthorizedException();
        const validCredential =  await bcrypt.compare(loginAuthDto.password,userToAttempt.password);

        if(validCredential){
            const payload = {email:userToAttempt.email,sub:userToAttempt._id}
            console.log(this.jwtService.sign(payload));
            return {
                accessToken:this.jwtService.sign(payload)
            }
        }
        else{
            throw new UnauthorizedException();
        }
    }
    async hashPassword(password:string):Promise<string>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    async register(registerAuthDto: RegisterAuthDto):Promise<IUser> {
        const hash = await this.hashPassword(registerAuthDto.password);
        const newUser = new this.usersModel({...registerAuthDto,password:hash});
        return await newUser.save(); 
    }

    async me(payload){
        console.log("entre aqui");
        console.log("payload : ",payload);
        let result:any;
            result = this.jwtService.verify(payload);
            const {email}=result;
            const user = this.usersModel.findOne({ email: email });
            return user;
        
    }
}
