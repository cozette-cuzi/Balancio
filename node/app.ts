import dotenv from "dotenv";
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
import express from "express";
import * as http from "http";
import debug from "debug";
import cors from "cors";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./users/users.routes.config";
import { AuthRoutes } from "./auth/auth.routes.config";


const app: express.Application = express();
const port = 3000;
const server: http.Server = http.createServer(app);
const debugLog: debug.IDebugger = debug("app");
const routes: Array<CommonRoutesConfig> = [];


app.use(express.json());
app.use(cors());
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, make terse
    if (typeof global.it === "function") {
        loggerOptions.level = "http"; // for non-debug test runs, squelch entirely
    }
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage);
});
export default server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
      });
    console.log(runningMessage);
});
