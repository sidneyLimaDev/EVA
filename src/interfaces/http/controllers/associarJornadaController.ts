import { Request, Response, NextFunction } from "express";
import { AssociarJornadaUseCase } from "application/usecases/associarJornadaUseCase";
import { CustomError } from "middleware/CustomError"; // Certifique-se de importar o CustomError

export const associarJornadaController = async (
  req: Request,
  res: Response,
  next: NextFunction // Adicionando o next como parâmetro
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

    // Verifica se é um CustomError e passa para o middleware de erro
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    // Para erros não previstos
    return next(new CustomError("Erro interno do servidor.", 500));
  }
};
