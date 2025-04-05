// src/testes/testJob.ts
import { acaoQueue } from "../queue";

const testarJob = async () => {
  await acaoQueue.add({
    acao: {
      nome: "Ação de Boas-vindas",
      tipo: "email",
      payload: "Olá, seja bem-vindo!",
    },
    colaboradorEmail: "teste@email.com",
  });

  console.log("✅ Job adicionado à fila.");
};

testarJob();
