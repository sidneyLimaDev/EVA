import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Colaborador from "../domain/schemas/colaboradorSchema";
import Acao from "../domain/schemas/acaoSchema";
import Jornada from "../domain/schemas/jornadaSchema";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("🌱 Conectado ao MongoDB");

    // Limpa coleções
    await Promise.all([
      Colaborador.deleteMany({}),
      Acao.deleteMany({}),
      Jornada.deleteMany({}),
    ]);

    // Cria colaborador
    const colaborador = await Colaborador.create({
      nome: "Joana Silva",
      email: "joana@eva.com",
    });

    // Cria ações
    const acaoEmail = await Acao.create({
      tipo: "email",
      conteudo: "Bem-vinda à empresa!",
      atrasoEmSegundos: 5,
    });

    const acaoWhatsApp = await Acao.create({
      tipo: "whatsapp",
      conteudo: "Se precisar de ajuda, estamos no WhatsApp!",
      atrasoEmSegundos: 10,
    });

    // Cria jornada
    const jornada = await Jornada.create({
      nome: "Onboarding Inicial",
      acoes: [acaoEmail._id, acaoWhatsApp._id],
    });

    console.log("✅ Dados inseridos:");
    console.log("Colaborador:", colaborador);
    console.log("Jornada:", jornada);
    console.log("Ações:", [acaoEmail, acaoWhatsApp]);

    await mongoose.disconnect();
    console.log("✅ Conexão encerrada");
  } catch (error) {
    console.error("Erro ao popular dados:", error);
  }
}

seed();
