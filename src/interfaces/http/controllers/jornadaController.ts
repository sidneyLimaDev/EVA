// src/interfaces/http/controllers/jornadaController.ts
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import Jornada from "domain/schemas/jornadaSchema";
import { CustomError } from "middleware/CustomError";

// Criar Jornada
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

    const novaJornada = await Jornada.create({ nome, descricao, acoes });

    return res.status(201).json({
      message: "Jornada criada com sucesso.",
      data: novaJornada,
    });
  } catch (error) {
    return next(error);
  }
};

// Listar Jornadas
export const listarJornadasController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const jornadas = await Jornada.find().populate("acoes");
    return res.json(jornadas);
  } catch (error) {
    return next(error);
  }
};

// Buscar Jornada por ID
export const buscarJornadaController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError("ID inválido.", 400);
    }

    const jornada = await Jornada.findById(id).populate("acoes");
    if (!jornada) {
      return res.status(404).json({ message: "Jornada não encontrada." });
    }

    return res.json(jornada);
  } catch (error) {
    return next(error);
  }
};

// Atualizar Jornada
export const atualizarJornadaController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const { nome, descricao, acoes } = req.body;

    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError("ID inválido.", 400);
    }

    const jornadaAtualizada = await Jornada.findByIdAndUpdate(
      id,
      { nome, descricao, acoes },
      { new: true }
    );

    if (!jornadaAtualizada) {
      return res.status(404).json({ message: "Jornada não encontrada." });
    }

    return res.json({
      message: "Jornada atualizada com sucesso.",
      data: jornadaAtualizada,
    });
  } catch (error) {
    return next(error);
  }
};

// Deletar Jornada
export const deletarJornadaController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError("ID inválido.", 400);
    }

    const jornadaRemovida = await Jornada.findByIdAndDelete(id);
    if (!jornadaRemovida) {
      return res.status(404).json({ message: "Jornada não encontrada." });
    }

    return res.json({ message: "Jornada deletada com sucesso." });
  } catch (error) {
    return next(error);
  }
};
