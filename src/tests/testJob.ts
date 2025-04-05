// src/tests/testJob.ts
import { acaoQueue } from "../queue"; // Certifique-se de que o caminho está correto

const testarJob = async () => {
  try {
    // Adiciona o job à fila
    const job = await acaoQueue.add({
      acao: {
        nome: "Ação de Boas-vindas",
        tipo: "email",
        payload: "Olá, seja bem-vindo!",
      },
      colaboradorEmail: "teste@email.com",
    });

    console.log("✅ Job adicionado à fila com sucesso.");
    console.log("Job ID:", job.id); // Exibe o ID do job para rastrear o progresso ou status
  } catch (error) {
    console.error("❌ Erro ao adicionar o job à fila:", error);
  }
};

// Chama a função para testar a adição do job
testarJob();
