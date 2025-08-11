import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserRepository } from '../repositories/UserRepository';

export async function register(req: Request, res: Response) {
    const { name, email, password } = req.body

    const userRepository = new UserRepository()
    const { password: savedPassword, ...user } = await userRepository.create({ name, email, password: await bcrypt.hash(password, 10) });

    const token = jwt.sign(
        { sub: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN as any || '15m'}
    )

    return res.status(201).json({ ...user, token });
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body

    const userRepository = new UserRepository()
    const user = await userRepository.getByEmail(email);
    if (user === null || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Credenciais inválidas' })
    }

    const token = jwt.sign(
        { sub: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN as any || '15m'}
    )

    return res.json({ token });
}