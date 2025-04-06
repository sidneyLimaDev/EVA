// src/infrastructure/jobs/acaoProcessor.ts

import { acaoQueue } from "../../queue";
import { Job } from "bull";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function iniciarProcessador() {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  console.log("📨 Conta Ethereal pronta!");
  console.log("🔐 Login:", testAccount.user);
  console.log("🔑 Senha:", testAccount.pass);

  acaoQueue.process(async (job: Job) => {
    try {
      console.log("📩 Processando job", job.id);

      const {
        colaboradorEmail,
        nomeColaborador,
        cargoColaborador,
        tipo,
        acaoTitulo,
        acaoDescricao,
      } = job.data;

      if (tipo === "email") {
        const mailOptions = {
          from: '"Equipe Eva" <noreply@eva.com>',
          to: colaboradorEmail,
          subject: acaoTitulo, // Agora usa o título da ação
          text: acaoDescricao, // Agora usa a descrição da ação
          /* subject: acaoTitulo || "Bem-vindo à jornada",
          text:
            acaoDescricao ||
            `Olá ${nomeColaborador}, seja muito bem-vindo! Daremos início à sua nova fase no cargo de ${cargoColaborador}.`, */
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("✉️ E-mail enviado:", info.messageId);
        console.log("🔗 Visualize aqui:", nodemailer.getTestMessageUrl(info));
      } else if (tipo === "whatsapp") {
        console.log("📱 É whatsapp!");
        console.log(
          `Mensagem para ${nomeColaborador} (${cargoColaborador}): ${acaoDescricao}`
        );
        // Aqui futuramente você pode acionar uma API como Twilio ou Z-API
      } else {
        console.warn("❗ Tipo de ação não reconhecido:", tipo);
      }
    } catch (error) {
      console.error("❌ Erro no processamento do job:", error);
      throw error;
    }
  });
}

iniciarProcessador();
