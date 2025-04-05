import { Request, Response, NextFunction } from "express";
import { CustomError } from "./CustomError"; // Se estiver usando erro customizado

export const errorMiddleware = (
  err: Error | CustomError, // Pode ser um erro padrão ou um erro customizado
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // A função não retorna nada, o tipo é void
  console.error(err); // Log do erro para monitoramento

  if (err instanceof CustomError) {
    // Se o erro for do tipo CustomError
    res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
    });
  } else {
    // Caso seja um erro genérico, envia um status 500
    res.status(500).json({
      message: "Erro interno do servidor",
      statusCode: 500,
    });
  }
};
