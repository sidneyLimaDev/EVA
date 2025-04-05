import { IAcaoModel } from "../../domain/schemas/acaoSchema";

export const dispatchAcao = async (
  acao: IAcaoModel,
  colaboradorEmail: string
) => {
  console.log(`🎯 Disparando ação [${acao.tipo}] para ${colaboradorEmail}`);
  console.log(`📨 Conteúdo: ${acao.payload}`);

  // Aqui futuramente você pode colocar:
  // - nodemailer (email)
  // - API do WhatsApp (ex: Twilio, Z-API etc)
};
