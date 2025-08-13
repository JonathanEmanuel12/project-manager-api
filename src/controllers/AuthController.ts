import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import AuthService from '../services/AuthService';

class AuthController {
    private authService: AuthService
    constructor() {
        this.authService = new AuthService(new UserRepository())
        console.log('11111111', this)

    }

    public async register(req: Request, res: Response) {
        console.log('asdasd', this)

        const userDto = req.body
        const data = await this.authService.register(userDto)
        return res.status(201).json(data);
    }

    public async login(req: Request, res: Response, next: Function) {
        const { email, password } = req.body
        const data = await this.authService.login(email, password)
        if (data instanceof Error) return next(data)
        return res.status(200).json({ data })
    }
}

export default new AuthController()