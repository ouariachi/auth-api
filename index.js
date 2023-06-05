import { initAPI } from "./api/index.js";
import { initDB } from "./db/index.js";

import { configDotenv } from "dotenv";

configDotenv();

initDB(initAPI);