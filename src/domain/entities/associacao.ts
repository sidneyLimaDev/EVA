import { Types } from "mongoose";

export interface AssociacaoEntity {
  colaborador: Types.ObjectId;
  jornada: Types.ObjectId;
  dataInicio: Date;
}
