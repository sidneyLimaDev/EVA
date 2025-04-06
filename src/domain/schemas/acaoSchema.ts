import mongoose, { Schema, Document } from "mongoose";
import { AcaoEntity } from "../entities/acao";

export interface IAcaoModel extends AcaoEntity, Document {}

const AcaoSchema = new Schema<IAcaoModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tipo: { type: String, enum: ["email", "whatsapp"], required: true },
  payload: { type: String, required: true },
});

export default mongoose.model<IAcaoModel>("Acao", AcaoSchema);
