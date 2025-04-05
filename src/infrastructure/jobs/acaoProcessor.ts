import { acaoQueue } from "../../queue";
import { Job } from "bull";

// Processador que define como os jobs serão processados
acaoQueue.process(async (job: Job) => {
  try {
    console.log("Processando job", job.id);

    // Aqui você pode realizar a lógica do job, como enviar um e-mail, por exemplo
    console.log("Dados do job:", job.data);
    // Exemplo de job processado
    return Promise.resolve();
  } catch (error) {
    console.error("Erro no processamento do job:", error);
    throw error;
  }
});
