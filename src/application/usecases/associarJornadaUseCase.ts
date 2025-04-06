import Colaborador from "../../domain/schemas/colaboradorSchema";
import Jornada from "../../domain/schemas/jornadaSchema";
import Associacao from "../../domain/schemas/associacaoSchema";
import { Types } from "mongoose";
import { CustomError } from "../../middleware/CustomError";
import { acaoQueue } from "../../queue";

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
    const isValidId = Types.ObjectId.isValid(colaboradorId);
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

    // Agendar ações da jornada
    const acoes = jornada.acoes as any[]; // Tipagem simples por enquanto
    console.log("🔎 Ações populadas:", jornada.acoes);
    console.log("✅ Tipo da primeira ação:", typeof jornada.acoes[0]);

    for (const acao of acoes) {
      const delayEmMs = new Date(acao.tempo).getTime(); // tempo relativo
      console.log("⏳ Ação:", acao.titulo, "com tempo:", delayEmMs);
      console.log("teste");
      const dataExecucao =
        new Date(dataInicio).getTime() + delayEmMs - Date.now();
      console.log("⏳ Agendando ação para:", colaborador.email, acao.titulo);
      await acaoQueue.add(
        {
          colaboradorEmail: colaborador.email,
          acaoDescricao: acao.descricao,
          acaoTitulo: acao.titulo,
          nomeColaborador: colaborador.nome,
          cargoColaborador: colaborador.cargo,
        },
        {
          delay: 0,
          attempts: 3,
        }
      );
    }

    return associacao;
  }
}
