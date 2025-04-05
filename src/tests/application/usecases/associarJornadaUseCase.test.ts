import Colaborador from "../../../domain/schemas/colaboradorSchema";
import Jornada from "../../../domain/schemas/jornadaSchema";
import Associacao from "../../../domain/schemas/associacaoSchema";
import { Types } from "mongoose";
import { AssociarJornadaUseCase } from "../../../application/usecases/associarJornadaUseCase";

// Mocking dos modelos
jest.mock("../../../domain/schemas/colaboradorSchema");
jest.mock("../../../domain/schemas/jornadaSchema");
jest.mock("../../../domain/schemas/associacaoSchema");

describe("AssociarJornadaUseCase", () => {
  let associarJornadaUseCase: AssociarJornadaUseCase;

  beforeEach(() => {
    associarJornadaUseCase = new AssociarJornadaUseCase();
  });

  it("deve lançar erro se o ID do colaborador for inválido", async () => {
    const invalidId = "invalid-id";
    await expect(
      associarJornadaUseCase.execute({
        colaboradorId: invalidId,
        jornadaId: "some-valid-id",
        dataInicio: new Date(),
      })
    ).rejects.toThrowError("ID de colaborador inválido.");
  });

  it("deve lançar erro se o colaborador não for encontrado", async () => {
    const colaboradorId = new Types.ObjectId().toString();
    const jornadaId = new Types.ObjectId().toString();

    Colaborador.findById = jest.fn().mockResolvedValue(null); // Mock do retorno de findById

    await expect(
      associarJornadaUseCase.execute({
        colaboradorId,
        jornadaId,
        dataInicio: new Date(),
      })
    ).rejects.toThrowError("Colaborador não encontrado.");
  });
});
