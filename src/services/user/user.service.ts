import { User } from "../../models/user.model";
import { LoginReqDto } from "./dto/request/login-req.dto";
import { RegisterReqDto } from "./dto/request/register-req.dto";
import bcrypt from 'bcrypt';
import { LoginResDto } from "./dto/response/login-res.dto";
import jwt from 'jsonwebtoken';
export class UserService {

    async registerUser(dto: RegisterReqDto): Promise<User> {
        const { username, password } = dto;
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) throw new Error('Username already exists');
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = await User.create({
            username: username,
            password: hashedPassword
        })
        
        return user;

    }

    async login(dto:LoginReqDto):Promise<LoginResDto> {
    const { username, password } = dto;
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');

    const payload = { id: user.id, username: user.username };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string , {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }


}