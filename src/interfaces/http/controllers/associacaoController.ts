import { NextFunction, Request, Response } from "express";
import Associacao from "../../../domain/schemas/associacaoSchema";
import { Types } from "mongoose";

export const listarAssociacoes = async (req: Request, res: Response) => {
  try {
    const associacoes = await Associacao.find()
      .populate("colaborador", "nome email")
      .populate("jornada", "titulo descricao");

    res.json(associacoes);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar associações." });
  }
};

export const buscarAssociacao = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const associacao = await Associacao.findById(id)
      .populate("colaborador", "nome email")
      .populate("jornada", "titulo descricao");

    if (!associacao) {
      return res.status(404).json({ message: "Associação não encontrada" });
    }

    res.json(associacao);
  } catch (err) {
    next(err);
  }
};

export const atualizarAssociacao = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { colaborador, jornada, dataInicio } = req.body;

    const atualizada = await Associacao.findByIdAndUpdate(
      id,
      { colaborador, jornada, dataInicio },
      { new: true }
    );

    if (!atualizada) {
      return res.status(404).json({ message: "Associação não encontrada" });
    }

    res.json(atualizada);
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar associação." });
  }
};

export const deletarAssociacao = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const deletada = await Associacao.findByIdAndDelete(id);

    if (!deletada) {
      return res.status(404).json({ message: "Associação não encontrada" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar associação." });
  }
};
