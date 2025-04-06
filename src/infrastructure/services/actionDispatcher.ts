import { IAcaoModel } from "../../domain/schemas/acaoSchema";

export const dispatchAcao = async (
  acao: IAcaoModel,
  colaboradorEmail: string
) => {
  console.log(`🎯 Disparando ação [${acao.tipo}] para ${colaboradorEmail}`);
  console.log(`📨 Conteúdo: ${acao.payload}`);
};
