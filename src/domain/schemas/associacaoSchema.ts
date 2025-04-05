import mongoose, { Document, Schema } from "mongoose";
import { AssociacaoEntity } from "../entities/associacao";

export interface IAssociacaoModel extends AssociacaoEntity, Document {}

const AssociacaoSchema = new Schema<IAssociacaoModel>({
  colaborador: {
    type: Schema.Types.ObjectId,
    ref: "Colaborador",
    required: true,
  },
  jornada: { type: Schema.Types.ObjectId, ref: "Jornada", required: true },
  dataInicio: { type: Date, required: true },
});

export default mongoose.model<IAssociacaoModel>("Associacao", AssociacaoSchema);
