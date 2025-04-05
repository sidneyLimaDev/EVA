import mongoose, { Document, Schema } from "mongoose";
import { ColaboradorEntity } from "../entities/colaborador";

export interface IColaboradorModel extends ColaboradorEntity, Document {}

const ColaboradorSchema = new Schema<IColaboradorModel>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<IColaboradorModel>(
  "Colaborador",
  ColaboradorSchema
);
