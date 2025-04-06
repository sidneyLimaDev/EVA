import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import Acao from "domain/schemas/acaoSchema";
import { CustomError } from "middleware/CustomError";

// Criar ação
export const criarAcaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { title, description, tipo, payload } = req.body;

    if (!title || !description || !tipo || !payload) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const novaAcao = await Acao.create({ title, description, tipo, payload });

    return res.status(201).json({
      message: "Ação criada com sucesso.",
      data: novaAcao,
    });
  } catch (error) {
    return next(error);
  }
};

// Listar ações
export const listarAcoesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const acoes = await Acao.find();
    return res.json(acoes);
  } catch (error) {
    return next(error);
  }
};

// Buscar ação por ID
export const buscarAcaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError("ID inválido.", 400);
    }

    const acao = await Acao.findById(id);
    if (!acao) {
      return res.status(404).json({ message: "Ação não encontrada." });
    }

    return res.json(acao);
  } catch (error) {
    return next(error);
  }
};

// Atualizar ação
export const atualizarAcaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, description, tipo, payload } = req.body;

    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError("ID inválido.", 400);
    }

    const acaoAtualizada = await Acao.findByIdAndUpdate(
      id,
      { title, description, tipo, payload },
      { new: true }
    );

    if (!acaoAtualizada) {
      return res.status(404).json({ message: "Ação não encontrada." });
    }

    return res.json({
      message: "Ação atualizada com sucesso.",
      data: acaoAtualizada,
    });
  } catch (error) {
    return next(error);
  }
};

// Deletar ação
export const deletarAcaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError("ID inválido.", 400);
    }

    const acaoRemovida = await Acao.findByIdAndDelete(id);
    if (!acaoRemovida) {
      return res.status(404).json({ message: "Ação não encontrada." });
    }

    return res.json({ message: "Ação deletada com sucesso." });
  } catch (error) {
    return next(error);
  }
};
