// middlewares/validateDto.ts
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const dtoObject = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoObject, { whitelist: true });

    if (errors.length > 0) {
      const formattedErrors = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));
       res.status(400).json({
        message: 'Validation failed',
        errors: formattedErrors,
      });
      return;
    }

    // Gán DTO đã validate vào req.body (nếu cần)
    req.body = dtoObject;

    next();
  };
}
