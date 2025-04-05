import mongoose, { Schema, Document } from "mongoose";
import { JornadaEntity } from "../entities/jornada";

import "./acaoSchema";

export interface IJornadaModel extends JornadaEntity, Document {}

const JornadaSchema = new Schema<IJornadaModel>({
  nome: { type: String, required: true },
  descricao: { type: String },
  acoes: [{ type: Schema.Types.ObjectId, ref: "Acao" }],
});

export default mongoose.model<IJornadaModel>("Jornada", JornadaSchema);
