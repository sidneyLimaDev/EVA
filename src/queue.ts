// queue.ts
import Bull from "bull";

export const acaoQueue = new Bull("acaoQueue", {
  redis: { host: "localhost", port: 6379 },
});
