import { config } from "dotenv";
import * as app from "./app.json";
import * as mongo from "./mongo.json";

config();
const { env } = process;

export default {
  port: env.PORT || app.PORT,
  name: env.NAME || app.NAME,
  mongo: {
    path: env.MONGO_URL || mongo.url,
  },
};
