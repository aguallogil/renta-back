import { Controller, Get, Post, Body, HttpCode, UnauthorizedException } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
@Controller('auth')
export class AuthController{
    constructor(private userService:UserService,private authService:AuthService){

    }
    @Post('login')
    @HttpCode(200)
    async login(@Body()data:User){
        const user=await this.userService.getUser(data);
        if (user) {
            const accessToken = await this.authService.generateToken({ userId: user._id });
            return { accessToken };
          }
          // Si las credenciales son incorrectas, devuelve un error o un código de estado adecuado
        throw new UnauthorizedException('Credenciales inválidas');
    }
@Post('register')
@HttpCode(201)
async register(@Body() data: User) {
  return this.userService.createUser(data);
}

}