// src/infrastructure/db/schemas/colaboradorSchema.ts
import mongoose, { Schema, Document } from "mongoose";
import { ColaboradorEntity } from "../../domain/entities/colaborador";

export interface IColaboradorModel extends ColaboradorEntity, Document {}

const ColaboradorSchema = new Schema<IColaboradorModel>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cargo: { type: String, required: true },
  telefone: { type: String, required: true },
});

const ColaboradorModel = mongoose.model<IColaboradorModel>(
  "Colaborador",
  ColaboradorSchema
);

export default ColaboradorModel;
