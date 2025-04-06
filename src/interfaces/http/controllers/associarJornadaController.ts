import { Request, Response, NextFunction } from "express";
import { AssociarJornadaUseCase } from "application/usecases/associarJornadaUseCase";
import { CustomError } from "middleware/CustomError";

export const associarJornadaController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { colaboradorId, jornadaId, dataInicio } = req.body;

    if (!colaboradorId || !jornadaId || !dataInicio) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const useCase = new AssociarJornadaUseCase();
    const associacao = await useCase.execute({
      colaboradorId,
      jornadaId,
      dataInicio: new Date(dataInicio),
    });

    return res.status(201).json({
      message: "Jornada associada com sucesso.",
      data: associacao,
    });
  } catch (error) {
    console.error("Erro ao associar jornada:", error);

    if (error instanceof CustomError) {
      return next(error);
    }
    return next(new CustomError("Erro interno do servidor.", 500));
  }
};
