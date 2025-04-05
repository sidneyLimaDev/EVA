// src/infrastructure/jobs/agendaJornadaJob.ts
import { IJornadaModel } from "../../domain/schemas/jornadaSchema";
import { IColaboradorModel } from "../../domain/schemas/colaboradorSchema";
import { acaoQueue } from "../../queue";

export const agendarAcoesDaJornada = async (
  jornada: IJornadaModel,
  colaborador: IColaboradorModel,
  dataInicio: Date
) => {
  if (!jornada.acoes?.length) return;

  for (const acao of jornada.acoes) {
    const delay = calcularDelay(dataInicio);

    await acaoQueue.add(
      {
        acao: {
          nome: acao.nome,
          tipo: acao.tipo,
          payload: acao.payload,
        },
        colaboradorEmail: colaborador.email,
      },
      { delay }
    );
  }
};

function calcularDelay(dataInicio: Date): number {
  const agora = Date.now();
  const inicio = new Date(dataInicio).getTime();
  return Math.max(inicio - agora, 0);
}
