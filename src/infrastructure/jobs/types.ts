export interface AcaoJobData {
  acao: {
    nome: string;
    tipo: "email" | "whatsapp";
    payload: string;
  };
  colaboradorEmail: string;
}
