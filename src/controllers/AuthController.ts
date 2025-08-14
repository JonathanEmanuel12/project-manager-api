import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import AuthService from '../services/AuthService';
import { loginValidator, registerUserValidator } from '../validators/UserValidator';

class AuthController {
    private authService: AuthService
    constructor() {
        this.authService = new AuthService(new UserRepository())
    }

    public async register(req: Request, res: Response) {
        const { success, error, data:userDto } = registerUserValidator.safeParse(req.body)

        if(success !== true) return res.status(422).json(error)

        const data = await this.authService.register(userDto)
        return res.status(201).json(data);
    }

    public async login(req: Request, res: Response, next: Function) {
        const { success, error, data: loginDto } = loginValidator.safeParse(req.body)

        if(success !== true) return res.status(422).json(error)

        const data = await this.authService.login(loginDto.email, loginDto.password)
        if (data instanceof Error) return next(data)
        return res.status(200).json({ data })
    }
}

export default new AuthController()