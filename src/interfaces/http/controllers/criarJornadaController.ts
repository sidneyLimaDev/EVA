import { Request, Response, NextFunction } from "express";
import Jornada from "domain/schemas/jornadaSchema";
import { CustomError } from "middleware/CustomError";
import { Types } from "mongoose";

export const criarJornadaController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { nome, descricao, acoes } = req.body;

    if (!nome || !Array.isArray(acoes)) {
      return res
        .status(400)
        .json({ message: "Nome e ações são obrigatórios." });
    }

    const isValidAcoes = acoes.every((id: string) =>
      Types.ObjectId.isValid(id)
    );
    if (!isValidAcoes) {
      throw new CustomError("Uma ou mais ações possuem ID inválido.", 400);
    }

    const novaJornada = await Jornada.create({
      nome,
      descricao,
      acoes,
    });

    return res.status(201).json({
      message: "Jornada criada com sucesso.",
      data: novaJornada,
    });
  } catch (error) {
    console.error("Erro ao criar jornada:", error);
    return next(error);
  }
};
