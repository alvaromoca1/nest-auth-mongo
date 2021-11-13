import { Injectable, NestMiddleware, HttpService, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AutorizationMiddleware implements NestMiddleware{
    constructor(@Inject(AuthService)private authService: AuthService){}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const acessToken = req.headers.authorization || req.query.authorization;
            await this.authService.me(acessToken);
            console.log("sd");
            next();
        } catch (error) {
            res.sendStatus(401);
        }
    }

}