import { Types } from "mongoose";

export interface JornadaEntity {
  nome: string;
  descricao: string;
  acoes: Types.ObjectId[];
}
