import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserRepository } from '../repositories/UserRepository';
import { CreatedUserDto, RegisterUserDto } from '../dtos/UserDtos';
import { HttpError } from '../errors/HttpError';

export default class AuthService {
    constructor(private userRepository: UserRepository) {}

    public async register({ password, ...userDto }: RegisterUserDto): Promise<CreatedUserDto> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { password: savedPassword, ...user } = await this.userRepository.create({ password: hashedPassword, ...userDto })
    
        const token = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRES_IN as any || '15m'}
        )
        return { ...user, token }
    }

    public async login(email: string, password: string): Promise<string | HttpError> {
        const user = await this.userRepository.getByEmail(email)
        if (user === null || !(await bcrypt.compare(password, user.password))) {
            return new HttpError(401, 'Invalid email or password')
        }

        const token = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRES_IN as any || '15m' }
        )

        return token
    }
}