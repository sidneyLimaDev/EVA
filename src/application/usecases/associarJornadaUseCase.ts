// src/application/usecases/associarJornadaUseCase.ts

import Colaborador from "../../domain/schemas/colaboradorSchema";
import Jornada from "../../domain/schemas/jornadaSchema";
import Associacao from "../../domain/schemas/associacaoSchema";
import { Types } from "mongoose";
import { CustomError } from "middleware/CustomError";

interface AssociarJornadaInput {
  colaboradorId: string;
  jornadaId: string;
  dataInicio: Date;
}

export class AssociarJornadaUseCase {
  async execute({
    colaboradorId,
    jornadaId,
    dataInicio,
  }: AssociarJornadaInput) {
    console.log("🔍 ID do colaborador recebido:", colaboradorId);
    const isValidId = Types.ObjectId.isValid(colaboradorId);
    console.log("✅ ID é válido?", isValidId);
    if (!isValidId) {
      throw new CustomError("ID de colaborador inválido.", 400);
    }

    const colaborador = await Colaborador.findById(colaboradorId);
    if (!colaborador) {
      throw new CustomError("Colaborador não encontrado.", 404);
    }

    const jornada = await Jornada.findById(jornadaId).populate("acoes");
    if (!jornada) {
      throw new CustomError("Jornada não encontrada.", 404);
    }

    const associacaoExistente = await Associacao.findOne({
      colaborador: colaboradorId,
      jornada: jornadaId,
    });
    if (associacaoExistente) {
      throw new CustomError("Jornada já associada a este colaborador.", 409);
    }

    const associacao = await Associacao.create({
      colaborador: new Types.ObjectId(colaboradorId),
      jornada: new Types.ObjectId(jornadaId),
      dataInicio: dataInicio,
    });

    return associacao;
  }
}
