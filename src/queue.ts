// queue.ts
import Bull from "bull";

export const acaoQueue = new Bull("acaoQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});
