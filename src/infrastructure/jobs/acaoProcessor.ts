// src/infrastructure/jobs/acaoProcessor.ts
import { acaoQueue } from "../../queue";

acaoQueue.process(async (job) => {
  console.log("[acaoProcessor] Processando job com dados:");
  console.log(job.data);
  const { acao, colaboradorEmail } = job.data;

  console.log(`Executando ação ${acao.nome} para ${colaboradorEmail}`);

  // Aqui você pode usar actionDispatcher ou outro serviço pra agir
});
