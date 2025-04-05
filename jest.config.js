module.exports = {
  rootDir: "./",
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  moduleNameMapper: {
    "^application/(.*)$": "<rootDir>/src/application/$1", // Mapeando o alias para o diretório correto
    "^middleware/(.*)$": "<rootDir>/src/middleware/$1",
  },
};
