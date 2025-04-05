import { Request, Response } from "express";
import { AssociarJornadaUseCase } from "application/usecases/associarJornadaUseCase";

export const associarJornadaController = async (
  req: Request,
  res: Response
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
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};
