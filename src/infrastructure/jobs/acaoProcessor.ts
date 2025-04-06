import { acaoQueue } from "../../queue";
import { Job } from "bull";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// Inicializa o transporter e registra o processador de jobs
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

      const { colaboradorEmail, acaoDescricao, acaoTitulo } = job.data;

      const mailOptions = {
        from: '"Equipe Eva" <noreply@eva.com>',
        to: colaboradorEmail,
        subject: `Nova ação: ${acaoTitulo}`,
        text: acaoDescricao,
      };

      const info = await transporter.sendMail(mailOptions);

      console.log("✉️ E-mail enviado:", info.messageId);
      console.log("🔗 Visualize aqui:", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.error("❌ Erro no processamento do job:", error);
      throw error;
    }
  });
}

iniciarProcessador();
