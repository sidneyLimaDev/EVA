import Colaborador from "../../domain/schemas/colaboradorSchema";
import Jornada from "../../domain/schemas/jornadaSchema";
import Associacao from "../../domain/schemas/associacaoSchema";
import { Types } from "mongoose";

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
      throw new Error("ID de colaborador inválido.");
    }

    const colaborador = await Colaborador.findById(colaboradorId);
    // 1. Verifica se o colaborador existe
    if (!colaborador) {
      throw new Error("Colaborador não encontrado.");
    }
    // 2. Verifica se a jornada existe
    const jornada = await Jornada.findById(jornadaId).populate("acoes");
    if (!jornada) {
      throw new Error("Jornada não encontrada.");
    }

    // 3. Cria a associação
    const associacao = await Associacao.create({
      colaborador: new Types.ObjectId(colaboradorId),
      jornada: new Types.ObjectId(jornadaId),
      dataInicio: dataInicio,
    });

    return associacao;
  }
}
