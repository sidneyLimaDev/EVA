import { ColaboradorEntity } from "../entities/colaborador";

export interface ColaboradorRepository {
  criar(colaborador: ColaboradorEntity): Promise<ColaboradorEntity>;
  buscarPorId(id: string): Promise<ColaboradorEntity | null>;
  atualizar(
    id: string,
    colaborador: Partial<ColaboradorEntity>
  ): Promise<ColaboradorEntity | null>;
  deletar(id: string): Promise<boolean>;
}
