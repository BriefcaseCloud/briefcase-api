import * as express from "express";
import * as bodyParser from "body-parser";

// Routes
import { authRouter } from "./auth";

const app = express();
// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Any requests to /api/users will be routed to the user router!
app.use("/auth", authRouter);

// Again, lets be nice and help the poor wandering servers, any requests to /api
// that are not /api/users will result in 404.
app.get("*", async (req: express.Request, res: express.Response) => {
  res.status(404).send("This route does not exist.");
});

export default app;
