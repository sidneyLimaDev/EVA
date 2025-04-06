// src/interfaces/http/controllers/colaboradorController.ts

import { Request, Response, NextFunction } from "express";
import { ColaboradorEntity } from "domain/entities/colaborador";
import { ColaboradorRepositoryMongoose } from "infrastructure/db/mongo/colaboradorRepositoryAdapter";
import Colaborador from "../../../domain/schemas/colaboradorSchema";

import { RequestHandler } from "express"; // Importando o modelo de colaborador

// Instanciando o repositório
const colaboradorRepository = new ColaboradorRepositoryMongoose();

// Controlador para criar colaborador
export const criarColaboradorController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const colaboradorData: ColaboradorEntity = req.body;
    const colaboradorCriado = await colaboradorRepository.criar(
      colaboradorData
    );
    res.status(201).json(colaboradorCriado); // Aqui não estamos retornando, apenas respondendo
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar colaborador" });
  }
};

// Controlador para buscar colaborador por ID
export const buscarColaboradorPorIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const colaborador = await colaboradorRepository.buscarPorId(id);

    if (!colaborador) {
      res.status(404).json({ message: "Colaborador não encontrado" });
      return; // Importante: Não retornar nada, apenas usar res diretamente
    }

    res.status(200).json(colaborador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar colaborador" });
  }
};

// Controlador para atualizar colaborador
export const atualizarColaboradorController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const colaboradorData: ColaboradorEntity = req.body;

    const colaboradorAtualizado = await colaboradorRepository.atualizar(
      id,
      colaboradorData
    );

    if (!colaboradorAtualizado) {
      res
        .status(404)
        .json({ message: "Colaborador não encontrado para atualização" });
      return;
    }

    res.status(200).json(colaboradorAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar colaborador" });
  }
};

// Controlador para deletar colaborador
export const deletarColaboradorController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const resultado = await colaboradorRepository.deletar(id);

    if (!resultado) {
      res
        .status(404)
        .json({ message: "Colaborador não encontrado para deletar" });
      return;
    }

    res.status(200).json({ message: "Colaborador deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar colaborador" });
  }
};

export const listarColaboradoresController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Promise<void> para garantir o tipo correto
  try {
    const colaboradores = await Colaborador.find();
    res.status(200).json(colaboradores);
  } catch (err) {
    next(err); // Passando o erro para o middleware global
  }
};
