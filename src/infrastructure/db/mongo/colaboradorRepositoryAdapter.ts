import { ColaboradorEntity } from "domain/entities/colaborador";
import { ColaboradorRepository } from "domain/ports/colaboradorRepository";
import ColaboradorModel from "domain/schemas/colaboradorSchema";

export class ColaboradorRepositoryMongoose implements ColaboradorRepository {
  async criar(colaborador: ColaboradorEntity): Promise<ColaboradorEntity> {
    const novoColaborador = new ColaboradorModel(colaborador);
    await novoColaborador.save();
    return novoColaborador.toObject();
  }

  async buscarPorId(id: string): Promise<ColaboradorEntity | null> {
    return ColaboradorModel.findById(id).lean();
  }

  async buscarPorEmail(email: string): Promise<ColaboradorEntity | null> {
    return ColaboradorModel.findOne({ email }).lean();
  }

  async atualizar(
    id: string,
    colaborador: ColaboradorEntity
  ): Promise<ColaboradorEntity | null> {
    const colaboradorAtualizado = await ColaboradorModel.findByIdAndUpdate(
      id,
      colaborador,
      { new: true }
    ).lean();

    if (!colaboradorAtualizado) {
      return null;
    }

    return colaboradorAtualizado as ColaboradorEntity;
  }

  async deletar(id: string): Promise<boolean> {
    const result = await ColaboradorModel.findByIdAndDelete(id);
    return result !== null;
  }
}
