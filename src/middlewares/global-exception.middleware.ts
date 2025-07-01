import { Request, Response, NextFunction } from 'express';

// Middleware bắt lỗi toàn cục
export function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Global error handler:', err);

  // Chuẩn hoá response lỗi
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}