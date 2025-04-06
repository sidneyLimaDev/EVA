// src/application/usecases/criarColaboradorUseCase.ts

import { ColaboradorRepository } from "domain/ports/colaboradorRepository";
import { ColaboradorEntity } from "../../domain/entities/colaborador";

export class CriarColaboradorUseCase {
  private colaboradorRepository: ColaboradorRepository;

  constructor(colaboradorRepository: ColaboradorRepository) {
    this.colaboradorRepository = colaboradorRepository;
  }

  async executar(colaborador: ColaboradorEntity): Promise<ColaboradorEntity> {
    return this.colaboradorRepository.criar(colaborador);
  }
}
