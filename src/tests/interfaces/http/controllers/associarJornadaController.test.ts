import { AssociarJornadaUseCase } from "../../../../application/usecases/associarJornadaUseCase";
import { associarJornadaController } from "../../../../interfaces/http/controllers/associarJornadaController";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "middleware/CustomError";

// Mock do Request, Response e NextFunction
const mockRequest = (body: any): Partial<Request> => ({
  body,
});
const mockResponse = (): Partial<Response> => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe("Associar Jornada Controller", () => {
  it("deve retornar erro se dados obrigatórios não forem fornecidos", async () => {
    const req = mockRequest({}); // Requisição sem dados obrigatórios
    const res = mockResponse();
    await associarJornadaController(
      req as Request,
      res as Response,
      mockNext as NextFunction
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Todos os campos são obrigatórios.",
    });
  });

  /* it("deve associar jornada com sucesso", async () => {
    jest.setTimeout(20000);
    const req = mockRequest({
      colaboradorId: "67f15a8b7c87260041c34b10",
      jornadaId: "67f15a8b7c87260041c34b17",
      dataInicio: "2025-04-05T12:00:00Z",
    });
    const res = mockResponse();
    await associarJornadaController(
      req as Request,
      res as Response,
      mockNext as NextFunction
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Jornada associada com sucesso.",
      data: expect.any(Object),
    });
  }); */

  it("deve passar para o middleware de erro em caso de erro inesperado", async () => {
    const req = mockRequest({
      colaboradorId: "67f15a8b7c87260041c34b10",
      jornadaId: "67f15a8b7c87260041c34b17",
      dataInicio: "2025-04-05T12:00:00Z",
    });
    const res = mockResponse();
    const error = new Error("Erro inesperado");
    jest
      .spyOn(AssociarJornadaUseCase.prototype, "execute")
      .mockRejectedValue(error);

    await associarJornadaController(
      req as Request,
      res as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
  });
});
