import { Request, Response, Router } from 'express';
import { validateDto } from '../middlewares/validate-dto.middleware';
import { LoginReqDto } from '../services/user/dto/request/login-req.dto';
import { RegisterReqDto } from '../services/user/dto/request/register-req.dto';
import { UserService } from '../services/user/user.service';

const router = Router();
const userService = new UserService();

router.post('/register', validateDto(RegisterReqDto), async (req: Request, res: Response) => {
    const user = await userService.registerUser(req.body);
    res.status(201).json({message: 'User registered successfully', data:user});
});

router.post('/login', validateDto(LoginReqDto), async (req: Request, res: Response) => {
    const user = await userService.login(req.body);
    res.status(200).json({message: 'User logged in successfully', data:user});
});


export default router;